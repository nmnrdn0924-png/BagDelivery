import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut } from "lucide-react";

// TODO: remove mock data
const mockDeliveries = [
  {
    id: 1,
    name: "김철수",
    phone: "010-1234-5678",
    currentAddress: "서울특별시 강남구 테헤란로 123",
    deliveryAddress: "부산광역시 해운대구 해변로 456",
    createdAt: "2025-01-15 14:30",
  },
  {
    id: 2,
    name: "이영희",
    phone: "010-9876-5432",
    currentAddress: "인천광역시 연수구 송도과학로 789",
    deliveryAddress: "제주특별자치도 제주시 중앙로 321",
    createdAt: "2025-01-15 16:45",
  },
];

const mockAdvertisers = [
  {
    id: 1,
    companyName: "주식회사 테크노",
    representative: "박대표",
    phone: "02-1234-5678",
    email: "contact@techno.com",
    createdAt: "2025-01-14 10:20",
  },
  {
    id: 2,
    companyName: "주식회사 마케팅플러스",
    representative: "최대표",
    phone: "02-9876-5432",
    email: "info@marketingplus.com",
    createdAt: "2025-01-15 09:15",
  },
];

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("deliveries");

  const handleLogout = () => {
    console.log("Logout triggered");
    setLocation("/admin");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">가방배달 관리자</h1>
          <Button
            variant="outline"
            onClick={handleLogout}
            data-testid="button-logout"
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            로그아웃
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="deliveries" data-testid="tab-deliveries">
              가방배달 신청
            </TabsTrigger>
            <TabsTrigger value="advertisers" data-testid="tab-advertisers">
              광고 신청
            </TabsTrigger>
          </TabsList>

          <TabsContent value="deliveries" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 text-foreground">
                가방배달 신청 내역 ({mockDeliveries.length}건)
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="py-3 px-4 font-semibold text-muted-foreground">신청일시</th>
                      <th className="py-3 px-4 font-semibold text-muted-foreground">이름</th>
                      <th className="py-3 px-4 font-semibold text-muted-foreground">전화번호</th>
                      <th className="py-3 px-4 font-semibold text-muted-foreground">현재 주소</th>
                      <th className="py-3 px-4 font-semibold text-muted-foreground">배달 주소</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockDeliveries.map((delivery) => (
                      <tr
                        key={delivery.id}
                        className="border-b border-border hover-elevate"
                        data-testid={`row-delivery-${delivery.id}`}
                      >
                        <td className="py-4 px-4 text-sm text-muted-foreground">
                          {delivery.createdAt}
                        </td>
                        <td className="py-4 px-4 font-medium text-foreground">
                          {delivery.name}
                        </td>
                        <td className="py-4 px-4 text-foreground">{delivery.phone}</td>
                        <td className="py-4 px-4 text-foreground max-w-xs truncate">
                          {delivery.currentAddress}
                        </td>
                        <td className="py-4 px-4 text-foreground max-w-xs truncate">
                          {delivery.deliveryAddress}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="advertisers" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 text-foreground">
                광고 신청 내역 ({mockAdvertisers.length}건)
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="py-3 px-4 font-semibold text-muted-foreground">신청일시</th>
                      <th className="py-3 px-4 font-semibold text-muted-foreground">기업명</th>
                      <th className="py-3 px-4 font-semibold text-muted-foreground">대표자명</th>
                      <th className="py-3 px-4 font-semibold text-muted-foreground">전화번호</th>
                      <th className="py-3 px-4 font-semibold text-muted-foreground">이메일</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockAdvertisers.map((advertiser) => (
                      <tr
                        key={advertiser.id}
                        className="border-b border-border hover-elevate"
                        data-testid={`row-advertiser-${advertiser.id}`}
                      >
                        <td className="py-4 px-4 text-sm text-muted-foreground">
                          {advertiser.createdAt}
                        </td>
                        <td className="py-4 px-4 font-medium text-foreground">
                          {advertiser.companyName}
                        </td>
                        <td className="py-4 px-4 text-foreground">
                          {advertiser.representative}
                        </td>
                        <td className="py-4 px-4 text-foreground">{advertiser.phone}</td>
                        <td className="py-4 px-4 text-foreground">{advertiser.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
