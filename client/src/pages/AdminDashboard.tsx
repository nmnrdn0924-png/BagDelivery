import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { DeliveryRequest, AdvertiserRequest } from "@shared/schema";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("deliveries");

  const { data: authCheck, isLoading: authLoading } = useQuery<{ authenticated: boolean; user?: { id: string; username: string } }>({
    queryKey: ["/api/admin/check"],
  });

  const { data: deliveriesData, isLoading: deliveriesLoading } = useQuery<{ success: boolean; data: DeliveryRequest[] }>({
    queryKey: ["/api/admin/delivery-requests"],
    enabled: !!authCheck?.authenticated,
  });

  const { data: advertisersData, isLoading: advertisersLoading } = useQuery<{ success: boolean; data: AdvertiserRequest[] }>({
    queryKey: ["/api/admin/advertiser-requests"],
    enabled: !!authCheck?.authenticated,
  });

  useEffect(() => {
    if (!authLoading && !authCheck?.authenticated) {
      setLocation("/admin");
    }
  }, [authCheck, authLoading, setLocation]);

  const handleLogout = async () => {
    try {
      await apiRequest("POST", "/api/admin/logout", {});
      setLocation("/admin");
    } catch (error) {
      console.error("Logout error:", error);
      setLocation("/admin");
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!authCheck?.authenticated) {
    return null;
  }

  const deliveries = deliveriesData?.data || [];
  const advertisers = advertisersData?.data || [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
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
                가방배달 신청 내역 ({deliveries.length}건)
              </h2>
              {deliveriesLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : deliveries.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  신청 내역이 없습니다.
                </div>
              ) : (
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
                      {deliveries.map((delivery) => (
                        <tr
                          key={delivery.id}
                          className="border-b border-border hover-elevate"
                          data-testid={`row-delivery-${delivery.id}`}
                        >
                          <td className="py-4 px-4 text-sm text-muted-foreground">
                            {formatDate(delivery.createdAt as any)}
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
              )}
            </Card>
          </TabsContent>

          <TabsContent value="advertisers" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 text-foreground">
                광고 신청 내역 ({advertisers.length}건)
              </h2>
              {advertisersLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : advertisers.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  신청 내역이 없습니다.
                </div>
              ) : (
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
                      {advertisers.map((advertiser) => (
                        <tr
                          key={advertiser.id}
                          className="border-b border-border hover-elevate"
                          data-testid={`row-advertiser-${advertiser.id}`}
                        >
                          <td className="py-4 px-4 text-sm text-muted-foreground">
                            {formatDate(advertiser.createdAt as any)}
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
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
