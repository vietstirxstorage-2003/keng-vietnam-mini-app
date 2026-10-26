import { openWebview, openChat, openPhone, showToast } from "zmp-sdk";
import { KENG_CONTACT } from "@/data/services";

export function handleContactZalo(serviceName?: string, note?: string) {
  let message = "";
  if (serviceName) {
    message = `Xin chào KENG Vietnam, tôi cần tư vấn dịch vụ: ${serviceName}.`;
    if (note) {
      message += ` (Ghi chú: ${note})`;
    }
  } else {
    message = "Xin chào KENG Vietnam, tôi muốn được tư vấn các giải pháp Marketing.";
  }

  // 1. Copy nội dung tư vấn vào Clipboard để khách có thể Paste ngay nếu cần
  try {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(message);
    }
  } catch (e) {
    console.warn("Clipboard copy failed:", e);
  }

  // 2. Mở thẳng trang Zalo cá nhân / chat của số 0865 997 931
  // Dùng link chuẩn https://zalo.me/0865997931
  const profileUrl = `https://zalo.me/${KENG_CONTACT.hotline}`;

  try {
    // Thông báo nhanh cho khách biết
    if (showToast) {
      showToast({
        message: "Đang kết nối tới Zalo CSKH (0865 997 931)...",
      });
    }
  } catch (e) {}

  try {
    openWebview({
      url: profileUrl,
      success: () => {},
      fail: () => {
        window.location.href = profileUrl;
      },
    });
  } catch (e) {
    window.location.href = profileUrl;
  }
}

// Gọi điện thoại trực tiếp đến Hotline 0865 997 931
export function handleCallHotline() {
  try {
    if (openPhone) {
      openPhone({
        phoneNumber: KENG_CONTACT.hotline,
      });
      return;
    }
  } catch (e) {
    window.location.href = `tel:${KENG_CONTACT.hotline}`;
  }
}

export function handleOpenZaloBot(contextService?: string) {
  handleContactZalo(contextService || "Tư vấn tổng thể KENG Vietnam");
}
