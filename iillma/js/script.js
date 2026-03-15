document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");

  // Sticky Navbar Effect
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled", "shadow-sm");
    } else {
      navbar.classList.remove("scrolled", "shadow-sm");
    }
  });

  // Smooth Scrolling for anchor links (if any)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 70, // Adjust for sticky navbar
          behavior: 'smooth'
        });
      }
    });
  });

  // Automatically update the year in the footer
  const yearSpan = document.getElementById("currentYear");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Set active link in navbar based on current URL path
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Hero image slider (auto-roll)
  const heroSlide = document.getElementById('heroSlide');
  const heroImages = [
    'images/hero.png',
    'images/SpokenKids.webp',
    // 'images/course2.png',
    // 'images/course3.png'
  ];heroSlide
  let heroIndex = 0;

  const rotateHeroImage = () => {
    if (!heroSlide) return;
    heroSlide.classList.add('fade');
    setTimeout(() => {
      heroIndex = (heroIndex + 1) % heroImages.length;
      heroSlide.src = heroImages[heroIndex];
      heroSlide.classList.remove('fade');
    }, 600);
  };

  setInterval(rotateHeroImage, 4500);
});
