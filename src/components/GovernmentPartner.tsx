import { BookOpen, TrendingUp, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import mojLogo from "@/assets/moj-logo.png";

const features = [
  { icon: FileText, label: "شروح للأنظمة والأحكام القضائية" },
  { icon: TrendingUp, label: "تقارير شهرية للمستجدات" },
  { icon: BookOpen, label: "جميع إصدارات الوزارة" },
];

const GovernmentPartner = () => {
  return (
    <section className="py-20 bg-background geo-pattern">
      <div className="container mx-auto px-4">
        <div className="relative bg-gradient-to-l from-navy/5 via-accent to-accent/50 border border-border rounded-3xl p-8 md:p-14 flex flex-col md:flex-row-reverse items-center gap-10 overflow-hidden">
          {/* Decorative corner */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-gold/10 to-transparent rounded-br-full" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-gold/5 to-transparent rounded-tl-full" />

          {/* Logo */}
          <div className="flex-shrink-0 relative z-10">
            <div className="bg-card border border-border/80 rounded-3xl p-8 shadow-xl shadow-navy/5 hover:shadow-2xl transition-shadow duration-500">
              <img src={mojLogo} alt="وزارة العدل" className="h-32 md:h-40 w-auto object-contain" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-right relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2 font-display">البوابة القانونية الرسمية</h3>
            <div className="gold-line w-16 mb-6 mx-auto md:mx-0 md:mr-0" />
            <p className="text-muted-foreground text-sm mb-8 max-w-lg leading-relaxed">
              مرجع مهم للمهتمين بالشأن القانوني والقضائي - يسهل الوصول للمعلومة النظامية بكل سهولة
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-8">
              {features.map((feature) => (
                <div
                  key={feature.label}
                  className="flex items-center gap-2.5 bg-card border border-border rounded-xl px-5 py-3 shadow-sm hover:shadow-md hover:border-gold/20 transition-all duration-300 group"
                >
                  <feature.icon size={18} className="text-gold group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-foreground text-sm font-medium">{feature.label}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center md:justify-end">
              <a href="https://laws.moj.gov.sa/ar/" target="_blank" rel="noopener noreferrer">
                <Button className="bg-primary hover:bg-navy-light text-primary-foreground font-bold rounded-xl gap-2 px-8 py-5 shadow-lg shadow-navy/15 hover:shadow-navy/25 transition-all duration-300 hover:-translate-y-0.5">
                  <ExternalLink size={16} />
                  زيارة البوابة القانونية
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GovernmentPartner;
