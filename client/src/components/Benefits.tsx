import { Truck, Clock, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";

const benefits = [
  {
    icon: Truck,
    title: "편한 여행",
    description: "무거운 가방 없이 가볍게 여행을 시작하세요. 이동 중 불편함을 잊고 여행의 순간을 온전히 즐기세요.",
  },
  {
    icon: Clock,
    title: "즐거운 시간",
    description: "짐 걱정 없이 관광, 쇼핑, 맛집 탐방에 집중하세요. 소중한 시간을 더 가치있게 보낼 수 있습니다.",
  },
  {
    icon: Heart,
    title: "자유로운 청춘",
    description: "젊음의 순간을 만끽하세요. 가방배달로 자유롭고 활기찬 청춘의 시간을 만들어드립니다.",
  },
];

export default function Benefits() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            왜 가방배달을 이용해야 할까요?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            청춘의 편하고 즐거운 시간을 만드는 가방배달 서비스의 장점
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card 
                key={index} 
                className="p-8 hover-elevate transition-all duration-300"
                data-testid={`card-benefit-${index}`}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
