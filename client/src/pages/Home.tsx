import { useRef } from "react";
import Hero from "@/components/Hero";
import DeliveryForm from "@/components/DeliveryForm";
import Benefits from "@/components/Benefits";
import AdvertiserSection from "@/components/AdvertiserSection";
import Footer from "@/components/Footer";

export default function Home() {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen">
      <Hero onScrollToForm={scrollToForm} />
      <Benefits />
      <div ref={formRef}>
        <DeliveryForm />
      </div>
      <AdvertiserSection />
      <Footer />
    </div>
  );
}
