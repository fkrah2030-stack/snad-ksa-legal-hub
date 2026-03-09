import { Scale, Landmark, Briefcase, Users, Gavel, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  { icon: Scale, title: "القانون المدني", desc: "الاستشارات والتمثيل القانوني في القضايا المدنية والحقوقية" },
  { icon: Landmark, title: "القانون التجاري", desc: "خدمات قانونية متخصصة للشركات وقطاع الأعمال والتجارة" },
  { icon: Briefcase, title: "قانون الأسرة", desc: "قضايا الأحوال الشخصية والأسرية والزواج والطلاق" },
  { icon: Users, title: "قانون العمل", desc: "حقوق العمال وعلاقات العمل والتوظيف والمنازعات العمالية" },
  { icon: Building2, title: "قانون عقاري", desc: "استثمارات وعقارات وتمليك وعقود الإيجار والمنازعات العقارية" },
  { icon: Gavel, title: "القانون الجنائي", desc: "الدفاع في القضايا الجنائية والجزائية بخبرة واحترافية" },
];

const LegalServices = () => {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mt-2 mb-4">
            خدماتنا القانونية
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            مجموعة متنوعة من الخدمات القانونية المتخصصة لتلبية جميع احتياجاتك القانونية
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1 text-center"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/15 transition-colors">
                <service.icon size={28} className="text-primary" />
              </div>
              <h3 className="text-foreground font-bold text-lg mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm mb-5">{service.desc}</p>
              <Button variant="outline" className="border-border text-primary hover:bg-primary hover:text-primary-foreground rounded-xl text-sm font-medium transition-colors">
                طلب استشارة
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold rounded-xl px-8">
            عرض جميع الخدمات
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LegalServices;
