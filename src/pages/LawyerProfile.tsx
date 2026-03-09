import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, MapPin, Briefcase, Phone, Mail, Clock, ChevronRight, Calendar, User, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Layout from "@/components/Layout";

const lawyersData: Record<string, {
  name: string; specialty: string; city: string; rating: number; cases: number;
  bio: string; experience: number; phone: string; email: string;
  specialties: string[]; education: string; license: string;
}> = {
  "1": {
    name: "أ. محمد العتيبي", specialty: "قانون تجاري", city: "الرياض", rating: 4.9, cases: 230,
    bio: "محامٍ مرخص متخصص في القانون التجاري والشركات مع خبرة تتجاوز 15 عامًا في المحاكم التجارية بالمملكة العربية السعودية.",
    experience: 15, phone: "+966 50 XXX XXXX", email: "m.alotaibi@snad.sa",
    specialties: ["قانون الشركات", "العقود التجارية", "التحكيم", "الإفلاس"],
    education: "ماجستير قانون تجاري - جامعة الملك سعود", license: "12345/ق",
  },
  "2": {
    name: "أ. سارة القحطاني", specialty: "قانون أسري", city: "جدة", rating: 4.8, cases: 180,
    bio: "محامية متخصصة في قضايا الأحوال الشخصية والأسرة مع خبرة واسعة في قضايا الحضانة والنفقة والطلاق.",
    experience: 10, phone: "+966 55 XXX XXXX", email: "s.alqahtani@snad.sa",
    specialties: ["الحضانة", "النفقة", "الطلاق", "الميراث"],
    education: "بكالوريوس شريعة وقانون - جامعة أم القرى", license: "67890/ق",
  },
  "3": {
    name: "أ. خالد الشمري", specialty: "قانون جنائي", city: "الدمام", rating: 4.7, cases: 310,
    bio: "محامٍ جنائي ذو خبرة واسعة في الترافع أمام المحاكم الجزائية والاستئنافية في المنطقة الشرقية.",
    experience: 20, phone: "+966 54 XXX XXXX", email: "k.alshammari@snad.sa",
    specialties: ["القضايا الجنائية", "المخدرات", "الجرائم المالية", "التزوير"],
    education: "دكتوراه قانون جنائي - جامعة الإمام", license: "11223/ق",
  },
  "4": {
    name: "أ. نورة الحربي", specialty: "قانون عمالي", city: "الرياض", rating: 4.9, cases: 150,
    bio: "محامية متخصصة في نظام العمل والعمال مع خبرة في حل النزاعات العمالية والتسويات الودية.",
    experience: 8, phone: "+966 56 XXX XXXX", email: "n.alharbi@snad.sa",
    specialties: ["فصل تعسفي", "مستحقات نهاية الخدمة", "عقود العمل", "التأمينات"],
    education: "ماجستير قانون - جامعة الأميرة نورة", license: "44556/ق",
  },
};

