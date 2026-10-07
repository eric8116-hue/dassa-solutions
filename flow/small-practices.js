/* Guided-ride copy for Small Practices. Loaded only when this business is picked. */
(window.DASSA_FLOW = window.DASSA_FLOW || {})['Small Practices'] = {
      role: 'Virtual Patient Coordinator',
      photos: ['assets/scenes/medical-front-desk.webp', 'assets/scenes/medical-front-desk.webp', 'assets/scenes/medical-front-desk.webp', 'assets/scenes/medical-front-desk.webp'],
      hook: {
        "title": "Office Manager: who’s answering the phone while the doctors are in exam rooms?",
        "paras": [
          "A refill question hops from the desk to the medical assistant to a doctor in an exam room, and the patient hangs up somewhere in between. Every caller lands in the same queue, whatever the reason.",
          "After hours, covering the phone can mean handing out a personal cell number. And results callbacks pile up on a small front desk."
        ],
        "bullets": [
          "Refill and results calls bounce around the office all day.",
          "Every caller lands in the same queue.",
          "After-hours coverage means giving out a personal cell."
        ]
      },
      problems: [
        {
          "head": "Every caller lands in the same queue",
          "text": "A small front desk answers new-patient, refill, results and billing calls the same way. Whoever picks up sorts it out, and the caller waits.",
          "bullets": [
            "Refill and results questions ping-pong across the office.",
            "Callers hit voicemail during check-in.",
            "Results callbacks pile up on the desk."
          ]
        },
        {
          "head": "After-hours coverage uses a personal cell",
          "text": "When the office closes, the on-call doctor is reached on a personal number, and that number gets handed out.",
          "bullets": [
            "A personal cell is given to callers.",
            "The practice has no record of those calls.",
            "Nobody knows how many calls were missed."
          ]
        }
      ],
      solutions: [
        {
          "head": "Callers routed by reason",
          "bullets": [
            "The phone answers and sends each caller to the right person by reason: refill, results, billing or new patient.",
            "When everyone is busy, callers are offered a callback instead of a busy signal.",
            "Every caller’s number is captured the moment they call, even when the call isn’t recorded, so no missed call goes unseen.",
            "You can see every call you missed."
          ]
        },
        {
          "head": "On-call without a personal number",
          "bullets": [
            "Your team gets a business line through a softphone app on their own phones. Your business rules apply to it, and the number and call history stay with the practice.",
            "After-hours calls reach the on-call doctor through the practice’s own line.",
            "The right person is notified the moment a call needs them."
          ]
        }
      ],
      meet: {
        "title": "Meet your Virtual Patient Coordinator",
        "benefits": [
          "Books appointments where your calendar is connected, or notifies the right person to book.",
          "Directs each call to the right person by reason.",
          "Sends a notification the moment a refill, results or new-patient call comes in."
        ],
        "intro": "It does the phone half of the front desk’s job: answering, routing by reason and taking details, so the desk can look after the patient in front of it.",
        "ways": [
          {
            "head": "As a backup",
            "text": "Your desk still answers first. When the exam rooms are full and the phone keeps ringing, the Virtual Patient Coordinator catches what would have gone to voicemail."
          },
          {
            "head": "As the full replacement",
            "text": "It answers every call from the start, and calls come to your people only when a person is needed."
          }
        ]
      },
      place: 'practice',
      summary: "In the 20-minute audit we look at how callers are sorted by reason, who answers when the doctors are in exam rooms, and how after-hours calls reach the on-call doctor.",
      auditLabel: 'Book a 20-minute audit'
};
