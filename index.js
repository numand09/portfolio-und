// Accessibility - Handle keyboard navigation
const handleFirstTab = (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing');
    window.removeEventListener('keydown', handleFirstTab);
    window.addEventListener('mousedown', handleMouseDownOnce);
  }
};

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing');
  window.removeEventListener('mousedown', handleMouseDownOnce);
  window.addEventListener('keydown', handleFirstTab);
};

window.addEventListener('keydown', handleFirstTab);

// Back to top button functionality
const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

const alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered 
    ? "translateY(0)" 
    : "translateY(10px)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Image hover effect - Switch between static and GIF
document.querySelectorAll('.work__image').forEach(img => {
  const staticSrc = img.src;
  const gifSrc = img.getAttribute('data-hover');
  
  if (gifSrc) {
    img.addEventListener('mouseover', () => {
      img.src = gifSrc;
    });
    
    img.addEventListener('mouseout', () => {
      img.src = staticSrc;
    });
  }
});

// Add current year to footer copyright
document.getElementById('year').textContent = new Date().getFullYear();

// Add fade-in animation to elements when they come into view
const fadeInElements = document.querySelectorAll('.work__box, .company-card, .about__content, .contact__info');

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      fadeInObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeInElements.forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(20px)';
  element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  fadeInObserver.observe(element);
});

// Add active class to navigation links based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav__link');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
});

// Add a subtle parallax effect to the header
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  const scrollValue = window.scrollY;
  if (scrollValue < window.innerHeight) {
    header.style.backgroundPositionY = `${scrollValue * 0.4}px`;
  }
});

// Preload GIFs for smoother transitions
window.addEventListener('load', () => {
  document.querySelectorAll('.work__image[data-hover]').forEach(img => {
    const gifSrc = img.getAttribute('data-hover');
    if (gifSrc) {
      const preloadImg = new Image();
      preloadImg.src = gifSrc;
    }
  });
});