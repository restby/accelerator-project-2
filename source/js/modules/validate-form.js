const validateForm = () => {
  const form = document.querySelector('form');
  const phoneInput = document.querySelector('input[type="tel"]');
  const emailInput = document.querySelector('input[type="email"]');

  if (form && phoneInput && emailInput) {
    const inputs = form.querySelectorAll('input');
    const digitsOnlyRegex = /^\d+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$|^[a-zA-Z0-9._%+-]+@[а-яА-ЯёЁ0-9.-]+\.[рф]{2,3}$/;

    const toggleError = (input, show) => {
      const parent = input.parentElement;
      parent.classList.toggle('error', show);
      input.classList.toggle('error', show);
    };

    const validateInput = (input, regex) => {
      const value = input.value.trim();
      toggleError(input, value === '' || !regex.test(value));
    };

    form.addEventListener('submit', (event) => {
      let isValid = true;

      inputs.forEach((input) => {
        if (input.value.trim() === '') {
          isValid = false;
          toggleError(input, true);
        } else {
          if (input.name === 'phone') {
            validateInput(input, digitsOnlyRegex);
          }
          if (input.name === 'email') {
            validateInput(input, emailRegex);
          }
          if (input.classList.contains('error')) {
            isValid = false;
          }
        }
      });

      if (!isValid) {
        event.preventDefault();
      }
    });

    inputs.forEach((input) => {
      const label = input.previousElementSibling;

      input.addEventListener('focus', () => {
        if (label && label.tagName.toLowerCase() === 'label') {
          label.style.display = 'none';
        }
        input.classList.add('show-placeholder');
        toggleError(input, false);
      });

      input.addEventListener('blur', () => {
        if (label && label.tagName.toLowerCase() === 'label' && input.value.trim() === '') {
          label.style.display = 'block';
        }
        input.classList.remove('show-placeholder');
      });

      input.addEventListener('input', () => {
        if (label && label.tagName.toLowerCase() === 'label') {
          label.style.display = input.value.trim() === '' && document.activeElement !== input ? 'block' : 'none';
        }
      });

      if (label && label.tagName.toLowerCase() === 'label' && input.value.trim() !== '') {
        label.style.display = 'none';
      }
    });
  }
};

export { validateForm };
