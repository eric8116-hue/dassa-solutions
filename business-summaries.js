/* Homepage summary adapter. Legacy verticals.js remains unchanged for flyers. */
(function () {
  'use strict';
  var legacy = window.DASSA_VERTICALS || [];
  var reasons = {
    automotive: ['Give drivers a clear path for appointments, estimates and repair updates.', 'Route counter, bay and callback requests without making one service writer handle everything.'],
    'home-field-services': ['Keep service requests and existing-customer updates from ending at an unanswered phone.', 'Give the office and field team clear ownership of dispatch, callbacks and after-hours handoffs.'],
    'healthcare-wellness': ['Help patients and families reach the right person for routine scheduling and follow-up.', 'Reduce routine phone interruptions while staff assist people in person. Clinical decisions stay with qualified staff.'],
    'hospitality-retail': ['Give guests and customers a response path for bookings, questions and service requests.', 'Separate incoming requests from the in-person rush, with clear staff handoffs.'],
    'professional-services': ['Give new and existing clients a clear next step when their usual contact is unavailable.', 'Capture callback details and route requests while professionals are in meetings or focused work.'],
    'industrial-logistics': ['Help customers get order, delivery and service requests to the responsible team.', 'Connect office, warehouse and field staff through defined routing and follow-up ownership.'],
    'property-government': ['Give residents, tenants and the public a clear path for routine questions and service requests.', 'Route requests to the responsible department or property team and define who follows up.'],
    'education-community': ['Help families and community members reach the right person for questions and scheduling.', 'Support front-office coverage while staff are helping students, visitors or program participants.']
  };
  window.DASSA_BUSINESS_SUMMARIES = (window.DASSA_AGENT_CATALOG || []).map(function (agent) {
    var original = legacy.find(function (item) { return item.id === agent.id || item.id === agent.verticalId; });
    var pair = reasons[agent.industry];
    return {
      id: agent.id, label: agent.business, industry: agent.industry,
      trigger: original ? original.trigger : agent.cardData.pain,
      breakdown: original ? original.breakdown : 'When the team is occupied, incoming requests can wait without a clear owner or callback plan.',
      consequence: original ? original.consequence : 'A new inquiry can go elsewhere; an existing customer can be left waiting; staff can lose time chasing the next step.',
      customerReason: pair[0], workflowReason: pair[1],
      role: { name: agent.role, detail: agent.cardData.fix },
      coverage: 'Your team remains the first response where appropriate. When staff are busy or unavailable, an agreed overflow or after-hours path can capture the request, route it to the right person and assign follow-up. Timing and capabilities are confirmed during your audit.',
      communication: original ? original.communication : 'Who answers, which requests need a person, where callbacks go, and how the team knows a request has been handled.',
      calculator: original ? original.calculator : null
    };
  });

  // Merge in place: the page keeps references to this array and its records.
  // Only reviewed text fields may change; IDs, roles and calculator presets stay catalog-owned.
  var fields = ['trigger', 'breakdown', 'consequence', 'customerReason',
    'workflowReason', 'coverage', 'communication', 'roleDetail', 'auditLabel'];
  window.DASSA_RESPONSE_LIBRARY_STATUS = 'loading';
  window.DASSA_RESPONSE_LIBRARY_READY = Promise.resolve().then(function () {
    return window.fetch('approved-vertical-response-library.json', { cache: 'no-cache' });
  }).then(function (response) {
    if (!response.ok) throw new Error('Response library unavailable');
    return response.json();
  }).then(function (library) {
    if (!library || library.schemaVersion !== 1 || !library.entries ||
        typeof library.entries !== 'object' || Array.isArray(library.entries)) {
      throw new Error('Unsupported response library');
    }
    var merged = [];
    window.DASSA_BUSINESS_SUMMARIES.forEach(function (summary) {
      if (!Object.prototype.hasOwnProperty.call(library.entries, summary.id)) return;
      var entry = library.entries[summary.id];
      if (!entry || (entry.status !== 'reviewed-for-dassa-pilot' &&
          entry.status !== 'approved-for-dassa-pilot')) return;
      // Reject an incomplete entry as a whole instead of showing mixed pilot/fallback copy.
      if (!fields.every(function (key) {
        return typeof entry[key] === 'string' && entry[key].trim().length > 0;
      })) return;
      fields.forEach(function (key) {
        if (key === 'roleDetail') summary.role.detail = entry[key];
        else summary[key] = entry[key];
      });
      merged.push(summary.id);
    });
    window.DASSA_RESPONSE_LIBRARY_STATUS = merged.length ? 'loaded' : 'fallback';
    window.dispatchEvent(new CustomEvent('dassa:response-library-loaded', {
      detail: { ids: merged, libraryVersion: library.libraryVersion }
    }));
    return merged;
  }).catch(function () {
    // Network, JSON and schema failures leave the synchronous summaries usable.
    window.DASSA_RESPONSE_LIBRARY_STATUS = 'fallback';
    return [];
  });
})();
