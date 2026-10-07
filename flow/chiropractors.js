/* Guided-ride copy for Chiropractors. Loaded only when this business is picked. */
(window.DASSA_FLOW = window.DASSA_FLOW || {})['Chiropractors'] = {
      role: 'Virtual Patient Coordinator',
      photos: ['assets/scenes/chiropractic-adjustment.webp', 'assets/scenes/chiropractic-adjustment.webp', 'assets/scenes/chiropractic-adjustment.webp', 'assets/scenes/chiropractic-adjustment.webp'],
      hook: {
        "title": "Front Desk: who’s answering the phone right now?",
        "paras": [
          "The desk is collecting a copay and checking someone in, and the phone rings. It rings out. The caller was a new patient, or a patient trying to move a visit, and they don’t leave a message. They call the next office.",
          "A care plan only works if patients keep showing up. One missed visit that never got rebooked quietly breaks the plan, and the revenue that went with it."
        ],
        "bullets": [
          "The desk can’t answer while it’s checking patients in.",
          "A reschedule that never connects becomes a missed visit.",
          "One missed visit can quietly break a whole plan of care."
        ]
      },
      problems: [
        {
          "head": "The desk is busy when the phone rings",
          "text": "The desk is collecting copays right when calls peak. One or two people check patients in, answer the phone and grab the doctor, and something always gives.",
          "bullets": [
            "Calls pile up at the opening and after-work rush.",
            "A desk interruption pulls the doctor from a treatment.",
            "Callers who hit voicemail book with the next office."
          ]
        },
        {
          "head": "Missed visits break care plans",
          "text": "A plan of care needs the patient back, on schedule. When a rebooking depends on whoever has a free minute, visits slip and the plan falls apart.",
          "bullets": [
            "Missed visits quietly blow up plans of care.",
            "Rebooking depends on whoever has a free minute.",
            "Nobody knows how many calls were missed last month."
          ]
        }
      ],
      solutions: [
        {
          "head": "Every call gets a path",
          "bullets": [
            "When the desk is tied up, the phone answers and sends the call where it belongs.",
            "Calls are routed by what the caller needs, so the desk isn’t interrupting a treatment.",
            "Every caller’s number is captured the moment they call, even when the call isn’t recorded, so no missed call goes unseen.",
            "When everyone is busy, callers are offered a callback instead of a busy signal."
          ]
        },
        {
          "head": "Reschedules get caught",
          "bullets": [
            "When a patient calls to reschedule, the details go straight to the right person at your desk, who makes the change.",
            "The right person is notified to send the patient a booking link. Where your calendar is connected, the patient can be booked on the spot.",
            "New-patient calls are answered at lunch and after hours, and their details are captured."
          ]
        }
      ],
      meet: {
        "title": "Meet your Virtual Patient Coordinator",
        "benefits": [
          "Books appointments where your calendar is connected, or notifies the right person to book.",
          "Directs each call to the right person at your desk.",
          "Sends a notification the moment a reschedule or new-patient call comes in."
        ],
        "intro": "It does the phone half of the front desk’s job: answering, routing and taking reschedules, so the desk can look after the patient in front of it.",
        "ways": [
          {
            "head": "As a backup",
            "text": "Your desk still answers first. When the desk is busy or the after-work rush hits, the Virtual Patient Coordinator catches what would have gone to voicemail."
          },
          {
            "head": "As the full replacement",
            "text": "It answers every call from the start, and calls come to the desk only when a person is needed."
          }
        ]
      },
      place: 'practice',
      summary: "In the 20-minute audit we look at who answers during check-in, where reschedule calls go, and how new-patient calls are handled at lunch and after work.",
      auditLabel: 'Book a 20-minute audit'
};
