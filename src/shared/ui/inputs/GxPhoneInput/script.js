let scriptLoadPromise;
let styleLoadPromise;

class GxPhoneInputClass {
  constructor(inputElement, options) {
    const defaults = {
      format: 'international',
      apiUrl: 'https://phone.gexarus.com/api',
      floatingLabel: false,
      requiredVerification: false,
    };

    this.settings = { ...defaults, ...options };

    this.inputElement = inputElement;

    this.internalSet = false;

    this.loadDependencies()
      .then(() => this.init())
      .catch((error) => console.error('Error loading dependencies:', error));
  }

  async loadDependencies() {
    if (!scriptLoadPromise) {
      if (!document.querySelector('script[src="//unpkg.com/imask"]')) {
        scriptLoadPromise = this.loadScript('//unpkg.com/imask');
      } else {
        scriptLoadPromise = new Promise((resolve, reject) => {
          const existingScript = document.querySelector(
            'script[src="//unpkg.com/imask"]'
          );
          if (existingScript.getAttribute('data-loaded')) {
            resolve();
          } else {
            existingScript.addEventListener('load', () => {
              existingScript.setAttribute('data-loaded', 'true');
              resolve();
            });
            existingScript.addEventListener('error', reject);
          }
        });
      }
    }

    if (!styleLoadPromise) {
      let styleUrl = '//phone.gexarus.com/cdn/style.css?v=0.004';
      if (!document.querySelector(`link[href="${styleUrl}"]`)) {
        styleLoadPromise = this.loadStylesheet(styleUrl);
      } else {
        styleLoadPromise = Promise.resolve();
      }
    }

    await Promise.all([scriptLoadPromise, styleLoadPromise]);
  }

  loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        script.setAttribute('data-loaded', 'true');
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  loadStylesheet(href) {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.onload = resolve;
      link.onerror = reject;
      document.head.appendChild(link);
    });
  }

  async init() {
    if (this.settings.requiredVerification) {
      this.createPhoneInputVerificationStructure();
    } else {
      this.createPhoneInputStructure();
    }

    this.bindEvents();
    await this.fetchCountries();
    this.setDefaultCountry();
    this.populateCountrySelect();

    const self = this;
    const valueDescriptor = Object.getOwnPropertyDescriptor(
      Object.getPrototypeOf(this.phoneInput),
      'value'
    );

    Object.defineProperty(this.phoneInput, 'value', {
      get() {
        return valueDescriptor.get.call(this);
      },
      set(v) {
        const oldValue = valueDescriptor.get.call(this);
        valueDescriptor.set.call(this, v);
        if (!self.internalSet && v !== oldValue) {
          self.onProgrammaticValueChange();
        }
        self.checkFloatingLabel();
      },
      configurable: true,
      enumerable: true,
    });

    if (this.phoneInput.value) {
      this.processPhoneNumber(this.phoneInput.value);
    }
    this.initCombobox();
    this.checkFloatingLabel();
  }

  initCombobox() {
    const offsetSize = window
      .getComputedStyle(this.comboboxElemWidth)
      .getPropertyValue('border-bottom-width')
      .replace('px', '');

    this.combobox = new Combobox('flags', {
      data: this.countries,
      width: 'max-content',
      renderItem: (item) => `
        <li class="listItemCountry" >
          <span class="gxCountryPhoneCode" >+${item.code}</span>
          <img src="${item.icon}" class="gxCountryFlag" /> 
          <span>${item.ru}</span>
        </li>`,
      onToggle: false,
      onItemSelect: (wh) => {
        this.setActiveFlag(wh);
      },
      offset: +offsetSize || 0,
      noResultsMessage: 'Совпадений не найдено',
    });

    this.combobox.setContentWidth(this.wrapper.offsetWidth);
  }

  onProgrammaticValueChange() {
    const newValue = this.phoneInput.value;
    this.processPhoneNumber(newValue);
  }

  createPhoneInputStructure() {
    const wrapper = document.createElement('div');
    this.comboboxElemWidth = wrapper;
    this.wrapper = wrapper;
    this.copyAppearance(wrapper);
    // wrapper.classList.add('gx-phone-input');
    // wrapper.style.display = 'none';

    // Создаем элементы выбора страны
    this.countrySelector = document.createElement('div');
    this.countrySelector.classList.add('gx-country-selector');

    const countryFlag = document.createElement('img');
    countryFlag.style.display = 'none';

    const countryCode = document.createElement('span');

    this.countrySelector.appendChild(countryFlag);
    this.countrySelector.appendChild(countryCode);

    // Создаем кастомный выпадающий список
    const countriesSelect = document.createElement('div');
    countriesSelect.classList.add('gx-countries-select');

    const countrySearchInput = document.createElement('input');
    countrySearchInput.type = 'text';
    countrySearchInput.placeholder = 'Поиск страны...';

    const selectList = document.createElement('ul');
    selectList.classList.add('gx-select-list');

    countriesSelect.appendChild(countrySearchInput);
    countriesSelect.appendChild(selectList);

    this.phoneTypeIcon = document.createElement('img');
    this.phoneTypeIcon.classList.add('gx-phone-type-icon');
    this.phoneTypeIcon.style.display = 'none';
    this.phoneTypeIcon.alt = '';

    // Создаем обертку для поля ввода и плавающего лейбла
    const inputWrapper = document.createElement('div');
    inputWrapper.classList.add('gx-input-wrapper');

    // Проверяем, нужно ли создавать плавающий лейбл
    if (this.settings.floatingLabel) {
      wrapper.classList.add('floating-label'); // Добавляем класс к обертке
      this.floatingLabel = document.createElement('label');
      this.floatingLabel.classList.add('gx-floating-label');
      this.floatingLabel.textContent =
        this.inputElement.getAttribute('placeholder') ||
        'Введите номер телефона';
      inputWrapper.appendChild(this.floatingLabel);
      this.inputElement.setAttribute('placeholder', '');
    } else {
      // Если плавающий лейбл не используется, проверяем наличие плейсхолдера
      if (!this.inputElement.getAttribute('placeholder')) {
        this.inputElement.setAttribute('placeholder', 'Введите номер телефона');
      }
    }

    this.inputElement.setAttribute('type', 'tel');
    if (
      !this.inputElement.getAttribute('placeholder') &&
      !this.settings.floatingLabel
    ) {
      this.inputElement.setAttribute('placeholder', 'Введите номер телефона');
    }

    // Добавляем элементы в обертки
    this.inputElement.parentNode.insertBefore(wrapper, this.inputElement);
    wrapper.appendChild(this.countrySelector);
    wrapper.appendChild(inputWrapper); // Добавляем обертку для поля ввода
    inputWrapper.appendChild(this.inputElement); // Вставляем поле ввода в новую обертку
    wrapper.appendChild(this.phoneTypeIcon);

    wrapper.appendChild(countriesSelect);

    this.phoneInput = this.inputElement;
    this.countryFlag = countryFlag;
    this.countryCodeElement = countryCode;
    this.countriesSelect = countriesSelect;
    this.countrySearchInput = countrySearchInput;
    this.selectList = selectList;

    this.inputWrapper = inputWrapper; // Сохраняем ссылку на обертку поля ввода

    wrapper.style.display = 'flex';

    this.phoneInput.classList.add('gx-phone-input-field');
  }

  createPhoneInputVerificationStructure() {
    const container = document.createElement('div');
    container.classList.add('gx-phone-container');
    this.copyAppearance(container);
    this.comboboxElemWidth = container;

    const slidesContainer = document.createElement('div');
    slidesContainer.classList.add('gx-slides-container');

    const slide1 = document.createElement('div');
    slide1.classList.add('gx-slide', 'gx-slide-1', 'active');

    const wrapper = document.createElement('div');
    this.wrapper = wrapper;

    this.wrapper.classList.add('gx-phone-input');
    wrapper.style.display = 'none';

    this.countrySelector = document.createElement('div');
    this.countrySelector.classList.add('gx-country-selector');

    ////////////////////////////////////////////////////////////////
    // My button
    ////////////////////////////////////////////////////////////////
    const comboboxTrigger = document.createElement('button');
    comboboxTrigger.classList.add('gxPhoneCountryFlag');
    comboboxTrigger.dataset.smartselect = 'flags';
    comboboxTrigger.dataset.smartbox = 'flags';

    const countryFlag = document.createElement('img');
    countryFlag.style.display = 'none';

    const countryCode = document.createElement('span');

    this.countrySelector.appendChild(countryFlag);
    this.countrySelector.appendChild(countryCode);

    const countriesSelect = document.createElement('div');
    countriesSelect.classList.add('gx-countries-select');

    const countrySearchInput = document.createElement('input');
    countrySearchInput.type = 'text';
    countrySearchInput.placeholder = 'Поиск страны...';

    const selectList = document.createElement('ul');
    selectList.classList.add('gx-select-list');

    countriesSelect.appendChild(countrySearchInput);
    countriesSelect.appendChild(selectList);

    this.phoneTypeIcon = document.createElement('img');
    this.phoneTypeIcon.classList.add('gx-phone-type-icon');
    this.phoneTypeIcon.style.display = 'none';
    this.phoneTypeIcon.alt = '';

    // Создаем контейнер для верификации
    this.verificationContainer = document.createElement('div');
    this.verificationContainer.classList.add('gx-verification-container');

    this.verificationSuccessIcon = document.createElement('img');
    this.verificationSuccessIcon.classList.add('gx-verification-success');
    this.verificationSuccessIcon.src =
      'https://phone.gexarus.com/type/small/verified.png';

    // this.verificationButton = document.createElement('button');
    // this.verificationButton.type = 'button';
    // this.verificationButton.classList.add('gx-verification-button');
    // this.verificationButton.textContent = 'Подтвердить';
    // this.verificationButton.style.display = 'none';
    // this.verificationButton.addEventListener('click', this.startVerificationSession.bind(this));

    // this.verificationContainer.appendChild(this.verificationButton);
    this.verificationContainer.appendChild(this.verificationSuccessIcon);

    const inputWrapper = document.createElement('div');
    inputWrapper.classList.add('gx-input-wrapper');

    if (this.settings.floatingLabel) {
      wrapper.classList.add('floating-label');
      this.floatingLabel = document.createElement('label');
      this.floatingLabel.classList.add('gx-floating-label');
      this.floatingLabel.textContent =
        this.inputElement.getAttribute('placeholder') ||
        'Введите номер телефона';
      inputWrapper.appendChild(this.floatingLabel);
      this.inputElement.setAttribute('placeholder', '');
    } else {
      if (!this.inputElement.getAttribute('placeholder')) {
        this.inputElement.setAttribute('placeholder', 'Введите номер телефона');
      }
    }

    this.inputElement.setAttribute('type', 'tel');
    if (
      !this.inputElement.getAttribute('placeholder') &&
      !this.settings.floatingLabel
    ) {
      this.inputElement.setAttribute('placeholder', 'Введите номер телефона');
    }

    const clonedInputElement = this.inputElement.cloneNode(true);
    this.inputElement.style.display = 'none';

    inputWrapper.appendChild(clonedInputElement);
    wrapper.appendChild(comboboxTrigger);
    wrapper.appendChild(this.countrySelector);
    wrapper.appendChild(inputWrapper);
    wrapper.appendChild(this.phoneTypeIcon);
    wrapper.appendChild(countriesSelect);

    wrapper.appendChild(this.verificationContainer);

    slide1.appendChild(wrapper);

    const slide2 = document.createElement('div');
    slide2.classList.add('gx-slide', 'gx-slide-2');
    this.messageElement = document.createElement('div');
    this.messageElement.classList.add('gx-verification-message');
    slide2.appendChild(this.messageElement);

    const slide3 = document.createElement('div');
    slide3.classList.add('gx-slide', 'gx-slide-3');
    this.messageElementCode = this.messageElement.cloneNode(true);
    this.codeInputContainer = document.createElement('div');
    this.codeInputContainer.classList.add('gx-code-input-container');

    this.codeInputs = [];
    for (let i = 0; i < 4; i++) {
      const input = document.createElement('input');
      input.type = 'tel';
      input.maxLength = 1;
      input.classList.add('gx-code-input');
      this.codeInputs.push(input);
      this.codeInputContainer.appendChild(input);
    }

    this.codeLabel = document.createElement('div');

    slide3.appendChild(this.messageElementCode);
    slide3.appendChild(this.codeInputContainer);

    // Append slides to container
    slidesContainer.appendChild(slide1);
    slidesContainer.appendChild(slide2);
    slidesContainer.appendChild(slide3);

    container.appendChild(slidesContainer);

    // Insert container before the original inputElement
    this.inputElement.parentNode.insertBefore(container, this.inputElement);

    // Store references
    this.phoneInput = clonedInputElement; // Use the cloned input
    this.countryFlag = countryFlag;
    this.countryCodeElement = countryCode;
    this.countriesSelect = countriesSelect;
    this.countrySearchInput = countrySearchInput;
    this.selectList = selectList;

    this.container = container;
    this.slidesContainer = slidesContainer;

    this.currentSlideIndex = 0;
    this.slides = [slide1, slide2, slide3];

    wrapper.style.display = 'flex';

    this.phoneInput.classList.add('gx-phone-input-field');
  }

  copyAppearance(elem) {
    elem.className = this.inputElement.className;
    elem.classList.remove('fields_val');

    const inlineStyles = this.inputElement.getAttribute('style');
    if (inlineStyles) {
      elem.setAttribute('style', inlineStyles);
      this.inputElement.removeAttribute('style');
    }
    const inputStyles = window.getComputedStyle(this.inputElement);
    Object.assign(this.inputElement.style, {
      background: 'transparent',
      border: 'none',
      outline: 'none',
      padding: `${inputStyles.padding} ${inputStyles.padding} 0` || 0,
      fontSize: inputStyles.fontSize || 16,
      width: '100%',
    });
    // inputWrapperBtn.style.fontSize = inputStyles.fontSize;
  }

  async fetchCountries() {
    try {
      const response = await fetch(`${this.settings.apiUrl}/Country/list`);
      const data = await response.json();
      if (data.success) {
        this.countries = data.countries;
        this.defaultCountry = data.default;
      } else {
        console.error('Error fetching country list:', data.error);
      }
    } catch (error) {
      console.error('Error fetching country list:', error);
    }
  }

  populateCountrySelect() {
    this.selectList.innerHTML = '';
    this.countries.forEach((country) => {
      const listItem = document.createElement('li');
      listItem.dataset.iso = country.iso;
      listItem.innerHTML = `
        <img src="${country.icon}" alt="${country.ru}">
        <span>${country.ru} (+${country.code})</span>
      `;

      this.selectList.appendChild(listItem);
    });
  }

  bindEvents() {
    this.countrySelector.addEventListener('click', (event) => {
      event.stopPropagation();
      this.openSelectList();
    });

    window.addEventListener('scroll', () => {
      this.closeSelectList();
    });

    document.addEventListener('click', (event) => {
      if (!this.countriesSelect.contains(event.target)) {
        this.closeSelectList();
      }
    });

    this.phoneInput.addEventListener(
      'input',
      this.onPhoneNumberInput.bind(this)
    );
    this.phoneInput.addEventListener(
      'paste',
      this.onPhoneNumberPaste.bind(this)
    );
    this.selectList.addEventListener('click', this.onCountrySelect.bind(this));
    this.countrySearchInput.addEventListener(
      'input',
      this.onCountrySearch.bind(this)
    );
    this.phoneInput.addEventListener(
      'valueChanged',
      this.onProgrammaticValueChange.bind(this)
    );

    if (this.settings.floatingLabel) {
      this.phoneInput.addEventListener('focus', this.onInputFocus.bind(this));
      this.phoneInput.addEventListener('blur', this.onInputBlur.bind(this));
      this.checkFloatingLabel();
    }
  }

  onInputFocus() {
    this.wrapper.classList.add('focused');
    this.adjustFloatingLabelPosition();
  }

  onInputBlur() {
    this.wrapper.classList.remove('focused');
    this.checkFloatingLabel();
  }

  checkFloatingLabel() {
    if (this.settings.floatingLabel) {
      if (this.phoneInput.value) {
        this.wrapper.classList.add('filled');
        this.adjustFloatingLabelPosition();
      } else {
        this.wrapper.classList.remove('filled');
        this.resetFloatingLabelPosition();
      }
    }
  }

  adjustFloatingLabelPosition() {
    if (this.settings.floatingLabel) {
      const countrySelectorWidth = this.countrySelector.offsetWidth;
      this.floatingLabel.style.left = `-${countrySelectorWidth + 10}px`;
    }
  }

  resetFloatingLabelPosition() {
    if (this.settings.floatingLabel) {
      this.floatingLabel.style.left = `0`;
    }
  }

  setDefaultCountry() {
    if (this.phoneInput.value) return;
    const country = this.defaultCountry;
    this.iso = country.iso;
    this.updateCountryInfo(country);
    this.applyInputMask(country.mask[this.settings.format]);
  }

  async onPhoneNumberInput(event) {
    if (this.settings.requiredVerification && this.wasFilled === true) {
      this.wrapper.classList.add('error');
    }

    if (this.blockNumberInput) return;
    const phoneNumber = event.target.value;

    if (this.mask && phoneNumber.length >= this.mask.unmaskedValue.length) {
      this.mask.destroy();
      this.mask = null;
    }

    clearTimeout(this.inputTimeout);
    this.inputTimeout = setTimeout(() => {
      this.processPhoneNumber(phoneNumber);
    }, 300);
  }

  onPhoneNumberPaste(event) {
    this.blockNumberInput = true;
    if (this.mask) {
      this.mask.destroy();
      this.mask = null;
    }

    setTimeout(() => {
      const phoneNumber = event.target.value;
      this.processPhoneNumber(phoneNumber);

      if (this.iso) {
        this.updateMaskForCurrentCountry();
      }
      this.blockNumberInput = false;
    }, 0);
  }

  updateMaskForCurrentCountry() {
    const country = this.countries.find((c) => c.iso === this.iso);
    if (country) {
      this.applyInputMask(country.mask[this.settings.format]);
    }
  }

  async processPhoneNumber(phoneNumber) {
    if (phoneNumber.replace(/\D/g, '').length < 6) return;
    try {
      const response = await fetch(`${this.settings.apiUrl}/Number/info`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: phoneNumber,
          country: this.iso,
          verification: this.settings.requiredVerification ? 1 : 0,
        }),
      });
      const data = await response.json();
      if (data.success) {
        this.updatePhoneNumberField(data);
      }
    } catch (error) {
      console.error('Error processing phone number:', error);
    }
  }

  updatePhoneNumberField(data) {
    const phoneInfo = data.phone;
    const countryInfo = data.country;
    const phoneType = data.phone.type;

    this.internalSet = true;

    if (countryInfo.code) {
      this.phoneInput.value = phoneInfo.formatted.local;
      this.applyInputMask(data.mask.local);
    } else {
      this.countryCodeElement.textContent = '';
      this.phoneInput.value = phoneInfo.formatted[this.settings.format];
      this.applyInputMask(data.mask[this.settings.format]);
    }

    this.phoneInput.dataset.value = phoneInfo.base;

    this.internalSet = false;

    this.updateCountryInfo(countryInfo);

    this.phoneTypeIcon.style.display = 'none';

    if (phoneType) {
      let phoneDetail = `Тип номера: ${phoneType.ru}\n`;
      if (data.local) {
        phoneDetail += `Регион: ${data.local.region}\nОператор: ${data.local.operator}\n`;

        if (data.local.registration_operator) {
          phoneDetail += `Регистрирующий оператор: ${data.local.registration_operator}\n`;
        }
      }
      this.phoneTypeIcon.src = phoneType.icon.small;
      this.phoneTypeIcon.title = phoneDetail;
      this.phoneTypeIcon.style.display = 'block';
    } else {
      this.phoneTypeIcon.src = '';
      this.phoneTypeIcon.title = '';
    }

    if (this.settings.requiredVerification) {
      this.wasFilled = true;

      if (data.isVerifed) {
        this.onVerificationSuccess();
      } else {
        if (phoneType.name === 'mobile') {
          this.phoneTypeIcon.style.display = 'none';
          this.wrapper.classList.remove('error');
          this.startVerificationCountdown();
        } else {
          this.wrapper.classList.add('error');
          if (phoneType) {
            this.phoneTypeIcon.style.display = 'block';
          }
        }
      }
    }
  }

  applyInputMask(formatTemplate) {
    if (this.mask) {
      this.mask.destroy();
    }

    const maskPattern = formatTemplate.replace(/X/g, '0');

    if (typeof IMask !== 'undefined') {
      this.mask = IMask(this.phoneInput, { mask: maskPattern });
    } else {
      scriptLoadPromise
        .then(() => {
          this.mask = IMask(this.phoneInput, { mask: maskPattern });
        })
        .catch((error) => {
          console.error('Error loading IMask:', error);
        });
    }
  }

  updateCountryInfo(country) {
    this.countrySelector.title = country.ru || '';
    if (country.icon) {
      this.countryFlag.style.display = 'block';
      this.countryFlag.src = country.icon;
    } else {
      this.countryFlag.style.display = 'none';
      this.countryFlag.src = '';
    }

    this.iso = country.iso;

    if (country.code) {
      this.countryCodeElement.textContent = '+' + country.code;
    } else {
      this.countryCodeElement.textContent = '';
    }
  }

  openSelectList() {
    const rect = this.countrySelector.getBoundingClientRect();

    this.countriesSelect.style.top = `${rect.bottom + 10}px`;
    this.countriesSelect.style.left = `${rect.left - 7}px`;
    this.countriesSelect.style.display = 'block';
    this.countrySearchInput.focus();
  }

  closeSelectList() {
    this.countriesSelect.style.display = 'none';
  }

  onCountrySelect(event) {
    const listItem = event.target.closest('li');
    if (listItem) {
      const countryIso = listItem.dataset.iso;
      this.countrySearchInput.value = listItem.innerText;
      this.closeSelectList();
      this.onCountryChangeByIso(countryIso);
    }
  }

  onCountryChangeByIso(countryIso) {
    const country = this.countries.find((c) => c.iso === countryIso);
    if (country) {
      this.iso = country.iso;
      this.updateCountryInfo(country);
      this.updateMaskForCurrentCountry();
      this.phoneInput.focus();
    }
  }

  onCountrySearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const listItems = this.selectList.querySelectorAll('li');
    listItems.forEach((item) => {
      const countryName = item.innerText.toLowerCase();
      if (countryName.includes(searchTerm)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  }

  startVerificationCountdown() {
    this.showSendingCodeSlide();
    // let countdown = 3;
    // this.messageElement.textContent = `Верификация через ${countdown}...`;
    this.showSlide(1);

    // const countdownInterval = setInterval(() => {
    //   countdown--;
    //   if (countdown > 0) {
    //     this.messageElement.textContent = `Верификация через ${countdown}...`;
    //   } else {
    //     clearInterval(countdownInterval);
    //     this.showSendingCodeSlide();
    //   }
    // }, 1000);
  }

  showSendingCodeSlide() {
    this.messageElement.textContent = 'Отправка кода...';
    setTimeout(() => {
      this.startVerificationSession();
    }, 1000);
  }

  async startVerificationSession() {
    let phone = this.phoneInput.dataset.value;
    try {
      const response = await fetch(
        `${this.settings.apiUrl}/Verification/start`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: phone, country: this.iso }),
        }
      );
      const data = await response.json();
      if (data.success) {
        this.showCodeInputFields(data.message, data.gxVerificationSessionKey);
      } else {
        this.showVerificationError(data.err || 'Ошибка при отправке кода');
      }
    } catch (error) {
      console.error('Error starting verification session:', error);
      this.showVerificationError('Ошибка при отправке кода');
    }
  }

  showVerificationError(message) {
    this.messageElement.textContent = message;
  }

  showCodeInputFields(message, sessionKey) {
    this.verificationSessionKey = sessionKey;
    // this.messageElement.textContent = message;
    this.messageElementCode.textContent = message;
    this.showSlide(2);
    this.setupCodeInputEvents();
  }

  setupCodeInputEvents() {
    this.codeInputs.forEach((input, index) => {
      input.value = '';
      input.style.borderColor = '';

      input.addEventListener('input', () => {
        if (input.value.length === 1) {
          if (index < this.codeInputs.length - 1) {
            this.codeInputs[index + 1].focus();
          } else {
            this.validateCode();
          }
        }
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && input.value.length === 0 && index > 0) {
          this.codeInputs[index - 1].focus();
        }
      });
    });

    setTimeout(() => {
      this.codeInputs[0].focus();
    }, 100);
  }

  async validateCode() {
    const code = this.codeInputs.map((input) => input.value).join('');
    if (code.length === 4) {
      try {
        const response = await fetch(
          `${this.settings.apiUrl}/Verification/code`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              code: code,
              sessionKey: this.verificationSessionKey,
            }),
          }
        );
        const data = await response.json();
        if (data.success) {
          this.onVerificationSuccess();
        } else {
          this.showCodeError(data.err || 'Неверный код. Попробуйте снова.');
        }
      } catch (error) {
        console.error('Error verifying code:', error);
        this.showCodeError('Ошибка при проверке кода');
      }
    }
  }

  onVerificationSuccess() {
    this.phoneTypeIcon.style.display = 'none';
    this.wrapper.classList.remove('error');
    this.codeInputContainer.style.display = 'none';
    this.messageElement.textContent = 'Номер верифицирован';
    this.container.classList.add('verified');
    this.showSlide(0, true);
  }

  showCodeError(text) {
    this.messageElement.textContent = text;
    this.codeInputs.forEach((input) => {
      input.classList.add('shake');
      input.style.borderColor = 'red';
      input.value = '';
    });
    setTimeout(() => {
      this.codeInputs.forEach((input) => {
        input.classList.remove('shake');
        input.style.borderColor = '';
      });
      this.codeInputs[0].focus();
    }, 800);
  }

  showSlide(index, remove = false) {
    this.slides.forEach((slide, idx) => {
      if (idx === index) {
        slide.classList.add('active');
      } else {
        if (remove) {
          slide.remove();
        } else {
          slide.classList.remove('active');
        }
      }
    });
  }
}

GxPhone = (selector, options = {}) => {
  if (selector instanceof HTMLElement) {
    new GxPhoneInputClass(selector, options);
  } else if (typeof selector === 'string') {
    document
      .querySelectorAll(selector)
      .forEach((input) => new GxPhoneInputClass(input, options));
  } else {
    console.error('Invalid selector: must be a DOM element or a string.');
  }
};
