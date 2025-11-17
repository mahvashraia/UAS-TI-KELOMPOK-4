import { Instagram, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

const socials = [
  { name: "MANTRA UI", handle: "@mantraui", url: "https://instagram.com/mantraui" },
  { name: "ENTHU FEST", handle: "@enthufest", url: "https://instagram.com/enthufest" },
  { name: "KAMIKASI UI", handle: "@kamikasi.ui", url: "https://instagram.com/kamikasi.ui" },
  { name: "BSO BAND FEBUI", handle: "@bsobandfebui", url: "https://instagram.com/bsobandfebui" },
];

const SocialsSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="socials" className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-amador text-5xl md:text-6xl text-center mb-12 text-primary">
          Socials
        </h2>

        <div className="relative">
          <Button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-primary text-primary-foreground hover:bg-primary/90"
            size="icon"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <div ref={scrollContainerRef} className="overflow-x-auto pb-8 scrollbar-hide">
            <div className="flex gap-6 min-w-max px-12">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="w-80 h-96 bg-card border-2 border-primary rounded-lg p-6 hover:scale-105 transition-transform">
                  <div className="flex flex-col items-center justify-center h-full space-y-4">
                    <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Instagram className="w-12 h-12 text-primary-foreground" />
                    </div>
                    
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {social.name}
                      </h3>
                      <p className="text-muted-foreground text-lg">{social.handle}</p>
                    </div>

                    <div className="text-center text-sm text-muted-foreground mt-auto">
                      Click to visit Instagram
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

          <Button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-primary text-primary-foreground hover:bg-primary/90"
            size="icon"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SocialsSection;
