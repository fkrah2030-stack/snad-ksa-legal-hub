import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import snadLogo from "@/assets/snad-logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("يرجى إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("تم تسجيل الدخول بنجاح");
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-arabic p-4 bg-gradient-to-br from-primary via-primary/95 to-primary/80 relative overflow-hidden" dir="rtl">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/8 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary-foreground/3 rounded-full blur-2xl" />
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-4">
            <img src={snadLogo} alt="سند - خدمات القانون والمحامين" className="h-20 md:h-24 w-auto object-contain" />
          </Link>
          <h1 className="text-2xl font-bold text-primary-foreground mt-4">تسجيل الدخول</h1>
          <p className="text-primary-foreground/60 text-sm mt-2">أدخل بياناتك للوصول إلى حسابك</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-primary-foreground/5 backdrop-blur-md border border-primary-foreground/10 rounded-2xl p-8 space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-primary-foreground/80 text-sm font-medium">البريد الإلكتروني</label>
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/40" size={18} />
              <Input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-primary-foreground/5 border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/30 pr-10 py-3 rounded-xl focus:border-secondary/50"
                dir="ltr"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-primary-foreground/80 text-sm font-medium">كلمة المرور</label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-foreground/40" size={18} />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-primary-foreground/5 border-primary-foreground/15 text-primary-foreground placeholder:text-primary-foreground/30 pr-10 pl-10 py-3 rounded-xl focus:border-secondary/50"
                dir="ltr"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-foreground/40 hover:text-primary-foreground/60"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div className="flex justify-end">
            <a href="#" className="text-secondary text-xs hover:underline">نسيت كلمة المرور؟</a>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold py-3 rounded-xl text-base"
          >
            {isLoading ? "جارِ تسجيل الدخول..." : "تسجيل الدخول"}
          </Button>

          {/* Divider */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-primary-foreground/10"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-transparent px-4 text-primary-foreground/40 text-xs">أو</span>
            </div>
          </div>

          {/* Google */}
          <Button
            type="button"
            variant="outline"
            className="w-full border-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/5 py-3 rounded-xl"
          >
            تسجيل الدخول بحساب Google
          </Button>

          {/* Register link */}
          <p className="text-center text-primary-foreground/50 text-sm pt-2">
            ليس لديك حساب؟{" "}
            <Link to="/register" className="text-secondary font-medium hover:underline">إنشاء حساب جديد</Link>
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

export default Login;
