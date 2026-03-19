import { Search, Shield, Users, Scale, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import najizLogo from "@/assets/najiz-logo.svg";

const Hero = () => {
  return (
    <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center overflow-hidden bg-primary">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-20" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-primary" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black text-primary-foreground leading-tight mb-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            منصة <span className="text-secondary">سند</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground/90 mb-6 animate-fade-in" style={{ animationDelay: "0.15s" }}>
            للخدمات القانونية
          </h2>

          <p className="text-primary-foreground/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            اعثر على أفضل المحامين المتخصصين في الوطن العربي واحصل على استشارات قانونية موثوقة
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 animate-fade-in" style={{ animationDelay: "0.25s" }}>
            <Link to="/register">
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold px-8 py-3 rounded-xl text-base gap-2">
                
                سجل معنا
              </Button>
            </Link>
            <Button variant="ghost" className="border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-3 rounded-xl text-base">
              ابحث الآن
            </Button>
          </div>

          {/* Search bar */}
          <div className="bg-primary-foreground/10 backdrop-blur-md rounded-2xl p-2 flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
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
          <div className="flex flex-wrap justify-center gap-10 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            {[
              { icon: Users, value: "+2500", label: "محامي معتمد" },
              { icon: Scale, value: "+15000", label: "قضية ناجحة" },
              { icon: Shield, value: "24/7", label: "دعم متواصل" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="bg-primary-foreground/10 p-2.5 rounded-lg">
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
