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