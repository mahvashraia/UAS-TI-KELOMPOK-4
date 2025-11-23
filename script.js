document.addEventListener('DOMContentLoaded', () => {
    
    // --- CALENDAR LOGIC ---
    const calendarGrid = document.getElementById('calendarGrid');
    const monthYearText = document.getElementById('monthYear');
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');
    const eventCard = document.getElementById('eventCard');

    // Event Data (Year-Month-Day : 0-indexed month for JS, so 9 is Oct)
    // Added an 'organizer' field for the business card layout
    const events = {
        "2025-10-7": { title: "Magis Vol. 2", loc: "FIB UI", date: "7 November 2025", org: "MANTRA UI", desc: "Irama, Gaul, Dahsyat!" },
        "2025-10-9": { title: "JGTC", loc: "FEB UI", date: "9 November 2025", org: "Jazz Goes To Campus", desc: "Serenading Jazz for the youth" },
        "2025-9-16": { title: "Enthufest", loc: "Balairung UI", date: "16 October 2025", org: "Enthufest Committee", desc: "Buku, Pesta... Musik!" },
        "2025-10-2": { title: "StudentNite", loc: "FISIP UI", date: "2 November 2025", org: "FISIP UI", desc: "Harmony in the Nite! With music we UNITE!" },
        "2025-10-25": { title: "AKAMSI", loc: "VOKASI UI", date: "25 November 2025", org: "KAMIKASI UI", desc: "Aksi Kamikasi, Musik Penuh Energi!" },
        "2025-8-23": { title: "Sapa Malam", loc: "FEB UI", date: "23 September 2025", org: "BSO Band FEB UI", desc: "Lets Jam!" }
    };

    let currentDate = new Date(2025, 9, 1); // Start October 2025

    function renderCalendar(date) {
        calendarGrid.innerHTML = ""; // Clear existing
        const year = date.getFullYear();
        const month = date.getMonth();

        // Update Header Text
        const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
        monthYearText.innerText = `${monthNames[month]} ${year}`;

        // Header Days (S M T W T F S)
        const daysShort = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        daysShort.forEach(d => {
            const header = document.createElement('div');
            header.innerText = d;
            header.classList.add('day-header');
            calendarGrid.appendChild(header);
        });

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Empty slots for days before the 1st of the month
        for (let i = 0; i < firstDay; i++) {
            calendarGrid.appendChild(document.createElement('div'));
        }

        // Fill in the days
        for (let i = 1; i <= daysInMonth; i++) {
            const dayEl = document.createElement('div');
            dayEl.innerText = i;
            dayEl.classList.add('day');
            
            // Check if this date has an event
            const eventKey = `${year}-${month}-${i}`;
            if (events[eventKey]) {
                dayEl.classList.add('has-event', 'clickable');
                // Add click handler to show card
                dayEl.addEventListener('click', (e) => {
                    // Prevent bubbling so clicking the day doesn't immediately trigger the document click listener
                    e.stopPropagation(); 
                    showEventCard(events[eventKey]);
                });
            }

            calendarGrid.appendChild(dayEl);
        }
    }

    function showEventCard(data) {
        // Populate Card Data
        document.getElementById('cardTitle').innerText = data.title;
        document.getElementById('cardDate').innerText = data.date;
        document.getElementById('cardLoc').innerText = data.loc;
        document.getElementById('cardOrg').innerText = data.org;
        document.getElementById('cardDesc').innerText = data.desc; 
        
        // Show Card (triggers CSS transition)
        eventCard.classList.add('active');
    }

    function hideEventCard() {
        eventCard.classList.remove('active');
    }

    // --- EVENT LISTENERS ---

    // Month Navigation
    prevBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
        hideEventCard(); // Hide card when changing month
    });

    nextBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
        hideEventCard();
    });

    // Click anywhere else to close the card
    document.addEventListener('click', (e) => {
        // If card is active AND the click is NOT inside the card AND NOT inside the calendar wrapper
        if (eventCard.classList.contains('active') && 
            !eventCard.contains(e.target) && 
            !document.querySelector('.calendar-wrapper').contains(e.target)) {
            hideEventCard();
        }
    });

    // --- SCROLL INTERSECTION OBSERVER (HIDE CARD ON SCROLL) ---
    // If user scrolls away from calendar section, hide the business card
    const calendarSection = document.getElementById('calendar-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If calendar section is NOT intersecting (not visible)
            if (!entry.isIntersecting) {
                hideEventCard();
            }
        });
    }, { threshold: 0.1 }); // Trigger immediately when section starts leaving

    observer.observe(calendarSection);


    // --- SOCIALS HORIZONTAL SCROLL ---
    const scrollLeft = document.getElementById('scrollSocialsLeft');
    const scrollRight = document.getElementById('scrollSocialsRight');
    const socialTrack = document.getElementById('socialsTrack');

    scrollLeft.addEventListener('click', () => {
        socialTrack.scrollBy({ left: -400, behavior: 'smooth' });
    });

    scrollRight.addEventListener('click', () => {
        socialTrack.scrollBy({ left: 400, behavior: 'smooth' });
    });


    // --- SPOTIFY TOGGLE ---
    const spotifyToggle = document.getElementById('spotifyToggle');
    const spotifyWidget = document.getElementById('spotifyWidget');

    spotifyToggle.addEventListener('click', () => {
        spotifyWidget.classList.toggle('collapsed');
    });

    // Initialize Calendar on Load
    renderCalendar(currentDate);

});