import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const PlatformSaleBanner = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-l from-secondary/20 via-secondary/10 to-transparent border border-secondary/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-secondary/20 p-3 rounded-xl">
              <Sparkles size={24} className="text-secondary" />
            </div>
            <div>
              <h3 className="text-foreground font-bold text-lg">استشارة قانونية مجانية</h3>
              
            </div>
          </div>
          <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold px-8 whitespace-nowrap">
            سجّل الآن مجاناً
          </Button>
        </div>
      </div>
    </section>);

};

export default PlatformSaleBanner;