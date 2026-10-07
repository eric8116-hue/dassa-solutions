/* Guided-ride copy for Logistics / 3PL. Loaded only when this business is picked. */
(window.DASSA_FLOW = window.DASSA_FLOW || {})['Logistics / 3PL'] = {
      role: 'Virtual Dispatch & Customer Service Desk',
      photos: ['assets/scenes/dispatch-console.webp', 'assets/scenes/dispatch-console.webp', 'assets/scenes/dispatch-console.webp', 'assets/scenes/dispatch-console.webp'],
      hook: {
        "title": "Operations Manager: who’s answering the status calls?",
        "paras": [
          "Shipment-status calls flood customer service while drivers and dock crews can’t be reached because they’re on personal phones the company doesn’t own.",
          "Dispatch and dock coordination happen by text on someone’s own cell, and nobody else can see it."
        ],
        "bullets": [
          "Status calls swamp customer service.",
          "Drivers and dock staff are on personal phones.",
          "Multi-shift, multi-site routing is hard to manage."
        ]
      },
      problems: [
        {
          "head": "Status calls flood customer service",
          "text": "“Where is my shipment?” calls tie up the desk all day, and a new-account call can ring out behind them.",
          "bullets": [
            "Status calls crowd out new business.",
            "A new-account call can go to voicemail.",
            "Nobody knows how many calls were missed."
          ]
        },
        {
          "head": "Drivers and dock crews are on personal phones",
          "text": "A deskless workforce runs on personal phones the operation doesn’t own. Dispatch and dock coordination are scattered.",
          "bullets": [
            "Drivers are hard to reach from the office.",
            "Numbers walk out the door with the person.",
            "Multi-shift routing is hard to manage."
          ]
        }
      ],
      solutions: [
        {
          "head": "Every call gets routed",
          "bullets": [
            "The phone answers and sends each call to dispatch, the dock or customer service.",
            "When everyone is busy, callers are offered a callback instead of a busy signal.",
            "Spam calls are screened out before they tie up your lines.",
            "You can see every call you missed."
          ]
        },
        {
          "head": "Business lines for the floor",
          "bullets": [
            "Your team gets a business line through a softphone app on their own phones. Your business rules apply to it, calls are recorded, and the number and call history stay with the company.",
            "The number and call history stay with the company, and the number can be reassigned when someone leaves.",
            "The right person is notified the moment a call needs them.",
            "Texts to customers go out from the company’s own number."
          ]
        }
      ],
      meet: {
        "title": "Meet your Virtual Dispatch & Customer Service Desk",
        "benefits": [
          "Books pickups and appointments where your calendar is connected, or notifies the right person to book.",
          "Directs each call to dispatch, the dock or customer service.",
          "Sends a notification the moment a call needs a person."
        ],
        "intro": "It does the phone half of the desk’s job: answering, routing and taking details, so dispatch and customer service can keep freight moving.",
        "ways": [
          {
            "head": "As a backup",
            "text": "Your desk still answers first. When status calls pile up and every line is busy, the Virtual Dispatch & Customer Service Desk catches what would have gone to voicemail."
          },
          {
            "head": "As the full replacement",
            "text": "It answers every call from the start, and calls come to your people only when a person is needed."
          }
        ]
      },
      place: 'operation',
      summary: "In the 20-minute audit we look at who answers status calls, how drivers and dock crews are reached, and where new-account calls go.",
      auditLabel: 'Book a 20-minute audit'
};
