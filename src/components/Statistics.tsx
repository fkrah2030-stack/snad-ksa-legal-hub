import { Users, Scale, Award, Clock } from "lucide-react";

const stats = [
  { icon: Users, value: "+2,500", label: "محامي معتمد" },
  { icon: Scale, value: "+15,000", label: "قضية ناجحة" },
  { icon: Award, value: "98%", label: "نسبة رضا العملاء" },
  { icon: Clock, value: "24/7", label: "دعم متواصل" },
];

const Statistics = () => {
  return (
    <section id="about" className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-primary-foreground mb-4">
            منصة سند بالأرقام
          </h2>
          <p className="text-primary-foreground/60 max-w-lg mx-auto">
            أرقام تعكس ثقة العملاء وجودة الخدمات القانونية في منصة سند
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="bg-primary-foreground/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <stat.icon size={28} className="text-secondary" />
              </div>
              <div className="text-3xl md:text-4xl font-black text-primary-foreground mb-1">{stat.value}</div>
              <div className="text-primary-foreground/60 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
