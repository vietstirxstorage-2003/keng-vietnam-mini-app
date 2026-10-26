import fb01 from "@/static/projects/flashback_01.png";
import fb02 from "@/static/projects/flashback_02.png";
import fb03 from "@/static/projects/flashback_03.png";
import fb04 from "@/static/projects/flashback_04.png";
import fb05 from "@/static/projects/flashback_05.png";
import fb06 from "@/static/projects/flashback_06.png";
import fb08 from "@/static/projects/flashback_08.png";
import fb09 from "@/static/projects/flashback_09.png";
import fb10 from "@/static/projects/flashback_10.png";
import fb12 from "@/static/projects/flashback_12.png";
import fb14 from "@/static/projects/flashback_14.png";
import fb15 from "@/static/projects/flashback_15.png";

export interface ProjectMedia {
  id: string;
  title: string;
  category: string;
  image: string;
  stats?: string;
  client?: string;
}

export const KENG_PROJECTS: ProjectMedia[] = [
  {
    id: "proj-1",
    title: "Chiến dịch Branding Key Visual",
    category: "Branding",
    image: fb01,
    stats: "2.5M Reach",
    client: "F&B Brand",
  },
  {
    id: "proj-2",
    title: "Xây kênh TikTok Viral Triệu View",
    category: "Video Viral",
    image: fb02,
    stats: "4.8M Views",
    client: "Thời trang",
  },
  {
    id: "proj-3",
    title: "Chăm sóc Fanpage & Social Media",
    category: "Social Media",
    image: fb03,
    stats: "+320% Inbox",
    client: "Bán lẻ",
  },
  {
    id: "proj-4",
    title: "Thiết kế Website High Conversion",
    category: "Web & UI/UX",
    image: fb04,
    stats: "Tải trang 0.8s",
    client: "Công nghệ",
  },
  {
    id: "proj-5",
    title: "Sự kiện Ra mắt Sản phẩm Mới",
    category: "Event & Recap",
    image: fb05,
    stats: "Full HD Recap",
    client: "Doanh nghiệp",
  },
  {
    id: "proj-6",
    title: "Performance Marketing Tối ưu ROI",
    category: "Performance Ads",
    image: fb06,
    stats: "ROI 4.2x",
    client: "E-Commerce",
  },
  {
    id: "proj-8",
    title: "Bộ nhận diện Ấn phẩm Truyền thông",
    category: "Ấn phẩm",
    image: fb08,
    stats: "Đồng bộ đa kênh",
    client: "Dịch vụ",
  },
  {
    id: "proj-9",
    title: "Shorts & Reels Video Series",
    category: "Video ngắn",
    image: fb09,
    stats: "Top Trending",
    client: "Nhà hàng",
  },
  {
    id: "proj-10",
    title: "Tư vấn Chiến lược Marketing 1:1",
    category: "Tư vấn",
    image: fb10,
    stats: "Tăng trưởng x2",
    client: "SME",
  },
  {
    id: "proj-12",
    title: "Kịch bản Phim giới thiệu Doanh nghiệp",
    category: "Corporate Video",
    image: fb12,
    stats: "4K Cinema",
    client: "Sản xuất",
  },
  {
    id: "proj-14",
    title: "Chiến dịch Chốt sale Đa kênh",
    category: "Direct Sales",
    image: fb14,
    stats: "+180% Doanh số",
    client: "Giáo dục",
  },
  {
    id: "proj-15",
    title: "Quảng cáo Chuyển đổi Facebook & TikTok",
    category: "Paid Ads",
    image: fb15,
    stats: "CPA giảm 45%",
    client: "Mỹ phẩm",
  },
];
