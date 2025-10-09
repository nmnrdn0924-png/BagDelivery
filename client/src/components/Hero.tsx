import { Button } from "@/components/ui/button";

interface HeroProps {
  onScrollToForm: () => void;
}

export default function Hero({ onScrollToForm }: HeroProps) {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-blue-900/40 to-blue-900/20" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-12 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          무거운 짐은 보내고,<br />
          <span className="text-orange-400">가벼운 여행</span>을 즐기세요
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
          청춘의 편하고 즐거운 시간을 위한 가방배달 서비스
        </p>
        <Button 
          size="lg" 
          className="bg-accent hover:bg-accent text-accent-foreground px-8 py-6 text-lg font-semibold rounded-lg shadow-xl hover:shadow-2xl transition-all"
          onClick={onScrollToForm}
          data-testid="button-scroll-to-form"
        >
          지금 신청하기
        </Button>
        <div className="mt-12 flex items-center justify-center gap-8 text-white/80 text-sm md:text-base">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-orange-400">5,000+</span>
            <span>배달 완료</span>
          </div>
          <div className="h-8 w-px bg-white/30" />
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-orange-400">98%</span>
            <span>만족도</span>
          </div>
          <div className="h-8 w-px bg-white/30" />
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-orange-400">24시간</span>
            <span>빠른 배송</span>
          </div>
        </div>
      </div>
    </section>
  );
}
