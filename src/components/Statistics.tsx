import { Users, Scale, Award, Clock } from "lucide-react";

const stats = [
  { icon: Users, value: "+2,500", label: "محامي معتمد" },
  { icon: Scale, value: "+15,000", label: "قضية ناجحة" },
  { icon: Award, value: "98%", label: "نسبة رضا العملاء" },
  { icon: Clock, value: "24/7", label: "دعم متواصل" },
];

const Statistics = () => {
  return (
    <section id="about" className="py-24 bg-primary relative overflow-hidden grain-overlay">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute top-10 right-10 w-64 h-64 border border-gold/5 rounded-full" />
      <div className="absolute bottom-10 left-10 w-48 h-48 border border-gold/5 rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-primary-foreground mb-3 font-display section-title-accent">
            منصة سند بالأرقام
          </h2>
          <p className="text-primary-foreground/40 max-w-lg mx-auto mt-6">
            أرقام تعكس ثقة العملاء وجودة الخدمات القانونية في منصة سند
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center opacity-0 animate-count-up group"
              style={{ animationDelay: `${0.2 + index * 0.15}s` }}
            >
              <div className="bg-gold/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-gold/15 group-hover:scale-110 transition-all duration-500">
                <stat.icon size={32} className="text-gold" />
              </div>
              <div className="text-4xl md:text-5xl font-black text-primary-foreground mb-2 font-display">{stat.value}</div>
              <div className="text-primary-foreground/40 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
