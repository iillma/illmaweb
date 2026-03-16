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

  // Playlist video switching functionality
  const playlistItems = document.querySelectorAll('.playlist-item');
  const mainVideoIframe = document.querySelector('.video-player-wrapper iframe');
  const titleElement = document.querySelector('.videoditailse h4');
  const viewsSpan = document.querySelector('.videoditailse .text-muted span:first-child');
  const dateSpan = document.querySelector('.videoditailse .text-muted span:last-child');

  if (playlistItems.length > 0 && mainVideoIframe) {
    playlistItems.forEach(item => {
      item.addEventListener('click', function() {
        // Remove active class from all items
        playlistItems.forEach(i => i.classList.remove('active'));
        
        // Add active class to clicked item
        this.classList.add('active');
        
        // Get video URL and update iframe
        const videoUrl = this.getAttribute('data-video-url');
        if (videoUrl) {
          mainVideoIframe.src = videoUrl;
        }

        // Update video details
        const title = this.getAttribute('data-title');
        const views = this.getAttribute('data-views');
        const date = this.getAttribute('data-date');

        if (title && titleElement) {
          titleElement.textContent = title;
        }
        if (views && viewsSpan) {
          viewsSpan.innerHTML = '<i class="bi bi-eye me-1"></i> ' + views;
        }
        if (date && dateSpan) {
          dateSpan.innerHTML = '<i class="bi bi-calendar3 me-1"></i> ' + date;
        }
      });
    });
  }
});
