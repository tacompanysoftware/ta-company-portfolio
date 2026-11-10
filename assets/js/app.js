(() => {
  'use strict';
  const config = window.TA_SITE_CONFIG || {};
  const page = document.body.dataset.page || 'home';
  const navItems = [
    ['home', 'Home', 'index.html'],
    ['about', 'About', 'about.html'],
    ['services', 'Services', 'services.html'],
    ['work', 'Work', 'work.html'],
    ['contact', 'Contact', 'contact.html']
  ];

  const headerTarget = document.querySelector('[data-site-header]');
  if (headerTarget) {
    headerTarget.innerHTML = `
      <header class="site-header" id="top">
        <div class="nav-shell">
          <a class="brand" href="index.html" aria-label="T/A Company home">
            <img class="brand-mark" src="assets/images/ta-mark.jpg" alt="T/A logo">
            <span class="brand-copy"><strong>T/A COMPANY</strong><small>SOFTWARE ENGINEERING</small></span>
          </a>
          <nav class="nav-links" id="primary-navigation" aria-label="Main navigation">
            ${navItems.map(([key,label,url]) => `<a href="${url}" ${(page===key || (page==='project' && key==='work'))?'aria-current="page"':''}>${label}</a>`).join('')}
          </nav>
          <a class="nav-cta" href="contact.html">Let's talk <span>↗</span></a>
          <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="primary-navigation"><span></span><span></span></button>
        </div>
      </header>`;
  }

  const footerTarget = document.querySelector('[data-site-footer]');
  if (footerTarget) {
    const socialLinks = Object.entries(config.SOCIALS || {}).filter(([,url]) => url && /^https:\/\//i.test(url));
    footerTarget.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-main">
            <div class="footer-brand">
              <a class="brand" href="index.html"><img class="brand-mark" src="assets/images/ta-mark.jpg" alt=""><span class="brand-copy"><strong>T/A COMPANY</strong><small>SOFTWARE ENGINEERING</small></span></a>
              <p>Thoughtful design. Reliable engineering. Digital experiences made with intention.</p>
            </div>
            <div class="footer-col"><h4>EXPLORE</h4><nav class="footer-links" aria-label="Footer navigation"><a href="index.html">Home</a><a href="about.html">About</a><a href="services.html">Services</a><a href="work.html">Work</a><a href="contact.html">Contact</a></nav></div>
            <div class="footer-col"><h4>CONNECT</h4><nav class="footer-links" aria-label="Social links">${socialLinks.length ? socialLinks.map(([name,url])=>`<a href="${url}" target="_blank" rel="noopener noreferrer">${name[0].toUpperCase()+name.slice(1)} ↗</a>`).join('') : '<span class="muted" style="font-size:11px">Social links to be added</span>'}</nav></div>
          </div>
          <div class="footer-bottom"><span>© <span data-current-year>2026</span> T/A Company. All rights reserved.</span><nav><a href="privacy.html">Privacy policy</a><a href="terms.html">Terms &amp; conditions</a></nav><a href="#top" aria-label="Back to top">BACK TO TOP ↑</a></div>
        </div>
      </footer>`;
  }

  // Mobile navigation and sticky header.
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  const closeMenu = () => {
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.setAttribute('aria-label', 'Open menu');
    nav?.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav?.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 760) closeMenu(); });
  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  // Reveal-on-scroll animation.
  const revealNodes = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealNodes.forEach(node => revealObserver.observe(node));
  } else {
    revealNodes.forEach(node => node.classList.add('is-visible'));
  }

  // Current year.
  document.querySelectorAll('[data-current-year]').forEach(node => node.textContent = new Date().getFullYear());

  // Portfolio category filters.
  const filters = document.querySelectorAll('[data-filter]');
  const projects = document.querySelectorAll('[data-category]');
  filters.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filters.forEach(item => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    projects.forEach(card => card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.category !== filter));
  }));

  // Project details are deliberately identified as portfolio concepts until real client case studies are supplied.
  const projectData = {
    architecture: { title:'Architecture Studio', type:'Website design', image:'assets/images/project-architecture.jpg', alt:'Architecture studio website concept', intro:'A restrained digital direction for an architecture practice, built around strong imagery, clear project storytelling, and an editorial rhythm.', challenge:'The concept explores how an architecture studio can present spaces and projects without overwhelming the work itself.', solution:'A minimal layout, generous image areas, considered typography, and a direct information hierarchy keep attention on the architecture.', label:'01 / WEB DESIGN' },
    hospitality: { title:'Luxury Hospitality', type:'Web experience', image:'assets/images/project-hotel.jpg', alt:'Luxury hospitality website concept', intro:'A hospitality concept focused on atmosphere, visual storytelling, and a calm path from discovery to enquiry.', challenge:'The direction needs to communicate a premium stay while keeping essential information easy to find.', solution:'Large photography, quiet navigation, and a clear content structure create a refined first impression.', label:'02 / DIGITAL EXPERIENCE' },
    watch: { title:'Premium Watch', type:'E-commerce concept', image:'assets/images/project-watch.jpg', alt:'Premium watch e-commerce concept', intro:'A product-led storefront direction that gives a premium object the space and detail it deserves.', challenge:'The concept balances product presence with a simple shopping journey.', solution:'A dark visual system, focused product framing, and straightforward product information form the core of the experience.', label:'03 / E-COMMERCE' },
    food: { title:'Fresh & Nourish', type:'Brand direction', image:'assets/images/project-food.jpg', alt:'Healthy food brand concept', intro:'A fresh digital direction for a food and lifestyle brand, using a clean structure and warm product imagery.', challenge:'The concept explores how to make product information feel approachable and engaging.', solution:'A clear grid, accessible typography, and bright food photography give the page an inviting character.', label:'04 / BRAND DIRECTION' }
  };
  const detailRoot = document.getElementById('project-detail');
  if (detailRoot) {
    const slug = new URLSearchParams(window.location.search).get('slug') || 'architecture';
    const item = projectData[slug];
    if (!item) {
      window.location.replace('404.html');
    } else {
      document.title = `${item.title} — T/A Company`;
      detailRoot.innerHTML = `
        <section class="project-detail-hero"><div class="container project-hero-grid"><div><p class="section-kicker">${item.label}</p><h1>${item.title.split(' ').slice(0,-1).join(' ')}<br><span>${item.title.split(' ').slice(-1)}</span></h1></div><div><p class="project-summary">${item.intro}</p><div class="project-facts"><div><small>TYPE</small><span>${item.type}</span></div><div><small>YEAR</small><span>2026</span></div><div><small>STATUS</small><span>Concept study</span></div></div></div></div></section>
        <div class="project-cover"><img src="${item.image}" alt="${item.alt}"></div>
        <section class="section-pad"><div class="container project-story"><div><p class="section-kicker">THE THINKING</p><h2>Designed with<br><span style="color:var(--gold-2)">purpose.</span></h2></div><div><p>${item.challenge}</p><p>${item.solution}</p><div class="concept-notice">Portfolio concept — this page is an illustrative design study, not a representation of a completed client engagement. Replace with verified project details before publishing as a case study.</div><div class="project-nav"><a href="work.html"><span>←</span> Back to work</a><a href="contact.html">Start a project <span>↗</span></a></div></div></div></section>`;
    }
  }

  // Contact form: validate locally, then send to configured endpoint or prepare an email draft.
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const contactEmail = document.getElementById('contact-email');
  const contactPhone = document.getElementById('contact-phone');
  if (contactEmail) {
    if (config.CONTACT_EMAIL) {
      contactEmail.textContent = config.CONTACT_EMAIL;
      contactEmail.href = `mailto:${config.CONTACT_EMAIL}`;
    } else {
      contactEmail.textContent = 'Email address to be added';
      contactEmail.href = '#contact-form';
    }
  }
  if (contactPhone && config.PHONE) contactPhone.textContent = config.PHONE;
  form?.addEventListener('submit', async event => {
    event.preventDefault();
    status.classList.remove('is-error');
    if (!form.reportValidity()) {
      status.textContent = 'Please complete the required fields with valid information.';
      status.classList.add('is-error');
      return;
    }
    const formData = Object.fromEntries(new FormData(form).entries());
    const submit = form.querySelector('button[type="submit"]');
    submit.disabled = true;
    submit.style.opacity = '.65';
    try {
      if (config.FORM_ENDPOINT) {
        const response = await fetch(config.FORM_ENDPOINT, { method:'POST', headers:{'Content-Type':'application/json','Accept':'application/json'}, body:JSON.stringify(formData) });
        if (!response.ok) throw new Error('The form service did not accept the message.');
        status.textContent = 'Thank you — your enquiry has been sent.';
        form.reset();
      } else if (config.CONTACT_EMAIL) {
        const subject = encodeURIComponent(`Project enquiry — ${formData.name}`);
        const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || 'Not provided'}\nService: ${formData.type}\n\nMessage:\n${formData.message}`);
        window.location.href = `mailto:${config.CONTACT_EMAIL}?subject=${subject}&body=${body}`;
        status.textContent = 'Your email draft is ready in your mail application.';
      } else {
        status.textContent = 'The form is validated. Add CONTACT_EMAIL or FORM_ENDPOINT in assets/js/config.js to enable message delivery.';
        status.classList.add('is-error');
      }
    } catch (error) {
      status.textContent = error.message || 'Something went wrong. Please try again.';
      status.classList.add('is-error');
    } finally {
      submit.disabled = false;
      submit.style.opacity = '1';
    }
  });
})();
