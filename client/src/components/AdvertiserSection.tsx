import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface AdvertiserFormProps {
  onSubmit?: (data: AdvertiserFormData) => Promise<void>;
}

export interface AdvertiserFormData {
  companyName: string;
  representative: string;
  phone: string;
  email: string;
}

export default function AdvertiserSection({ onSubmit }: AdvertiserFormProps) {
  const [formData, setFormData] = useState<AdvertiserFormData>({
    companyName: "",
    representative: "",
    phone: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof AdvertiserFormData, string>>>({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof AdvertiserFormData, string>> = {};
    
    if (!formData.companyName.trim()) {
      newErrors.companyName = "기업명을 입력해주세요";
    }
    if (!formData.representative.trim()) {
      newErrors.representative = "대표자명을 입력해주세요";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "전화번호를 입력해주세요";
    }
    if (!formData.email.trim()) {
      newErrors.email = "이메일을 입력해주세요";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "올바른 이메일을 입력해주세요";
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
        console.log("Advertiser form submitted:", formData);
      }
      
      setFormData({
        companyName: "",
        representative: "",
        phone: "",
        email: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof AdvertiserFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              광고주를 모집합니다
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              가방배달 서비스와 함께 성장하실 광고주를 찾습니다. 
              우리 플랫폼을 통해 젊은 고객층에게 브랜드를 효과적으로 알리세요.
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">✓</span>
                <span>월 평균 5,000+ 이용자 확보</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">✓</span>
                <span>20-30대 청춘 타겟층 집중</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">✓</span>
                <span>맞춤형 광고 솔루션 제공</span>
              </li>
            </ul>
          </div>

          <Card className="p-6 md:p-8 shadow-xl bg-card">
            <h3 className="text-2xl font-bold text-foreground mb-6">광고 신청하기</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-base font-semibold">
                  기업명 <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="companyName"
                  data-testid="input-company-name"
                  placeholder="주식회사 홍길동"
                  value={formData.companyName}
                  onChange={(e) => handleChange("companyName", e.target.value)}
                  className={errors.companyName ? "border-destructive" : ""}
                />
                {errors.companyName && (
                  <p className="text-sm text-destructive">{errors.companyName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="representative" className="text-base font-semibold">
                  대표자명 <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="representative"
                  data-testid="input-representative"
                  placeholder="홍길동"
                  value={formData.representative}
                  onChange={(e) => handleChange("representative", e.target.value)}
                  className={errors.representative ? "border-destructive" : ""}
                />
                {errors.representative && (
                  <p className="text-sm text-destructive">{errors.representative}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="advertiserPhone" className="text-base font-semibold">
                  전화번호 <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="advertiserPhone"
                  data-testid="input-advertiser-phone"
                  placeholder="02-1234-5678"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-semibold">
                  이메일 <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  data-testid="input-email"
                  type="email"
                  placeholder="contact@company.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-primary text-primary-foreground font-semibold"
                disabled={isSubmitting}
                data-testid="button-submit-advertiser"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    제출 중...
                  </>
                ) : (
                  "광고 신청하기"
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}
