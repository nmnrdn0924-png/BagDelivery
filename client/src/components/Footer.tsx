export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <p className="text-2xl font-bold text-foreground">가방배달</p>
            <p className="text-muted-foreground">
              청춘의 편하고 즐거운 시간을 만드는 가방배달 서비스
            </p>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p><strong>사업자명:</strong> 가방배달</p>
              <p><strong>개인정보책임자:</strong> 노문아</p>
              <p><strong>주소:</strong> 성북구 정릉로 77 국민대학교 경영관</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xl font-bold text-foreground">편의 상품 안내</p>
            <p className="text-muted-foreground">
              가방을 배달 맡기실 때 휴대폰, 지갑 등을 넣을 수 있는 작은 가방도 판매하고 있습니다. 
              편리하게 소지품을 챙기세요!
            </p>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © 2025 가방배달. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
