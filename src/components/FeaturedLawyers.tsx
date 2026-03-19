import { Star, MapPin, Briefcase, Phone, CheckCircle2, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const lawyers = [
  {
    id: "1",
    name: "محامي تجريبي",
    title: "محامي ومستشار قانوني",
    specialty: "القانون التجاري",
    city: "الرياض",
    rating: 4.9,
    reviews: 114,
    cases: 245,
    experience: 8,
    pricePerHour: 500,
    verified: true,
  },
  {
    id: "2",
    name: "د. نورة المنصوري",
    title: "محامية ومستشارة قانونية",
    specialty: "قانون الأسرة",
    city: "جدة",
    rating: 4.9,
    reviews: 114,
    cases: 180,
    experience: 10,
    pricePerHour: 550,
    verified: true,
  },
  {
    id: "3",
    name: "الأستاذ خالد بن سعد القحطاني",
    title: "محامي ومستشار قانوني",
    specialty: "القانون الجنائي",
    city: "الدمام",
    rating: 4.8,
    reviews: 114,
    cases: 310,
    experience: 17,
    pricePerHour: 900,
    verified: true,
  },
];

const FeaturedLawyers = () => {
  return (
    <section id="lawyers" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-3 font-display section-title-accent">
            المحامون المميزون
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mt-6">
            تعرف على نخبة من أفضل المحامين المتخصصين والمعتمدين في منصة سند
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {lawyers.map((lawyer, index) => (
            <div
              key={lawyer.id}
              className="bg-card border border-border rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-navy/8 transition-all duration-500 group hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${0.1 + index * 0.15}s` }}
            >
              {/* Card Header */}
              <div className="bg-gradient-to-bl from-primary via-primary to-navy-deep p-7 text-center relative overflow-hidden">
                {/* Decorative */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gold/5 to-transparent" />

                {lawyer.verified && (
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-gold/15 border border-gold/20 rounded-full px-3 py-1.5 z-10">
                    <CheckCircle2 size={12} className="text-gold" />
                    <span className="text-gold text-[10px] font-bold">موثق</span>
                  </div>
                )}
                <div className="w-22 h-22 rounded-full golden-ring bg-primary-foreground/10 mx-auto mb-4 flex items-center justify-center relative z-10" style={{ width: '5.5rem', height: '5.5rem' }}>
                  <span className="text-3xl font-bold text-gold font-display">{lawyer.name.charAt(0)}</span>
                </div>
                <h3 className="text-primary-foreground font-bold text-lg relative z-10 font-display">{lawyer.name}</h3>
                <p className="text-primary-foreground/50 text-xs mt-1 relative z-10">{lawyer.title}</p>
                <p className="text-gold text-sm font-semibold mt-2 relative z-10">{lawyer.specialty}</p>
                <div className="flex items-center justify-center gap-5 mt-3 text-xs text-primary-foreground/40 relative z-10">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={12} />
                    {lawyer.city}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase size={12} />
                    خبرة {lawyer.experience} سنوات
                  </span>
                </div>
                {/* Rating */}
                <div className="flex items-center justify-center gap-1.5 mt-4 relative z-10">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.floor(lawyer.rating) ? "text-gold fill-gold" : "text-primary-foreground/15"}
                    />
                  ))}
                  <span className="text-gold text-xs font-bold mr-1">{lawyer.rating}</span>
                  <span className="text-primary-foreground/30 text-xs">({lawyer.reviews})</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-7">
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-accent/50 rounded-2xl p-4 text-center group-hover:bg-accent transition-colors duration-300">
                    <div className="text-foreground font-bold text-xl font-display">{lawyer.cases}</div>
                    <div className="text-muted-foreground text-[10px] mt-0.5">قضية</div>
                  </div>
                  <div className="bg-accent/50 rounded-2xl p-4 text-center group-hover:bg-accent transition-colors duration-300">
                    <div className="text-foreground font-bold text-xl font-display">{lawyer.experience}</div>
                    <div className="text-muted-foreground text-[10px] mt-0.5">سنوات خبرة</div>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-gold/5 border border-gold/10 rounded-2xl p-4 mb-5">
                  <span className="text-muted-foreground text-xs">سعر الاستشارة</span>
                  <span className="text-primary font-bold text-sm font-display">{lawyer.pricePerHour} ريال/ساعة</span>
                </div>

                <div className="flex gap-3">
                  <Link to={`/lawyer/${lawyer.id}`} className="flex-1">
                    <Button className="w-full bg-primary hover:bg-navy-light text-primary-foreground text-sm font-bold rounded-xl py-5 shadow-md shadow-navy/10 hover:shadow-lg transition-all duration-300">
                      استشارة
                    </Button>
                  </Link>
                  <Link to={`/lawyer/${lawyer.id}`}>
                    <Button variant="outline" size="icon" className="border-border hover:border-gold/30 hover:bg-gold/5 rounded-xl h-11 w-11 transition-all duration-300">
                      <Phone size={16} className="text-primary" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link to="/lawyer/1">
            <Button variant="outline" className="border-border hover:border-gold/30 text-foreground hover:bg-gold/5 rounded-xl px-10 py-5 transition-all duration-300">
              عرض جميع المحامين
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedLawyers;
