import { CheckCircle2, Phone, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  "استشارات قانونية",
  "إدارة القضايا",
  "متابعة حية",
  "دعم فني مستمر",
  "تقارير دورية",
  "حلول متكاملة",
];

const PlatformSaleBanner = () => {
  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-l from-primary via-primary to-primary/95 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
          {/* Price Tag */}
          <div className="flex-shrink-0 bg-secondary rounded-2xl p-6 text-center min-w-[180px]">
            <span className="text-secondary-foreground text-xs block mb-1">عرض خاص للمنصات</span>
            <div className="text-secondary-foreground font-black text-4xl">6,500</div>
            <span className="text-secondary-foreground/80 text-sm">ريال سعودي</span>
            <Button className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground w-full font-bold rounded-xl text-sm">
              تواصل معنا
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 text-center md:text-right">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 rounded-full px-4 py-1.5 mb-4">
              <span className="text-secondary text-xs font-medium">عرض خاص للمنصات</span>
            </div>
            <h3 className="text-primary-foreground font-bold text-2xl mb-2">منصة قانونية متكاملة</h3>
            <p className="text-primary-foreground/60 text-sm mb-6">باقة شاملة تحتوي على جميع الخدمات القانونية</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {features.map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-secondary flex-shrink-0" />
                  <span className="text-primary-foreground/80 text-xs">{f}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold rounded-xl gap-2">
                <UserPlus size={16} />
                التسجيل الآن
              </Button>
              <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-xl gap-2">
                <Phone size={16} />
                تواصل معنا
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformSaleBanner;
