export interface MarketingService {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  tag: string;
  badge?: string;
  icon: string;
  features: string[];
}

export const MARKETING_SERVICES: MarketingService[] = [
  {
    id: "xay-kenh",
    title: "Xây kênh đa nền tảng",
    tagline: "TikTok, Facebook, Instagram, Threads...",
    description:
      "Lên kịch bản sắc bén và quay dựng video chất lượng cao. Xây dựng hệ thống nội dung đa nền tảng, tiếp cận đúng khách hàng để thúc đẩy chuyển đổi.",
    category: "Video & Content",
    tag: "Viral & Branding",
    badge: "Hot",
    icon: "zi-video",
    features: [
      "Lên kịch bản ngắn bám sát xu hướng",
      "Quay dựng trọn gói full thiết bị",
      "Đăng tải & tối ưu thuật toán đa kênh",
      "Báo cáo tăng trưởng định kỳ",
    ],
  },
  {
    id: "cham-soc-fanpage",
    title: "Chăm sóc Fanpage",
    tagline: "Định hướng nội dung & thiết kế toàn diện",
    description:
      "Trọn gói lên định hướng nội dung, viết bài và thiết kế ấn phẩm. Chăm sóc fanpage toàn diện, duy trì lượng tương tác thật để tạo phễu bán hàng.",
    category: "Social Media",
    tag: "Tương tác thật",
    badge: "Phổ biến",
    icon: "zi-chat",
    features: [
      "Kế hoạch nội dung tuần/tháng",
      "Thiết kế banner, carousel chuyên nghiệp",
      "Seeding & chăm sóc tương tác khách hàng",
      "Tối ưu tỷ lệ inbox chốt đơn",
    ],
  },
  {
    id: "thiet-ke-website",
    title: "Thiết kế Websites",
    tagline: "Chuẩn UI/UX, tối ưu tốc độ & chốt sale",
    description:
      "Thiết kế chuẩn UI/UX, tối ưu tốc độ tải trang và hành trình khách hàng. Xây dựng website chuyên nghiệp, tập trung thúc đẩy tỷ lệ chốt sale.",
    category: "Technology",
    tag: "High Conversion",
    badge: "Pro",
    icon: "zi-poll",
    features: [
      "Giao diện độc bản, chuẩn nhận diện",
      "Tối ưu mobile-first & tốc độ tải trang",
      "Tích hợp đo lường GA4, Pixel, CAPI",
      "Bàn giao trọn gói dễ sử dụng",
    ],
  },
  {
    id: "quay-dung-su-kien",
    title: "Quay dựng sự kiện",
    tagline: "Quay phim, chụp ảnh & clip recap bài bản",
    description:
      "Bao trọn gói quay phim, chụp ảnh sự kiện. Trực tiếp xử lý hậu kỳ, dựng clip recap bài bản, bám sát thông điệp truyền thông của doanh nghiệp.",
    category: "Media Production",
    tag: "Sự kiện & Recap",
    icon: "zi-photo",
    features: [
      "Ekip quay chụp sự kiện chuyên nghiệp",
      "Chụp ảnh highlight trả nhanh trong ngày",
      "Video recap 1-3 phút bắt trọn cảm xúc",
      "Định dạng chuẩn reels / video ngang",
    ],
  },
  {
    id: "an-pham-truyen-thong",
    title: "Sản xuất ấn phẩm truyền thông",
    tagline: "Bộ nhận diện, banner & key visual đồng bộ",
    description:
      "Cung cấp giải pháp thiết kế hình ảnh, banner, bộ nhận diện chuyên nghiệp. Đảm bảo tính thẩm mỹ cao và đồng bộ với chiến lược marketing tổng thể.",
    category: "Branding Design",
    tag: "Brand Identity",
    icon: "zi-palette",
    features: [
      "Bộ nhận diện thương hiệu chuẩn chỉnh",
      "Thiết kế Key Visual theo chiến dịch",
      "Ấn phẩm in ấn (Catalogue, Brochure, Standee)",
      "Template mạng xã hội đồng bộ",
    ],
  },
  {
    id: "performance-marketing",
    title: "Performance Marketing",
    tagline: "Tối ưu chuyển đổi, đo lường doanh thu thực",
    description:
      "Triển khai quảng cáo tối ưu chuyển đổi. Đo lường hiệu quả dựa trên doanh thu thực tế, loại bỏ tương tác ảo, giúp doanh nghiệp tối đa hóa lợi nhuận.",
    category: "Paid Ads",
    tag: "ROI Focused",
    badge: "ROI Cao",
    icon: "zi-share-external-1",
    features: [
      "Chạy ads Facebook, TikTok, Google",
      "Setup phễu remarketing chuẩn tệp",
      "A/B testing hình ảnh và nội dung",
      "Báo cáo chi phí trên mỗi lượt chuyển đổi",
    ],
  },
  {
    id: "tu-van-marketing",
    title: "Tư vấn Marketing",
    tagline: "Chẩn đoán vấn đề & lộ trình tăng trưởng",
    description:
      "Phân tích dữ liệu thực tiễn, chẩn đoán chính xác vấn đề của doanh nghiệp. Cung cấp lộ trình chiến lược minh bạch, bám sát mục tiêu tăng trưởng.",
    category: "Strategic Consulting",
    tag: "1-on-1 Growth",
    icon: "zi-user-settings",
    features: [
      "Audit toàn diện kênh hiện tại",
      "Định vị thương hiệu & phân khúc khách hàng",
      "Lập ngân sách & dự báo KPI thực tế",
      "Đồng hành tối ưu định kỳ 1:1",
    ],
  },
];

export const KENG_CONTACT = {
  hotline: "0865997931",
  hotlineDisplay: "0865 997 931",
  zaloChatUrl: "https://zalo.me/0865997931",
  // Bot Vietstrix Username chính thức trên Zalo: bot.ygCpBVEd
  zaloBotUsername: "bot.ygCpBVEd",
  zaloBotChatUrl: "https://zalo.me/bot.ygCpBVEd",
  slogan: "Không vẽ vời. Không mập mờ. Kết quả thực dụng nhất cho doanh nghiệp.",
};
