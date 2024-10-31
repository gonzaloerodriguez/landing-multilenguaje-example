document.addEventListener("DOMContentLoaded", function () {
  // Form validation configuration
  const validationRules = {
    nombre: {
      pattern: /^[a-zA-Z]+$/,
      minLength: 2,
      errorMessages: {
        es: "El nombre solo puede contener letras",
        en: "Name can only contain letters",
      },
    },
    apellido: {
      pattern: /^[a-zA-Z]+$/,
      minLength: 2,
      errorMessages: {
        es: "El apellido solo puede contener letras",
        en: "Surname can only contain letters",
      },
    },
    email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      errorMessages: {
        es: "Formato de correo electrónico inválido",
        en: "Invalid email format",
      },
    },
    asunto: {
      minLength: 10,
      errorMessages: {
        es: "El asunto debe tener al menos 10 caracteres",
        en: "Subject must be at least 10 characters long",
      },
    },
    mensaje: {
      minLength: 40,
      maxLength: 500,
      errorMessages: {
        es: "El mensaje debe tener entre 40 y 500 caracteres",
        en: "Message must be between 40 and 500 characters",
      },
    },
  };

  // Character counter
  const mensajeTextarea = document.getElementById("mensaje");
  const charCountSpan = document.getElementById("charCount");

  mensajeTextarea.addEventListener("input", function () {
    const count = this.value.length;
    charCountSpan.textContent = count;

    if (count > 500) {
      this.value = this.value.substring(0, 500);
      charCountSpan.textContent = 500;
    }
  });

  // Form validation
  const form = document.getElementById("contactForm");
  const submitButton = form.querySelector('button[type="submit"]');
  const loadingSpinner = document.getElementById("loadingSpinner");
  const submitText = submitButton.querySelector(".submit-text");

  function showError(fieldName, message) {
    const errorDiv = document.querySelector(`[data-error="${fieldName}"]`);
    errorDiv.textContent = message;
    errorDiv.classList.remove("hidden");
  }

  function hideError(fieldName) {
    const errorDiv = document.querySelector(`[data-error="${fieldName}"]`);
    errorDiv.classList.add("hidden");
  }

  function validateField(field) {
    const rules = validationRules[field.name];
    const value = field.value.trim();
    const currentLang = document.documentElement.lang || "es";

    if (!value) {
      showError(field.name, translations[currentLang].required);
      return false;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      showError(field.name, rules.errorMessages[currentLang]);
      return false;
    }

    if (rules.minLength && value.length < rules.minLength) {
      showError(field.name, rules.errorMessages[currentLang]);
      return false;
    }

    hideError(field.name);
    return true;
  }

  // Form submission
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    let isValid = true;
    const formData = new FormData(form);

    // Validate all fields
    for (const [fieldName, value] of formData.entries()) {
      const field = form.querySelector(`[name="${fieldName}"]`);
      if (!validateField(field)) {
        isValid = false;
      }
    }

    if (!isValid) return;

    // Show loading state
    submitButton.disabled = true;
    submitText.classList.add("hidden");
    loadingSpinner.classList.remove("hidden");

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/gonzalo-ezequiel@hotmail.com",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        window.showAlert(
          "success",
          window.translations[currentLang].successTitle,
          window.translations[currentLang].successMessage
        );
        form.reset();
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      window.showAlert(
        "error",
        window.translations[currentLang].errorTitle,
        window.translations[currentLang].errorMessage
      );
    } finally {
      // Reset button state
      submitButton.disabled = false;
      submitText.classList.remove("hidden");
      loadingSpinner.classList.add("hidden");
    }
  });

  // Update placeholders when language changes
  function updatePlaceholders() {
    const currentLang = document.documentElement.lang || "es";
    document
      .querySelectorAll("[data-translate-placeholder]")
      .forEach((elem) => {
        const key = elem.dataset.translatePlaceholder;
        if (key && window.translations[currentLang][key]) {
          elem.placeholder = window.translations[currentLang][key];
        }
      });
  }

  // Call this function initially and when language changes
  updatePlaceholders();
  document.addEventListener("languageChanged", updatePlaceholders);
});
