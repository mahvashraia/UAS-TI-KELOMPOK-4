import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  time: string;
  description: string;
}

interface EventCardProps {
  event: Event;
  onClose: () => void;
}

const EventCard = ({ event, onClose }: EventCardProps) => {
  return (
    <div className="animate-in slide-in-from-right duration-300 bg-paper text-paper-foreground p-8 rounded-lg shadow-2xl border-4 border-primary/20 relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="absolute top-2 right-2 text-paper-foreground hover:text-accent"
      >
        <X className="w-5 h-5" />
      </Button>

      <div className="space-y-4">
        <div className="border-b-2 border-paper-foreground/20 pb-3">
          <h3 className="text-2xl font-bold font-gothic text-paper-foreground">
            {event.title}
          </h3>
        </div>

        <div className="space-y-2 text-paper-foreground/90">
          <div>
            <span className="font-semibold">Lokasi:</span> {event.location}
          </div>
          <div>
            <span className="font-semibold">Waktu:</span> {event.time}
          </div>
          <div>
            <span className="font-semibold">Tanggal:</span>{" "}
            {new Date(event.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>

        <div className="pt-4 border-t-2 border-paper-foreground/20">
          <p className="text-paper-foreground/80 leading-relaxed">
            {event.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
