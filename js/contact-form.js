/* ============================================
   Contact Form — Validation + Formspree AJAX
   ============================================ */

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const formspreeUrl = form.getAttribute('action');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset errors
    form.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));

    // Validate
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const subject = form.querySelector('#subject');
    const message = form.querySelector('#message');
    let valid = true;

    if (!name.value.trim()) {
      showError(name, 'Please enter your name.');
      valid = false;
    }

    if (!email.value.trim() || !isValidEmail(email.value)) {
      showError(email, 'Please enter a valid email address.');
      valid = false;
    }

    if (!subject.value) {
      showError(subject, 'Please select a subject.');
      valid = false;
    }

    if (!message.value.trim() || message.value.trim().length < 10) {
      showError(message, 'Please enter a message (at least 10 characters).');
      valid = false;
    }

    if (!valid) return;

    // Submit via AJAX
    const submitBtn = form.querySelector('.btn[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      const formData = new FormData(form);
      const response = await fetch(formspreeUrl, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        showSuccess(form);
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      alert('Something went wrong. Please try again or email us directly.');
    }
  });

  // Clear error on input
  form.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('input', () => {
      field.closest('.form-group').classList.remove('error');
    });
  });
}

function showError(field, message) {
  const group = field.closest('.form-group');
  group.classList.add('error');
  const errorEl = group.querySelector('.form-error');
  if (errorEl) errorEl.textContent = message;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showSuccess(form) {
  form.innerHTML = `
    <div class="success-message">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3>Message Sent!</h3>
      <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
    </div>
  `;
}
