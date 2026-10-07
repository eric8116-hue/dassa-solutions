/* Guided-ride copy for Manufacturing. Loaded only when this business is picked. */
(window.DASSA_FLOW = window.DASSA_FLOW || {})['Manufacturing'] = {
      role: 'Virtual Plant Call Desk',
      photos: ['assets/scenes/trade-tools.webp', 'assets/scenes/trade-tools.webp', 'assets/scenes/trade-tools.webp', 'assets/scenes/trade-tools.webp'],
      hook: {
        "title": "Front Office: who’s answering when the plant manager is on the floor?",
        "paras": [
          "A supplier calls about a late shipment. The plant manager is on the floor, and the front office can only try a personal cell. The call bounces from desk to desk until it lands on voicemail.",
          "Floor workers are deskless, shifts rotate, and coordination runs through whoever’s cell is handy. Suppliers hunt for purchasing and customers hunt for sales."
        ],
        "bullets": [
          "A supplier call that bounces around the plant ends up in voicemail.",
          "Floor staff are reached on personal phones the company doesn’t own.",
          "Suppliers and customers hunt for the right person."
        ]
      },
      problems: [
        {
          "head": "The floor is hard to reach",
          "text": "Floor workers are away from a desk and shifts rotate. The office reaches people on personal phones, one cell at a time.",
          "bullets": [
            "Floor staff are unreachable on company lines.",
            "Shift coordination lives on personal phones.",
            "A late-shipment call waits while someone hunts for the right person."
          ]
        },
        {
          "head": "Calls bounce until they hit voicemail",
          "text": "Supplier and customer calls are time-sensitive. They bounce between purchasing, scheduling and sales until nobody picks up.",
          "bullets": [
            "Suppliers hunt for purchasing.",
            "Customers hunt for sales.",
            "Nobody knows how many calls went unanswered."
          ]
        }
      ],
      solutions: [
        {
          "head": "Every call goes to the right person",
          "bullets": [
            "The phone answers and sends supplier and customer calls to purchasing, scheduling or sales.",
            "Callers are offered a callback instead of bouncing until voicemail.",
            "You can see every call you missed.",
            "Spam calls are screened out before they tie up your lines."
          ]
        },
        {
          "head": "Floor staff on business lines",
          "bullets": [
            "Your team gets a business line through a softphone app on their own phones. Your business rules apply to it, calls are recorded, and the number and call history stay with the company.",
            "Office, floor and shipping can be reached on lines the company owns.",
            "The right person is notified the moment a call needs them."
          ]
        }
      ],
      meet: {
        "title": "Meet your Virtual Plant Call Desk",
        "benefits": [
          "Notifies the right person to take a supplier or customer request.",
          "Directs each call to purchasing, scheduling, sales or shipping.",
          "Sends a notification the moment a call needs a person."
        ],
        "intro": "It does the phone half of the front office’s job: answering, routing and taking details, so the office isn’t chasing people across the plant.",
        "ways": [
          {
            "head": "As a backup",
            "text": "Your front office still answers first. When everyone is busy or the plant manager is on the floor, the Virtual Plant Call Desk catches what would have gone to voicemail."
          },
          {
            "head": "As the full replacement",
            "text": "It answers every call from the start, and calls come to your people only when a person is needed."
          }
        ]
      },
      place: 'plant',
      summary: "In the 20-minute audit we look at how floor staff are reached, where supplier and customer calls go, and what happens to calls that bounce between desks.",
      auditLabel: 'Book a 20-minute audit'
};
