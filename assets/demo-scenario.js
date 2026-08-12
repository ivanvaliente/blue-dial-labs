(() => {
  /**
   * @typedef {Object} DemoOffer
   * @property {string} id
   * @property {string} seller
   * @property {string} sellerType
   * @property {string} channel
   * @property {string} source
   * @property {string} url
   * @property {number} advertisedPrice
   * @property {number} shipping
   * @property {number} estimatedTax
   * @property {number} fees
   * @property {number} estimatedDeliveredCost
   * @property {string} condition
   * @property {string} completeness
   * @property {string} geography
   * @property {boolean} authorized
   * @property {'manufacturer'|'retailer'|'seller'} warrantyKind
   * @property {string} warranty
   * @property {number} returnWindowDays
   * @property {string} returns
   * @property {boolean} directRetailer
   * @property {string} reputation
   * @property {string} protections
   * @property {string} availability
   * @property {string} service
   */

  /**
   * @typedef {Object} DemoRecommendation
   * @property {string} offerId
   * @property {string} label
   * @property {string} summary
   * @property {string[]} reasons
   * @property {string[]} watchouts
   * @property {Object<string, string>} offerStatuses
   */

  /**
   * @typedef {Object} DemoScenario
   * @property {string} id
   * @property {{ brand: string, collection: string, model: string, reference: string, variant: string }} watch
   * @property {{ name: string, maximumDeliveredCost: number, required: string[], preferred: string[] }} pursuit
   * @property {DemoOffer[]} offers
   * @property {Object<string, { label: string, shortLabel: string, description: string, recommendation: DemoRecommendation }>} preferenceVariants
   * @property {{ maximumDeliveredCost: number, warrantyPolicy: string, savingsThreshold: number, minimumReturnDays: number, channelPolicy: string }} interactiveDefaults
   * @property {Object<string, { label: string, maximumDeliveredCost: number, warrantyPolicy: string, savingsThreshold: number, minimumReturnDays: number, channelPolicy: string }> } presets
   * @property {{ anchorOfferId: string, narrative: string[] }} partnerNarrative
   */

  /** @type {DemoScenario} */
  const scenario = {
    id: 'synthetic-prx-v0.2',
    watch: {
      brand: 'Tissot',
      collection: 'PRX',
      model: 'PRX Powermatic 80',
      reference: 'T137.407.11.041.00',
      variant: 'Blue dial · steel bracelet',
    },
    pursuit: {
      name: 'Everyday integrated-bracelet watch',
      maximumDeliveredCost: 725,
      required: [
        'New / unworn condition',
        'Full set',
        'United States fulfillment',
        'Estimated Delivered Cost at or below $725',
      ],
      preferred: [
        'Manufacturer warranty',
        'Direct retailer checkout',
        '14+ day return window',
        'Clear post-sale support',
      ],
    },
    offers: [
      {
        id: 'harbor',
        seller: 'Synthetic Harbor Watches',
        sellerType: 'Authorized enthusiast retailer',
        channel: 'Retailer website',
        source: 'Synthetic direct retailer feed',
        url: 'https://harbor-watches.example/offers/tissot-prx-blue',
        advertisedPrice: 675,
        shipping: 0,
        estimatedTax: 47,
        fees: 0,
        estimatedDeliveredCost: 722,
        condition: 'New / unworn',
        completeness: 'Full set',
        geography: 'United States',
        authorized: true,
        warrantyKind: 'manufacturer',
        warranty: 'Manufacturer warranty · 2 years',
        returnWindowDays: 30,
        returns: '30 days · no restocking fee',
        directRetailer: true,
        reputation: 'Established enthusiast retailer',
        protections: 'Direct checkout · card protections',
        availability: 'In stock',
        service: 'Direct post-sale support',
      },
      {
        id: 'gray',
        seller: 'Synthetic Gray Retailer',
        sellerType: 'Discount / gray-market retailer',
        channel: 'Retailer website',
        source: 'Synthetic affiliate/product feed',
        url: 'https://gray-retailer.example/offers/tissot-prx-blue',
        advertisedPrice: 599,
        shipping: 0,
        estimatedTax: 42,
        fees: 0,
        estimatedDeliveredCost: 641,
        condition: 'New / unworn',
        completeness: 'Full set',
        geography: 'United States',
        authorized: false,
        warrantyKind: 'retailer',
        warranty: 'Retailer warranty · 2 years',
        returnWindowDays: 14,
        returns: '14 days · 10% restocking on non-defect returns',
        directRetailer: true,
        reputation: 'Established discount retailer',
        protections: 'Direct checkout · card protections',
        availability: 'In stock',
        service: 'Retailer-managed warranty support',
      },
      {
        id: 'marketplace',
        seller: 'Synthetic Marketplace Seller',
        sellerType: 'Marketplace seller',
        channel: 'Synthetic marketplace',
        source: 'Synthetic marketplace API-like feed',
        url: 'https://marketplace.example/offers/tissot-prx-blue',
        advertisedPrice: 559,
        shipping: 45,
        estimatedTax: 43,
        fees: 19,
        estimatedDeliveredCost: 666,
        condition: 'New / unworn',
        completeness: 'Full set',
        geography: 'United States',
        authorized: false,
        warrantyKind: 'seller',
        warranty: 'Seller warranty · 1 year',
        returnWindowDays: 7,
        returns: '7 days · buyer pays return shipping',
        directRetailer: false,
        reputation: '98.7% positive · 1,400 synthetic sales',
        protections: 'Marketplace buyer protection',
        availability: '1 available',
        service: 'Seller-dependent post-sale support',
      },
    ],
    preferenceVariants: {
      'warranty-required': {
        label: 'Manufacturer warranty required',
        shortLabel: 'Warranty required',
        description: 'Treat manufacturer warranty as a hard buying condition.',
        recommendation: {
          offerId: 'harbor',
          label: 'Worth Pursuing',
          summary: 'The authorized retailer costs more, but it is the only current offer that satisfies every hard buying condition.',
          reasons: [
            'Exact reference and requested variant are represented in the synthetic evidence.',
            'Manufacturer warranty requirement is met.',
            'Estimated Delivered Cost is $722 — within the collector’s $725 ceiling.',
            'In-stock status, 30-day returns, and direct post-sale support strengthen the fit.',
          ],
          watchouts: [
            'The gray-market offer is $81 cheaper on Estimated Delivered Cost.',
            'The recommendation changes if manufacturer warranty becomes negotiable.',
          ],
          offerStatuses: {
            harbor: 'Recommended for this Pursuit',
            gray: 'Does not qualify · warranty requirement',
            marketplace: 'Does not qualify · warranty requirement',
          },
        },
      },
      'flexible-savings': {
        label: 'Flexible on warranty when savings are at least $50',
        shortLabel: 'Warranty flexible',
        description: 'Allow a non-manufacturer warranty when the savings are meaningful enough to this collector.',
        recommendation: {
          offerId: 'gray',
          label: 'Worth Pursuing',
          summary: 'Once warranty becomes negotiable, the discount retailer becomes the strongest current fit for this collector’s stated tradeoff.',
          reasons: [
            'All remaining hard buying conditions are met.',
            'Estimated Delivered Cost is $641 — $81 below the authorized-retailer option.',
            'The savings exceed the collector’s synthetic $50 tradeoff threshold.',
            'Direct retailer checkout and a two-year retailer warranty preserve more support than the marketplace alternative.',
          ],
          watchouts: [
            'The warranty is retailer-provided, not manufacturer-provided.',
            'Returns are shorter and may include a restocking fee.',
          ],
          offerStatuses: {
            harbor: 'Qualifies · stronger warranty, higher cost',
            gray: 'Recommended for this Pursuit',
            marketplace: 'Qualifies · not preferred',
          },
        },
      },
    },
    interactiveDefaults: {
      maximumDeliveredCost: 725,
      warrantyPolicy: 'required',
      savingsThreshold: 50,
      minimumReturnDays: 14,
      channelPolicy: 'any',
    },
    presets: {
      warranty: {
        label: 'Prioritize manufacturer warranty',
        maximumDeliveredCost: 725,
        warrantyPolicy: 'required',
        savingsThreshold: 50,
        minimumReturnDays: 14,
        channelPolicy: 'any',
      },
      savings: {
        label: 'Trade warranty for meaningful savings',
        maximumDeliveredCost: 725,
        warrantyPolicy: 'flexible',
        savingsThreshold: 50,
        minimumReturnDays: 14,
        channelPolicy: 'any',
      },
      wait: {
        label: 'Hold out for a lower delivered cost',
        maximumDeliveredCost: 620,
        warrantyPolicy: 'flexible',
        savingsThreshold: 50,
        minimumReturnDays: 14,
        channelPolicy: 'any',
      },
    },
    partnerNarrative: {
      anchorOfferId: 'harbor',
      narrative: [
        'Structured inventory is evaluated against collector buying conditions without exposing the collector’s private Pursuit to the seller.',
        'Commercial compensation is not an input to the synthetic recommendation outcome.',
        'When the collector chooses View Offer, checkout and the customer relationship remain with the original seller.',
      ],
    },
  };

  window.BlueDialDemoScenario = Object.freeze(scenario);
})();
