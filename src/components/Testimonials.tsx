import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "سارة أحمد",
    role: "سيدة أعمال",
    text: "تجربتي مع منصة سند كانت ممتازة في مجال خدماتها القانونية وسرعة الاستجابة والاحترافية في التعامل.",
    rating: 5,
  },
  {
    name: "محمد العمري",
    role: "رجل أعمال",
    text: "منصة سند وفرت لي محامي متخصص في القانون التجاري ساعدني في حل نزاع تجاري معقد بأفضل النتائج.",
    rating: 5,
  },
  {
    name: "فاطمة المقبولي",
    role: "موظفة حكومية",
    text: "أنصح بمنصة سند لكل من يبحث عن خدمات قانونية احترافية وموثوقة. تجربة رائعة من البداية للنهاية.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-accent/30 geo-pattern">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-3 font-display section-title-accent">
            آراء عملائنا
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mt-6">
            ثقة العملاء أكبر إنجازاتنا في منصة سند القانونية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={t.name}
              className="relative bg-card border border-border rounded-3xl p-8 hover:shadow-2xl hover:shadow-navy/6 transition-all duration-500 group hover:-translate-y-2 opacity-0 animate-fade-in"
              style={{ animationDelay: `${0.1 + index * 0.15}s` }}
            >
              {/* Quote icon */}
              <div className="absolute -top-4 right-8">
                <div className="bg-gold rounded-xl p-2.5 shadow-lg shadow-gold/20">
                  <Quote size={18} className="text-secondary-foreground" />
                </div>
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-5 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < t.rating ? "text-gold fill-gold" : "text-muted"}
                  />
                ))}
              </div>

              <p className="text-muted-foreground text-sm leading-[1.9] mb-7">{t.text}</p>

              <div className="border-t border-border pt-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-navy-light flex items-center justify-center shadow-md">
                  <span className="text-gold font-bold text-sm font-display">{t.name.charAt(0)}</span>
                </div>
                <div>
                  <h4 className="text-foreground font-bold text-sm font-display">{t.name}</h4>
                  <p className="text-muted-foreground text-xs mt-0.5">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
