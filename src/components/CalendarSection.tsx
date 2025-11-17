import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import EventCard from "./EventCard";

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  time: string;
  description: string;
}

const events: Event[] = [
  {
    id: 1,
    title: "Magis Vol.2 | MANTRA UI",
    date: "2025-10-07",
    location: "Ruang Baca Terbuka, FIB UI",
    time: "18:00 PM",
    description: "Wear your best costume to this Halloween themed party! with eerie rythms, haunting lights, and the wildest vibes of the year!",
  },
  {
    id: 2,
    title: "JGTC : Jazz Goes To Campus",
    date: "2025-10-09",
    location: "Ruang Baca Terbuka, FIB UI",
    time: "18:00 PM",
    description: "Experience the smooth sounds of jazz in this annual campus tradition!",
  },
];

const CalendarSection = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 1)); // October 2025
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    return { firstDay, daysInMonth };
  };

  const getEventForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.find(event => event.date === dateStr);
  };

  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
    setSelectedEvent(null);
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <section id="calendar" className="min-h-screen py-20 px-4 flex items-center justify-center">
      <div className="max-w-7xl w-full">
        <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="bg-card p-8 rounded-lg border-2 border-primary">
              <div className="flex items-center justify-between mb-6">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => changeMonth(-1)}
                  className="text-foreground hover:text-primary"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <h2 className="text-2xl font-amador text-foreground font-bold text-center uppercase">{monthName}</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => changeMonth(1)}
                className="text-foreground hover:text-primary"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-4">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                <div key={i} className="text-center font-bold text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const event = getEventForDate(day);
                const hasEvent = !!event;

                return (
                  <button
                    key={day}
                    onClick={() => event && setSelectedEvent(event)}
                    className={`
                      aspect-square flex items-center justify-center rounded-lg font-semibold
                      transition-all relative
                      ${hasEvent 
                        ? 'bg-accent text-accent-foreground hover:scale-110 cursor-pointer ring-2 ring-accent' 
                        : 'bg-muted/30 text-foreground hover:bg-muted/50'
                      }
                      ${selectedEvent?.date === event?.date ? 'ring-4 ring-primary' : ''}
                    `}
                  >
                    {day}
                    {hasEvent && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="min-h-[400px]">
            {selectedEvent ? (
              <EventCard event={selectedEvent} onClose={() => setSelectedEvent(null)} />
            ) : (
              <div className="h-full flex items-center justify-center bg-card/50 rounded-lg border-2 border-dashed border-primary/30 p-8">
                <p className="text-center text-muted-foreground text-lg">
                  Click on a highlighted date to see event details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalendarSection;
