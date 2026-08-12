(() => {
  const scenario = window.BlueDialDemoScenario;
  if (!scenario) return;

  const form = document.querySelector('#demo-pursuit-form');
  const results = document.querySelector('[data-demo-results]');
  const offerGrid = document.querySelector('#interactive-demo-offers');
  const decisionCard = document.querySelector('.product-demo-decision');
  if (!form || !results || !offerGrid || !decisionCard) return;

  const money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  const controls = {
    maximumDeliveredCost: document.querySelector('#demo-max-cost'),
    warrantyPolicy: document.querySelector('#demo-warranty'),
    savingsThreshold: document.querySelector('#demo-savings'),
    minimumReturnDays: document.querySelector('#demo-returns'),
  };

  let currentDecision = null;

  const setText = (selector, value) => {
    document.querySelectorAll(selector).forEach((node) => {
      node.textContent = value;
    });
  };

  const setList = (selector, items) => {
    document.querySelectorAll(selector).forEach((node) => {
      node.replaceChildren(...items.map((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        return li;
      }));
    });
  };

  const renderWatch = () => {
    setText('[data-watch-brand]', scenario.watch.brand);
    setText('[data-watch-model]', scenario.watch.model);
    setText('[data-watch-reference]', scenario.watch.reference);
    setText('[data-watch-variant]', scenario.watch.variant);
  };

  const getSettings = () => ({
    maximumDeliveredCost: Number(controls.maximumDeliveredCost.value),
    warrantyPolicy: controls.warrantyPolicy.value,
    savingsThreshold: Number(controls.savingsThreshold.value),
    minimumReturnDays: Number(controls.minimumReturnDays.value),
  });

  const setControls = (settings) => {
    controls.maximumDeliveredCost.value = String(settings.maximumDeliveredCost);
    controls.warrantyPolicy.value = settings.warrantyPolicy;
    controls.savingsThreshold.value = String(settings.savingsThreshold);
    controls.minimumReturnDays.value = String(settings.minimumReturnDays);
    syncSavingsField();
  };

  const syncSavingsField = () => {
    const flexible = controls.warrantyPolicy.value === 'flexible';
    controls.savingsThreshold.disabled = !flexible;
    const field = document.querySelector('[data-savings-field]');
    if (field) field.setAttribute('aria-disabled', String(!flexible));
  };

  const evaluateOffer = (offer, settings) => {
    const failures = [];

    if (offer.estimatedDeliveredCost > settings.maximumDeliveredCost) {
      failures.push(`Over ${money.format(settings.maximumDeliveredCost)} maximum delivered cost`);
    }
    if (settings.warrantyPolicy === 'required' && offer.warrantyKind !== 'manufacturer') {
      failures.push('Manufacturer warranty required');
    }
    if (offer.returnWindowDays < settings.minimumReturnDays) {
      failures.push(`${offer.returnWindowDays}-day returns below ${settings.minimumReturnDays}-day minimum`);
    }

    return { offer, failures, qualifies: failures.length === 0 };
  };

  const lowestCost = (evaluations) => [...evaluations].sort((a, b) => a.offer.estimatedDeliveredCost - b.offer.estimatedDeliveredCost)[0] || null;

  const chooseRecommendation = (qualifying, settings) => {
    if (!qualifying.length) return null;

    if (settings.warrantyPolicy !== 'flexible') return lowestCost(qualifying);

    const manufacturer = lowestCost(qualifying.filter((entry) => entry.offer.warrantyKind === 'manufacturer'));
    const alternative = lowestCost(qualifying.filter((entry) => entry.offer.warrantyKind !== 'manufacturer'));

    if (!manufacturer) return alternative || lowestCost(qualifying);
    if (!alternative) return manufacturer;

    const savings = manufacturer.offer.estimatedDeliveredCost - alternative.offer.estimatedDeliveredCost;
    return savings >= settings.savingsThreshold ? alternative : manufacturer;
  };

  const nearestMisses = (evaluations) => [...evaluations]
    .filter((entry) => !entry.qualifies)
    .sort((a, b) => {
      if (a.failures.length !== b.failures.length) return a.failures.length - b.failures.length;
      return a.offer.estimatedDeliveredCost - b.offer.estimatedDeliveredCost;
    });

  const buildDecision = (evaluations, settings) => {
    const qualifying = evaluations.filter((entry) => entry.qualifies);
    const recommended = chooseRecommendation(qualifying, settings);

    if (!recommended) {
      const misses = nearestMisses(evaluations);
      return {
        label: 'Wait',
        recommended: null,
        qualifying,
        summary: `None of the three current synthetic offers meets all of this Pursuit's selected conditions. The correct action is to keep watching rather than force a purchase.`,
        reasons: [
          `Maximum Estimated Delivered Cost is ${money.format(settings.maximumDeliveredCost)}.`,
          `Minimum return window is ${settings.minimumReturnDays} days.`,
          settings.warrantyPolicy === 'required' ? 'Manufacturer warranty is required.' : 'No current offer survives the complete set of selected hard conditions.',
        ],
        watchouts: misses.slice(0, 2).map((entry) => `${entry.offer.seller}: ${entry.failures[0]}.`),
      };
    }

    const offer = recommended.offer;
    const reasons = [
      `${money.format(offer.estimatedDeliveredCost)} Estimated Delivered Cost is within the ${money.format(settings.maximumDeliveredCost)} ceiling.`,
      `${offer.returnWindowDays}-day returns meet the ${settings.minimumReturnDays}-day minimum.`,
    ];

    if (settings.warrantyPolicy === 'required') {
      reasons.push('Manufacturer warranty satisfies a hard buying condition.');
    } else if (settings.warrantyPolicy === 'flexible') {
      const manufacturer = lowestCost(qualifying.filter((entry) => entry.offer.warrantyKind === 'manufacturer'));
      const alternative = lowestCost(qualifying.filter((entry) => entry.offer.warrantyKind !== 'manufacturer'));
      if (manufacturer && alternative && offer.id === alternative.offer.id) {
        const savings = manufacturer.offer.estimatedDeliveredCost - alternative.offer.estimatedDeliveredCost;
        reasons.push(`${money.format(savings)} savings versus the qualifying manufacturer-warranty offer exceeds the ${money.format(settings.savingsThreshold)} tradeoff threshold.`);
      } else if (manufacturer && alternative && offer.id === manufacturer.offer.id) {
        const savings = manufacturer.offer.estimatedDeliveredCost - alternative.offer.estimatedDeliveredCost;
        reasons.push(`${money.format(savings)} alternative savings do not reach the ${money.format(settings.savingsThreshold)} threshold needed to give up manufacturer warranty.`);
      } else {
        reasons.push('The selected warranty tradeoff is satisfied by the qualifying supply available in this fixture.');
      }
    } else {
      reasons.push('Warranty provider is not a selection constraint for this Pursuit.');
    }

    const watchouts = [];
    const harbor = scenario.offers.find((candidate) => candidate.id === 'harbor');
    const gray = scenario.offers.find((candidate) => candidate.id === 'gray');
    const marketplace = scenario.offers.find((candidate) => candidate.id === 'marketplace');

    if (offer.id === 'harbor' && gray) {
      watchouts.push(`${gray.seller} is ${money.format(harbor.estimatedDeliveredCost - gray.estimatedDeliveredCost)} cheaper on Estimated Delivered Cost, but the current Pursuit gives up that savings for stronger warranty/return fit.`);
    } else if (offer.id === 'gray' && harbor) {
      watchouts.push(`${harbor.seller} adds manufacturer warranty and longer returns for ${money.format(harbor.estimatedDeliveredCost - gray.estimatedDeliveredCost)} more.`);
    }

    if (marketplace && marketplace.id !== offer.id) {
      watchouts.push(`${marketplace.seller} has the lowest advertised price, but its delivered cost and transaction terms do not make it the strongest current fit.`);
    }

    return {
      label: 'Worth Pursuing',
      recommended,
      qualifying,
      summary: `${offer.seller} is the strongest current fit for the buying conditions you selected. This is a recommendation about this Pursuit—not a universal ranking of the seller or watch.`,
      reasons,
      watchouts,
    };
  };

  const createEvidenceRow = (label, value) => {
    const row = document.createElement('div');
    const dt = document.createElement('dt');
    const dd = document.createElement('dd');
    dt.textContent = label;
    dd.textContent = value;
    row.append(dt, dd);
    return row;
  };

  const createOfferCard = (evaluation, decision) => {
    const { offer, failures, qualifies } = evaluation;
    const recommended = decision.recommended && decision.recommended.offer.id === offer.id;

    const card = document.createElement('article');
    card.className = 'product-demo-offer';
    card.dataset.recommended = String(Boolean(recommended));

    const status = document.createElement('div');
    status.className = 'product-demo-offer-status';
    if (recommended) status.textContent = 'Recommended for this Pursuit';
    else if (qualifies) status.textContent = 'Qualifies · not preferred';
    else status.textContent = `Does not qualify · ${failures[0]}`;

    const body = document.createElement('div');
    body.className = 'product-demo-offer-body';

    const title = document.createElement('h3');
    title.textContent = offer.seller;
    const type = document.createElement('p');
    type.className = 'product-demo-offer-type';
    type.textContent = offer.sellerType;

    const prices = document.createElement('div');
    prices.className = 'product-demo-offer-prices';
    const advertised = document.createElement('div');
    const advertisedLabel = document.createElement('span');
    advertisedLabel.textContent = 'Advertised price';
    const advertisedValue = document.createElement('strong');
    advertisedValue.textContent = money.format(offer.advertisedPrice);
    advertised.append(advertisedLabel, advertisedValue);
    const delivered = document.createElement('div');
    const deliveredLabel = document.createElement('span');
    deliveredLabel.textContent = 'Estimated Delivered Cost';
    const deliveredValue = document.createElement('strong');
    deliveredValue.textContent = money.format(offer.estimatedDeliveredCost);
    delivered.append(deliveredLabel, deliveredValue);
    prices.append(advertised, delivered);

    const summary = document.createElement('p');
    summary.className = 'product-demo-offer-summary';
    summary.textContent = `${offer.warranty} · ${offer.returns}`;

    body.append(title, type, prices, summary);

    const inspect = document.createElement('button');
    inspect.type = 'button';
    inspect.className = 'product-demo-inspect';
    inspect.textContent = 'Inspect evidence +';
    inspect.setAttribute('aria-expanded', 'false');

    const evidence = document.createElement('div');
    evidence.className = 'product-demo-evidence';
    evidence.hidden = true;

    const dl = document.createElement('dl');
    dl.append(
      createEvidenceRow('Warranty', offer.warranty),
      createEvidenceRow('Returns', offer.returns),
      createEvidenceRow('Channel', offer.channel),
      createEvidenceRow('Seller context', offer.reputation),
      createEvidenceRow('Protection', offer.protections),
      createEvidenceRow('Availability', offer.availability),
      createEvidenceRow('Post-sale', offer.service),
    );

    const qualification = document.createElement('ul');
    const notes = qualifies ? ['Meets all selected hard conditions.'] : failures;
    notes.forEach((note) => {
      const li = document.createElement('li');
      li.textContent = note;
      qualification.append(li);
    });
    evidence.append(dl, qualification);

    inspect.addEventListener('click', () => {
      const expanded = inspect.getAttribute('aria-expanded') === 'true';
      inspect.setAttribute('aria-expanded', String(!expanded));
      inspect.textContent = expanded ? 'Inspect evidence +' : 'Hide evidence −';
      evidence.hidden = expanded;
    });

    card.append(status, body, inspect, evidence);
    return card;
  };

  const renderDecision = (decision) => {
    currentDecision = decision;
    decisionCard.dataset.wait = String(!decision.recommended);
    setText('[data-interactive-label]', decision.label);
    setText('[data-interactive-summary]', decision.summary);
    setList('[data-interactive-reasons]', decision.reasons);
    setList('[data-interactive-watchouts]', decision.watchouts.length ? decision.watchouts : ['No additional tradeoff is material in this bounded fixture.']);

    const viewButton = document.querySelector('[data-demo-action="view"]');
    const costWrap = document.querySelector('[data-interactive-cost-wrap]');

    if (decision.recommended) {
      const offer = decision.recommended.offer;
      setText('[data-interactive-offer-label]', 'Recommended offer');
      setText('[data-interactive-seller]', offer.seller);
      setText('[data-interactive-seller-type]', offer.sellerType);
      setText('[data-interactive-cost]', money.format(offer.estimatedDeliveredCost));
      if (costWrap) costWrap.hidden = false;
      if (viewButton) viewButton.disabled = false;
    } else {
      setText('[data-interactive-offer-label]', 'Current outcome');
      setText('[data-interactive-seller]', 'No offer deserves action yet');
      setText('[data-interactive-seller-type]', 'Keep this Pursuit active');
      setText('[data-interactive-cost]', '—');
      if (costWrap) costWrap.hidden = true;
      if (viewButton) viewButton.disabled = true;
    }

    const status = document.querySelector('[data-demo-action-status]');
    if (status) status.textContent = decision.recommended ? 'Checkout remains with the original seller.' : 'Scout would keep watching supported supply for a qualifying change.';
  };

  const evaluate = ({ scroll = true } = {}) => {
    if (!form.reportValidity()) return;

    const settings = getSettings();
    const evaluations = scenario.offers.map((offer) => evaluateOffer(offer, settings));
    const decision = buildDecision(evaluations, settings);

    offerGrid.replaceChildren(...evaluations.map((entry) => createOfferCard(entry, decision)));
    setText('[data-evaluation-summary]', `${scenario.offers.length} synthetic offers evaluated · ${decision.qualifying.length} ${decision.qualifying.length === 1 ? 'qualifies' : 'qualify'} under the conditions you selected.`);
    renderDecision(decision);
    results.hidden = false;

    if (scroll) results.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const applyPreset = (key) => {
    const preset = scenario.presets[key];
    if (!preset) return;
    setControls(preset);
    evaluate();
  };

  const resetDemo = () => {
    setControls(scenario.interactiveDefaults);
    results.hidden = true;
    currentDecision = null;
    const status = document.querySelector('[data-demo-action-status]');
    if (status) status.textContent = '';
    controls.maximumDeliveredCost.focus();
  };

  const bindActions = () => {
    document.querySelectorAll('[data-demo-action]').forEach((button) => {
      button.addEventListener('click', () => {
        const status = document.querySelector('[data-demo-action-status]');
        if (!status || !currentDecision) return;

        if (button.dataset.demoAction === 'view') {
          if (!currentDecision.recommended) return;
          status.textContent = `Demo only — View Offer would continue to ${currentDecision.recommended.offer.seller} for the seller's existing checkout. No live offer is opened.`;
        } else if (button.dataset.demoAction === 'wait') {
          status.textContent = 'Wait selected — the Pursuit stays active while Scout continues watching supported supply.';
        } else if (currentDecision.recommended) {
          status.textContent = 'Reject selected — this synthetic opportunity is dismissed without ending the Pursuit.';
        } else {
          status.textContent = 'There is no current qualifying opportunity to reject; the Pursuit simply remains active.';
        }
      });
    });
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    evaluate();
  });

  controls.warrantyPolicy.addEventListener('change', syncSavingsField);

  document.querySelectorAll('[data-demo-preset]').forEach((button) => {
    button.addEventListener('click', () => applyPreset(button.dataset.demoPreset));
  });

  const resetButton = document.querySelector('[data-demo-reset]');
  if (resetButton) resetButton.addEventListener('click', resetDemo);

  const editButton = document.querySelector('[data-demo-edit]');
  if (editButton) {
    editButton.addEventListener('click', () => {
      document.querySelector('#pursuit-builder').scrollIntoView({ behavior: 'smooth', block: 'start' });
      controls.maximumDeliveredCost.focus({ preventScroll: true });
    });
  }

  renderWatch();
  setControls(scenario.interactiveDefaults);
  bindActions();
})();