const LawyerProfile = () => {
  const { id } = useParams<{ id: string }>();
  const lawyer = lawyersData[id || "1"];

  const [formData, setFormData] = useState({ name: "", phone: "", date: "", time: "", details: "" });

  if (!lawyer) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">المحامي غير موجود</h2>
            <Link to="/">
              <Button className="bg-secondary text-secondary-foreground">العودة للرئيسية</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }
    toast.success("تم إرسال طلب الحجز بنجاح! سنتواصل معك قريبًا");
    setFormData({ name: "", phone: "", date: "", time: "", details: "" });
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-primary py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-primary-foreground/60">
            <Link to="/" className="hover:text-secondary transition-colors">الرئيسية</Link>
            <ChevronRight size={14} className="rotate-180" />
            <a href="/#lawyers" className="hover:text-secondary transition-colors">المحامين</a>
            <ChevronRight size={14} className="rotate-180" />
            <span className="text-secondary">{lawyer.name}</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-primary via-primary/95 to-primary/90 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lawyer Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Card */}
              <div className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="w-24 h-24 rounded-full bg-secondary/20 border-2 border-secondary flex items-center justify-center shrink-0">
                    <span className="text-3xl font-bold text-secondary">{lawyer.name.charAt(3)}</span>
                  </div>
                  <div className="text-center sm:text-right flex-1">
                    <h1 className="text-2xl md:text-3xl font-black text-primary-foreground mb-1">{lawyer.name}</h1>
                    <p className="text-secondary font-semibold mb-3">{lawyer.specialty}</p>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-primary-foreground/60 mb-4">
                      <span className="flex items-center gap-1"><MapPin size={14} />{lawyer.city}</span>
                      <span className="flex items-center gap-1"><Briefcase size={14} />{lawyer.cases} قضية</span>
                      <span className="flex items-center gap-1"><Clock size={14} />{lawyer.experience} سنة خبرة</span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className={i < Math.floor(lawyer.rating) ? "text-secondary fill-secondary" : "text-primary-foreground/20"} />
                      ))}
                      <span className="text-secondary text-sm mr-2 font-bold">{lawyer.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-8">
                <h2 className="text-xl font-bold text-primary-foreground mb-4">نبذة عن المحامي</h2>
                <p className="text-primary-foreground/70 leading-relaxed">{lawyer.bio}</p>
              </div>

              {/* Specialties */}
              <div className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-8">
                <h2 className="text-xl font-bold text-primary-foreground mb-4">التخصصات</h2>
                <div className="flex flex-wrap gap-3">
                  {lawyer.specialties.map((s) => (
                    <span key={s} className="bg-secondary/10 text-secondary border border-secondary/20 px-4 py-2 rounded-full text-sm font-medium">{s}</span>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-8">
                <h2 className="text-xl font-bold text-primary-foreground mb-4">معلومات إضافية</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-3 text-primary-foreground/70">
                    <Briefcase size={16} className="text-secondary shrink-0" />
                    <span>رقم الرخصة: {lawyer.license}</span>
                  </div>
                  <div className="flex items-center gap-3 text-primary-foreground/70">
                    <Star size={16} className="text-secondary shrink-0" />
                    <span>{lawyer.education}</span>
                  </div>
                  <div className="flex items-center gap-3 text-primary-foreground/70">
                    <Phone size={16} className="text-secondary shrink-0" />
                    <span>{lawyer.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-primary-foreground/70">
                    <Mail size={16} className="text-secondary shrink-0" />
                    <span>{lawyer.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="lg:col-span-1">
              <div className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-8 sticky top-24">
                <h2 className="text-xl font-bold text-primary-foreground mb-2">احجز استشارة</h2>
                <p className="text-primary-foreground/50 text-sm mb-6">املأ النموذج وسنتواصل معك لتأكيد الموعد</p>

                <form onSubmit={handleBooking} className="space-y-4">
                  <div className="relative">
                    <User size={16} className="absolute right-3 top-3 text-primary-foreground/40" />
                    <Input
                      placeholder="الاسم الكامل *"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 pr-10"
                    />
                  </div>
                  <div className="relative">
                    <Phone size={16} className="absolute right-3 top-3 text-primary-foreground/40" />
                    <Input
                      placeholder="رقم الجوال *"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 pr-10"
                    />
                  </div>
                  <div className="relative">
                    <Calendar size={16} className="absolute right-3 top-3 text-primary-foreground/40" />
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground pr-10"
                    />
                  </div>
                  <div className="relative">
                    <Clock size={16} className="absolute right-3 top-3 text-primary-foreground/40" />
                    <Input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground pr-10"
                    />
                  </div>
                  <div className="relative">
                    <MessageSquare size={16} className="absolute right-3 top-3 text-primary-foreground/40" />
                    <Textarea
                      placeholder="تفاصيل القضية أو الاستشارة..."
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      className="bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/30 pr-10 min-h-[100px]"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold text-base h-12">
                    إرسال طلب الحجز
                  </Button>
                </form>

                <p className="text-primary-foreground/30 text-xs text-center mt-4">سيتم التواصل معك خلال 24 ساعة لتأكيد الموعد</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LawyerProfile;
