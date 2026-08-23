(() => {
  const navShell = document.querySelector('.nav-shell');
  const menuToggle = document.querySelector('.menu-toggle');
  const primaryNav = document.querySelector('.primary-nav');

  if (navShell && menuToggle && primaryNav) {
    const normalizePath = (value) => {
      const pathname = new URL(value, window.location.href).pathname.replace(/\/index\.html$/, '/');
      return pathname.endsWith('/') ? pathname : `${pathname}/`;
    };

    const currentPath = normalizePath(window.location.pathname);
    const navSections = [
      {
        key: 'products',
        label: 'Products',
        intro: 'Two distinct product responsibilities built on one evidence foundation.',
        items: [
          {
            href: '/products/',
            label: 'Products overview',
            description: 'How WristOwl and WristAtlas fit together.',
          },
          {
            href: '/products/wristowl/',
            label: 'WristOwl',
            description: 'Collector decision intelligence',
            product: 'wristowl',
            mark: '/assets/wristowl-logo.svg',
          },
          {
            href: '/products/wristatlas/',
            label: 'WristAtlas',
            description: 'Canonical watch identity',
            product: 'wristatlas',
            mark: '/assets/wristatlas-mark.svg',
          },
        ],
      },
      {
        key: 'about',
        label: 'About',
        intro: 'Company context, operating approach, and the audiences Blue Dial Labs is building with.',
        items: [
          {
            href: '/about/',
            label: 'About Blue Dial Labs',
            description: 'Mission, principles, and why the company exists.',
          },
          {
            href: '/approach/',
            label: 'Our Approach',
            description: 'How identity, evidence, and decision quality fit together.',
          },
          {
            href: '/collectors/',
            label: 'For Collectors',
            description: 'The collector-aligned product perspective.',
          },
          {
            href: '/data-partners/',
            label: 'For Data Partners',
            description: 'How data and industry participants can work with us.',
          },
        ],
      },
      {
        key: 'trust',
        label: 'Trust',
        intro: 'The rules that protect recommendation independence, evidence quality, and collector privacy.',
        items: [
          {
            href: '/trust/',
            label: 'Trust overview',
            description: 'Principles governing recommendations, data, and privacy.',
          },
          {
            href: '/commercial-disclosure/',
            label: 'Independence & Disclosure',
            description: 'Commercial relationships do not buy recommendation rank.',
          },
          {
            href: '/data-standards/',
            label: 'Data Standards',
            description: 'Identity, provenance, confidence, and historical evidence.',
          },
          {
            href: '/privacy/',
            label: 'Privacy',
            description: 'Private-by-default handling of sensitive collector information.',
          },
        ],
      },
    ];

    const navGroups = [];

    navSections.forEach((section) => {
      const sourceLink = Array.from(primaryNav.children).find(
        (child) => child instanceof HTMLAnchorElement && child.textContent.trim() === section.label,
      );

      if (!sourceLink) return;

      const group = document.createElement('div');
      group.className = `nav-group nav-submenu-${section.key}`;

      const isCurrentSection = section.items.some((item) => normalizePath(item.href) === currentPath);
      if (isCurrentSection) group.classList.add('is-current');

      const toggle = document.createElement('button');
      const submenuId = `nav-submenu-${section.key}`;
      toggle.className = 'nav-group-toggle';
      toggle.type = 'button';
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-controls', submenuId);

      const toggleLabel = document.createElement('span');
      toggleLabel.textContent = section.label;
      toggle.append(toggleLabel);

      const chevron = document.createElement('span');
      chevron.className = 'nav-group-chevron';
      chevron.setAttribute('aria-hidden', 'true');
      toggle.append(chevron);

      const submenu = document.createElement('div');
      submenu.className = 'nav-submenu';
      submenu.id = submenuId;

      const submenuInner = document.createElement('div');
      submenuInner.className = 'nav-submenu-inner';

      const intro = document.createElement('div');
      intro.className = 'nav-submenu-intro';

      const introTitle = document.createElement('p');
      introTitle.className = 'nav-submenu-intro-title';
      introTitle.textContent = section.label;

      const introCopy = document.createElement('p');
      introCopy.className = 'nav-submenu-intro-copy';
      introCopy.textContent = section.intro;
      intro.append(introTitle, introCopy);

      const links = document.createElement('div');
      links.className = 'nav-submenu-links';

      section.items.forEach((item) => {
        const link = document.createElement('a');
        link.className = `nav-submenu-link${item.product ? ' nav-product-link' : ''}`;
        link.href = item.href;

        if (normalizePath(item.href) === currentPath) link.setAttribute('aria-current', 'page');

        if (item.mark) {
          const mark = document.createElement('img');
          mark.className = 'nav-product-mark';
          mark.src = item.mark;
          mark.alt = '';
          mark.width = 160;
          mark.height = 160;
          mark.setAttribute('aria-hidden', 'true');
          link.append(mark);
        }

        const title = document.createElement('span');
        title.className = 'nav-submenu-link-title';
        title.textContent = item.label;

        const description = document.createElement('span');
        description.className = 'nav-submenu-link-description';
        description.textContent = item.description;

        link.append(title, description);
        links.append(link);
      });

      submenuInner.append(intro, links);
      submenu.append(submenuInner);
      group.append(toggle, submenu);
      sourceLink.replaceWith(group);
      navGroups.push({ group, toggle });
    });

    const syncDisclosureFocusState = () => {
      const hasOpenDesktopSubmenu =
        window.matchMedia('(min-width: 901px)').matches &&
        navGroups.some((navGroup) => navGroup.toggle.getAttribute('aria-expanded') === 'true');

      document.body.classList.toggle('nav-disclosure-focus', hasOpenDesktopSubmenu);
    };

    const setSubmenuState = (navGroup, isOpen) => {
      navGroup.group.classList.toggle('is-open', isOpen);
      navGroup.toggle.setAttribute('aria-expanded', String(isOpen));
      syncDisclosureFocusState();
    };

    const closeSubmenus = (except = null) => {
      navGroups.forEach((navGroup) => {
        if (navGroup !== except) setSubmenuState(navGroup, false);
      });
    };

    navGroups.forEach((navGroup) => {
      navGroup.toggle.addEventListener('click', () => {
        const shouldOpen = navGroup.toggle.getAttribute('aria-expanded') !== 'true';
        closeSubmenus(navGroup);
        setSubmenuState(navGroup, shouldOpen);
      });
    });

    const setMenuState = (isOpen) => {
      navShell.classList.toggle('nav-open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
      document.body.classList.toggle(
        'nav-mobile-menu-focus',
        isOpen && window.matchMedia('(max-width: 900px)').matches,
      );
      if (!isOpen) closeSubmenus();
    };

    menuToggle.addEventListener('click', () => {
      setMenuState(menuToggle.getAttribute('aria-expanded') !== 'true');
    });

    primaryNav.addEventListener('click', (event) => {
      if (event.target instanceof Element && event.target.closest('a')) setMenuState(false);
    });

    document.addEventListener('pointerdown', (event) => {
      if (!(event.target instanceof Node) || navShell.contains(event.target)) return;

      if (menuToggle.getAttribute('aria-expanded') === 'true') {
        setMenuState(false);
      } else {
        closeSubmenus();
      }
    });

    document.addEventListener('focusin', (event) => {
      if (
        window.matchMedia('(min-width: 901px)').matches &&
        event.target instanceof Node &&
        !navShell.contains(event.target)
      ) {
        closeSubmenus();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;

      const openGroup = navGroups.find((navGroup) => navGroup.toggle.getAttribute('aria-expanded') === 'true');
      if (openGroup) {
        setSubmenuState(openGroup, false);
        openGroup.toggle.focus();
        return;
      }

      if (menuToggle.getAttribute('aria-expanded') === 'true') {
        setMenuState(false);
        menuToggle.focus();
      }
    });

    const desktopNavigation = window.matchMedia('(min-width: 901px)');
    const resetForBreakpointChange = () => setMenuState(false);

    if (typeof desktopNavigation.addEventListener === 'function') {
      desktopNavigation.addEventListener('change', resetForBreakpointChange);
    } else if (typeof desktopNavigation.addListener === 'function') {
      desktopNavigation.addListener(resetForBreakpointChange);
    }
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
