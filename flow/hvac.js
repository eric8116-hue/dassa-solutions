/* Guided-ride copy for HVAC. Loaded only when this business is picked. */
(window.DASSA_FLOW = window.DASSA_FLOW || {})['HVAC'] = {
      role: 'Virtual Service Dispatcher',
      photos: ['assets/scenes/hvac-condenser.webp', 'assets/scenes/hvac-condenser.webp', 'assets/scenes/hvac-condenser.webp', 'assets/scenes/hvac-condenser.webp'],
      hook: {
        title: 'Dispatcher: what happens to the call when every truck is out?',
        paras: [
          'An AC company ran a print ad and told us the campaign was a flop: only four leads. We listened to the recorded calls and found three more that the company missed. There was no auto attendant. One call was forwarded to the owner and took 40 seconds to reach them. Then the owner’s cell played a message that the voicemail hadn’t been set up yet. Each of those missed calls could have been a whole AC job.',
          'Then there’s the tech who works for you for five years and leaves. A few months later you notice you’ve lost customers, because their numbers were on the tech’s personal cell phone and they left too. Wouldn’t it be great if you could just rip those contacts out of the phone the day the tech goes?'],
        bullets: ['Every truck is on a job when the phone rings, so it rings out.', 'Each missed call can be a whole AC job, and a lost lead can be thousands.', 'When customers’ numbers live on a tech’s personal cell, they leave when the tech does.']
      },
      problems: [
        { head: 'The first 95° week',
          text: 'Every AC in the county dies the same week. Call volume triples overnight and the office phone becomes unanswerable. You can’t hire and train a receptionist for a three-week spike. Callers book with whoever answers first.',
          bullets: ['The first hot week triples calls overnight.', 'Routine questions bury the office just when dispatch is busiest.', 'The spike weeks decide the year, and most of their calls ring out.'] },
        { head: '10 p.m., 88 degrees inside, a newborn in the house',
          text: 'The phone goes to voicemail. The caller needs help now, so they dial down the list until a human answers. An answering service that only takes a message isn’t help. Meanwhile your on-call tech gets woken up for calls that could have waited.',
          bullets: ['After-hours emergencies hit voicemail.', 'Maintenance-plan customers expect someone to answer, always.', 'On-call techs lose sleep over routine calls.'] }
      ],
      solutions: [
        { head: 'Every call gets answered, even on the worst week',
          bullets: ['The auto attendant answers every call at once, no matter how many come in.', 'Routine service calls are booked and common questions are answered, so the office can run dispatch.', 'Calls are routed to the right person instead of ringing out.', 'You can see every call you missed.'] },
        { head: 'Emergencies reach the right person',
          bullets: ['After-hours calls are answered, not sent to voicemail.', 'Real emergencies go to your on-call tech. Routine calls wait for the morning.', 'Every tech gets a business line through a softphone app on their own phone. Your business rules apply to it, calls are recorded, and the number and call history stay with the company, so when someone leaves, the customers stay.'] }
      ],
      meet: {
        title: 'Meet your Virtual Service Dispatcher',
        benefits: ['Books routine service calls on the spot.', 'Directs each call, with emergencies going to your on-call tech.', 'Sends a notification the moment a call needs a person.'],
        intro: 'It does the phone half of the dispatcher’s job: answering every call, booking routine service, routing emergencies to your on-call tech, and keeping every customer call on a line you own.',
        ways: [
          { head: 'As a backup', text: 'Your office still answers first. When every truck is out, the first 95° week buries the phones, or it’s 10 p.m., the Virtual Service Dispatcher catches what would have gone to voicemail.' },
          { head: 'As the full replacement', text: 'It answers every call from the start and routes each one to the right person. Your office runs dispatch, not the phones.' }]
      },
      place: 'company',
      summary: 'In the 20-minute audit we look at who answers when every truck is out, where after-hours calls go, and whether your customers’ numbers belong to the company or to each tech’s personal phone.',
      auditLabel: 'Book a 20-minute audit'
};
