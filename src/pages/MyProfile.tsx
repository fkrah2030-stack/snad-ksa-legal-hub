import { useState } from "react";
import { Star, MapPin, Briefcase, Phone, Mail, Clock, Edit, Award, TrendingUp, Users, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Layout from "@/components/Layout";

const profileData = {
  name: "أ. محمد العتيبي",
  specialty: "قانون تجاري",
  city: "الرياض",
  rating: 4.9,
  totalCases: 230,
  wonCases: 198,
  activeCases: 12,
  experience: 15,
  phone: "+966 50 XXX XXXX",
  email: "m.alotaibi@snad.sa",
  license: "12345/ق",
  education: "ماجستير قانون تجاري - جامعة الملك سعود",
  bio: "محامٍ مرخص متخصص في القانون التجاري والشركات مع خبرة تتجاوز 15 عامًا في المحاكم التجارية بالمملكة العربية السعودية.",
  specialties: ["قانون الشركات", "العقود التجارية", "التحكيم", "الإفلاس"],
  joinDate: "2024-01-15",
};

const cases = [
  { id: 1, title: "نزاع تجاري - شركة الفجر", status: "active", date: "2025-03-01", type: "تجاري" },
  { id: 2, title: "عقد توريد - مؤسسة النور", status: "won", date: "2025-02-15", type: "عقود" },
  { id: 3, title: "تحكيم دولي - مجموعة الخليج", status: "won", date: "2025-01-20", type: "تحكيم" },
  { id: 4, title: "إفلاس - شركة البناء المتحدة", status: "active", date: "2025-02-28", type: "إفلاس" },
  { id: 5, title: "نزاع شراكة - الأفق التجارية", status: "lost", date: "2024-12-10", type: "شركات" },
  { id: 6, title: "عقد امتياز - سلسلة مطاعم", status: "won", date: "2024-11-05", type: "عقود" },
  { id: 7, title: "تسوية ودية - مصنع الحديد", status: "won", date: "2024-10-18", type: "تجاري" },
];

const reviews = [
  { id: 1, name: "عبدالله السالم", rating: 5, comment: "محامٍ ممتاز ومتمكن، ساعدني في حل نزاع تجاري معقد بكل احترافية.", date: "2025-02-20" },
  { id: 2, name: "فهد المالكي", rating: 5, comment: "خبرة واسعة في العقود التجارية، أنصح بالتعامل معه.", date: "2025-01-15" },
  { id: 3, name: "سلطان الدوسري", rating: 4, comment: "تعامل ممتاز واحترافي، لكن التواصل كان بطيئًا بعض الشيء.", date: "2024-12-28" },
  { id: 4, name: "ناصر العمري", rating: 5, comment: "كسب لي القضية في وقت قياسي، محامي موثوق جداً.", date: "2024-11-30" },
];

const statusConfig = {
  active: { label: "جارية", icon: AlertCircle, className: "bg-secondary/10 text-secondary border-secondary/20" },
  won: { label: "مكسوبة", icon: CheckCircle, className: "bg-green-500/10 text-green-400 border-green-500/20" },
  lost: { label: "خاسرة", icon: XCircle, className: "bg-destructive/10 text-destructive border-destructive/20" },
};

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const winRate = Math.round((profileData.wonCases / profileData.totalCases) * 100);

  return (
    <Layout>
      {/* Hero Banner */}
      <div className="bg-gradient-to-b from-primary to-primary/90 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-28 h-28 rounded-full bg-secondary/20 border-2 border-secondary flex items-center justify-center shrink-0">
              <span className="text-4xl font-bold text-secondary">{profileData.name.charAt(3)}</span>
            </div>
            <div className="text-center sm:text-right flex-1">
              <h1 className="text-2xl md:text-3xl font-black text-primary-foreground mb-1">{profileData.name}</h1>
              <p className="text-secondary font-semibold mb-3">{profileData.specialty}</p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-primary-foreground/60 mb-3">
                <span className="flex items-center gap-1"><MapPin size={14} />{profileData.city}</span>
                <span className="flex items-center gap-1"><Briefcase size={14} />{profileData.totalCases} قضية</span>
                <span className="flex items-center gap-1"><Clock size={14} />{profileData.experience} سنة خبرة</span>
                <span className="flex items-center gap-1"><Award size={14} />رخصة: {profileData.license}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < Math.floor(profileData.rating) ? "text-secondary fill-secondary" : "text-primary-foreground/20"} />
                ))}
                <span className="text-secondary text-sm mr-2 font-bold">{profileData.rating}</span>
                <span className="text-primary-foreground/40 text-sm">({reviews.length} تقييم)</span>
              </div>
            </div>
            <Button className="bg-secondary/10 border border-secondary/30 text-secondary hover:bg-secondary/20 gap-2">
              <Edit size={16} />
              تعديل الملف
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-primary/95 min-h-[60vh] py-8">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} dir="rtl">
            <TabsList className="bg-primary-foreground/5 border border-primary-foreground/10 w-full sm:w-auto mb-8">
              <TabsTrigger value="overview" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground text-primary-foreground/60">نظرة عامة</TabsTrigger>
              <TabsTrigger value="cases" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground text-primary-foreground/60">القضايا</TabsTrigger>
              <TabsTrigger value="reviews" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground text-primary-foreground/60">التقييمات</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "إجمالي القضايا", value: profileData.totalCases, icon: Briefcase },
                  { label: "القضايا الجارية", value: profileData.activeCases, icon: AlertCircle },
                  { label: "نسبة الفوز", value: `${winRate}%`, icon: TrendingUp },
                  { label: "العملاء", value: profileData.totalCases - profileData.activeCases, icon: Users },
                ].map((stat) => (
                  <div key={stat.label} className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-5 text-center">
                    <stat.icon size={24} className="text-secondary mx-auto mb-2" />
                    <p className="text-2xl font-black text-primary-foreground">{stat.value}</p>
                    <p className="text-primary-foreground/50 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Bio & Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-8">
                  <h3 className="text-lg font-bold text-primary-foreground mb-4">نبذة شخصية</h3>
                  <p className="text-primary-foreground/70 leading-relaxed mb-6">{profileData.bio}</p>
                  <h4 className="text-sm font-bold text-primary-foreground mb-3">التخصصات</h4>
                  <div className="flex flex-wrap gap-2">
                    {profileData.specialties.map((s) => (
                      <span key={s} className="bg-secondary/10 text-secondary border border-secondary/20 px-3 py-1 rounded-full text-xs font-medium">{s}</span>
                    ))}
                  </div>
                </div>

                <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-8">
                  <h3 className="text-lg font-bold text-primary-foreground mb-4">معلومات التواصل</h3>
                  <div className="space-y-4">
                    {[
                      { icon: Phone, label: "الجوال", value: profileData.phone },
                      { icon: Mail, label: "البريد", value: profileData.email },
                      { icon: Award, label: "المؤهل", value: profileData.education },
                      { icon: MapPin, label: "المدينة", value: profileData.city },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                          <item.icon size={14} className="text-secondary" />
                        </div>
                        <div>
                          <p className="text-primary-foreground/40 text-xs">{item.label}</p>
                          <p className="text-primary-foreground text-sm">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Win Rate Bar */}
              <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-8">
                <h3 className="text-lg font-bold text-primary-foreground mb-4">أداء القضايا</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-primary-foreground/60">نسبة الفوز</span>
                      <span className="text-secondary font-bold">{winRate}%</span>
                    </div>
                    <Progress value={winRate} className="h-3 bg-primary-foreground/10 [&>div]:bg-secondary" />
                  </div>
                  <div className="flex justify-between text-sm text-primary-foreground/50">
                    <span>مكسوبة: {profileData.wonCases}</span>
                    <span>خاسرة: {profileData.totalCases - profileData.wonCases - profileData.activeCases}</span>
                    <span>جارية: {profileData.activeCases}</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Cases Tab */}
            <TabsContent value="cases">
              <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-primary-foreground/10 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-primary-foreground">سجل القضايا</h3>
                  <span className="text-primary-foreground/40 text-sm">{cases.length} قضية</span>
                </div>
                <div className="divide-y divide-primary-foreground/5">
                  {cases.map((c) => {
                    const status = statusConfig[c.status as keyof typeof statusConfig];
                    const StatusIcon = status.icon;
                    return (
                      <div key={c.id} className="p-5 flex items-center justify-between hover:bg-primary-foreground/5 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${status.className}`}>
                            <StatusIcon size={18} />
                          </div>
                          <div>
                            <p className="text-primary-foreground font-medium text-sm">{c.title}</p>
                            <p className="text-primary-foreground/40 text-xs">{c.type} • {c.date}</p>
                          </div>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full border ${status.className}`}>{status.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="space-y-4">
              <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-4xl font-black text-secondary">{profileData.rating}</p>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < Math.floor(profileData.rating) ? "text-secondary fill-secondary" : "text-primary-foreground/20"} />
                      ))}
                    </div>
                    <p className="text-primary-foreground/40 text-xs mt-1">{reviews.length} تقييم</p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count = reviews.filter((r) => r.rating === star).length;
                      const pct = (count / reviews.length) * 100;
                      return (
                        <div key={star} className="flex items-center gap-2 text-xs">
                          <span className="text-primary-foreground/50 w-4">{star}</span>
                          <Star size={10} className="text-secondary fill-secondary" />
                          <div className="flex-1 h-2 bg-primary-foreground/10 rounded-full overflow-hidden">
                            <div className="h-full bg-secondary rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-primary-foreground/40 w-6 text-left">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {reviews.map((review) => (
                <div key={review.id} className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                        <span className="text-secondary font-bold text-sm">{review.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-primary-foreground font-medium text-sm">{review.name}</p>
                        <p className="text-primary-foreground/40 text-xs">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={i < review.rating ? "text-secondary fill-secondary" : "text-primary-foreground/20"} />
                      ))}
                    </div>
                  </div>
                  <p className="text-primary-foreground/70 text-sm leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default MyProfile;
