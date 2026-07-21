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

