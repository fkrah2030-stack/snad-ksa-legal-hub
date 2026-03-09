import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import snadLogo from "@/assets/snad-logo.png";

const navLinks = [
  { label: "الرئيسية", href: "#" },
  { label: "خدماتنا", href: "#services" },
  { label: "المحامين", href: "#lawyers" },
  { label: "من نحن", href: "#about" },
  { label: "تواصل معنا", href: "#contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-primary/95 backdrop-blur-md border-b border-primary-foreground/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={snadLogo} alt="سند" className="h-10 w-10 object-contain" />
            <div className="flex flex-col">
              <span className="text-primary-foreground font-bold text-xl leading-tight">سند</span>
              <span className="text-secondary text-[10px] leading-tight">SNAD KSA</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-primary-foreground/80 hover:text-secondary transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-sm">
                تسجيل دخول
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-sm font-bold">
                انضم كمحامي
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-primary-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-primary-foreground/10 mt-2 pt-4">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-primary-foreground/80 hover:text-secondary transition-colors py-2 text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-2 mt-3">
                <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground flex-1 text-sm">
                  تسجيل دخول
                </Button>
                <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground flex-1 text-sm font-bold">
                  انضم كمحامي
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
