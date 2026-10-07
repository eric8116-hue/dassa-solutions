/* Guided-ride copy for Auto Salvage. Loaded only when this business is picked. */
(window.DASSA_FLOW = window.DASSA_FLOW || {})['Auto Salvage'] = {
      role: 'Virtual Parts Counter Desk',
      photos: ['assets/scenes/towing-lot.webp', 'assets/scenes/towing-lot.webp', 'assets/scenes/towing-lot.webp', 'assets/scenes/towing-lot.webp'],
      hook: {
        "title": "Counter Manager: who’s answering the parts line?",
        "paras": [
          "Three part-hunters are on hold, a caller needs Spanish, and the counter is in the middle of a cash sale. Every hang-up buys that part at another yard.",
          "Drivers run tow pickups on personal cells the yard doesn’t own. When a driver leaves, the sellers who have that number leave too."
        ],
        "bullets": [
          "A part-hunter calls five yards and buys from the first to answer.",
          "A caller who can’t reach anyone who can help hangs up.",
          "When a driver leaves, the sellers with that number leave too."
        ]
      },
      problems: [
        {
          "head": "One counter phone carries the whole yard",
          "text": "Counter staff are pinned to the register at the exact minutes calls peak. After-hours cash buyers don’t leave voicemail. They call the next yard.",
          "bullets": [
            "Part-hunters buy from the first yard that answers.",
            "Bilingual callers get passed around and hang up.",
            "Every missed call is inventory on the shelf a day longer."
          ]
        },
        {
          "head": "Drivers run on personal cells",
          "text": "Tow and driver coordination runs on phones the yard doesn’t own, so a pricing dispute comes down to memory instead of a record.",
          "bullets": [
            "Tow pickups run through personal cell numbers.",
            "When a driver quits, the sellers quit with the driver.",
            "Pricing disputes have no record."
          ]
        }
      ],
      solutions: [
        {
          "head": "Every parts call answered or called back",
          "bullets": [
            "The phone answers and sends each call to the counter or the right person.",
            "When everyone is busy, callers are offered a callback instead of a busy signal.",
            "Callers can choose Spanish and are sent to staff who can help.",
            "An after-hours menu captures cash buyers instead of sending them to the next yard."
          ]
        },
        {
          "head": "Lines the yard owns",
          "bullets": [
            "Your team gets a business line through a softphone app on their own phones. Your business rules apply to it, calls are recorded, and the number and call history stay with the yard.",
            "Every business call is recorded, so a pricing dispute is settled by the call itself.",
            "You can see every call you missed."
          ]
        }
      ],
      meet: {
        "title": "Meet your Virtual Parts Counter Desk",
        "benefits": [
          "Books pickups and appointments, or notifies the right person to book.",
          "Directs each call to the counter, a driver or the yard crew.",
          "Sends a notification the moment a parts or tow call needs a person."
        ],
        "intro": "It does the phone half of the counter’s job: answering parts calls, routing each one and taking details, so the counter can finish the sale in front of it.",
        "ways": [
          {
            "head": "As a backup",
            "text": "Your counter still answers first. When calls peak and the counter is at the register, the Virtual Parts Counter Desk catches what would have rung out."
          },
          {
            "head": "As the full replacement",
            "text": "It answers every call from the start, and calls come to your people only when a person is needed."
          }
        ]
      },
      place: 'yard',
      summary: "In the 20-minute audit we look at who answers parts calls at peak, how Spanish-speaking callers are handled, and whether drivers’ numbers belong to the yard.",
      auditLabel: 'Book a 20-minute audit'
};
