/* Guided-ride copy for Towing. Loaded only when this business is picked. */
(window.DASSA_FLOW = window.DASSA_FLOW || {})['Towing'] = {
      role: 'Virtual Dispatch Desk',
      photos: ['assets/scenes/tow-truck-red.webp', 'assets/scenes/tow-truck-red.webp', 'assets/scenes/tow-truck-red.webp', 'assets/scenes/tow-truck-red.webp'],
      hook: {
        "title": "Dispatcher: who’s answering the phone at 2 a.m.?",
        "paras": [
          "It’s 2 a.m. A stranded motorist and a rotation call come in at once, both trucks are on a hook, and the on-call phone rings out. The caller dials the next company on the list.",
          "Drivers run tows on personal cells the company doesn’t own. When a driver quits, the customers holding that number follow the driver, not the company."
        ],
        "bullets": [
          "After-hours and rotation calls are the best tows and the easiest to miss.",
          "A missed call is a tow booked by the next company.",
          "When a driver quits, the number walks out the door."
        ]
      },
      problems: [
        {
          "head": "The best tows come in when nobody can answer",
          "text": "Overnight and rotation calls are the most profitable and the easiest to miss. The on-call driver can’t answer with both hands on a winch.",
          "bullets": [
            "Two calls at once means one is lost.",
            "A missed rotation call can drop the company down the list.",
            "Nobody knows how many calls were missed overnight."
          ]
        },
        {
          "head": "The driver’s number walks out the door",
          "text": "Drivers coordinate on personal cells. There is no recording when a charge is disputed, and no way to keep the number when a driver leaves.",
          "bullets": [
            "Contacts are tied to a personal phone, not the company.",
            "A disputed tow charge has no recording.",
            "Business and personal calls mix on one phone."
          ]
        }
      ],
      solutions: [
        {
          "head": "Every call gets answered",
          "bullets": [
            "The phone answers after hours and sends the call to the right person.",
            "When everyone is busy, callers are offered a callback instead of a busy signal.",
            "Every caller’s number is captured on every call, so a missed tow can be called back.",
            "You can see every call you missed."
          ]
        },
        {
          "head": "Lines the company owns",
          "bullets": [
            "Every driver gets a business line through a softphone app on their own phone. Your business rules apply to it, calls are recorded, and the number and call history stay with the company.",
            "The number stays with the company, and it can be reassigned when a driver leaves.",
            "Every business call is recorded, so a disputed charge takes minutes, not a fight."
          ]
        }
      ],
      meet: {
        "title": "Meet your Virtual Dispatch Desk",
        "benefits": [
          "Books tows on the spot, or notifies dispatch to confirm.",
          "Directs each call to dispatch, the on-call driver or the office.",
          "Sends a notification the moment a tow call comes in."
        ],
        "intro": "It does the phone half of dispatch’s job: answering, routing and taking the details, so the drivers can stay on the hook.",
        "ways": [
          {
            "head": "As a backup",
            "text": "Your dispatcher and drivers still answer first. When both trucks are on a hook or it’s 2 a.m., the Virtual Dispatch Desk catches what would have rung out."
          },
          {
            "head": "As the full replacement",
            "text": "It answers every call from the start, and calls come to your people only when a person is needed."
          }
        ]
      },
      place: 'company',
      summary: "In the 20-minute audit we look at who answers overnight and rotation calls, how a second call is handled, and whether your drivers’ numbers belong to the company.",
      auditLabel: 'Book a 20-minute audit'
};
