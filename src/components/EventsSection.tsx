const events = [
  {
    title: "Magis Vol.2 | MANTRA UI",
    date: "7/10/25",
    location: "Ruang Baca Terbuka, FIB UI",
    time: "18:00 PM",
    description: "Wear your best costume to this Halloween themed party! with eerie rythms, haunting lights, and the wildest vibes of the year!",
  },
  {
    title: "JGTC : Jazz Goes To Campus",
    date: "9/10/25",
    location: "Ruang Baca Terbuka, FIB UI",
    time: "18:00 PM",
    description: "Experience the smooth sounds of jazz in this annual campus tradition!",
  },
];

const EventsSection = () => {
  return (
    <section id="events" className="min-h-screen py-20 px-4 bg-paper">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-amador text-5xl md:text-6xl text-center mb-12 text-paper-foreground border-b-4 border-paper-foreground pb-4">
          EVENTS
        </h2>

        <div className="space-y-8">
          {events.map((event, index) => (
            <div
              key={index}
              className="border-b-2 border-paper-foreground/30 pb-6 hover:border-accent transition-colors"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-2xl md:text-3xl font-franklin font-bold text-paper-foreground flex-1">
                  {event.title}
                </h3>
                <span className="text-xl font-franklin font-bold text-accent ml-4">{event.date}</span>
              </div>

              <div className="space-y-1 text-paper-foreground/80 font-franklin">
                <p>
                  <span className="font-semibold">Lokasi:</span> {event.location}
                </p>
                <p>
                  <span className="font-semibold">Waktu:</span> {event.time}
                </p>
                <p className="mt-3 leading-relaxed">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
