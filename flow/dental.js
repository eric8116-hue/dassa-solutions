/* Guided-ride copy for Dental. Loaded only when this business is picked. */
(window.DASSA_FLOW = window.DASSA_FLOW || {})['Dental'] = {
      role: 'Virtual Patient Coordinator',
      photos: ['assets/scenes/medical-front-desk.webp', 'assets/scenes/medical-front-desk.webp', 'assets/scenes/medical-front-desk.webp', 'assets/scenes/medical-front-desk.webp'],
      hook: {
        title: 'Front Desk: who\u2019s answering the phone right now?',
        paras: [
          'It\u2019s 8:30 in the morning. Patients are signing in, the front desk is answering questions and collecting insurance information, and the phone rings. Nobody can get it, and it goes to voicemail. The patient doesn\u2019t get a timely callback and decides the practice is too busy, so they move to another practice.',
          'Or a patient calls to reschedule. It\u2019s busy, so they leave a message and nobody gets back to them. The next day that appointment is an empty slot.'],
        bullets: ['A call that goes to voicemail is a patient who books with the practice that answered.', 'A reschedule that never connects becomes a no-show.', 'An empty appointment is production lost while staff stand by.']
      },
      problems: [
        { head: 'Everything at the front desk at once',
          text: 'Patients at the counter, an insurer on hold, and the new-patient line ringing out. The desk can only serve one person at a time, so every routine call it absorbs makes the patient standing in front of it wait.',
          bullets: ['\u201cDo you take my insurance?\u201d repeats twenty times a week.', 'The second line rings out during every morning crush.', 'The patient at the counter waits while the phone gets answered.'] },
        { head: 'New patients call at lunch and after 5',
          text: 'It\u2019s 12:40 and the desk is at lunch. A new patient in pain is calling down the list of practices. New-patient calls cluster at lunch and after work, which are the hours the desk is dark.',
          bullets: ['Most callers who hit voicemail never call back.', 'The website says \u201ccall us\u201d and the phone rings out.', 'Nobody tracks how many new-patient calls were missed last month.'] }
      ],
      solutions: [
        { head: 'The desk keeps its calm',
          bullets: ['When the desk is tied up, the phone answers and sends the call where it belongs.', 'Insurance, hours and directions questions are answered right away.', 'Clinical and billing calls are routed by what the caller says.', 'Every caller\u2019s number is captured the moment they call, even when the call isn\u2019t recorded, so no missed call goes unseen.'] },
        { head: 'Nobody falls through at lunch, after 5 or on a reschedule',
          bullets: ['New-patient calls are answered at lunch and after hours, and their details are captured.', 'When a patient calls to reschedule, the details go straight to the right person at your desk, who makes the change.', 'The right person is notified to send the patient a booking link. Where your calendar is connected, the patient can be booked on the spot.', 'The desk knows about it right away, so tomorrow\u2019s schedule is fixed before it breaks.'] }
      ],
      meet: {
        title: 'Meet your Virtual Patient Coordinator',
        benefits: ['Books appointments where your calendar is connected, or notifies the right person to book.', 'Directs each call to the right person at your desk.', 'Sends a notification the moment a reschedule or new-patient call comes in.'],
        intro: 'It does the phone half of the front desk\u2019s job: answering, routing, taking reschedules and answering routine questions. It never has a lobby full of patients to look after.',
        ways: [
          { head: 'As a backup', text: 'Your front desk still answers first. When the lobby is full or the second line rings, the Virtual Patient Coordinator catches what would have gone to voicemail.' },
          { head: 'As the full replacement', text: 'It answers every call from the start, and calls come to the desk only when a person is needed.' }]
      },
      place: 'practice',
      summary: 'In the 20-minute audit we look at who answers during the morning check-in rush, where reschedule calls go, and how new-patient calls are handled at lunch and after 5.',
      auditLabel: 'Book a 20-minute audit'
};
