(() => {
  const navShell = document.querySelector('.nav-shell');
  const menuToggle = document.querySelector('.menu-toggle');
  const primaryNav = document.querySelector('.primary-nav');

  if (navShell && menuToggle && primaryNav) {
    const setMenuState = (isOpen) => {
      navShell.classList.toggle('nav-open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    };

    menuToggle.addEventListener('click', () => {
      setMenuState(menuToggle.getAttribute('aria-expanded') !== 'true');
    });

    primaryNav.addEventListener('click', (event) => {
      if (event.target.closest('a')) setMenuState(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        setMenuState(false);
        menuToggle.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.matchMedia('(min-width: 801px)').matches) setMenuState(false);
    });
  }

  const contactForm = document.querySelector('[data-mailto-form]');
  if (!contactForm) return;

  const reasonSelect = contactForm.querySelector('#reason');
  const reasonContext = new URLSearchParams(window.location.search).get('reason');
  const reasonByContext = {
    wristowl: 'WristOwl / collector product interest',
    'wristowl-partner': 'WristOwl / partner pilot or offer-data collaboration',
    wristatlas: 'WristAtlas / canonical identity and data',
  };
  const contextualReason = reasonByContext[reasonContext];

  if (reasonSelect && contextualReason) reasonSelect.value = contextualReason;

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const data = new FormData(contactForm);
    const recipient = contactForm.dataset.mailtoForm || 'hello@bluediallabs.com';
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const organization = String(data.get('organization') || '').trim();
    const reason = String(data.get('reason') || 'General inquiry').trim();
    const message = String(data.get('message') || '').trim();

    const subject = `Blue Dial Labs — ${reason}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      organization ? `Organization: ${organization}` : null,
      `Reason: ${reason}`,
      '',
      message,
    ].filter((line) => line !== null).join('\n');

    const status = contactForm.querySelector('.form-status');
    if (status) status.textContent = 'Opening your email application with this message prefilled…';

    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();
