// Initialize AOS Intersections
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Typing Effect using Typed.js
const typed = new Typed('.typing-text', {
    strings: ['Java Full Stack Developer', 'Software Developer', 'Problem Solver'],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true,
    backDelay: 2000
});

// Particles.js Configuration (anti-gravity style)
particlesJS('particles-js', {
    "particles": {
      "number": {
        "value": 50,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#66fcf1"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": true,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#45a29e",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 140,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });

// Sticky Navbar Background on Scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Change icon based on state
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Dark/Light Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    
    if (document.body.classList.contains('light-theme')) {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        
        // Update particles color for light theme if canvas is initialized
        if(window.pJSDom && window.pJSDom.length > 0) {
            window.pJSDom[0].pJS.particles.color.value = "#0077b6";
            window.pJSDom[0].pJS.particles.line_linked.color = "#0096c7";
            window.pJSDom[0].pJS.fn.particlesRefresh();
        }
    } else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        
        // Update particles color for dark theme
        if(window.pJSDom && window.pJSDom.length > 0) {
            window.pJSDom[0].pJS.particles.color.value = "#66fcf1";
            window.pJSDom[0].pJS.particles.line_linked.color = "#45a29e";
            window.pJSDom[0].pJS.fn.particlesRefresh();
        }
    }
});

// Real Form Submission handling (WhatsApp Routing)
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('.submit-btn');
    const originalText = btn.innerHTML;
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing...';
    btn.disabled = true;
    
    setTimeout(() => {
        // Construct the WhatsApp message payload
        const whatsappText = encodeURIComponent(`Hello Madhav,\n\nI am contacting you from your portfolio.\n\n*Name*: ${name}\n*Email*: ${email}\n\n*Message*:\n${message}`);
        const whatsappNumber = '919502489710';
        
        // Open WhatsApp directly
        window.open(`https://wa.me/${whatsappNumber}?text=${whatsappText}`, '_blank');
        
        btn.innerHTML = '<i class="fas fa-check"></i> Contact Form Sent!';
        btn.style.background = '#4CAF50';
        btn.style.color = 'white';
        this.reset();
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.style.color = '';
            btn.disabled = false;
        }, 3000);
    }, 500);
});

// =====================
// SCROLL PROGRESS BAR
// =====================
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (scrollProgress) scrollProgress.style.width = progress + '%';
});

// =====================
// BACK TO TOP BUTTON
// =====================
const backToTopBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTopBtn?.classList.add('visible');
    } else {
        backToTopBtn?.classList.remove('visible');
    }
});
backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =====================
// ACTIVE NAV HIGHLIGHT
// =====================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navItems.forEach(a => a.classList.remove('active'));
            const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
}, { threshold: 0.35 });

sections.forEach(section => sectionObserver.observe(section));

