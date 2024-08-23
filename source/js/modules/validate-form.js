const validateForm = () => {
  if (document.querySelector('form') && document.querySelector('input[type="tel"]') && document.querySelector('input[type="email"]')) {
    const form = document.querySelector('form');
    const inputs = form.querySelectorAll('input');
    const digitsOnlyRegex = /^\d+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$|^[a-zA-Z0-9._%+-]+@[а-яА-ЯёЁ0-9.-]+\.[рф]{2,3}$/;

    const showError = (input, errorMessage) => {
      const parent = input.parentElement;
      const errorText = parent.querySelector('.form__error-text');
      parent.classList.add('error');
      input.classList.add('error');

      errorText.textContent = errorMessage;
      errorText.style.display = 'block';
    };

    const hideError = (input) => {
      const parent = input.parentElement;
      const errorText = parent.querySelector('.form__error-text');
      parent.classList.remove('error');
      input.classList.remove('error');

      errorText.textContent = '';
      errorText.style.display = 'none';
    };

    const validatePhone = (input) => {
      const value = input.value.trim();

      if (value === '') {
        showError(input, 'Поле телефон обязательно для заполнения');
      } else if (!digitsOnlyRegex.test(value)) {
        showError(input, 'Поле телефон может содержать только цифры');
      } else {
        hideError(input);
      }
    };

    const validateEmail = (input) => {
      const value = input.value.trim();

      if (value === '') {
        showError(input, 'Поле email обязательно для заполнения');
      } else if (!emailRegex.test(value)) {
        showError(input, 'Некорректный адрес электронной почты');
        input.blur();
      } else {
        hideError(input);
      }
    };

    form.addEventListener('submit', (event) => {
      let isValid = true;

      inputs.forEach((input) => {
        if (input.name === 'phone') {
          validatePhone(input);
        } else if (input.name === 'email') {
          validateEmail(input);
        }

        if (input.classList.contains('error')) {
          isValid = false;
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
      });

      input.addEventListener('blur', () => {
        if (label && label.tagName.toLowerCase() === 'label') {
          if (input.value.trim() === '') {
            label.style.display = 'block';
          }
        }
        input.classList.remove('show-placeholder');
        const parent = input.parentElement;
        parent.classList.remove('error');
        input.classList.remove('error');
      });

      input.addEventListener('input', () => {
        if (label && label.tagName.toLowerCase() === 'label') {
          if (input.value.trim() !== '') {
            label.style.display = 'none';
          } else if (document.activeElement !== input) {
            label.style.display = 'block';
          }
        }
      });

      if (label && label.tagName.toLowerCase() === 'label') {
        if (input.value.trim() !== '') {
          label.style.display = 'none';
        }
      }
    });
  }
};

export { validateForm };
