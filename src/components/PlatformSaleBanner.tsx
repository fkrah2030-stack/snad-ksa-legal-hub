import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PlatformSaleBanner = () => {
  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <div className="relative bg-gradient-to-l from-gold/15 via-gold/8 to-transparent border border-gold/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 overflow-hidden">
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent animate-shimmer" style={{ backgroundSize: "200% 100%" }} />

          <div className="flex items-center gap-5 relative z-10">
            <div className="bg-gold/15 p-3.5 rounded-2xl">
              <Sparkles size={26} className="text-gold" />
            </div>
            <div>
              <h3 className="text-foreground font-bold text-lg font-display">استشارة قانونية مجانية</h3>
              <p className="text-muted-foreground text-sm">سجّل الآن واحصل على أول استشارة مجانية</p>
            </div>
          </div>
          <Link to="/register" className="relative z-10">
            <Button className="bg-gold hover:bg-gold-dark text-secondary-foreground font-bold px-10 py-5 rounded-xl whitespace-nowrap shadow-lg shadow-gold/15 hover:shadow-gold/25 transition-all duration-300 hover:-translate-y-0.5">
              سجّل الآن مجاناً
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PlatformSaleBanner;
