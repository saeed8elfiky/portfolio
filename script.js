// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Scroll reveal
const revealTargets = document.querySelectorAll(
  '.about-card, .skill-group, .tl-entry, .project-card, .writeup-card, .cert-row, .contact-card'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  revealTargets.forEach(el => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  revealTargets.forEach(el => observer.observe(el));
}

// Active Nav Link Highlighting
const sections = document.querySelectorAll('section[id]');
const navLinkElements = document.querySelectorAll('.nav-links a');

function updateActiveNavLink() {
  let currentActive = '';
  
  // Check if user has scrolled to the bottom of the page
  const isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 50);
  
  if (isAtBottom && sections.length > 0) {
    currentActive = sections[sections.length - 1].getAttribute('id');
  } else {
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      // If the top of the section is above 150px from the top of the viewport (accounting for sticky nav)
      if (rect.top <= 150) {
        currentActive = section.getAttribute('id');
      }
    });
  }

  navLinkElements.forEach(link => {
    const href = link.getAttribute('href');
    if (href === `#${currentActive}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('resize', updateActiveNavLink);
updateActiveNavLink();

// Copy email address to clipboard
const copyEmailBtn = document.getElementById('copyEmail');
if (copyEmailBtn) {
  copyEmailBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const email = 'saeedelfikybusiness@gmail.com';
    
    const showSuccess = () => {
      const tooltip = document.getElementById('copyTooltip');
      if (tooltip) {
        tooltip.textContent = 'Copied!';
        setTimeout(() => {
          tooltip.textContent = 'Copy';
        }, 2000);
      }
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(showSuccess).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    } else {
      // Fallback for non-secure contexts or file:// protocol
      const textArea = document.createElement('textarea');
      textArea.value = email;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          showSuccess();
        } else {
          console.error('Fallback copy command was unsuccessful');
        }
      } catch (err) {
        console.error('Fallback copy failed: ', err);
      }
      document.body.removeChild(textArea);
    }
  });
}

// Back to Top button
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('is-visible');
    } else {
      backToTopBtn.classList.remove('is-visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Typewriter animation on hero title
const typewriterEl = document.getElementById('typewriter');
if (typewriterEl) {
  if (prefersReducedMotion) {
    typewriterEl.textContent = 'SOC Engineer';
  } else {
    const phrases = [
      'SOC Engineer',
      'SIEM Engineer',
      'Detection Engineer',
      'Security Automation Engineer',
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
      const currentPhrase = phrases[phraseIndex];
      if (isDeleting) {
        charIndex--;
        typewriterEl.textContent = currentPhrase.substring(0, charIndex);
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(typeWriter, 400);
          return;
        }
        setTimeout(typeWriter, 35);
      } else {
        charIndex++;
        typewriterEl.textContent = currentPhrase.substring(0, charIndex);
        if (charIndex === currentPhrase.length) {
          isDeleting = true;
          setTimeout(typeWriter, 1800);
          return;
        }
        setTimeout(typeWriter, 60);
      }
    }
    typeWriter();
  }
}

// Project filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => {
      b.classList.remove('is-active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('is-active');
    btn.setAttribute('aria-selected', 'true');

    const filter = btn.getAttribute('data-filter');
    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.classList.remove('is-hidden');
        card.classList.add('is-visible');
      } else {
        card.classList.add('is-hidden');
      }
    });
  });
});

// Cert issuer favicon badges
const certIssuerMap = {
  'EC-Council': 'eccouncil.org',
  'NTI': 'nti.sci.eg',
  'WE INNOVATE': 'weareinnovate.org',
  'Netriders': 'netriders.net',
  'AWS': 'aws.amazon.com',
  'Fortinet': 'fortinet.com',
  'SWISS': 'swiss-learn.com',
  'ITIDA': 'itida.gov.eg',
  'Red Team Leaders': 'redteamleaders.com',
  'ArcX': 'arcx.io'
};

document.querySelectorAll('.cert-issuer').forEach(issuerEl => {
  const text = issuerEl.textContent.trim();
  const key = Object.keys(certIssuerMap).find(k => text.includes(k));
  if (key) {
    const img = document.createElement('img');
    img.src = `https://www.google.com/s2/favicons?domain=${certIssuerMap[key]}&sz=16`;
    img.alt = '';
    img.setAttribute('aria-hidden', 'true');
    img.width = 16;
    img.height = 16;
    img.className = 'cert-badge-img';
    img.onerror = () => { img.style.display = 'none'; };
    issuerEl.insertBefore(img, issuerEl.firstChild);
  }
});
