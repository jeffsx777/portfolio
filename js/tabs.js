/* ============================================
   Tabs — Skills Page Tab Switching
   ============================================ */

function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const skillsColumns = document.querySelectorAll('.skills-column');

  if (!tabBtns.length || !skillsColumns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active tab
      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Show/hide columns
      skillsColumns.forEach(col => {
        const member = col.dataset.member;

        if (filter === 'both') {
          col.classList.remove('hidden');
        } else if (filter === member) {
          col.classList.remove('hidden');
        } else {
          col.classList.add('hidden');
        }
      });
    });
  });
}
