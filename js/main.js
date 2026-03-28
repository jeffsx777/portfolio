/* ============================================
   Main JS — Entry Point, Module Initialization
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize navigation
  if (typeof initNavigation === 'function') {
    initNavigation();
  }

  // Initialize scroll animations
  if (typeof initAnimations === 'function') {
    initAnimations();
  }

  // Initialize tabs (skills page)
  if (typeof initTabs === 'function') {
    initTabs();
  }

  // Initialize contact form
  if (typeof initContactForm === 'function') {
    initContactForm();
  }

  // Initialize project filters & modals
  if (typeof initProjectFilters === 'function') {
    initProjectFilters();
  }
});
