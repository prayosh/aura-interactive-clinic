/**
 * AURA INTEGRATIVE MEDICAL CLINIC - MAIN UTILITIES
 * Lightweight JavaScript for Mobile Routing and Client-Side Form Validation
 * Developed for Aura Clinic, Pune
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle Logic
  const mobileToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      
      if (!isExpanded) {
        mobileDrawer.style.display = 'block';
        mobileToggle.innerHTML = `
          <svg style="width: 24px; height: 24px;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        `; // Elegant X icon
      } else {
        mobileDrawer.style.display = 'none';
        mobileToggle.innerHTML = `
          <svg style="width: 24px; height: 24px;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        `; // Elegant Hamburger icon
      }
    });

    // Close mobile drawer when clicking anywhere else
    document.addEventListener('click', (e) => {
      if (mobileDrawer.style.display === 'block' && !mobileDrawer.contains(e.target) && e.target !== mobileToggle) {
        mobileDrawer.style.display = 'none';
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.innerHTML = `
          <svg style="width: 24px; height: 24px;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        `;
      }
    });
  }

  // 2. Client-Side Contact Intake Form Validation & Feedback Loop
  const intakeForm = document.getElementById('clinicalIntakeForm');
  const alertBox = document.getElementById('formAlert');

  if (intakeForm && alertBox) {
    intakeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Extract fields
      const patientName = document.getElementById('patientName').value.trim();
      const patientDob = document.getElementById('patientDob').value.trim();
      const patientPhone = document.getElementById('patientPhone').value.trim();
      const patientSpecialty = document.getElementById('patientSpecialty').value;
      const patientSymptoms = document.getElementById('patientSymptoms').value.trim();

      // Clear previous alert states
      alertBox.className = 'form-message';
      alertBox.style.display = 'none';
      alertBox.textContent = '';

      // Basic Validation Check
      if (!patientName) {
        showFeedback('Error: Patient Full Name is required for registration.', 'error');
        return;
      }
      if (!patientDob) {
        showFeedback('Error: Date of Birth is required to verify medical records.', 'error');
        return;
      }
      if (!patientPhone) {
        showFeedback('Error: Operational Contact Number is required for SMS queuing confirmation.', 'error');
        return;
      }
      
      // Simple phone format constraint (10+ digits checking or simple digits validation)
      const cleanedPhone = patientPhone.replace(/[\s\-\+]/g, '');
      if (cleanedPhone.length < 10 || isNaN(cleanedPhone)) {
        showFeedback('Error: Please enter a correct, 10-digit mobile contact number.', 'error');
        return;
      }

      if (!patientSpecialty) {
        showFeedback('Error: Please select a medical department for consultation.', 'error');
        return;
      }
      
      if (patientSymptoms.length < 10) {
        showFeedback('Error: Description of symptom history must be at least 10 characters long to assist diagnostic prep.', 'error');
        return;
      }

      // Success Callback Simulation
      showFeedback(`Success: Clinical registration record securely initiated for ${patientName}. The desk at ICC Trade Tower on Senapati Bapat Road will reach out to you within two hours of operating hours. Your medical slot is reserved.`, 'success');
      
      // Reset form on success
      intakeForm.reset();
    });
  }

  // 3. Collapsible Native FAQ Accordion Toggle Utility
  const faqQuestions = document.querySelectorAll('.faq-question');
  if (faqQuestions.length > 0) {
    faqQuestions.forEach(question => {
      question.addEventListener('click', () => {
        const item = question.closest('.faq-item');
        const answer = item.querySelector('.faq-answer');
        const isActive = item.classList.contains('active');
        
        // Toggle the selected FAQ's active state
        if (isActive) {
          item.classList.remove('active');
          answer.style.maxHeight = null;
        } else {
          // Optional: Close other FAQs in accordion style if desired
          document.querySelectorAll('.faq-item.active').forEach(activeItem => {
            activeItem.classList.remove('active');
            activeItem.querySelector('.faq-answer').style.maxHeight = null;
          });
          
          item.classList.add('active');
          answer.style.maxHeight = (answer.scrollHeight + 32) + 'px';
        }
      });
    });
  }

  function showFeedback(message, type) {
    alertBox.textContent = message;
    alertBox.className = `form-message ${type}`;
    alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
});
