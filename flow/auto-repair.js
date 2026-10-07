/* Guided-ride copy for Auto Repair. Loaded only when this business is picked. */
(window.DASSA_FLOW = window.DASSA_FLOW || {})['Auto Repair'] = {
      role: 'Virtual Service Advisor',
      photos: ['assets/scenes/auto/auto-car-in-bay.webp', 'assets/scenes/auto/auto-shop-floor.webp', 'assets/scenes/auto/auto-under-hood.webp', 'assets/scenes/auto/auto-brake-job.webp'],
      hook: {
        title: 'Shop Manager: who’s answering the phone right now?',
        paras: [
          'It’s 8:00 a.m. in Florida, and you don’t pick up, because that’s when all the spammers call. But a customer’s AC died yesterday. They’re dropping the car off on the way to taking their spouse to work, and they call your shop. Nobody answers. They call the shop a hundred yards down the street, which answers, books the job and keeps that customer for the next five years.',
          'Or it’s mid-morning. You’re taking in parts, three people are waiting at the counter, invoices are open, and the phone rings. Your regular customers get tired of never reaching you. A new customer sees over 300 reviews, hears nothing on the line, and calls the next shop.'],
        bullets: ['The spam rush at opening means real customers get ignored with the junk.', 'A busy counter means the real customer rings out.', 'Every missed call is a job, and sometimes a customer for years, at the shop down the street.']
      },
      problems: [
        { head: 'Everything hits the counter at once',
          text: 'The shop manager is checking out a customer: printing the invoice, reconciling, running the charge. Two people are waiting behind them. A parts driver is dropping off an order. A salesperson is trying to sell something. Phones are ringing at the same time. The caller gets put on hold until they hang up. Regular customers get tired of never reaching you. A potential new customer finds your great Google reviews, can’t get anyone on the phone, decides you’re too busy for their business, and moves on to the next shop.',
          bullets: ['A missed call is usually a job booked somewhere else.', 'Two calls at once means one of them is lost.', 'A caller on hold hangs up before anyone gets back to them.', 'Nobody knows what last week’s missed calls were worth.'] },
        { head: '“Is my car ready?” all day',
          text: 'The counter answers the same question for the fourth time this hour while a paying customer stands and waits. Your best person spends hours as a switchboard instead of writing estimates.',
          bullets: ['Status, hours, price and directions questions repeat dozens of times a week.', 'Estimate approvals crawl through phone tag.', 'Spam and warranty robocalls bury the real ones, so some shops stop answering at 8:00.'] }
      ],
      solutions: [
        { head: 'Every call gets a path',
          bullets: ['When the shop manager is tied up, the phone answers and sends the call where it belongs.', 'Callers aren’t put on hold until they hang up. They’re offered a callback instead.', 'Spam calls are screened out before they tie up your counter, so the 8:00 a.m. customer actually gets through.', 'You can see every call you missed.'] },
        { head: 'The counter gets its day back',
          bullets: ['Routine questions (status, hours, directions) are answered instantly.', 'Real booking calls reach the counter right away.', 'Estimate approvals go out by text straight from your shop’s number.', 'Your best person goes back to estimates and customers.'] }
      ],
      meet: {
        title: 'Meet your Virtual Service Advisor',
        benefits: ['Books appointments on the spot.', 'Directs each call to the counter or the right person.', 'Sends a notification the moment a call needs a person.'],
        intro: 'It does the phone half of the shop manager’s job: answering, routing, taking callbacks, answering routine questions and texting estimate approvals. It’s never stuck at the counter.',
        ways: [
          { head: 'As a backup', text: 'Your people still answer first. When the counter is busy, a second call comes in, or the 8:00 a.m. spam is flooding in, the Virtual Service Advisor catches what would have rung out.' },
          { head: 'As the full replacement', text: 'It answers every call from the start. Your shop manager runs the shop, and a call comes to them only when a person is needed.' }]
      },
      place: 'shop',
      summary: 'In the 20-minute audit we look at who answers first at your counter, what happens when two calls come in at once, how routine questions and estimate approvals are handled, and whether the 8:00 a.m. calls get through.',
      auditLabel: 'Book a 20-minute audit'
};
