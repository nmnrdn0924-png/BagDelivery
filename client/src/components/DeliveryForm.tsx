import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface DeliveryFormProps {
  onSubmit?: (data: DeliveryFormData) => Promise<void>;
}

export interface DeliveryFormData {
  name: string;
  phone: string;
  currentAddress: string;
  deliveryAddress: string;
}

export default function DeliveryForm({ onSubmit }: DeliveryFormProps) {
  const [formData, setFormData] = useState<DeliveryFormData>({
    name: "",
    phone: "",
    currentAddress: "",
    deliveryAddress: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof DeliveryFormData, string>>>({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof DeliveryFormData, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "이름을 입력해주세요";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "전화번호를 입력해주세요";
    } else if (!/^[0-9-]+$/.test(formData.phone)) {
      newErrors.phone = "올바른 전화번호를 입력해주세요";
    }
    if (!formData.currentAddress.trim()) {
      newErrors.currentAddress = "현재 주소를 입력해주세요";
    }
    if (!formData.deliveryAddress.trim()) {
      newErrors.deliveryAddress = "배달 주소를 입력해주세요";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        console.log("Form submitted:", formData);
      }
      
      setFormData({
        name: "",
        phone: "",
        currentAddress: "",
        deliveryAddress: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof DeliveryFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section id="delivery-form" className="py-16 md:py-20 lg:py-24 bg-background">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            가방배달 신청하기
          </h2>
          <p className="text-lg text-muted-foreground">
            간편하게 정보를 입력하고 무거운 짐에서 해방되세요
          </p>
        </div>

        <Card className="p-6 md:p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-semibold">
                  이름 <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  data-testid="input-name"
                  placeholder="홍길동"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-base font-semibold">
                  전화번호 <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  data-testid="input-phone"
                  placeholder="010-1234-5678"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentAddress" className="text-base font-semibold">
                현재 주소 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="currentAddress"
                data-testid="input-current-address"
                placeholder="서울특별시 강남구 테헤란로 123"
                value={formData.currentAddress}
                onChange={(e) => handleChange("currentAddress", e.target.value)}
                className={errors.currentAddress ? "border-destructive" : ""}
              />
              {errors.currentAddress && (
                <p className="text-sm text-destructive">{errors.currentAddress}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliveryAddress" className="text-base font-semibold">
                배달 주소 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="deliveryAddress"
                data-testid="input-delivery-address"
                placeholder="부산광역시 해운대구 해변로 456"
                value={formData.deliveryAddress}
                onChange={(e) => handleChange("deliveryAddress", e.target.value)}
                className={errors.deliveryAddress ? "border-destructive" : ""}
              />
              {errors.deliveryAddress && (
                <p className="text-sm text-destructive">{errors.deliveryAddress}</p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-accent hover:bg-accent text-accent-foreground font-semibold"
              disabled={isSubmitting}
              data-testid="button-submit-delivery"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  신청 중...
                </>
              ) : (
                "배달 신청하기"
              )}
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}
