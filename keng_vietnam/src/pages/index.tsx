import React, { useState, useEffect } from "react";
import { Page, Box, Text, Icon } from "zmp-ui";
import { getRouteParams } from "zmp-sdk";
import { MARKETING_SERVICES, MarketingService, KENG_CONTACT } from "@/data/services";
import { KENG_PROJECTS, ProjectMedia } from "@/data/projects";
import { handleContactZalo, handleOpenZaloBot } from "@/utils/contact";
import { BookingSheet } from "@/components/BookingSheet";
import { ServiceDetailModal } from "@/components/ServiceDetailModal";
import { MediaView } from "@/pages/media";
import logoWhite from "@/static/icons/white.svg";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả");
  const [activeTab, setActiveTab] = useState<"home" | "media" | "booking" | "contact">("home");

  const [detailService, setDetailService] = useState<MarketingService | null>(null);
  const [bookingVisible, setBookingVisible] = useState(false);
  const [bookingService, setBookingService] = useState<MarketingService | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectMedia | null>(null);

  useEffect(() => {
    try {
      const params = (getRouteParams && getRouteParams()) || {};
      const urlParams = new URLSearchParams(window.location.search);
      const targetServiceId = params.service || urlParams.get("service");
      if (targetServiceId) {
        const found = MARKETING_SERVICES.find((s) => s.id === targetServiceId);
        if (found) {
          setDetailService(found);
        }
      }
    } catch (e) {
      console.warn("Route params check:", e);
    }
  }, []);

  const categories = ["Tất cả", "Video & Content", "Social Media", "Technology", "Paid Ads"];

  const filteredServices = MARKETING_SERVICES.filter((s) => {
    const matchCategory =
      selectedCategory === "Tất cả" || s.category === selectedCategory;
    const matchSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleOpenBooking = (service?: MarketingService) => {
    setBookingService(service || null);
    setBookingVisible(true);
  };

  const featuredProjects = KENG_PROJECTS.slice(0, 4);

  return (
    <Page className="bg-[#f5f7fa] min-h-screen pb-24 text-gray-800">
      {/* NẾU ĐANG Ở TAB MEDIA: HIỂN THỊ TRANG SHOWCASE RIÊNG BIỆT */}
      {activeTab === "media" ? (
        <MediaView />
      ) : (
        /* NẾU Ở TAB TRANG CHỦ: HIỂN THỊ ĐẦY ĐỦ DỊCH VỤ MARKETING & 1 VÀI DỰ ÁN DEMO */
        <>
          {/* 1. Header Safe Area cho iPhone 16 / Dynamic Island */}
          <Box className="bg-gradient-to-r from-keng-dark via-[#1a0f0e] to-keng-dark text-white px-4 pt-16 pb-6 rounded-b-[28px] shadow-sm">
            <Box className="flex items-center justify-between">
              <Box className="flex items-center space-x-2.5">
                <img src={logoWhite} alt="KENG Logo" className="h-7 w-auto object-contain" />
                <Box>
                  <Box className="flex items-center space-x-1.5">
                    <Text size="xSmall" className="text-gray-200 font-semibold tracking-wide">
                      KENG Vietnam
                    </Text>
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                    <span className="text-[10px] bg-red-950/80 text-red-200 px-1.5 py-0.5 rounded border border-red-700 font-semibold">
                      AGENCY
                    </span>
                  </Box>
                  <Text.Title size="medium" className="text-white font-bold tracking-tight">
                    Giải pháp Marketing Thực chiến
                  </Text.Title>
                </Box>
              </Box>
            </Box>

            {/* Slogan Keng */}
            <Box className="mt-3.5 bg-black/40 backdrop-blur-md rounded-xl p-3 border border-white/15">
              <Text size="xSmall" className="text-gray-100 font-medium leading-relaxed">
                {KENG_CONTACT.slogan}
              </Text>
            </Box>

            {/* 2. Search Bar Pill */}
            <Box className="mt-4">
              <Box className="relative flex items-center bg-white rounded-full px-4 py-1.5 shadow-md border border-gray-100">
                <Icon icon="zi-search" className="text-gray-500 mr-2" size={18} />
                <input
                  type="text"
                  placeholder="Tìm dịch vụ: Fanpage, Website, Video, Ads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-sm bg-transparent border-none text-gray-900 focus:outline-none placeholder-gray-500"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="text-gray-500 p-1">
                    <Icon icon="zi-close" size={16} />
                  </button>
                )}
                <button
                  onClick={() => {}}
                  className="bg-keng-main text-white text-xs px-3.5 py-1.5 rounded-full font-semibold ml-2 shrink-0 active:scale-95 transition-transform"
                >
                  Tìm
                </button>
              </Box>
            </Box>
          </Box>

          {/* Main Content Body */}
          <Box className="px-4 mt-4 space-y-5">
            {/* 3. Khối Quick Action 50-50 */}
            <Box className="grid grid-cols-2 gap-3">
              <Box
                onClick={() => handleOpenBooking()}
                className="bg-white p-3.5 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-3 active:scale-98 transition-all cursor-pointer"
              >
                <Box className="w-11 h-11 rounded-2xl bg-red-50 text-keng-main flex items-center justify-center shrink-0">
                  <Icon icon="zi-calendar" size={24} />
                </Box>
                <Box>
                  <Text.Title size="small" className="text-keng-dark font-bold">
                    Đặt lịch hẹn
                  </Text.Title>
                  <Text size="xxxxSmall" className="text-gray-400 mt-0.5">
                    Tư vấn trực tiếp 1:1
                  </Text>
                </Box>
              </Box>

              <Box
                onClick={() => handleContactZalo()}
                className="bg-white p-3.5 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-3 active:scale-98 transition-all cursor-pointer"
              >
                <Box className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Icon icon="zi-chat" size={24} />
                </Box>
                <Box>
                  <Text.Title size="small" className="text-keng-dark font-bold">
                    Chat Zalo CSKH
                  </Text.Title>
                  <Text size="xxxxSmall" className="text-gray-400 mt-0.5">
                    0865 997 931 (24/7)
                  </Text>
                </Box>
              </Box>
            </Box>

            {/* 4. Khối Hero Bất đối xứng (Asymmetric Featured Banner) */}
            <Box>
              <Box className="flex items-center justify-between mb-2.5">
                <Text.Title size="normal" className="text-gray-900 font-bold flex items-center">
                  <span className="w-1.5 h-4 bg-keng-main rounded-full mr-2"></span>
                  Dịch vụ nổi bật
                </Text.Title>
                <Text
                  size="xSmall"
                  className="text-keng-main font-semibold cursor-pointer"
                  onClick={() => setSelectedCategory("Tất cả")}
                >
                  Xem tất cả &gt;
                </Text>
              </Box>

              <Box className="grid grid-cols-2 gap-3">
                <Box
                  onClick={() => setDetailService(MARKETING_SERVICES[0])}
                  className="relative bg-gradient-to-br from-[#1a0808] to-[#3a0d10] text-white p-4 rounded-2xl flex flex-col justify-between shadow-sm cursor-pointer overflow-hidden min-h-[175px]"
                >
                  <span className="absolute -right-4 -bottom-4 w-24 h-24 bg-red-600/20 rounded-full blur-xl pointer-events-none"></span>
                  <Box>
                    <span className="text-[10px] uppercase font-bold tracking-wider bg-red-600 text-white px-2 py-0.5 rounded-full inline-block mb-1.5">
                      Top Trending
                    </span>
                    <Text.Title size="normal" className="text-white font-bold leading-tight">
                      Xây kênh đa nền tảng
                    </Text.Title>
                    <Text size="xxxxSmall" className="text-red-200 mt-1 line-clamp-2">
                      TikTok, Facebook, Insta, Threads...
                    </Text>
                  </Box>
                  <Box className="mt-4 flex items-center text-xs font-semibold text-red-300">
                    <span>Xem chi tiết</span>
                    <Icon icon="zi-chevron-right" size={14} />
                  </Box>
                </Box>

                <Box className="flex flex-col space-y-3">
                  <Box
                    onClick={() => setDetailService(MARKETING_SERVICES[2])}
                    className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between cursor-pointer active:scale-98 transition-all"
                  >
                    <Box>
                      <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        High Conversion
                      </span>
                      <Text size="small" className="font-bold text-gray-900 mt-1">
                        Thiết kế Websites
                      </Text>
                      <Text size="xxxxSmall" className="text-gray-400">
                        Chuẩn UI/UX chốt sale
                      </Text>
                    </Box>
                    <Box className="flex justify-end mt-1">
                      <span className="text-[11px] font-semibold text-keng-main">Chi tiết &gt;</span>
                    </Box>
                  </Box>

                  <Box
                    onClick={() => setDetailService(MARKETING_SERVICES[1])}
                    className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between cursor-pointer active:scale-98 transition-all"
                  >
                    <Box>
                      <span className="text-[9px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                        Tương tác thật
                      </span>
                      <Text size="small" className="font-bold text-gray-900 mt-1">
                        Chăm sóc Fanpage
                      </Text>
                      <Text size="xxxxSmall" className="text-gray-400">
                        Nội dung & ấn phẩm trọn gói
                      </Text>
                    </Box>
                    <Box className="flex justify-end mt-1">
                      <span className="text-[11px] font-semibold text-keng-main">Chi tiết &gt;</span>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* 5. Gói dịch vụ Marketing chi tiết (Cốt lõi của Trang Chủ) */}
            <Box className="space-y-3">
              <Box className="flex items-center justify-between">
                <Text.Title size="normal" className="text-gray-900 font-bold flex items-center">
                  <span className="w-1.5 h-4 bg-keng-main rounded-full mr-2"></span>
                  Gói dịch vụ Marketing ({filteredServices.length})
                </Text.Title>
              </Box>

              <Box className="flex space-x-2 overflow-x-auto py-1 no-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? "bg-keng-main text-white shadow-sm"
                        : "bg-white text-gray-700 border border-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </Box>

              {filteredServices.map((service) => (
                <Box
                  key={service.id}
                  className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 space-y-3 transition-all"
                >
                  <Box className="flex items-start justify-between">
                    <Box className="flex items-start space-x-3">
                      <Box className="w-11 h-11 rounded-2xl bg-keng-soft text-keng-main flex items-center justify-center shrink-0 mt-0.5 border border-keng-border">
                        <Icon icon={service.icon as any} size={22} />
                      </Box>
                      <Box>
                        <Box className="flex items-center space-x-2">
                          <Text.Title size="small" className="text-keng-dark font-bold">
                            {service.title}
                          </Text.Title>
                          {service.badge && (
                            <span className="text-[9px] bg-red-100 text-keng-main px-2 py-0.5 rounded-full font-bold">
                              {service.badge}
                            </span>
                          )}
                        </Box>
                        <Text size="xSmall" className="text-keng-main font-semibold mt-0.5">
                          {service.tagline}
                        </Text>
                      </Box>
                    </Box>
                  </Box>

                  <Text size="xSmall" className="text-gray-600 leading-relaxed font-normal">
                    {service.description}
                  </Text>

                  <Box className="pt-2 border-t border-gray-100 flex items-center space-x-2">
                    <button
                      onClick={() => handleContactZalo(service.title)}
                      className="flex-1 py-2.5 px-3 bg-keng-main hover:bg-keng-hover text-white rounded-full text-xs font-semibold flex items-center justify-center space-x-1.5 shadow-sm active:scale-95 transition-all"
                    >
                      <Icon icon="zi-chat" size={14} />
                      <span>Liên hệ ngay</span>
                    </button>

                    <button
                      onClick={() => handleOpenBooking(service)}
                      className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-xs font-semibold flex items-center justify-center active:scale-95 transition-all"
                    >
                      Đặt lịch
                    </button>

                    <button
                      onClick={() => setDetailService(service)}
                      className="w-9 h-9 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-keng-main active:scale-95 transition-all shrink-0"
                    >
                      <Icon icon="zi-more-horiz" size={16} />
                    </button>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* 6. Vài Media Demo nổi bật ở cuối Trang Chủ (Dẫn dắt sang Tab Media) */}
            <Box className="space-y-3 pt-2">
              <Box className="flex items-center justify-between">
                <Text.Title size="normal" className="text-gray-900 font-bold flex items-center">
                  <span className="w-1.5 h-4 bg-keng-main rounded-full mr-2"></span>
                  Dự án thực tế tiêu biểu
                </Text.Title>
                <span
                  onClick={() => {
                    setActiveTab("media");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="text-xs font-bold text-keng-main cursor-pointer"
                >
                  Xem tất cả ({KENG_PROJECTS.length}) &gt;
                </span>
              </Box>

              <Box className="grid grid-cols-2 gap-3">
                {featuredProjects.map((project) => (
                  <Box
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col cursor-pointer active:scale-98 transition-all"
                  >
                    <Box className="relative w-full aspect-[4/3] bg-gray-900 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      <span className="absolute top-2 left-2 text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                        {project.category}
                      </span>
                      {project.stats && (
                        <span className="absolute bottom-2 right-2 text-[10px] font-bold text-yellow-300 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-full border border-yellow-500/30">
                          ★ {project.stats}
                        </span>
                      )}
                    </Box>

                    <Box className="p-3 bg-white flex flex-col justify-between flex-1">
                      <Text size="small" className="font-bold text-gray-900 line-clamp-1 leading-snug">
                        {project.title}
                      </Text>
                      <Text size="xxxxSmall" className="text-gray-500 font-medium mt-0.5">
                        {project.client}
                      </Text>
                      <span className="text-[11px] font-semibold text-keng-main mt-1.5 block">
                        Xem chi tiết &gt;
                      </span>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Footer */}
            <Box className="bg-gradient-to-r from-gray-900 to-black text-white p-4 rounded-2xl text-center space-y-2">
              <Text.Title size="small" className="text-white font-bold">
                KENG Vietnam - Agency Marketing
              </Text.Title>
              <Text size="xSmall" className="text-gray-300">
                Hotline / Zalo: {KENG_CONTACT.hotlineDisplay}
              </Text>
              <Text size="xxxxSmall" className="text-gray-400">
                © {new Date().getFullYear()} Keng Vietnam. All rights reserved.
              </Text>
            </Box>
          </Box>
        </>
      )}

      {/* 8. Bottom Navigation chuẩn phong cách ZaUI Doctor */}
      <Box className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 px-6 py-2 flex items-center justify-between z-40 max-w-[480px] mx-auto shadow-lg">
        {/* Tab 1: Trang chủ */}
        <button
          onClick={() => {
            setActiveTab("home");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`flex flex-col items-center space-y-0.5 ${
            activeTab === "home" ? "text-keng-main font-bold" : "text-gray-400 font-medium"
          }`}
        >
          <Icon icon="zi-home" size={20} />
          <span className="text-[10px]">Trang chủ</span>
        </button>

        {/* Tab 2: Media Showcase riêng */}
        <button
          onClick={() => {
            setActiveTab("media");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className={`flex flex-col items-center space-y-0.5 ${
            activeTab === "media" ? "text-keng-main font-bold" : "text-gray-400 font-medium"
          }`}
        >
          <Icon icon="zi-photo" size={20} />
          <span className="text-[10px]">Media</span>
        </button>

        {/* Nút FAB Nổi ở giữa (Floating Action Button) - Đặt lịch nhanh */}
        <Box className="relative -top-5">
          <button
            onClick={() => handleOpenBooking()}
            className="w-12 h-12 rounded-full bg-keng-main text-white shadow-xl shadow-red-300 flex items-center justify-center p-3 active:scale-95 transition-transform border-4 border-white"
          >
            <Icon icon="zi-plus" size={22} />
          </button>
        </Box>

        {/* Tab 3: Đặt lịch */}
        <button
          onClick={() => handleOpenBooking()}
          className={`flex flex-col items-center space-y-0.5 ${
            activeTab === "booking" ? "text-keng-main font-bold" : "text-gray-400 font-medium"
          }`}
        >
          <Icon icon="zi-calendar" size={20} />
          <span className="text-[10px]">Đặt lịch</span>
        </button>

        {/* Tab 4: Liên hệ */}
        <button
          onClick={() => handleContactZalo()}
          className={`flex flex-col items-center space-y-0.5 ${
            activeTab === "contact" ? "text-keng-main font-bold" : "text-gray-400 font-medium"
          }`}
        >
          <Icon icon="zi-chat" size={20} />
          <span className="text-[10px]">Liên hệ</span>
        </button>
      </Box>

      {/* Modal phóng to Media */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl space-y-4"
          >
            <div className="relative aspect-video w-full bg-black">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center"
              >
                <Icon icon="zi-close" size={16} />
              </button>
            </div>

            <div className="p-5 pt-0 space-y-3">
              <div>
                <span className="text-[10px] font-bold text-keng-main uppercase bg-red-50 px-2 py-0.5 rounded-full">
                  {selectedProject.category}
                </span>
                <h3 className="text-base font-bold text-gray-900 mt-1">
                  {selectedProject.title}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Khách hàng: <span className="font-semibold text-gray-800">{selectedProject.client}</span> • Hiệu quả: <span className="text-green-600 font-bold">{selectedProject.stats}</span>
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    handleContactZalo(selectedProject.title);
                    setSelectedProject(null);
                  }}
                  className="w-full py-3 bg-keng-main hover:bg-keng-hover text-white font-semibold rounded-full flex items-center justify-center space-x-2 text-sm shadow-md active:scale-95 transition-all"
                >
                  <Icon icon="zi-chat" size={18} />
                  <span>Tư vấn dự án tương tự qua Zalo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sheets & Modals */}
      <BookingSheet
        visible={bookingVisible}
        onClose={() => setBookingVisible(false)}
        selectedService={bookingService}
      />

      <ServiceDetailModal
        service={detailService}
        visible={!!detailService}
        onClose={() => setDetailService(null)}
        onOpenBooking={(s) => handleOpenBooking(s)}
      />
    </Page>
  );
}
