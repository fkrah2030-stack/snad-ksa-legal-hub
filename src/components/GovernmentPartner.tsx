import { Building2, Award, ShieldCheck, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import snadLogo from "@/assets/snad-logo.png";

const partners = [
  "وزارة العدل",
  "هيئة المحامين",
  "وزارة التجارة",
  "ديوان المظالم",
  "المركز السعودي للتحكيم",
];

const GovernmentPartner = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="bg-muted/50 border border-border rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
          {/* Content */}
          <div className="flex-1 text-center md:text-right">
            <h3 className="text-2xl font-bold text-foreground mb-3">البوابة القانونية الرسمية</h3>
            <p className="text-muted-foreground text-sm mb-6">
              مرجع شامل لجميع الخدمات القانونية والمحاماة. سهولة الوصول لمعلومات قانونية موثوقة عبر سهولة
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
              {partners.map((name) => (
                <div
                  key={name}
                  className="flex items-center gap-2 bg-background border border-border rounded-full px-4 py-2"
                >
                  <Building2 size={14} className="text-secondary" />
                  <span className="text-foreground text-xs font-medium">{name}</span>
                </div>
              ))}
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl gap-2">
              <ExternalLink size={16} />
              زيارة البوابة القانونية
            </Button>
          </div>
          {/* Icon/Image */}
          <div className="flex-shrink-0">
            <div className="bg-secondary/10 rounded-2xl p-4 flex items-center justify-center">
              <img src={snadLogo} alt="سند" className="h-20 w-auto object-contain" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GovernmentPartner;
