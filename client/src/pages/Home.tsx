import { useRef } from "react";
import Hero from "@/components/Hero";
import DeliveryForm, { type DeliveryFormData } from "@/components/DeliveryForm";
import Benefits from "@/components/Benefits";
import AdvertiserSection, { type AdvertiserFormData } from "@/components/AdvertiserSection";
import Footer from "@/components/Footer";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const formRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleDeliverySubmit = async (data: DeliveryFormData) => {
    try {
      const response = await apiRequest("POST", "/api/delivery-request", data);
      const result = await response.json();

      if (result.success) {
        toast({
          title: "신청 완료",
          description: "가방배달 신청이 성공적으로 접수되었습니다.",
        });
      }
    } catch (error) {
      toast({
        title: "신청 실패",
        description: "신청 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const handleAdvertiserSubmit = async (data: AdvertiserFormData) => {
    try {
      const response = await apiRequest("POST", "/api/advertiser-request", data);
      const result = await response.json();

      if (result.success) {
        toast({
          title: "신청 완료",
          description: "광고주 신청이 성공적으로 접수되었습니다.",
        });
      }
    } catch (error) {
      toast({
        title: "신청 실패",
        description: "신청 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <div className="min-h-screen">
      <Hero onScrollToForm={scrollToForm} />
      <Benefits />
      <div ref={formRef}>
        <DeliveryForm onSubmit={handleDeliverySubmit} />
      </div>
      <AdvertiserSection onSubmit={handleAdvertiserSubmit} />
      <Footer />
    </div>
  );
}
