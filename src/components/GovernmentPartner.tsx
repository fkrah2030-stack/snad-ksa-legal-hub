import { BookOpen, TrendingUp, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import mojLogo from "@/assets/moj-logo.svg";

const features = [
  { icon: FileText, label: "شروح للأنظمة والأحكام القضائية" },
  { icon: TrendingUp, label: "تقارير شهرية للمستجدات" },
  { icon: BookOpen, label: "جميع إصدارات الوزارة" },
];

const GovernmentPartner = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-l from-primary/5 via-muted/50 to-muted/30 border border-border rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
          {/* Content */}
          <div className="flex-1 text-center md:text-right order-2 md:order-1">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">البوابة القانونية الرسمية</h3>
            <p className="text-muted-foreground text-sm mb-8 max-w-lg">
              مرجع مهم للمهتمين بالشأن القانوني والقضائي - يسهل الوصول للمعلومة النظامية بكل سهولة
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-8">
              {features.map((feature) => (
                <div
                  key={feature.label}
                  className="flex items-center gap-2 bg-background border border-border rounded-xl px-5 py-3 shadow-sm"
                >
                  <feature.icon size={18} className="text-primary" />
                  <span className="text-foreground text-sm font-medium">{feature.label}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center md:justify-end">
              <a href="https://laws.moj.gov.sa/ar/" target="_blank" rel="noopener noreferrer">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl gap-2 px-6">
                  <ExternalLink size={16} />
                  زيارة البوابة القانونية
                </Button>
              </a>
            </div>
          </div>
          {/* Logo */}
          <div className="flex-shrink-0 order-1 md:order-2">
            <div className="bg-white border border-border rounded-3xl p-8 flex items-center justify-center">
              <img src={mojLogo} alt="وزارة العدل" className="h-24 md:h-32 w-auto object-contain" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GovernmentPartner;
