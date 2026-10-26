import React from "react";
import { Modal, Box, Text, Icon } from "zmp-ui";
import { MarketingService } from "@/data/services";
import { handleContactZalo } from "@/utils/contact";

interface ServiceDetailModalProps {
  service: MarketingService | null;
  visible: boolean;
  onClose: () => void;
  onOpenBooking: (service: MarketingService) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  visible,
  onClose,
  onOpenBooking,
}) => {
  if (!service) return null;

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      mask
      maskClosable
    >
      <Box className="bg-white rounded-3xl p-5 space-y-4 max-h-[75vh] overflow-y-auto text-gray-900 relative">
        {/* Nút đóng modal rõ ràng */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center active:scale-95 transition-all"
        >
          <Icon icon="zi-close" size={16} />
        </button>

        {/* Tiêu đề & Tagline */}
        <Box className="pr-8">
          <span className="text-[10px] font-bold text-keng-main uppercase bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200">
            {service.category}
          </span>
          <h3 className="text-xl font-bold text-gray-900 mt-1.5 leading-snug">
            {service.title}
          </h3>
          <p className="text-xs text-keng-main font-semibold mt-0.5">
            {service.tagline}
          </p>
        </Box>

        {/* Mô tả giải pháp */}
        <Box className="bg-[#faf2f1] p-3.5 rounded-2xl border border-[#ffdde0]">
          <p className="text-sm text-gray-800 leading-relaxed font-normal">
            {service.description}
          </p>
        </Box>

        {/* Danh sách hạng mục chi tiết - ĐẢM BẢO TƯƠNG PHẢN ĐEN TRẮNG CỰC KỲ DỄ ĐỌC */}
        <Box>
          <h4 className="text-sm font-bold text-gray-900 mb-2.5">
            Hạng mục triển khai chi tiết:
          </h4>
          <Box className="space-y-2">
            {service.features.map((feat, index) => (
              <Box key={index} className="flex items-start space-x-2.5">
                <Box className="w-5 h-5 rounded-full bg-red-100 text-keng-main flex items-center justify-center shrink-0 mt-0.5">
                  <Icon icon="zi-check" size={14} />
                </Box>
                <span className="text-xs text-gray-900 font-medium leading-relaxed">
                  {feat}
                </span>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Nút bấm hành động */}
        <Box className="pt-2 flex flex-col space-y-2">
          <button
            onClick={() => {
              onClose();
              handleContactZalo(service.title);
            }}
            className="w-full py-3.5 bg-keng-main hover:bg-keng-hover text-white font-semibold rounded-full shadow-md flex items-center justify-center space-x-2 transition-all active:scale-[0.98] text-sm"
          >
            <Icon icon="zi-chat" size={18} />
            <span>Liên hệ Zalo ngay (0865 997 931)</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenBooking(service);
            }}
            className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-full text-xs transition-all active:scale-95"
          >
            Điền form đặt lịch hẹn
          </button>
        </Box>
      </Box>
    </Modal>
  );
};
