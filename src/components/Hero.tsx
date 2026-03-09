import { Search, ArrowLeft, Scale, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/90" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-secondary/20 border border-secondary/30 rounded-full px-5 py-2 mb-8 animate-fade-in">
            <Shield size={16} className="text-secondary" />
            <span className="text-secondary text-sm font-medium">المنصة القانونية الأولى في المملكة</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-primary-foreground leading-tight mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            منصة <span className="text-secondary">سند</span> للخدمات
            <br />
            القانونية المتكاملة
          </h1>

          <p className="text-primary-foreground/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            اعثر على أفضل المحامين المتخصصين واحصل على استشارات قانونية موثوقة في مختلف المجالات القانونية
          </p>

          {/* Search bar */}
          <div className="bg-primary-foreground/10 backdrop-blur-md rounded-2xl p-2 flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="flex-1 relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-foreground/50" size={20} />
              <input
                type="text"
                placeholder="ابحث عن محامي أو خدمة قانونية..."
                className="w-full bg-primary-foreground/10 border border-primary-foreground/20 rounded-xl pr-12 pl-4 py-3.5 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-secondary/50 transition-colors"
              />
            </div>
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold px-8 py-3.5 rounded-xl text-base">
              ابحث الآن
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            {[
              { icon: Users, value: "+500", label: "محامي معتمد" },
              { icon: Scale, value: "+10,000", label: "قضية ناجحة" },
              { icon: Shield, value: "+50", label: "تخصص قانوني" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="bg-secondary/20 p-2.5 rounded-lg">
                  <stat.icon size={20} className="text-secondary" />
                </div>
                <div className="text-right">
                  <div className="text-primary-foreground font-bold text-xl">{stat.value}</div>
                  <div className="text-primary-foreground/60 text-xs">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
