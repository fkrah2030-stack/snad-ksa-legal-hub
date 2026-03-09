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
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mt-2 mb-4">
            آراء عملائنا
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            ثقة العملاء أكبر إنجازاتنا في منصة القانونية السعودية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < t.rating ? "text-secondary fill-secondary" : "text-muted"}
                  />
                ))}
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-6">{t.text}</p>

              <div className="border-t border-border pt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">{t.name.charAt(0)}</span>
                </div>
                <div>
                  <h4 className="text-foreground font-bold text-sm">{t.name}</h4>
                  <p className="text-muted-foreground text-xs">{t.role}</p>
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
