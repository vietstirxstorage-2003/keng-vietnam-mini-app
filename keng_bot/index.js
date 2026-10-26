const ZaloBot = require("node-zalo-bot");

const BOT_TOKEN = "86778518467367423:OEPpLIwIBtTUwLTdVUvtSLwmUcDMtDcTZcasIhNgXlayCNgEXNCSYyPDWAruLHpL";

// Link mở Mini App trực tiếp trong Zalo: https://zalo.me/s/<mini_app_id>/
const KENG_MINI_APP_ID = process.env.KENG_MINI_APP_ID || "keng_vietnam";
// Link chính thức mở Mini App trong Zalo
const MINI_APP_URL = `https://zalo.me/s/${KENG_MINI_APP_ID}/`;
const BOT_ID = "86778518467367423";

// In-memory lưu trữ danh sách lịch hẹn khách đặt từ Mini App
const BOOKINGS_DB = [];

// Quản lý ticket CSKH: Map ticketId -> { id, customerName, chatId, service, text, claimedBy, time }
const TICKETS_MAP = new Map();
let ticketCounter = 100;

// Chat ID của Nhóm Zalo CSKH (hoặc tài khoản nhân viên trực)
// Mẹo: Khi add bot vào nhóm Zalo, gõ "/setgroup" trong nhóm đó, bot sẽ tự lưu ID nhóm này!
let CSKH_GROUP_CHAT_ID = process.env.CSKH_GROUP_CHAT_ID || null;

// Hàm bắn thông báo vào Group CSKH khi có khách cần hỗ trợ
function notifyCSKHGroup(ticket) {
  if (!CSKH_GROUP_CHAT_ID) {
    console.log(`[ALERT CSKH] Khách ${ticket.customerName} cần hỗ trợ [${ticket.service}]. (Chưa cấu hình CSKH_GROUP_CHAT_ID)`);
    return;
  }

  const claimCommand = `/claim ${ticket.id}`;
  const directChatUrl = `https://zalo.me/0865997931?text=${encodeURIComponent(`Xin chào, tôi là NV CSKH KENG tiếp nhận yêu cầu mã #${ticket.id} của bạn.`)}`;

  const alertMsg =
`🚨 **CÓ KHÁCH CẦN TƯ VẤN MỚI! (Mã #${ticket.id})**

👤 **Khách hàng:** ${ticket.customerName}
📌 **Dịch vụ quan tâm:** ${ticket.service}
💬 **Nội dung:** "${ticket.text}"
🕒 **Thời gian:** ${ticket.time}

👉 **Nhân viên nhấn gõ lệnh dưới để NHẬN XỬ LÝ (CLAIM):**
\`${claimCommand}\`

*(Chỉ 1 nhân viên claim thành công sẽ chịu trách nhiệm chăm sóc khách này)*`;

  bot.sendMessage(CSKH_GROUP_CHAT_ID, alertMsg, { parse_mode: "markdown" });
}

const bot = new ZaloBot(BOT_TOKEN, {
  polling: true,
});

bot.on("polling_error", (err) => {
  if (err?.message?.includes("408")) return;
  console.error("Polling error:", err?.message || err);
});

// LOG TẤT CẢ RAW UPDATES ĐỂ BẮT MỌI SỰ KIỆN TỪ NHÓM
bot.on("raw_update", (up) => {
  console.log(">> RAW UPDATE:", JSON.stringify(up));
});

console.log("=========================================");
console.log("🚀 Zalo Bot [Bot Vietstrix - KENG Vietnam] is RUNNING!");
console.log("Ready to handle user messages & queries...");
console.log("=========================================");

// Lắng nghe lệnh /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userName = msg.from?.display_name || "quý khách";

  const welcomeText = 
