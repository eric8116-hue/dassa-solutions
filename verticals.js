/*
  Public Dassa Fit Finder data.
  Keep this file free of supplier names, pricing, competitor comparisons,
  private playbook detail, and claims that have not been approved for Dassa.
*/
(function () {
  'use strict';

  /* Dassa's centralized audit-booking destination. */
  window.DASSA_BOOKING_URL = 'https://calendly.com/edassa-dassasolutions/30min';

  window.DASSA_VERTICALS = [
    {
      id: 'auto-repair', label: 'Auto Repair', searchTerms: ['mechanic', 'repair shop', 'garage'], quick: true,
      trigger: 'At opening and again at midday, the counter, the phone, vehicles, payments, estimates, and status questions all compete for the same person.',
      breakdown: 'Appointment, estimate, and repair-status calls can reach a busy counter instead of a clear next step.',
      consequence: 'A customer may book elsewhere while a lift, technician, or service writer is still available.',
      communication: 'Customer call coverage, counter-to-bay routing, and consistent appointment follow-up.',
      role: { name: 'Virtual Service Advisor', detail: 'A familiar role designed around appointment, estimate, and service-status conversations when the counter is overloaded.' },
      calculator: { missed: 20, opportunity: 60, close: 30, sale: 500, recovery: 50 }
    },
    {
      id: 'auto-body', label: 'Auto Body', searchTerms: ['collision shop', 'body shop', 'collision repair'], quick: true,
      trigger: 'During drop-off periods, an estimator is balancing tow-ins, repair questions, adjusters, customers, and the front office.',
      breakdown: 'Status checks, tow-ins, and adjuster calls can interrupt the same person who must keep repairs and customer expectations moving.',
      consequence: 'A missed after-hours tow or delayed customer response can send the next job to another shop.',
      communication: 'Clear call ownership, after-hours routing, and visibility into important repair and customer conversations.',
      role: { name: 'Virtual Collision Coordinator', detail: 'A familiar role designed around the status, tow-in, and intake pressure that lands on a collision-shop front office.' },
      calculator: { missed: 12, opportunity: 60, close: 30, sale: 1500, recovery: 45 }
    },
    {
      id: 'hvac', label: 'HVAC', searchTerms: ['heating', 'air conditioning', 'air conditioner'], quick: true,
      trigger: 'The first hot or cold day can produce a call surge while technicians are already deployed and the office is trying to dispatch work.',
      breakdown: 'Urgent inquiries, after-hours calls, and field communication can depend on personal phones or an overwhelmed office.',
      consequence: 'A customer with no cooling or no heat may call the company that responds first.',
      communication: 'Field-call ownership, emergency routing, and a dependable path from customer request to dispatch.',
      role: { name: 'Virtual Service Dispatcher', detail: 'A familiar role designed around service requests, dispatch pressure, and after-hours customer contact.' },
      calculator: { missed: 25, opportunity: 65, close: 30, sale: 450, recovery: 50 }
    },
    {
      id: 'plumbing', label: 'Plumbing', searchTerms: ['plumber', 'plumbing contractor'], quick: false,
      trigger: 'A burst pipe, backup, storm event, or overnight emergency can turn a normal call flow into an immediate response problem.',
      breakdown: 'The office and trucks need a reliable way to receive, route, and follow up on urgent customer requests.',
      consequence: 'When an emergency reaches voicemail, the work often goes to the company that answered.',
      communication: 'After-hours call coverage, on-call routing, and business-owned communication across the field team.',
      role: { name: 'Virtual Service Dispatcher', detail: 'A familiar role designed around urgent service requests, on-call coverage, and dispatch coordination.' },
      calculator: { missed: 18, opportunity: 65, close: 30, sale: 500, recovery: 50 }
    },
    {
      id: 'electrical', label: 'Electrical', searchTerms: ['electrician', 'electrical contractor'], quick: false,
      trigger: 'Technicians are on jobs while the office coordinates service calls, estimates, permits, inspections, and project communication.',
      breakdown: 'Customer calls and project updates can become fragmented across personal devices, trucks, and the office.',
      consequence: 'A missed service request or unclear handoff can slow response and weaken the customer experience.',
      communication: 'Reachable field staff, clear project communication, and a visible path for new service calls.',
      role: { name: 'Virtual Service Dispatcher', detail: 'A familiar role designed around service-call intake and the coordination pressure between the office and field crews.' },
      calculator: { missed: 15, opportunity: 60, close: 30, sale: 600, recovery: 45 }
    },
    {
      id: 'pool-spa-services', label: 'Pool & Spa Services', searchTerms: ['pool service', 'pool company', 'spa service'], quick: true,
      trigger: 'During seasonal demand, a small office and field technicians are handling route questions, service changes, repair calls, and customer arrival expectations.',
      breakdown: 'Route updates, "is my tech on the way" calls, and equipment issues can overwhelm the office while technicians are in the field.',
      consequence: 'A service agreement or repair opportunity can go to the next company when no one can respond clearly.',
      communication: 'Route communication, customer updates, and business-owned contact paths for field technicians.',
      role: { name: 'Virtual Route Dispatcher', detail: 'A familiar role designed around routes, service questions, arrival expectations, and repair-call intake.' },
      calculator: { missed: 18, opportunity: 60, close: 30, sale: 350, recovery: 45 }
    },
    {
      id: 'roofing', label: 'Roofing', searchTerms: ['roofer', 'roofing contractor'], quick: true,
      trigger: 'After weather events, sales leads, estimates, adjuster conversations, and crew coordination can all accelerate at once.',
      breakdown: 'A homeowner looking for a fast response can reach voicemail while representatives and crews are already in the field.',
      consequence: 'Speed of response can decide who wins the next project.',
      communication: 'Lead response, field reachability, and a clear handoff from inquiry to estimate and follow-up.',
      role: { name: 'Virtual Lead Response Desk', detail: 'A familiar role designed around fast lead response when sales representatives and crews are already in the field.' },
      calculator: { missed: 10, opportunity: 65, close: 25, sale: 3000, recovery: 40 }
    },
    {
      id: 'hotels', label: 'Hotels & Motels', searchTerms: ['hotel', 'motel', 'hospitality', 'lodging'], quick: true,
      trigger: 'At check-in and check-out, the front desk is handling reservations, guest needs, wake-up calls, and requests from multiple departments.',
      breakdown: 'Reservation calls and guest requests can pile up while housekeeping, maintenance, and front-desk teams work across floors and shifts.',
      consequence: 'A missed reservation or lost guest request can affect both revenue and the guest experience.',
      communication: 'Reservation coverage, guest-request routing, departmental reachability, and call visibility.',
      role: { name: 'Virtual Guest Services Desk', detail: 'A familiar role designed around reservation pressure, guest requests, and front-desk overflow.' },
      hotelSuite: true,
      calculator: { missed: 22, opportunity: 55, close: 25, sale: 250, recovery: 45 }
    },
    {
      id: 'restaurants', label: 'Restaurants & Bars', searchTerms: ['restaurant', 'bar', 'dining', 'catering'], quick: true,
      trigger: 'At lunch and dinner, the people who can answer the phone are often already serving guests, managing the host stand, or working the floor.',
      breakdown: 'Takeout, reservation, catering, and large-party calls can compete directly with service-time responsibilities.',
      consequence: 'A missed call can be an order, reservation, or event opportunity that simply goes somewhere else.',
      communication: 'Peak-time call coverage, purposeful routing for larger inquiries, and clear customer follow-up.',
      role: { name: 'Virtual Digital Order Desk', detail: 'A familiar role designed around peak-period takeout, reservation, catering, and large-party call pressure.' },
      calculator: { missed: 30, opportunity: 55, close: 25, sale: 75, recovery: 45 }
    },
    {
      id: 'accounting', label: 'Accounting', searchTerms: ['accountant', 'accounting firm', 'bookkeeper', 'cpa'], quick: false,
      trigger: 'During tax season and deadline periods, the office is juggling client questions, document requests, appointments, and time-sensitive follow-up.',
      breakdown: 'A small office can struggle to distinguish urgent client contact from routine calls while staff are deep in focused work.',
      consequence: 'A new-client inquiry or important existing-client request may wait longer than the business intends.',
      communication: 'Clear intake, purposeful routing, client follow-up, and a visible record of important calls.',
      role: { name: 'Virtual Office Administrator', detail: 'A familiar role designed around office intake, scheduling pressure, and the calls that interrupt focused client work.' },
      calculator: { missed: 12, opportunity: 60, close: 30, sale: 800, recovery: 45 }
    }
  ];
})();
