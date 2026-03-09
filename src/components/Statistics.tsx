import { TrendingUp, Users, Scale, Award } from "lucide-react";

const stats = [
  { icon: Users, value: "500+", label: "محامي معتمد", color: "text-secondary" },
  { icon: Scale, value: "10,000+", label: "قضية ناجحة", color: "text-secondary" },
  { icon: Award, value: "98%", label: "نسبة رضا العملاء", color: "text-secondary" },
  { icon: TrendingUp, value: "50+", label: "تخصص قانوني", color: "text-secondary" },
];

const Statistics = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="bg-primary/40 backdrop-blur-md border border-primary-foreground/10 rounded-3xl p-10 md:p-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-primary-foreground mb-4">
              أرقام تتحدث عن <span className="text-secondary">نجاحنا</span>
            </h2>
            <p className="text-primary-foreground/60 max-w-lg mx-auto">
              نفخر بثقة عملائنا ونسعى دائماً لتقديم أفضل الخدمات القانونية
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="bg-secondary/10 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon size={26} className="text-secondary" />
                </div>
                <div className="text-3xl md:text-4xl font-black text-primary-foreground mb-1">{stat.value}</div>
                <div className="text-primary-foreground/50 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
