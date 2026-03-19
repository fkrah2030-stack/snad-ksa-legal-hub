import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import snadLogo from "@/assets/snad-logo.png";

const Footer = () => {
  return (
    <footer id="contact" className="bg-primary relative overflow-hidden grain-overlay">
      {/* Top gold line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="container mx-auto px-4 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-5">
              <img src={snadLogo} alt="سند" className="h-36 w-auto object-contain" />
            </div>
            <p className="text-primary-foreground/35 text-sm leading-relaxed">
              المنصة القانونية الأولى في المملكة العربية السعودية لربط العملاء بأفضل المحامين المعتمدين.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-primary-foreground font-bold mb-5 font-display">روابط سريعة</h4>
            <div className="gold-line w-8 mb-5" />
            <ul className="space-y-3 text-sm">
              {["الرئيسية", "خدماتنا", "المحامين", "من نحن"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-primary-foreground/35 hover:text-gold transition-colors duration-300">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-primary-foreground font-bold mb-5 font-display">خدماتنا</h4>
            <div className="gold-line w-8 mb-5" />
            <ul className="space-y-3 text-sm">
              {["استشارات قانونية", "صياغة العقود", "تأسيس الشركات", "الترافع والتقاضي"].map((s) => (
                <li key={s}>
                  <a href="#" className="text-primary-foreground/35 hover:text-gold transition-colors duration-300">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-primary-foreground font-bold mb-5 font-display">تواصل معنا</h4>
            <div className="gold-line w-8 mb-5" />
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3 text-primary-foreground/35 hover:text-primary-foreground/50 transition-colors duration-300">
                <div className="bg-gold/10 p-2 rounded-lg">
                  <Phone size={14} className="text-gold" />
                </div>
                <span dir="ltr">+966 550883746</span>
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/35 hover:text-primary-foreground/50 transition-colors duration-300">
                <div className="bg-gold/10 p-2 rounded-lg">
                  <Mail size={14} className="text-gold" />
                </div>
                info@snadksa.com
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/35 hover:text-primary-foreground/50 transition-colors duration-300">
                <div className="bg-gold/10 p-2 rounded-lg">
                  <MapPin size={14} className="text-gold" />
                </div>
                الرياض، المملكة العربية السعودية
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/8 pt-7 flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
          <p className="text-primary-foreground/25 text-xs">
            © {new Date().getFullYear()} منصة سند للخدمات القانونية. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <Link to="/terms" className="text-primary-foreground/25 hover:text-gold transition-colors">شروط الاستخدام</Link>
            <span className="text-primary-foreground/15">|</span>
            <Link to="/privacy" className="text-primary-foreground/25 hover:text-gold transition-colors">سياسة الخصوصية</Link>
          </div>
          <p className="text-primary-foreground/25 text-xs">
            برمجة وتطوير <a href="https://www.mdyaf.sa" target="_blank" rel="noopener noreferrer" className="text-gold/60 font-medium hover:text-gold hover:underline transition-colors duration-300">شركة مضياف العربية لتقنية المعلومات</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
