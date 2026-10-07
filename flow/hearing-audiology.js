/* Guided-ride copy for Hearing / Audiology. Loaded only when this business is picked. */
(window.DASSA_FLOW = window.DASSA_FLOW || {})['Hearing / Audiology'] = {
      role: 'Virtual Patient Coordinator',
      photos: ['assets/scenes/medical-front-desk.webp', 'assets/scenes/medical-front-desk.webp', 'assets/scenes/medical-front-desk.webp', 'assets/scenes/medical-front-desk.webp'],
      hook: {
        "title": "Front Desk: who’s answering while staff are in the booth?",
        "paras": [
          "The audiologist is in the sound booth with a patient, and the other staff member is stepping in to help. The desk phone rings out.",
          "Many of your patients would rather call than text. When the call isn’t answered, they don’t always try again."
        ],
        "bullets": [
          "Staff in testing booths miss desk calls.",
          "Patients who prefer a call give up after voicemail.",
          "A missed call can be a missed appointment."
        ]
      },
      problems: [
        {
          "head": "Staff are in the booth when the phone rings",
          "text": "Testing takes a person out of the front office for a full appointment. Calls that come in during that time ring out.",
          "bullets": [
            "The desk can’t answer while staff are in testing.",
            "New-patient calls go to voicemail.",
            "Nobody knows how many calls were missed."
          ]
        },
        {
          "head": "Older patients need a call, not a text",
          "text": "A large share of your patients prefer to speak with a person. Insurance and Medicare questions add to the call volume.",
          "bullets": [
            "Patients who want a call may not leave a message.",
            "Insurance questions pile on call volume.",
            "Rescheduling depends on whoever is free."
          ]
        }
      ],
      solutions: [
        {
          "head": "Every call gets a path",
          "bullets": [
            "The phone answers and queues calls, so booth testing doesn’t drop them.",
            "Calls are routed by what the caller needs.",
            "When everyone is busy, callers are offered a callback instead of a busy signal.",
            "Every caller’s number is captured the moment they call, even when the call isn’t recorded, so no missed call goes unseen."
          ]
        },
        {
          "head": "Callers who want a person get one",
          "bullets": [
            "Callers are offered a callback instead of voicemail, so the office can call back the patients who prefer a call.",
            "The right person is notified the moment a reschedule or new-patient call comes in.",
            "Your team gets a business line through a softphone app on their own phones. Your business rules apply to it, and the number and call history stay with the practice.",
            "You can see every call you missed."
          ]
        }
      ],
      meet: {
        "title": "Meet your Virtual Patient Coordinator",
        "benefits": [
          "Books appointments where your calendar is connected, or notifies the right person to book.",
          "Directs each call to the right person at your desk.",
          "Sends a notification the moment a new-patient or reschedule call comes in."
        ],
        "intro": "It does the phone half of the front desk’s job: answering, routing and taking details, so staff can stay with the patient in the booth.",
        "ways": [
          {
            "head": "As a backup",
            "text": "Your desk still answers first. When staff are in the booth and the phone keeps ringing, the Virtual Patient Coordinator catches what would have gone to voicemail."
          },
          {
            "head": "As the full replacement",
            "text": "It answers every call from the start, and calls come to your people only when a person is needed."
          }
        ]
      },
      place: 'practice',
      summary: "In the 20-minute audit we look at who answers while staff are in testing, how callers who prefer a call are handled, and where reschedule calls go.",
      auditLabel: 'Book a 20-minute audit'
};
