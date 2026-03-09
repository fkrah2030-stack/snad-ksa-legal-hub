import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "عبدالله المالكي",
    role: "رجل أعمال",
    text: "تجربة رائعة مع منصة سند، حصلت على محامي متخصص في القانون التجاري وأنهى قضيتي بنجاح خلال أسابيع قليلة.",
    rating: 5,
  },
  {
    name: "فاطمة الزهراني",
    role: "موظفة حكومية",
    text: "المنصة سهلت عليّ كثيرًا البحث عن محامي متخصص في قضايا الأحوال الشخصية. أنصح بها الجميع.",
    rating: 5,
  },
  {
    name: "أحمد الغامدي",
    role: "صاحب شركة",
    text: "خدمة ممتازة واحترافية عالية. تمكنت من تأسيس شركتي بكل سهولة بفضل المحامين المعتمدين في المنصة.",
    rating: 4,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-secondary text-sm font-semibold tracking-wider">آراء العملاء</span>
          <h2 className="text-3xl md:text-4xl font-black text-primary-foreground mt-2 mb-4">
            ماذا يقول <span className="text-secondary">عملاؤنا</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-8 hover:border-secondary/20 transition-all duration-300"
            >
              <Quote size={24} className="text-secondary/30 mb-4" />
              <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">{t.text}</p>

              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < t.rating ? "star-golden fill-current" : "text-primary-foreground/20"}
                  />
                ))}
              </div>

              <div className="border-t border-primary-foreground/10 pt-4">
                <h4 className="text-primary-foreground font-bold text-sm">{t.name}</h4>
                <p className="text-primary-foreground/50 text-xs">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
