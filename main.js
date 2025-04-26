
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
      });
    }
    
    // Profile Dropdown Toggle
    const profileBtn = document.getElementById('profileBtn');
    const profileDropdown = document.getElementById('profileDropdown');
    
    if (profileBtn && profileDropdown) {
      profileBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        profileDropdown.classList.toggle('show');
      });
      
      // Close dropdown when clicking outside
      document.addEventListener('click', function(e) {
        if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
          profileDropdown.classList.remove('show');
        }
      });
    }
    
    // Smooth scrolling for navigation links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#" or links to other pages
        if (href === "#" || href.indexOf('/') !== -1) return;
        
        e.preventDefault();
        
        const targetId = href;
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Close mobile menu if it's open
          navLinks.classList.remove('active');
          
          // Smooth scroll to target
          window.scrollTo({
            top: targetElement.offsetTop - 70, // Account for fixed header
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Form Submission Handler
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send this data to a server
        // For this example, we'll just show an alert
        alert(`Thank you, ${name}! Your message has been received. I'll get back to you soon.`);
        
        // Clear the form
        contactForm.reset();
      });
    }
    
    // Add active class to navigation links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight && navLink) {
          document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
          });
          navLink.classList.add('active');
        }
      });
    }
    
    // Only add scroll event listener if we're on the home page with sections
    if (sections.length > 0) {
      window.addEventListener('scroll', highlightNavLink);
      
      // Call once on page load to set initial active state
      highlightNavLink();
    }
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
      const animatedElements = document.querySelectorAll('.project-card, .skills-category, .resume-item, .contact-form, .contact-info');
      
      animatedElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
          element.classList.add('animate');
        }
      });
    };
    
    // Add animation class in CSS
    const style = document.createElement('style');
    style.textContent = `
      .project-card, .skills-category, .resume-item, .contact-form, .contact-info {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      .animate {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);
    
    // Call on scroll and once on page load
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
  });