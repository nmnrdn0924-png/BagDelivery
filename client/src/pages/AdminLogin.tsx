import { useState } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // TODO: replace with actual API call
    await new Promise(resolve => setTimeout(resolve, 500));

    if (username === "nomun" && password === "969908") {
      console.log("Login successful");
      setLocation("/admin/dashboard");
    } else {
      setError("아이디 또는 비밀번호가 올바르지 않습니다");
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-6">
      <Card className="w-full max-w-md p-8 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">관리자 로그인</h1>
          <p className="text-muted-foreground">가방배달 관리 시스템</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-base font-semibold">
              아이디
            </Label>
            <Input
              id="username"
              data-testid="input-username"
              placeholder="아이디를 입력하세요"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-base font-semibold">
              비밀번호
            </Label>
            <Input
              id="password"
              data-testid="input-password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm" data-testid="text-error">
              {error}
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full bg-primary hover:bg-primary text-primary-foreground font-semibold"
            disabled={isLoading}
            data-testid="button-login"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                로그인 중...
              </>
            ) : (
              "로그인"
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
}
