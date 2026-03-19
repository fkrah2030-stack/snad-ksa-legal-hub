import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, User, Phone, ArrowRight, Briefcase, Scale } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import snadLogo from "@/assets/snad-logo.png";

type AccountType = "client" | "lawyer";

const Register = () => {
  const [accountType, setAccountType] = useState<AccountType>("client");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password || !confirmPassword) {
      toast.error("يرجى تعبئة جميع الحقول المطلوبة");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("كلمتا المرور غير متطابقتين");
      return;
    }
    if (password.length < 6) {
      toast.error("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }
    if (accountType === "lawyer" && !licenseNumber) {
      toast.error("يرجى إدخال رقم الرخصة");
      return;
    }

    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, phone, account_type: accountType },
        emailRedirectTo: window.location.origin,
      },
    });
    setIsLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      // If lawyer, add lawyer role and create lawyer record
      if (accountType === "lawyer" && data.user) {
        await supabase.from("user_roles").insert({ user_id: data.user.id, role: "lawyer" as any });
        await supabase.from("lawyers").insert({
          user_id: data.user.id,
          name: fullName,
          specialty: specialty || "عام",
          city: "",
          phone,
          email,
          license_number: licenseNumber,
          is_verified: false,
          is_active: false,
        });
      }
      toast.success("تم إنشاء الحساب بنجاح! تحقق من بريدك الإلكتروني للتفعيل.");
      navigate("/login");
    }
  };

  const specialties = [
    "قانون تجاري", "قانون أسري", "قانون جنائي", "قانون عمالي",
    "قانون مدني", "تحكيم تجاري", "قانون إداري", "ملكية فكرية",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center font-arabic p-4 py-10 bg-gradient-to-br from-primary via-primary/95 to-primary/80 relative overflow-hidden" dir="rtl">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 animate-float-reverse" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/8 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 animate-float-slow" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary-foreground/5 rounded-full blur-2xl animate-pulse-glow" />
      <div className="w-full max-w-lg relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-4">
            <img src={snadLogo} alt="سند - خدمات القانون والمحامين" className="h-40 md:h-48 w-auto object-contain" />
          </Link>
          <h1 className="text-2xl font-bold text-primary-foreground mt-4">إنشاء حساب جديد</h1>
          <p className="text-primary-foreground/60 text-sm mt-2">انضم إلى منصة سند القانونية</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-primary-foreground/5 backdrop-blur-md border border-primary-foreground/10 rounded-2xl p-8 space-y-5">
          {/* Account type selector */}
          <div className="space-y-2">
            <label className="text-primary-foreground/80 text-sm font-medium">نوع الحساب</label>
            <div className="grid grid-cols-2 gap-3">
              <button type="button" onClick={() => setAccountType("client")}
                className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border transition-all text-sm font-medium ${
                  accountType === "client" ? "bg-secondary/20 border-secondary text-secondary" : "bg-primary-foreground/5 border-primary-foreground/15 text-primary-foreground/60 hover:border-primary-foreground/30"
                }`}>
                <User size={18} /> عميل
              </button>
              <button type="button" onClick={() => setAccountType("lawyer")}
                className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border transition-all text-sm font-medium ${
                  accountType === "lawyer" ? "bg-secondary/20 border-secondary text-secondary" : "bg-primary-foreground/5 border-primary-foreground/15 text-primary-foreground/60 hover:border-primary-foreground/30"
                }`}>
                <Scale size={18} /> محامي
              </button>
            </div>
          </div>

          {/* Full name */}
          <div className="space-y-2">
            <label className="text-primary-foreground/80 text-sm font-medium">الاسم الكامل *</label>
            <div className="relative">
              <User className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/40" size={18} />
              <Input type="text" placeholder="أدخل اسمك الكامل" value={fullName} onChange={(e) => setFullName(e.target.value)}
                className="bg-primary-foreground/5 border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/30 pr-10 py-3 rounded-xl focus:border-secondary/50" />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-primary-foreground/80 text-sm font-medium">البريد الإلكتروني *</label>
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/40" size={18} />
              <Input type="email" placeholder="example@email.com" value={email} onChange={(e) => setEmail(e.target.value)}
                className="bg-primary-foreground/5 border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/30 pr-10 py-3 rounded-xl focus:border-secondary/50" dir="ltr" />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-primary-foreground/80 text-sm font-medium">رقم الجوال</label>
            <div className="relative">
              <Phone className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/40" size={18} />
              <Input type="tel" placeholder="+966 5X XXX XXXX" value={phone} onChange={(e) => setPhone(e.target.value)}
                className="bg-primary-foreground/5 border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/30 pr-10 py-3 rounded-xl focus:border-secondary/50" dir="ltr" />
            </div>
          </div>

          {/* Lawyer fields */}
          {accountType === "lawyer" && (
            <>
              <div className="space-y-2">
                <label className="text-primary-foreground/80 text-sm font-medium">رقم رخصة المحاماة *</label>
                <div className="relative">
                  <Briefcase className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/40" size={18} />
                  <Input type="text" placeholder="أدخل رقم الرخصة" value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)}
                    className="bg-primary-foreground/5 border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/30 pr-10 py-3 rounded-xl focus:border-secondary/50" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-primary-foreground/80 text-sm font-medium">التخصص القانوني</label>
                <select value={specialty} onChange={(e) => setSpecialty(e.target.value)}
                  className="w-full bg-primary-foreground/5 border border-primary-foreground/15 text-primary-foreground rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-secondary/50">
                  <option value="" className="bg-primary text-primary-foreground">اختر التخصص</option>
                  {specialties.map((s) => <option key={s} value={s} className="bg-primary text-primary-foreground">{s}</option>)}
                </select>
              </div>
            </>
          )}

          {/* Password */}
          <div className="space-y-2">
            <label className="text-primary-foreground/80 text-sm font-medium">كلمة المرور *</label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/40" size={18} />
              <Input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}
                className="bg-primary-foreground/5 border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/30 pr-10 pl-10 py-3 rounded-xl focus:border-secondary/50" dir="ltr" />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-foreground/40 hover:text-primary-foreground/60">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm password */}
          <div className="space-y-2">
            <label className="text-primary-foreground/80 text-sm font-medium">تأكيد كلمة المرور *</label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/40" size={18} />
              <Input type={showPassword ? "text" : "password"} placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-primary-foreground/5 border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/30 pr-10 py-3 rounded-xl focus:border-secondary/50" dir="ltr" />
            </div>
          </div>

          {/* Terms */}
          <label htmlFor="terms" className="flex items-center gap-3 cursor-pointer group py-2 select-none">
            <Checkbox
              id="terms"
              required
              className="h-5 w-5 shrink-0 rounded border-2 border-primary-foreground/30 ring-offset-background transition-all duration-200 hover:border-secondary/70 focus-visible:ring-2 focus-visible:ring-secondary/50 focus-visible:ring-offset-2 data-[state=checked]:bg-secondary data-[state=checked]:border-secondary data-[state=checked]:text-secondary-foreground group-hover:border-secondary/60"
            />
            <span className="text-primary-foreground/60 text-sm leading-relaxed group-hover:text-primary-foreground/80 transition-colors">
              أوافق على <a href="#" className="text-secondary hover:underline font-medium" onClick={e => e.stopPropagation()}>شروط الاستخدام</a> و{" "}
              <a href="#" className="text-secondary hover:underline font-medium" onClick={e => e.stopPropagation()}>سياسة الخصوصية</a>
            </span>
          </label>

          {/* Submit */}
          <Button type="submit" disabled={isLoading} className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold py-3 rounded-xl text-base">
            {isLoading ? "جارِ إنشاء الحساب..." : "إنشاء حساب"}
          </Button>

          {/* Login link */}
          <p className="text-center text-primary-foreground/50 text-sm pt-2">
            لديك حساب بالفعل؟{" "}
            <Link to="/login" className="text-secondary font-medium hover:underline">تسجيل الدخول</Link>
          </p>
        </form>

        {/* Back */}
        <div className="text-center mt-6">
          <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/40 hover:text-primary-foreground/60 text-sm transition-colors">
            <ArrowRight size={16} />
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