`**Xin chào ${userName}!** 🎉
Chào mừng bạn đến với **KENG Vietnam - Agency Marketing Thực chiến**.

Không vẽ vời. Không mập mờ. Mang lại kết quả thực dụng nhất cho doanh nghiệp.

📱 **Mở ngay Mini App KENG Vietnam để chọn dịch vụ:**
👉 ${MINI_APP_URL}

👉 *Hoặc gõ nhanh các từ khóa:*
• **fanpage**: Chăm sóc Fanpage toàn diện
• **website**: Thiết kế Web chuẩn UI/UX chốt sale
• **video**: Xây kênh TikTok, FB, Reels
• **ads**: Performance Marketing (Tối ưu chuyển đổi)
• **hotline**: Kết nối chuyên viên tư vấn 24/7`;

  bot.sendMessage(chatId, welcomeText, { parse_mode: "markdown" });
});

// Lắng nghe toàn bộ tin nhắn
bot.on("message", (msg) => {
  console.log(">> RAW MSG EVENT:", JSON.stringify(msg));
  const text = (msg.text || "").trim();
  const chatId = msg.chat.id;

  // Bỏ qua nếu là lệnh start
  if (text.startsWith("/start")) return;

  console.log(`[Tin nhắn từ ${msg.from?.display_name || chatId}]: ${text}`);

  const lower = text.toLowerCase();

  // LỆNH 1: Thiết lập nhóm CSKH hiện tại làm nơi nhận thông báo
  if (lower === "/setgroup") {
    CSKH_GROUP_CHAT_ID = chatId;
    bot.sendMessage(
      chatId,
      `✅ **Đã liên kết nhóm này làm Kênh Thông Báo CSKH KENG Vietnam!**\nTừ giờ khi có khách chat hoặc đặt lịch từ Mini App, bot sẽ bắn thông báo vào đây để nhân viên Claim.`,
      { parse_mode: "markdown" }
    );
    return;
  }

  // LỆNH 2: Nhân viên bấm /claim <mã_ticket>
  if (lower.startsWith("/claim")) {
    const parts = text.split(" ");
    const ticketId = parts[1];
    const staffName = msg.from?.display_name || "Nhân viên CSKH";

    if (!ticketId || !TICKETS_MAP.has(ticketId)) {
      bot.sendMessage(chatId, `❌ Mã ticket "${ticketId || ''}" không hợp lệ hoặc đã hết hạn.`);
      return;
    }

    const ticket = TICKETS_MAP.get(ticketId);

    // Kiểm tra tính độc quyền: Mỗi khách CHỈ 1 người claim
    if (ticket.claimedBy) {
      bot.sendMessage(
        chatId,
        `⚠️ **Yêu cầu #${ticketId} đã được nhận bởi [${ticket.claimedBy}] lúc ${ticket.claimedAt}!**\nVui lòng không tranh khách.`
      );
      return;
    }

    // Đánh dấu đã nhận thành công
    ticket.claimedBy = staffName;
    ticket.claimedAt = new Date().toLocaleTimeString("vi-VN");

    // Bắn thông báo xác nhận vào nhóm CSKH
    bot.sendMessage(
      chatId,
      `🎯 **CHÚC MỪNG: [${staffName}] đã nhận xử lý khách #${ticketId} (${ticket.customerName})!**\n` +
      `🔗 Hãy mở link để chat trực tiếp với khách:\n👉 https://zalo.me/0865997931?text=${encodeURIComponent(`Chào bạn, mình là ${staffName} (CSKH KENG) tiếp nhận yêu cầu về ${ticket.service} của bạn.`)}`,
      { parse_mode: "markdown" }
    );

    // Gửi thông báo trực tiếp cho Khách hàng biết tên chuyên viên đang hỗ trợ
    bot.sendMessage(
      ticket.chatId,
      `🎉 **Thông báo:** Chuyên viên **${staffName}** từ KENG Vietnam đã tiếp nhận phiên hỗ trợ của bạn và sẽ trao đổi trực tiếp với bạn ngay!`,
      { parse_mode: "markdown" }
    );
    return;
  }

  // Nhận diện khi khách bấm "Gửi yêu cầu qua Zalo ngay" từ Mini App Booking Sheet
  if (text.includes("Xin chào KENG Vietnam, tôi cần tư vấn dịch vụ:") || text.includes("Yêu cầu:")) {
    ticketCounter += 1;
    const ticketId = String(ticketCounter);

    const ticket = {
      id: ticketId,
      customerName: msg.from?.display_name || "Khách hàng Zalo",
      chatId,
      service: "Đặt lịch hẹn Mini App",
      text,
      time: new Date().toLocaleTimeString("vi-VN"),
      claimedBy: null,
    };
    TICKETS_MAP.set(ticketId, ticket);
    BOOKINGS_DB.push(ticket);

    // Bắn thông báo vào Group CSKH
    notifyCSKHGroup(ticket);

    bot.sendMessage(
      chatId,
      `✅ **KENG Vietnam đã ghi nhận yêu cầu đặt lịch của bạn! (Mã #${ticketId})**

📋 **Thông tin tiếp nhận:**
${text}

🕒 **Thời gian nhận:** ${ticket.time}
🔔 Chuyên viên phụ trách KENG sẽ rà soát và phản hồi kế hoạch chi tiết trong vòng **15 phút**.

👉 Bạn có thể xem thêm các dự án thực tế đã triển khai tại:
${MINI_APP_URL}`,
      { parse_mode: "markdown" }
    );
    return;
  }

  // Quản lý: Lệnh cho admin kiểm tra danh sách khách đặt lịch
  if (lower === "/admin" || lower === "danh sách" || lower === "quanly") {
    if (BOOKINGS_DB.length === 0) {
      bot.sendMessage(chatId, "Hiện chưa có lịch hẹn mới nào từ Mini App.");
    } else {
      let report = `📊 **Danh sách khách đặt lịch tư vấn (${BOOKINGS_DB.length}):**\n\n`;
      BOOKINGS_DB.forEach((b, i) => {
        report += `${i + 1}. **${b.user}** (${b.time}):\n${b.rawMessage}\n---\n`;
      });
      bot.sendMessage(chatId, report, { parse_mode: "markdown" });
    }
    return;
  }

  if (lower.includes("fanpage")) {
    ticketCounter += 1;
    const ticketId = String(ticketCounter);
    const ticket = {
      id: ticketId,
      customerName: msg.from?.display_name || "Khách hàng Zalo",
      chatId,
      service: "Chăm sóc Fanpage",
      text,
      time: new Date().toLocaleTimeString("vi-VN"),
      claimedBy: null,
    };
    TICKETS_MAP.set(ticketId, ticket);
    notifyCSKHGroup(ticket);

    const contactUrl = `https://zalo.me/0865997931?text=${encodeURIComponent(`Xin chào CSKH KENG, mình từ Bot sang (Ticket #${ticketId}), đang quan tâm gói Chăm sóc Fanpage, nhờ bạn tư vấn giúp mình!`)}`;
    bot.sendMessage(
      chatId,
      `🔥 **Dịch vụ Chăm sóc Fanpage - KENG Vietnam**
- Trọn gói lên định hướng nội dung tuần & tháng.
- Viết bài & thiết kế ấn phẩm đồ họa chuyên nghiệp.
- Duy trì lượng tương tác thật, tối ưu phễu inbox chuyển đổi đơn hàng.

📱 **Xem chi tiết & bảng giá tại Mini App:**
👉 ${MINI_APP_URL}?service=cham-soc-fanpage

💬 **Chat trực tiếp với CSKH (Đã kèm Ticket #${ticketId}):**
👉 ${contactUrl}`,
      { parse_mode: "markdown" }
    );
  } else if (lower.includes("web") || lower.includes("website")) {
    ticketCounter += 1;
    const ticketId = String(ticketCounter);
    const ticket = {
      id: ticketId,
      customerName: msg.from?.display_name || "Khách hàng Zalo",
      chatId,
      service: "Thiết kế Website",
      text,
      time: new Date().toLocaleTimeString("vi-VN"),
      claimedBy: null,
    };
    TICKETS_MAP.set(ticketId, ticket);
    notifyCSKHGroup(ticket);

    const contactUrl = `https://zalo.me/0865997931?text=${encodeURIComponent(`Xin chào CSKH KENG, mình từ Bot sang (Ticket #${ticketId}), đang quan tâm gói Thiết kế Website chuẩn UI/UX chốt sale, bạn tư vấn lộ trình giúp mình nhé!`)}`;
    bot.sendMessage(
      chatId,
      `💻 **Thiết kế Websites Chuẩn Chốt Sale - KENG Vietnam**
- Thiết kế chuẩn UI/UX mobile-first.
- Tốc độ tải trang siêu tốc, chuẩn SEO.
- Tích hợp tracking đo lường và nút liên hệ Zalo 1 chạm.

📱 **Bấm xem demo & đặt lịch trên Mini App:**
👉 ${MINI_APP_URL}?service=thiet-ke-website

💬 **Chat trực tiếp với Chuyên viên Website (Ticket #${ticketId}):**
👉 ${contactUrl}`,
      { parse_mode: "markdown" }
    );
  } else if (lower.includes("video") || lower.includes("tiktok") || lower.includes("xây kênh")) {
    const contactUrl = `https://zalo.me/0865997931?text=${encodeURIComponent("Xin chào CSKH KENG, mình từ Bot sang, cần tư vấn gói Xây kênh Video đa nền tảng (TikTok, Reels, FB) cho ngành hàng của mình.")}`;
    bot.sendMessage(
      chatId,
      `🎬 **Xây kênh Video đa nền tảng (TikTok, FB, Reels, Threads)**
- Lên kịch bản sắc bén, bám sát trend.
- Quay dựng trọn gói full thiết bị chất lượng cao.
- Tiếp cận đúng tệp khách hàng tiềm năng.

📱 **Mở Mini App để xem demo clip:**
👉 ${MINI_APP_URL}?service=xay-kenh

💬 **Chat trực tiếp với Đạo diễn/CSKH Video:**
👉 ${contactUrl}`,
      { parse_mode: "markdown" }
    );
  } else if (lower.includes("ads") || lower.includes("quảng cáo") || lower.includes("performance")) {
    const contactUrl = `https://zalo.me/0865997931?text=${encodeURIComponent("Xin chào CSKH KENG, mình từ Bot sang, muốn trao đổi về gói Performance Marketing tối ưu chi phí & tăng doanh thu.")}`;
    bot.sendMessage(
      chatId,
      `📊 **Performance Marketing (Quảng cáo chuyển đổi)**
- Tối ưu chi phí trên từng lượt ra số / ra tin nhắn.
- Đo lường dựa trên doanh thu thực tế, loại bỏ tương tác ảo.

📱 **Xem chi tiết gói dịch vụ trên Mini App:**
👉 ${MINI_APP_URL}?service=performance-marketing

💬 **Chat trực tiếp với Chuyên viên Performance:**
👉 ${contactUrl}`,
      { parse_mode: "markdown" }
    );
  } else if (lower.includes("hotline") || lower.includes("liên hệ") || lower.includes("sđt")) {
    const contactUrl = `https://zalo.me/0865997931?text=${encodeURIComponent("Xin chào CSKH KENG Vietnam, mình cần hỗ trợ tư vấn tổng thể các dịch vụ Marketing.")}`;
    bot.sendMessage(
      chatId,
      `☎️ **Thông tin liên hệ KENG Vietnam:**
- Hotline / Zalo: **0865 997 931** (Hỗ trợ 24/7)
- Email: agencykeng@gmail.com
- Trụ sở: TP. Hồ Chí Minh

💬 **Bấm vào đây để chat ngay với CSKH:**
👉 ${contactUrl}`,
      { parse_mode: "markdown" }
    );
  } else {
    const contactUrl = `https://zalo.me/0865997931?text=${encodeURIComponent(`Xin chào CSKH KENG, mình vừa hỏi Bot câu này: "${text}". Bạn giải đáp cụ thể giúp mình nhé!`)}`;
    // Trả lời mặc định
    bot.sendMessage(
      chatId,
      `Dạ KENG Vietnam đã nhận được tin nhắn của bạn: "${text}".

📱 **Mời bạn mở Mini App KENG Vietnam để xem trọn gói 7 dịch vụ:**
👉 ${MINI_APP_URL}

💬 **Hoặc bấm vào đây để nối máy trực tiếp với CSKH:**
👉 ${contactUrl}`,
      { parse_mode: "markdown" }
    );
  }
});
