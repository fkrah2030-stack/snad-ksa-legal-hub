import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import snadLogo from "@/assets/snad-logo.png";
import type { User as SupaUser } from "@supabase/supabase-js";

const navLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "خدماتنا", href: "/#services" },
  { label: "المحامين", href: "/#lawyers" },
  { label: "الخدمات السريعة", href: "/instant-consultation" },
  { label: "من نحن", href: "/#about" },
  { label: "تواصل معنا", href: "/#contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<SupaUser | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setIsOpen(false);
    if (href === "/") {
      navigate("/");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (href.startsWith("/") && !href.includes("#")) {
      navigate(href);
      return;
    }
    const hash = href.replace("/", "");
    if (location.pathname === "/") {
      const el = document.querySelector(hash);
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const el = document.querySelector(hash);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, [navigate, location.pathname]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("تم تسجيل الخروج");
    navigate("/");
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? "bg-navy-deep/95 backdrop-blur-xl shadow-2xl shadow-navy-deep/20" : "bg-primary/90 backdrop-blur-md"} border-b border-gold/10`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img src={snadLogo} alt="سند" className="h-28 md:h-36 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="relative text-primary-foreground/70 hover:text-gold transition-all duration-300 text-sm font-medium bg-transparent border-none cursor-pointer px-4 py-2 rounded-lg hover:bg-gold/5 group"
              >
                {link.label}
                <span className="absolute bottom-1 right-4 left-4 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right rounded-full" />
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <Avatar className="h-10 w-10 golden-ring">
                      <AvatarFallback className="bg-gold text-secondary-foreground text-sm font-bold font-display">
                        {user.email?.charAt(0).toUpperCase() || "م"}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="text-xs text-muted-foreground cursor-default">
                    {user.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/my-profile")} className="cursor-pointer gap-2">
                    <User size={16} />
                    الملف الشخصي
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer gap-2 text-destructive">
                    <LogOut size={16} />
                    تسجيل الخروج
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="border border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/5 hover:border-gold/30 text-sm rounded-xl transition-all duration-300">
                    تسجيل دخول
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-gold hover:bg-gold-dark text-secondary-foreground text-sm font-bold rounded-xl shadow-lg shadow-gold/20 hover:shadow-gold/30 transition-all duration-300">
                    انضم كمحامي
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-primary-foreground p-2 hover:bg-gold/10 rounded-xl transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden pb-6 border-t border-gold/10 mt-2 pt-4 animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-primary-foreground/70 hover:text-gold hover:bg-gold/5 transition-all duration-300 py-3 px-4 text-sm bg-transparent border-none cursor-pointer text-right rounded-xl"
                >
                  {link.label}
                </button>
              ))}
              {user ? (
                <div className="flex flex-col gap-2 mt-4">
                  <Link to="/my-profile" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" className="border border-primary-foreground/20 text-primary-foreground w-full text-sm gap-2 rounded-xl">
                      <User size={16} />
                      الملف الشخصي
                    </Button>
                  </Link>
                  <Button onClick={() => { handleLogout(); setIsOpen(false); }} variant="ghost" className="border border-destructive/30 text-destructive w-full text-sm gap-2 rounded-xl">
                    <LogOut size={16} />
                    تسجيل الخروج
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2 mt-4">
                  <Link to="/login" className="flex-1" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" className="border border-primary-foreground/20 text-primary-foreground w-full text-sm rounded-xl">
                      تسجيل دخول
                    </Button>
                  </Link>
                  <Link to="/register" className="flex-1" onClick={() => setIsOpen(false)}>
                    <Button className="bg-gold hover:bg-gold-dark text-secondary-foreground w-full text-sm font-bold rounded-xl">
                      انضم كمحامي
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
