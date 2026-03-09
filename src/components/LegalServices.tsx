import { Scale, FileText, Building2, Users, Gavel, ShieldCheck } from "lucide-react";

const services = [
  { icon: Scale, title: "استشارات قانونية", desc: "استشارات فورية مع محامين متخصصين" },
  { icon: FileText, title: "صياغة العقود", desc: "صياغة ومراجعة العقود بدقة واحترافية" },
  { icon: Building2, title: "تأسيس الشركات", desc: "خدمات تأسيس وتسجيل الشركات" },
  { icon: Users, title: "قانون الأسرة", desc: "قضايا الأحوال الشخصية والأسرية" },
  { icon: Gavel, title: "الترافع والتقاضي", desc: "تمثيل قانوني أمام المحاكم" },
  { icon: ShieldCheck, title: "التحكيم التجاري", desc: "حل النزاعات التجارية بالتحكيم" },
];

const LegalServices = () => {
  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-secondary text-sm font-semibold tracking-wider">خدماتنا</span>
          <h2 className="text-3xl md:text-4xl font-black text-primary-foreground mt-2 mb-4">
            خدمات قانونية <span className="text-secondary">شاملة</span>
          </h2>
          <p className="text-primary-foreground/60 max-w-xl mx-auto">
            نقدم مجموعة متكاملة من الخدمات القانونية لتلبية جميع احتياجاتك
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-8 hover:border-secondary/30 transition-all duration-300 group hover:-translate-y-1 text-center"
            >
              <div className="bg-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-secondary/20 transition-colors">
                <service.icon size={28} className="text-secondary" />
              </div>
              <h3 className="text-primary-foreground font-bold text-lg mb-2">{service.title}</h3>
              <p className="text-primary-foreground/50 text-sm">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LegalServices;
