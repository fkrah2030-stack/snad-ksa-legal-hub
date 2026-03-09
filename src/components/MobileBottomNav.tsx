import { Home, Scale, Users, Info, Phone } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback } from "react";

const navItems = [
  { icon: Home, label: "الرئيسية", href: "/" },
  { icon: Scale, label: "خدماتنا", href: "/#services" },
  { icon: Users, label: "المحامين", href: "/#lawyers" },
  { icon: Info, label: "من نحن", href: "/#about" },
  { icon: Phone, label: "تواصل", href: "/#contact" },
];

const MobileBottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = useCallback((href: string) => {
    if (href === "/") {
      navigate("/");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const hash = href.replace("/", "");
    if (location.pathname === "/") {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, [navigate, location.pathname]);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/" && !location.hash;
    return false;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-primary/95 backdrop-blur-lg border-t border-primary-foreground/10 safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => handleClick(item.href)}
            className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full min-w-[44px] min-h-[44px] transition-colors ${
              isActive(item.href)
                ? "text-secondary"
                : "text-primary-foreground/60 active:text-secondary"
            }`}
          >
            <item.icon size={20} />
            <span className="text-[10px] font-medium leading-tight">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
