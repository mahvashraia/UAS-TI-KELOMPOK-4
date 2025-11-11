const calendarGrid = document.getElementById('calendar-grid');
const eventModal = document.getElementById('event-modal');
const closeModal = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const modalDate = document.getElementById('modal-date');
const modalLocation = document.getElementById('modal-location');
const modalDescription = document.getElementById('modal-description');

// Event data
const events = {
  7: {
    title: "Magis Vol.2 | MANTRA UI",
    date: "7 October 2025",
    location: "Ruang Baca Terbuka, FIB UI",
    description: "Halloween themed party with eerie rhythms, haunting lights, and the wildest vibes of the year!"
  },
  9: {
    title: "JGTC: Jazz Goes To Campus",
    date: "9 October 2025",
    location: "Balairung UI",
    description: "Enjoy smooth jazz performances with food stalls and campus musicians lighting up your evening!"
  }
};

// Generate calendar grid
const daysInMonth = 31;
const firstDayOffset = 2; // Wednesday start (0=Sunday)

for (let i = 0; i < firstDayOffset; i++) {
  const empty = document.createElement('div');
  calendarGrid.appendChild(empty);
}

for (let day = 1; day <= daysInMonth; day++) {
  const dayCell = document.createElement('div');
  dayCell.classList.add('day');
  dayCell.innerText = day;

  // highlight event days
  if (events[day]) {
    dayCell.classList.add('event-day');
  }

  // click handler
  dayCell.addEventListener('click', () => {
    const event = events[day];
    if (event) {
      modalTitle.textContent = event.title;
      modalDate.textContent = `📅 ${event.date}`;
      modalLocation.textContent = `📍 ${event.location}`;
      modalDescription.textContent = event.description;
      eventModal.classList.remove('hidden');
    } else {
      alert(`No event on ${day}/10/2025`);
    }
  });

  calendarGrid.appendChild(dayCell);
}

// close modal
closeModal.addEventListener('click', () => {
  eventModal.classList.add('hidden');
});

// close when clicking outside
eventModal.addEventListener('click', (e) => {
  if (e.target === eventModal) {
    eventModal.classList.add('hidden');
  }
});

// close on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    eventModal.classList.add('hidden');
  }
});

let currentMonth = 9; // October (0 = Jan)
let currentYear = 2025;

function generateCalendar(month, year) {
  calendarGrid.innerHTML = "";

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  monthYear.textContent = `${monthNames[month]} ${year}`;

  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement('div');
    calendarGrid.appendChild(empty);
  }

  // Days
  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement('div');
    dayCell.classList.add('day');
    dayCell.innerText = day;

    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const event = events[dateKey];

    if (event) {
      dayCell.classList.add('event-day');
    }

    dayCell.addEventListener('click', () => {
      if (event) {
        modalTitle.textContent = event.title;
        modalDate.textContent = `📅 ${event.date}`;
        modalLocation.textContent = `📍 ${event.location}`;
        modalDescription.textContent = event.description;
        eventModal.classList.remove('hidden');
      } else {
        alert(`No event on ${day}/${month + 1}/${year}`);
      }
    });

    calendarGrid.appendChild(dayCell);
  }
}

// Month navigation
prevMonthBtn.addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  generateCalendar(currentMonth, currentYear);
});

nextMonthBtn.addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  generateCalendar(currentMonth, currentYear);
});

// Modal control
closeModal.addEventListener('click', () => eventModal.classList.add('hidden'));
eventModal.addEventListener('click', (e) => {
  if (e.target === eventModal) eventModal.classList.add('hidden');
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') eventModal.classList.add('hidden');
});

// Init
generateCalendar(currentMonth, currentYear);

// Smooth scroll for nav buttons
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.getAttribute('data-target');
    const section = document.getElementById(targetId);
    section.scrollIntoView({ behavior: 'smooth' });
  });
});
