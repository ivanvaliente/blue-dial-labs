(() => {
  const demo = document.querySelector("[data-atlas-demo]");
  if (!demo) return;

  const examples = {
    rolex: {
      source: "“Rolex Submariner 124060 blk dial full set”",
      brand: "Rolex",
      collection: "Submariner",
      model: "Submariner",
      reference: "124060",
      variant: "—",
      note: "Reference 124060 is present in the current initial catalog. No WatchVariant is asserted for this curated example."
    },
    tissot: {
      source: "“Tissot PRX Powermatic 80 blue T1374071104100”",
      brand: "Tissot",
      collection: "Classic Contemporary",
      model: "PRX 40mm",
      reference: "T137.407.11.041.00",
      variant: "—",
      note: "The compact reference form T1374071104100 is recorded as an alias for the cataloged manufacturer reference. No WatchVariant is asserted for this curated example."
    },
    casio: {
      source: "“Casio G Shock GA-2100-1A1 black”",
      brand: "Casio",
      collection: "G-SHOCK",
      model: "2100 Series",
      reference: "GA2100-1A1",
      variant: "—",
      note: "The hyphenated GA-2100-1A1 form is recorded as an alias for the cataloged manufacturer reference. No WatchVariant is asserted for this curated example."
    },
    tudor: {
      source: "“Tudor Black Bay 41 M7941A1A0NU-0001 full kit”",
      brand: "TUDOR",
      collection: "Black Bay",
      model: "Black Bay 41mm",
      reference: "M7941A1A0NU-0001",
      variant: "—",
      note: "Reference M7941A1A0NU-0001 is present in the current initial catalog. No WatchVariant is asserted for this curated example."
    }
  };

  const source = demo.querySelector("[data-atlas-source]");
  const brand = demo.querySelector("[data-atlas-brand]");
  const collection = demo.querySelector("[data-atlas-collection]");
  const model = demo.querySelector("[data-atlas-model]");
  const reference = demo.querySelector("[data-atlas-reference]");
  const variant = demo.querySelector("[data-atlas-variant]");
  const note = demo.querySelector("[data-atlas-note]");
  const buttons = Array.from(demo.querySelectorAll("[data-atlas-example]"));

  function showExample(key) {
    const example = examples[key];
    if (!example) return;

    source.textContent = example.source;
    brand.textContent = example.brand;
    collection.textContent = example.collection;
    model.textContent = example.model;
    reference.textContent = example.reference;
    variant.textContent = example.variant;
    note.textContent = example.note;

    buttons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.atlasExample === key));
    });
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => showExample(button.dataset.atlasExample));
  });
})();
