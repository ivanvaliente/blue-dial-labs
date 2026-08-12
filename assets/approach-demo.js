(() => {
  const scenario = window.BlueDialDemoScenario;
  if (!scenario) return;

  const money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  const byOfferId = new Map(scenario.offers.map((offer) => [offer.id, offer]));
  let activePreference = 'warranty-required';

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

  const renderStaticScenario = () => {
    setText('[data-watch-brand]', scenario.watch.brand);
    setText('[data-watch-model]', scenario.watch.model);
    setText('[data-watch-reference]', scenario.watch.reference);
    setText('[data-watch-variant]', scenario.watch.variant);
    setText('[data-pursuit-maximum]', money.format(scenario.pursuit.maximumDeliveredCost));
    setList('[data-pursuit-required]', scenario.pursuit.required);
    setList('[data-pursuit-preferred]', scenario.pursuit.preferred);
  };

  const offerEvidenceRows = (offer) => [
    ['Warranty', offer.warranty],
    ['Returns', offer.returns],
    ['Seller', offer.reputation],
    ['Protection', offer.protections],
    ['Availability', offer.availability],
    ['Service', offer.service],
  ];

  const createOfferCard = (offer, recommendation) => {
    const card = document.createElement('article');
    const isRecommended = recommendation.offerId === offer.id;
    card.className = 'demo-offer-card';
    card.dataset.recommended = String(isRecommended);
    card.setAttribute('aria-label', `${offer.seller}: ${recommendation.offerStatuses[offer.id]}`);

    const status = document.createElement('div');
    status.className = 'demo-offer-status';
    status.textContent = recommendation.offerStatuses[offer.id];

    const body = document.createElement('div');
    body.className = 'demo-offer-body';

    const title = document.createElement('h3');
    title.textContent = offer.seller;

    const type = document.createElement('p');
    type.className = 'demo-offer-type';
    type.textContent = offer.sellerType;

    const prices = document.createElement('div');
    prices.className = 'demo-price-pair';
    prices.innerHTML = `<div><span>Advertised price</span><strong>${money.format(offer.advertisedPrice)}</strong></div><div><span>Estimated Delivered Cost</span><strong>${money.format(offer.estimatedDeliveredCost)}</strong></div>`;

    const evidence = document.createElement('dl');
    evidence.className = 'demo-offer-evidence';
    offerEvidenceRows(offer).forEach(([label, value]) => {
      const row = document.createElement('div');
      const dt = document.createElement('dt');
      const dd = document.createElement('dd');
      dt.textContent = label;
      dd.textContent = value;
      row.append(dt, dd);
      evidence.append(row);
    });

    const breakdown = document.createElement('p');
    breakdown.className = 'demo-small-note';
    breakdown.textContent = `Synthetic delivered-cost context: ${money.format(offer.advertisedPrice)} item + ${money.format(offer.shipping)} shipping + ${money.format(offer.estimatedTax)} estimated tax + ${money.format(offer.fees)} other fees.`;

    body.append(title, type, prices, evidence, breakdown);
    card.append(status, body);
    return card;
  };

  const renderOffers = (recommendation) => {
    const grid = document.querySelector('#demo-offers');
    if (!grid) return;
    grid.replaceChildren(...scenario.offers.map((offer) => createOfferCard(offer, recommendation)));
  };

  const renderDecision = (variant) => {
    const recommendation = variant.recommendation;
    const offer = byOfferId.get(recommendation.offerId);
    if (!offer) return;

    setText('[data-decision-label]', recommendation.label);
    setText('[data-decision-seller]', offer.seller);
    setText('[data-decision-seller-type]', offer.sellerType);
    setText('[data-decision-cost]', money.format(offer.estimatedDeliveredCost));
    setText('[data-decision-summary]', recommendation.summary);
    setList('[data-decision-reasons]', recommendation.reasons);
    setList('[data-decision-watchouts]', recommendation.watchouts);

    const status = document.querySelector('[data-approach-action-status]');
    if (status) status.textContent = 'Checkout remains with the original seller.';
  };

  const renderPartnerAnchor = (recommendation) => {
    const offer = byOfferId.get(scenario.partnerNarrative.anchorOfferId);
    if (!offer) return;

    setText('[data-partner-status]', recommendation.offerStatuses[offer.id]);
    setText('[data-partner-seller]', offer.seller);
    setText('[data-partner-type]', offer.sellerType);
    setText('[data-partner-cost]', money.format(offer.estimatedDeliveredCost));
    setText('[data-partner-warranty]', offer.warranty);
    setText('[data-partner-returns]', offer.returns);
    setText('[data-partner-availability]', offer.availability);
    setText('[data-partner-service]', offer.service);
  };

  const applyPreference = (key) => {
    const variant = scenario.preferenceVariants[key];
    if (!variant) return;
    activePreference = key;
    renderOffers(variant.recommendation);
    renderDecision(variant);
    renderPartnerAnchor(variant.recommendation);
  };

  const setPerspective = (perspective, updateHash = true) => {
    const isPartner = perspective === 'partner';
    document.querySelectorAll('[data-demo-panel]').forEach((panel) => {
      panel.hidden = panel.dataset.demoPanel !== perspective;
    });
    document.querySelectorAll('[data-demo-perspective]').forEach((tab) => {
      const selected = tab.dataset.demoPerspective === perspective;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });

    if (updateHash) history.replaceState(null, '', isPartner ? '#partner' : '#collector');
  };

  const bindPerspectiveTabs = () => {
    const tabs = [...document.querySelectorAll('[data-demo-perspective]')];
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => setPerspective(tab.dataset.demoPerspective));
      tab.addEventListener('keydown', (event) => {
        if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
        event.preventDefault();
        const delta = event.key === 'ArrowRight' ? 1 : -1;
        const next = tabs[(index + delta + tabs.length) % tabs.length];
        next.focus();
        setPerspective(next.dataset.demoPerspective);
      });
    });
  };

  const bindPreferenceControl = () => {
    document.querySelectorAll('input[name="approach-preference"]').forEach((input) => {
      input.addEventListener('change', () => {
        if (input.checked) applyPreference(input.value);
      });
    });
  };

  const bindActions = () => {
    const status = document.querySelector('[data-approach-action-status]');
    document.querySelectorAll('[data-approach-action]').forEach((button) => {
      button.addEventListener('click', () => {
        if (!status) return;
        const recommendation = scenario.preferenceVariants[activePreference].recommendation;
        const offer = byOfferId.get(recommendation.offerId);
        if (!offer) return;

        if (button.dataset.approachAction === 'view') {
          status.textContent = `Illustrative only — View Offer would continue to ${offer.seller} for the seller's existing checkout.`;
        } else if (button.dataset.approachAction === 'wait') {
          status.textContent = 'Wait — the Pursuit remains active while Scout continues watching supported supply.';
        } else {
          status.textContent = 'Reject — this offer is dismissed without ending the Pursuit.';
        }
      });
    });
  };

  renderStaticScenario();
  bindPerspectiveTabs();
  bindPreferenceControl();
  bindActions();
  applyPreference(activePreference);
  setPerspective(window.location.hash === '#partner' ? 'partner' : 'collector', false);
})();
