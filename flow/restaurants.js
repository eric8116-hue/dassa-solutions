/* Guided-ride copy for Restaurants. Loaded only when this business is picked. */
(window.DASSA_FLOW = window.DASSA_FLOW || {})['Restaurants'] = {
      role: 'Virtual Digital Order Desk',
      photos: ['assets/scenes/restaurant-table.webp', 'assets/scenes/restaurant-table.webp', 'assets/scenes/restaurant-table.webp', 'assets/scenes/restaurant-table.webp'],
      hook: {
        "title": "Manager: who’s answering the phone at 7 p.m.?",
        "paras": [
          "It’s the dinner rush. The phone rings at 7 p.m. and nobody can leave the floor. A takeout call goes unanswered, and every unanswered call is an order placed with someone else.",
          "Catering and large-party calls land at the host stand and get lost. Reservation changes bounce around in phone tag. And you never see the orders you missed, so you can’t count them."
        ],
        "bullets": [
          "A takeout call that rings out is an order placed somewhere else.",
          "Catering and large-party calls get lost at the host stand.",
          "Missed orders are orders you never see, so you can’t count them."
        ]
      },
      problems: [
        {
          "head": "The rush rings out",
          "text": "The phone rings at 7 p.m. and no one can leave the floor. Takeout orders go to whoever answers.",
          "bullets": [
            "Missed takeout calls are orders you never see.",
            "Callers don’t wait. They order from the next restaurant.",
            "Nobody knows what last Friday’s missed calls were worth."
          ]
        },
        {
          "head": "Catering, reservations and each location",
          "text": "Catering and large-party calls land at the host stand and get lost, reservation changes churn through phone tag, and each location answers only its own phone.",
          "bullets": [
            "Catering and large-party calls land at the host stand.",
            "Reservation changes stick in phone tag.",
            "There is no overflow between locations."
          ]
        }
      ],
      solutions: [
        {
          "head": "Every call gets answered",
          "bullets": [
            "The phone answers with your hours and menu details, and queues the call.",
            "When everyone is busy, callers are offered a callback instead of a busy signal.",
            "Catering and large-party calls go straight to the manager.",
            "You can see every call you missed."
          ]
        },
        {
          "head": "Fewer calls, more orders",
          "bullets": [
            "Reservation changes and order-ready updates go out by text from the restaurant’s number.",
            "Overflow between locations lets another location pick up when one is swamped.",
            "Spam calls are screened out before they tie up your lines."
          ]
        }
      ],
      meet: {
        "title": "Meet your Virtual Digital Order Desk",
        "benefits": [
          "Books reservations and catering requests, or notifies the right person to confirm them.",
          "Directs each call, with catering and large parties going to the manager.",
          "Sends a notification the moment a call needs a person."
        ],
        "intro": "It does the phone half of the host stand’s job: answering, routing and taking details while your staff stays on the floor.",
        "ways": [
          {
            "head": "As a backup",
            "text": "Your staff answers first. When the rush hits and nobody can leave the floor, the Virtual Digital Order Desk catches what would have rung out."
          },
          {
            "head": "As the full replacement",
            "text": "It answers every call from the start, and calls come to your people only when a person is needed."
          }
        ]
      },
      place: 'restaurant',
      summary: "In the 20-minute audit we look at who answers during the rush, where catering and large-party calls go, and how locations back each other up.",
      auditLabel: 'Book a 20-minute audit'
};
