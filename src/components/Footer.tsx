import { Phone, Mail, MapPin } from "lucide-react";
import snadLogo from "@/assets/snad-logo.png";

const Footer = () => {
  return (
    <footer id="contact" className="bg-primary pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <img src={snadLogo} alt="سند - خدمات القانون والمحامين" className="h-40 w-auto object-contain brightness-0 invert" />
            </div>
            <p className="text-primary-foreground/50 text-sm leading-relaxed">
              المنصة القانونية الأولى في المملكة العربية السعودية لربط العملاء بأفضل المحامين المعتمدين.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-primary-foreground font-bold mb-4">روابط سريعة</h4>
            <ul className="space-y-2 text-sm">
              {["الرئيسية", "خدماتنا", "المحامين", "من نحن"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-primary-foreground/50 hover:text-secondary transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-primary-foreground font-bold mb-4">خدماتنا</h4>
            <ul className="space-y-2 text-sm">
              {["استشارات قانونية", "صياغة العقود", "تأسيس الشركات", "الترافع والتقاضي"].map((s) => (
                <li key={s}>
                  <a href="#" className="text-primary-foreground/50 hover:text-secondary transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-primary-foreground font-bold mb-4">تواصل معنا</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-primary-foreground/50">
                <Phone size={14} className="text-secondary" />
                <span dir="ltr">+966 50 000 0000</span>
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/50">
                <Mail size={14} className="text-secondary" />
                info@snadksa.com
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/50">
                <MapPin size={14} className="text-secondary" />
                الرياض، المملكة العربية السعودية
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 text-center">
          <p className="text-primary-foreground/40 text-xs">
            © {new Date().getFullYear()} منصة سند للخدمات القانونية. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
