import { Search, Shield, Users, Scale, ExternalLink, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import najizLogo from "@/assets/najiz-logo.svg";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] md:min-h-[92vh] flex items-center overflow-hidden bg-primary grain-overlay">
      {/* Background layers */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-15" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep via-primary/80 to-primary" />
        <div className="absolute inset-0 bg-gradient-to-l from-gold/5 via-transparent to-transparent" />
      </div>

      {/* Decorative geometric elements */}
      <div className="absolute top-20 left-10 w-72 h-72 border border-gold/8 rounded-full animate-pulse-glow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 border border-gold/5 rounded-full animate-float-slow" />
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-gold/30 rounded-full animate-float" />
      <div className="absolute top-2/3 left-1/3 w-1.5 h-1.5 bg-gold/20 rounded-full animate-float-reverse" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-5 py-2 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            <span className="text-gold text-sm font-medium font-display">جرب النسخة التجريبية الآن</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-primary-foreground leading-[1.1] mb-3 opacity-0 animate-fade-in font-display" style={{ animationDelay: "0.2s" }}>
            منصة <span className="text-gold">سند</span>
          </h1>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-primary-foreground/80 mb-8 opacity-0 animate-fade-in font-display" style={{ animationDelay: "0.3s" }}>
            للخدمات القانونية
          </h2>

          <p className="text-primary-foreground/50 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            اعثر على أفضل المحامين المتخصصين في الوطن العربي واحصل على استشارات قانونية موثوقة
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-10 opacity-0 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <a href="https://najiz.sa/applications/landing" target="_blank" rel="noopener noreferrer">
              <Button className="bg-gold hover:bg-gold-dark text-secondary-foreground font-bold px-8 py-6 rounded-2xl text-base gap-3 shadow-xl shadow-gold/20 hover:shadow-gold/30 transition-all duration-300 hover:-translate-y-0.5">
                <ExternalLink size={18} />
                دخول منصة ناجز
                <img src={najizLogo} alt="ناجز" className="h-6 w-auto" />
              </Button>
            </a>
            <Link to="/register">
              <Button variant="ghost" className="border border-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/5 hover:border-gold/30 px-8 py-6 rounded-2xl text-base gap-2 transition-all duration-300 hover:-translate-y-0.5">
                سجل معنا
                <ArrowLeft size={16} />
              </Button>
            </Link>
          </div>

          {/* Search bar */}
          <div className="glass-card rounded-2xl p-2 flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto mb-16 opacity-0 animate-fade-in shadow-2xl shadow-navy-deep/30" style={{ animationDelay: "0.6s" }}>
            <div className="flex-1 relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-foreground/30" size={20} />
              <input
                type="text"
                placeholder="ابحث عن محامي أو خدمة قانونية..."
                className="w-full bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl pr-12 pl-4 py-4 text-primary-foreground placeholder:text-primary-foreground/30 focus:outline-none focus:border-gold/40 focus:bg-primary-foreground/8 transition-all duration-300"
              />
            </div>
            <Button className="bg-gold hover:bg-gold-dark text-secondary-foreground font-bold px-10 py-4 rounded-xl text-base shadow-lg shadow-gold/15 transition-all duration-300">
              بحث
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-12 opacity-0 animate-fade-in" style={{ animationDelay: "0.7s" }}>
            {[
              { icon: Users, value: "+2,500", label: "محامي معتمد" },
              { icon: Scale, value: "+15,000", label: "قضية ناجحة" },
              { icon: Shield, value: "24/7", label: "دعم متواصل" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-4 group">
                <div className="bg-gold/10 p-3 rounded-xl group-hover:bg-gold/15 transition-colors duration-300">
                  <stat.icon size={22} className="text-gold" />
                </div>
                <div className="text-right">
                  <div className="text-primary-foreground font-bold text-2xl font-display">{stat.value}</div>
                  <div className="text-primary-foreground/40 text-xs">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
