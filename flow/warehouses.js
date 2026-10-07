/* Guided-ride copy for Warehouses. Loaded only when this business is picked. */
(window.DASSA_FLOW = window.DASSA_FLOW || {})['Warehouses'] = {
      role: 'Virtual Dock Desk',
      photos: ['assets/scenes/movers-van-ramp.webp', 'assets/scenes/movers-van-ramp.webp', 'assets/scenes/movers-van-ramp.webp', 'assets/scenes/movers-van-ramp.webp'],
      hook: {
        "title": "Operations Manager: who’s answering when the floor lead is on the floor?",
        "paras": [
          "A carrier is on hold about a late dock appointment. The floor lead is somewhere on the floor, and the office has no quick way to reach them.",
          "The floor is loud, deskless and runs multiple shifts. Office-to-floor coordination happens on foot or on personal cells, and carrier calls bounce until they find the right person."
        ],
        "bullets": [
          "Carrier and dock status calls interrupt the floor all day.",
          "Reaching the floor means walking it, or a personal cell.",
          "Carrier calls bounce until they find the right person."
        ]
      },
      problems: [
        {
          "head": "Carrier and status calls interrupt the floor",
          "text": "Carrier scheduling and dock status calls come in all day. They reach whoever picks up, not the person who can answer.",
          "bullets": [
            "Carriers wait on hold about dock appointments.",
            "Calls pull people off the floor.",
            "Nobody knows how many calls were missed."
          ]
        },
        {
          "head": "The floor is hard to reach",
          "text": "Floor leads work across shifts without desks. The office reaches them on foot or on personal cells the company doesn’t own.",
          "bullets": [
            "Floor leads are reached on personal cells.",
            "Multiple sites have separate phone systems.",
            "Shift handoffs lose details in scattered texts."
          ]
        }
      ],
      solutions: [
        {
          "head": "Carrier calls reach the right person",
          "bullets": [
            "The phone answers and routes carrier and status calls to the people who can answer.",
            "When everyone is busy, callers are offered a callback instead of a busy signal.",
            "You can see every call you missed.",
            "Spam calls are screened out before they tie up your lines."
          ]
        },
        {
          "head": "The floor on company lines",
          "bullets": [
            "Every floor lead gets a business line through a softphone app on their own phone. Your business rules apply to it, calls are recorded, and the number and call history stay with the company.",
            "Direct texting from the company’s own number keeps shift updates with the company.",
            "The right person is notified the moment a call needs them."
          ]
        }
      ],
      meet: {
        "title": "Meet your Virtual Dock Desk",
        "benefits": [
          "Books dock appointments where your system is connected, or notifies the right person to book.",
          "Directs each call to the office, a floor lead or the right site.",
          "Sends a notification the moment a carrier call needs a person."
        ],
        "intro": "It does the phone half of the dock office’s job: answering carrier calls, taking details and routing each call, so the floor can keep moving.",
        "ways": [
          {
            "head": "As a backup",
            "text": "Your office still answers first. When the floor is busy and carrier calls keep coming, the Virtual Dock Desk catches what would have rung out."
          },
          {
            "head": "As the full replacement",
            "text": "It answers every call from the start, and calls come to your people only when a person is needed."
          }
        ]
      },
      place: 'warehouse',
      summary: "In the 20-minute audit we look at who answers carrier and dock calls, how the office reaches floor leads on every shift, and how sites share call routing.",
      auditLabel: 'Book a 20-minute audit'
};
