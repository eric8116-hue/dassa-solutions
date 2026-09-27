/* Homepage summary adapter (schemaVersion 2). Legacy verticals.js remains unchanged for flyers. */
(function () {
  'use strict';
  var catalog = window.DASSA_AGENT_CATALOG || [];
  var legacy = window.DASSA_VERTICALS || [];

  window.DassaResolveBusinessId = function (value) {
    if (typeof value !== 'string' || !value) return null;
    var agent = catalog.find(function (item) { return item.id === value || item.verticalId === value; });
    return agent ? agent.id : null;
  };

  // The base record carries identity only. Public copy comes from the reviewed library or not at all;
  // an unapproved business renders the honest fallback, never boilerplate.
  window.DASSA_BUSINESS_SUMMARIES = catalog.map(function (agent) {
    var original = legacy.find(function (item) { return item.id === agent.id || item.id === agent.verticalId; });
    return {
      id: agent.id, label: agent.business, industry: agent.industry,
      role: { name: agent.role },
      approved: false,
      hipaa: false,
      stages: null,
      calculator: original ? original.calculator : null,
      calculatorSource: original ? 'verticals.js' : null,
      auditLabel: null,
      auditFocus: null
    };
  });

  function text(value) { return typeof value === 'string' && value.trim().length > 0; }
  function finite(value) { return typeof value === 'number' && Number.isFinite(value); }

  // Returns null when the entry is acceptable, otherwise the first reason it is not.
  function validate(entry, summary) {
    if (!entry || typeof entry !== 'object') return 'not an object';
    if (entry.status !== 'reviewed-for-dassa-pilot' && entry.status !== 'approved-for-dassa-pilot') return 'status ' + entry.status;
    if (entry.roleName !== summary.role.name) return 'roleName "' + entry.roleName + '" does not match catalog "' + summary.role.name + '"';
    if (typeof entry.hipaa !== 'boolean') return 'hipaa must be boolean';
    if (!entry.diagnosis || !text(entry.diagnosis.trigger) || !text(entry.diagnosis.paragraph)) return 'diagnosis incomplete';
    if (!Array.isArray(entry.reasons) || entry.reasons.length !== 2) return 'reasons must be exactly 2';
    if (entry.reasons[0].kind !== 'customer' || entry.reasons[1].kind !== 'workflow') return 'reasons must be customer then workflow';
    if (!entry.reasons.every(function (r) { return text(r.label) && text(r.text); })) return 'reason missing label or text';
    if (entry.reasons.some(function (r) { return r.help !== undefined && !text(r.help); })) return 'reason.help must be a non-empty string when present';
    if (!entry.role || !text(entry.role.intro) || !text(entry.role.overflow)) return 'role intro/overflow incomplete';
    if (entry.role.lead !== undefined && !text(entry.role.lead)) return 'role.lead must be a non-empty string when present';
    if (!Array.isArray(entry.role.catches) || entry.role.catches.length < 1 || entry.role.catches.length > 3 ||
        !entry.role.catches.every(text)) return 'role.catches must be 1-3 strings';
    if (entry.calculator !== null && entry.calculator !== undefined) {
      var c = entry.calculator;
      if (!['missed', 'opportunity', 'close', 'sale', 'recovery'].every(function (k) { return finite(c[k]); })) return 'calculator needs five finite numbers';
    }
    if (!text(entry.auditLabel) || !text(entry.auditFocus)) return 'auditLabel/auditFocus incomplete';
    return null;
  }

  window.DASSA_RESPONSE_LIBRARY_STATUS = 'loading';
  window.DASSA_RESPONSE_LIBRARY_READY = Promise.resolve().then(function () {
    return window.fetch('approved-vertical-response-library.json', { cache: 'no-cache' });
  }).then(function (response) {
    if (!response.ok) throw new Error('Response library unavailable');
    return response.json();
  }).then(function (library) {
    if (!library || library.schemaVersion !== 2 || !library.entries ||
        typeof library.entries !== 'object' || Array.isArray(library.entries)) {
      throw new Error('Unsupported response library');
    }
    var merged = [];
    window.DASSA_BUSINESS_SUMMARIES.forEach(function (summary) {
      if (!Object.prototype.hasOwnProperty.call(library.entries, summary.id)) return;
      var entry = library.entries[summary.id];
      if (entry && entry.status === 'draft') return;
      var problem = validate(entry, summary);
      if (problem) {
        if (window.console && console.warn) console.warn('[dassa-library] rejected ' + summary.id + ': ' + problem);
        return;
      }
      summary.approved = true;
      summary.hipaa = entry.hipaa;
      summary.stages = { diagnosis: entry.diagnosis, reasons: entry.reasons, role: entry.role };
      if (entry.calculator) { summary.calculator = entry.calculator; summary.calculatorSource = entry.calculatorSource || null; }
      summary.auditLabel = entry.auditLabel;
      summary.auditFocus = entry.auditFocus;
      merged.push(summary.id);
    });
    window.DASSA_RESPONSE_LIBRARY_STATUS = merged.length ? 'loaded' : 'fallback';
    window.dispatchEvent(new CustomEvent('dassa:response-library-loaded', {
      detail: { ids: merged, libraryVersion: library.libraryVersion }
    }));
    return merged;
  }).catch(function (error) {
    // Network, JSON and schema failures leave the synchronous summaries usable (every business falls back honestly).
    if (window.console && console.warn) console.warn('[dassa-library] ' + (error && error.message ? error.message : 'load failed'));
    window.DASSA_RESPONSE_LIBRARY_STATUS = 'fallback';
    return [];
  });
})();
