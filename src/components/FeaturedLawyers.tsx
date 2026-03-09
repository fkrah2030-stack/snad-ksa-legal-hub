import { Star, MapPin, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const lawyers = [
  { name: "أ. محمد العتيبي", specialty: "قانون تجاري", city: "الرياض", rating: 4.9, cases: 230 },
  { name: "أ. سارة القحطاني", specialty: "قانون أسري", city: "جدة", rating: 4.8, cases: 180 },
  { name: "أ. خالد الشمري", specialty: "قانون جنائي", city: "الدمام", rating: 4.7, cases: 310 },
  { name: "أ. نورة الحربي", specialty: "قانون عمالي", city: "الرياض", rating: 4.9, cases: 150 },
];

const FeaturedLawyers = () => {
  return (
    <section id="lawyers" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-secondary text-sm font-semibold tracking-wider">نخبة المحامين</span>
          <h2 className="text-3xl md:text-4xl font-black text-primary-foreground mt-2 mb-4">
            محامون <span className="text-secondary">معتمدون</span> وموثوقون
          </h2>
          <p className="text-primary-foreground/60 max-w-xl mx-auto">
            اختر من بين نخبة المحامين المرخصين والمعتمدين في مختلف التخصصات القانونية
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {lawyers.map((lawyer) => (
            <div
              key={lawyer.name}
              className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-6 hover:border-secondary/30 transition-all duration-300 group hover:-translate-y-1"
            >
              {/* Avatar placeholder */}
              <div className="w-20 h-20 rounded-full golden-ring bg-primary/30 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-secondary">{lawyer.name.charAt(3)}</span>
              </div>

              <h3 className="text-primary-foreground font-bold text-center mb-1">{lawyer.name}</h3>
              <p className="text-secondary text-sm text-center mb-3">{lawyer.specialty}</p>

              <div className="flex items-center justify-center gap-4 text-xs text-primary-foreground/50 mb-4">
                <span className="flex items-center gap-1">
                  <MapPin size={12} />
                  {lawyer.city}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase size={12} />
                  {lawyer.cases} قضية
                </span>
              </div>

              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.floor(lawyer.rating) ? "star-golden fill-current" : "text-primary-foreground/20"}
                  />
                ))}
                <span className="text-secondary text-xs mr-1">{lawyer.rating}</span>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/80 text-primary-foreground text-sm">
                احجز استشارة
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
            عرض جميع المحامين
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedLawyers;
