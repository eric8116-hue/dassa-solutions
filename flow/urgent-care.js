/* Guided-ride copy for Urgent Care. Loaded only when this business is picked. */
(window.DASSA_FLOW = window.DASSA_FLOW || {})['Urgent Care'] = {
      role: 'Virtual Patient Services Desk',
      photos: ['assets/scenes/medical-front-desk.webp', 'assets/scenes/medical-front-desk.webp', 'assets/scenes/medical-front-desk.webp', 'assets/scenes/medical-front-desk.webp'],
      hook: {
        "title": "Front Desk Lead: who’s answering the phone while walk-ins stack up?",
        "paras": [
          "The desk is registering walk-ins and the phone rings: wait-time questions, results, a follow-up. Wait-time calls ring out, and callers hang up.",
          "When one clinic hits capacity, callers disconnect instead of being sent to another location. Employer accounts land in the same line as patients."
        ],
        "bullets": [
          "Wait-time calls bury the desk during registration.",
          "When one clinic maxes out, callers hang up.",
          "Employer accounts clog the patient line."
        ]
      },
      problems: [
        {
          "head": "Wait-time calls bury the desk",
          "text": "Patients call for wait times and results while staff register walk-ins. Someone has to choose between the person at the desk and the phone.",
          "bullets": [
            "Wait-time calls ring out during registration.",
            "Results and follow-up callbacks never stop.",
            "Callers hang up and go to the next clinic."
          ]
        },
        {
          "head": "Overflow and employer accounts",
          "text": "A clinic at capacity can’t pass callers to another location, and occupational-health accounts sit in the same line as walk-in patients.",
          "bullets": [
            "Callers disconnect when one clinic is full.",
            "Employer accounts clog the patient line.",
            "Each location answers only its own phone."
          ]
        }
      ],
      solutions: [
        {
          "head": "Every call gets a path",
          "bullets": [
            "The phone answers with common answers like hours and location, and sends the call where it belongs.",
            "When one clinic is full, overflow can roll to your other locations.",
            "Every caller’s number is captured the moment they call, even when the call isn’t recorded, so no missed call goes unseen.",
            "When everyone is busy, callers are offered a callback instead of a busy signal."
          ]
        },
        {
          "head": "Employer accounts in their own queue",
          "bullets": [
            "Occupational-health calls route to their own queue, away from the patient line.",
            "The right person is notified the moment a call needs them.",
            "You can see every call you missed."
          ]
        }
      ],
      meet: {
        "title": "Meet your Virtual Patient Services Desk",
        "benefits": [
          "Books visits where your calendar is connected, or notifies the right person to book.",
          "Directs each call to the right desk, queue or location.",
          "Sends a notification the moment a call needs a person."
        ],
        "intro": "It does the phone half of the front desk’s job: answering, routing and taking details, so the desk can register the patient in front of it.",
        "ways": [
          {
            "head": "As a backup",
            "text": "Your desk still answers first. When walk-ins stack up and the phone keeps ringing, the Virtual Patient Services Desk catches what would have rung out."
          },
          {
            "head": "As the full replacement",
            "text": "It answers every call from the start, and calls come to your people only when a person is needed."
          }
        ]
      },
      place: 'clinic',
      summary: "In the 20-minute audit we look at who answers wait-time calls during registration, how overflow moves between locations, and where employer accounts are routed.",
      auditLabel: 'Book a 20-minute audit'
};
