import React, { useState, useEffect } from "react";
import { Sheet, Box, Text, Button, Input, Select, Icon } from "zmp-ui";
import { getUserInfo } from "zmp-sdk";
import { MARKETING_SERVICES, MarketingService } from "@/data/services";
import { handleContactZalo } from "@/utils/contact";

interface BookingSheetProps {
  visible: boolean;
  onClose: () => void;
  selectedService?: MarketingService | null;
}

export const BookingSheet: React.FC<BookingSheetProps> = ({
  visible,
  onClose,
  selectedService,
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    selectedService?.id || MARKETING_SERVICES[0].id
  );
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [avatar, setAvatar] = useState("");

  // Tự động nhận diện User đang truy cập Zalo Mini App và tự fill Tên
  useEffect(() => {
    if (visible) {
      // 1. Thử đọc cache đã lưu trước đó (nếu có)
      try {
        const cachedUser = localStorage.getItem("zalo_cached_user");
        if (cachedUser) {
          const parsed = JSON.parse(cachedUser);
          if (parsed.name && !name) setName(parsed.name);
          if (parsed.avatar && !avatar) setAvatar(parsed.avatar);
        }
      } catch (e) {}

      // 2. Gọi API Zalo SDK
      try {
        getUserInfo({
          avatarType: "normal",
          autoRequestPermission: true,
          success: (res) => {
            console.log("getUserInfo response:", res);
            if (res?.userInfo?.name) {
              setName(res.userInfo.name);
            }
            if (res?.userInfo?.avatar) {
              setAvatar(res.userInfo.avatar);
            }
            try {
              localStorage.setItem("zalo_cached_user", JSON.stringify(res.userInfo));
            } catch (e) {}
          },
          fail: (err) => {
            console.warn("getUserInfo failed:", err);
          },
        });
      } catch (err) {
        console.warn("getUserInfo error:", err);
      }
    }
  }, [visible]);

  const currentService =
    MARKETING_SERVICES.find((s) => s.id === selectedServiceId) ||
    selectedService ||
    MARKETING_SERVICES[0];

  const handleSubmit = () => {
    let summaryNote = "";
    if (name) summaryNote += `Tên: ${name}. `;
    if (phone) summaryNote += `SĐT: ${phone}. `;
    if (note) summaryNote += `Yêu cầu: ${note}`;

    handleContactZalo(currentService.title, summaryNote.trim());
    onClose();
  };

  return (
    <Sheet
      visible={visible}
      onClose={onClose}
      mask
      handler
      swipeToClose
      title="Đặt lịch tư vấn Marketing"
    >
      <Box p={4} className="space-y-4 max-h-[75vh] overflow-y-auto pb-8">
        <Box className="bg-keng-soft p-3 rounded-xl border border-keng-border">
          <Text className="text-xs font-semibold text-keng-main uppercase tracking-wider">
            Dịch vụ được chọn
          </Text>
          <Text.Title size="normal" className="text-keng-dark font-bold mt-0.5">
            {currentService.title}
          </Text.Title>
          <Text size="xSmall" className="text-gray-500 mt-0.5">
            {currentService.tagline}
          </Text>
        </Box>

        <Box>
          <Text size="xSmall" className="font-medium text-gray-700 mb-1">
            Chọn gói dịch vụ quan tâm
          </Text>
          <select
            value={selectedServiceId}
            onChange={(e) => setSelectedServiceId(e.target.value)}
            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-keng-main"
          >
            {MARKETING_SERVICES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </Box>

        <Box>
          <Box className="flex items-center justify-between mb-1">
            <Text size="xSmall" className="font-medium text-gray-700">
              Họ và tên của bạn / Doanh nghiệp
            </Text>
            {name && (
              <span className="text-[10px] text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-semibold">
                ✓ Đã tự điền từ Zalo
              </span>
            )}
          </Box>
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1.5 focus-within:border-keng-main">
            {avatar && (
              <img
                src={avatar}
                alt="Avatar"
                className="w-7 h-7 rounded-full object-cover mr-2 border border-gray-200 shrink-0"
              />
            )}
            <input
              type="text"
              placeholder="VD: Anh Hoàng - Cửa hàng Thời trang"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border-none text-sm focus:outline-none text-gray-900"
            />
          </div>
        </Box>

        <Box>
          <Text size="xSmall" className="font-medium text-gray-700 mb-1">
            Số điện thoại nhận tư vấn (Zalo)
          </Text>
          <input
            type="tel"
            placeholder="VD: 0865 997 931"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-keng-main"
          />
        </Box>

        <Box>
          <Text size="xSmall" className="font-medium text-gray-700 mb-1">
            Mục tiêu hoặc bài toán cần giải quyết
          </Text>
          <textarea
            rows={3}
            placeholder="Mô tả ngắn gọn ngân sách dự kiến, mục tiêu tăng trưởng, hiện trạng kênh..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-keng-main"
          />
        </Box>

        <Box pt={2}>
          <button
            onClick={handleSubmit}
            className="w-full py-3.5 bg-keng-main hover:bg-keng-hover text-white font-semibold rounded-full shadow-lg shadow-red-200 flex items-center justify-center space-x-2 transition-all active:scale-[0.98]"
          >
            <span>Gửi yêu cầu qua Zalo ngay</span>
            <Icon icon="zi-chevron-right" />
          </button>
          <Text size="xxxSmall" className="text-center text-gray-400 mt-2">
            Đội ngũ KENG Vietnam sẽ phản hồi trong vòng 15-30 phút
          </Text>
        </Box>
      </Box>
    </Sheet>
  );
};
