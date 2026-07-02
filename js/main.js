// Load navbar component
async function loadNavbar() {
  try {
    const pathParts = window.location.pathname.split('/');
    let baseUrl = '';
    // Calculate base URL based on how deep the current page is
    if (pathParts.length > 1) {
      const depth = pathParts.filter(p => p && !p.endsWith('.html')).length;
      baseUrl = '../'.repeat(depth);
    }
    
    const response = await fetch(baseUrl + 'nav.html');
    let navHTML = await response.text();
    // Replace {{baseUrl}} in nav links
    navHTML = navHTML.replace(/\{\{baseUrl\}\}/g, baseUrl);
    
    // Insert navbar after opening <body> tag
    const body = document.body;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = navHTML;
    const navbar = tempDiv.firstElementChild;
    body.insertBefore(navbar, body.firstChild);
    
    // Add toggle functionality for mobile menu
    initNavbarToggle();
  } catch (error) {
    console.error('Error loading navbar:', error);
  }
}

function initNavbarToggle() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }
}

// Initialize navbar when DOM is ready
document.addEventListener('DOMContentLoaded', loadNavbar);

// reading progress bar
const progressFill = document.getElementById('progress-fill');
if (progressFill) {
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progressFill.style.width = scrolled + '%';
  });
}

// scrollspy for any nav.toc on the page (index TOC or session part-nav)
const tocLinks = document.querySelectorAll('nav.toc a[href^="#"]');
if (tocLinks.length) {
  const tocSections = Array.from(tocLinks)
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  function setActiveTOC() {
    let current = tocSections[0];
    const scrollPos = window.scrollY + 140;
    tocSections.forEach(sec => { if (sec.offsetTop <= scrollPos) current = sec; });
    tocLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current.id);
    });
  }
  window.addEventListener('scroll', setActiveTOC);
  setActiveTOC();
}