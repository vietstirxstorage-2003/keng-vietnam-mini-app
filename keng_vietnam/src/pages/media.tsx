import React, { useState } from "react";
import { Page, Box, Text, Icon } from "zmp-ui";
import { KENG_PROJECTS, ProjectMedia } from "@/data/projects";
import { handleContactZalo } from "@/utils/contact";
import logoWhite from "@/static/icons/white.svg";

export const MediaView: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("Tất cả");
  const [selectedProject, setSelectedProject] = useState<ProjectMedia | null>(null);

  const filterTags = ["Tất cả", "Branding", "Video Viral", "Social Media", "Web & UI/UX", "Event & Recap", "Paid Ads"];

  const filtered = KENG_PROJECTS.filter(
    (p) => selectedFilter === "Tất cả" || p.category.includes(selectedFilter)
  );

  return (
    <Box className="space-y-4">
      {/* Header trang Media */}
      <Box className="bg-gradient-to-r from-keng-dark via-[#1a0f0e] to-keng-dark text-white px-4 pt-14 pb-5 rounded-b-[28px] shadow-sm">
        <Box className="flex items-center space-x-2.5">
          <img src={logoWhite} alt="KENG Logo" className="h-7 w-auto object-contain" />
          <Box>
            <Text size="xSmall" className="text-gray-300 font-semibold uppercase tracking-wider">
              Showcase Dự án
            </Text>
            <Text.Title size="medium" className="text-white font-bold">
              Media & Chiến dịch Thực chiến
            </Text.Title>
          </Box>
        </Box>
        <Text size="xSmall" className="text-gray-200 mt-2">
          Tổng hợp các dự án hình ảnh, video viral và chiến dịch số do KENG Vietnam trực tiếp sản xuất.
        </Text>
      </Box>

      {/* Filter Chips cuộn ngang */}
      <Box className="px-4">
        <Box className="flex space-x-2 overflow-x-auto py-1 no-scrollbar">
          {filterTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedFilter(tag)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedFilter === tag
                  ? "bg-keng-main text-white shadow-sm"
                  : "bg-white text-gray-700 border border-gray-200"
              }`}
            >
              {tag}
            </button>
          ))}
        </Box>
      </Box>

      {/* Danh sách Media Grid 2 Cột chuẩn */}
      <Box className="px-4 space-y-3">
        <Box className="flex items-center justify-between">
          <Text.Title size="normal" className="text-gray-900 font-bold flex items-center">
            <span className="w-1.5 h-4 bg-keng-main rounded-full mr-2"></span>
            Tất cả dự án ({filtered.length})
          </Text.Title>
        </Box>

        <Box className="grid grid-cols-2 gap-3">
          {filtered.map((project) => (
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

              <Box className="p-3 flex flex-col justify-between flex-1 bg-white">
                <Box>
                  <Text size="small" className="font-bold text-gray-900 line-clamp-1 leading-snug">
                    {project.title}
                  </Text>
                  <Text size="xxxxSmall" className="text-gray-500 font-medium mt-0.5">
                    Khách hàng: <span className="text-gray-800 font-semibold">{project.client}</span>
                  </Text>
                </Box>
                <Box className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-keng-main">Xem demo &gt;</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleContactZalo(project.title);
                    }}
                    className="w-7 h-7 rounded-full bg-red-50 text-keng-main flex items-center justify-center hover:bg-keng-main hover:text-white transition-colors"
                  >
                    <Icon icon="zi-chat" size={14} />
                  </button>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Modal Phóng to Media */}
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
    </Box>
  );
};
