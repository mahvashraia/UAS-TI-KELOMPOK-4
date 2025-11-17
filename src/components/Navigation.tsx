import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "calendar", "events", "socials"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "calendar", label: "Calendar" },
    { id: "events", label: "Events" },
    { id: "socials", label: "Socials" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#e5e000] border-b-2 border-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-center gap-2 md:gap-6">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => scrollToSection(item.id)}
              className={`font-amador text-2xl md:text-3xl transition-all hover:scale-105 ${
                activeSection === item.id
                  ? "text-white font-bold"
                  : "text-white"
              }`}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
