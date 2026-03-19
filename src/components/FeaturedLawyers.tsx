import { Star, MapPin, Briefcase, Phone, CheckCircle2 } from "lucide-react";
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
    successRate: 95,
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
    successRate: 85,
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
    successRate: 90,
    pricePerHour: 900,
    verified: true,
  },
];

const FeaturedLawyers = () => {
  return (
    <section id="lawyers" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black text-foreground mt-2 mb-4">
            المحامون المميزون
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            تعرف على نخبة من أفضل المحامين المتخصصين والمعتمدين في منصة سند
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lawyers.map((lawyer) => (
            <div
              key={lawyer.id}
              className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              {/* Card Header - Blue */}
              <div className="bg-primary p-6 text-center relative">
                {lawyer.verified && (
                  <div className="absolute top-3 left-3 flex items-center gap-1 bg-primary-foreground/10 rounded-full px-2 py-1">
                    <CheckCircle2 size={12} className="text-secondary" />
                    <span className="text-primary-foreground text-[10px]">موثق</span>
                  </div>
                )}
                <div className="w-20 h-20 rounded-full golden-ring bg-primary-foreground/20 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-2xl font-bold text-secondary">{lawyer.name.charAt(0)}</span>
                </div>
                <h3 className="text-primary-foreground font-bold text-lg">{lawyer.name}</h3>
                <p className="text-primary-foreground/70 text-xs mt-1">{lawyer.title}</p>
                <p className="text-secondary text-sm font-medium mt-1">{lawyer.specialty}</p>
                <div className="flex items-center justify-center gap-4 mt-3 text-xs text-primary-foreground/60">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {lawyer.city}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase size={12} />
                    خبرة {lawyer.experience} سنوات
                  </span>
                </div>
                {/* Rating */}
                <div className="flex items-center justify-center gap-1 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.floor(lawyer.rating) ? "text-secondary fill-secondary" : "text-primary-foreground/20"}
                    />
                  ))}
                  <span className="text-secondary text-xs mr-1">{lawyer.rating}</span>
                  <span className="text-primary-foreground/50 text-xs">({lawyer.reviews} تقييم)</span>
                </div>
              </div>

              {/* Card Body - White */}
              <div className="p-6">

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-muted/50 rounded-xl p-3 text-center">
                    <div className="text-foreground font-bold text-lg">{lawyer.cases}</div>
                    <div className="text-muted-foreground text-[10px]">قضية</div>
                  </div>
                  <div className="bg-muted/50 rounded-xl p-3 text-center">
                    <div className="text-foreground font-bold text-lg">{lawyer.experience}</div>
                    <div className="text-muted-foreground text-[10px]">سنوات خبرة</div>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between bg-muted/50 rounded-xl p-3 mb-4">
                  <span className="text-muted-foreground text-xs">سعر الاستشارة</span>
                  <span className="text-primary font-bold text-sm">{lawyer.pricePerHour} ريال/ساعة</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link to={`/lawyer/${lawyer.id}`} className="flex-1">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold rounded-xl">
                      استشارة
                    </Button>
                  </Link>
                  <Link to={`/lawyer/${lawyer.id}`}>
                    <Button variant="outline" size="icon" className="border-border rounded-xl h-10 w-10">
                      <Phone size={16} className="text-primary" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" className="border-border text-foreground hover:bg-muted rounded-xl">
            عرض جميع المحامين
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedLawyers;
