import { Building2, Award } from "lucide-react";

const partners = [
  "وزارة العدل",
  "هيئة المحامين",
  "وزارة التجارة",
  "ديوان المظالم",
  "المركز السعودي للتحكيم",
];

const GovernmentPartner = () => {
  return (
    <section className="py-12 bg-primary/5 backdrop-blur-sm border-y border-primary-foreground/5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Award size={20} className="text-secondary" />
          <h3 className="text-primary-foreground/80 text-sm font-medium">شركاؤنا الاستراتيجيون</h3>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {partners.map((name) => (
            <div
              key={name}
              className="flex items-center gap-2 bg-primary-foreground/5 border border-primary-foreground/10 rounded-xl px-6 py-3 hover:border-secondary/30 transition-colors"
            >
              <Building2 size={18} className="text-secondary/70" />
              <span className="text-primary-foreground/70 text-sm font-medium">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GovernmentPartner;
