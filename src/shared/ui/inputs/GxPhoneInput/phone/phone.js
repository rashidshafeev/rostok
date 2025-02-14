let scriptLoadPromise;
let styleLoadPromise;

// changeCountry

class Phone {
  constructor(inputElement, options) {
    const defaults = {
      format: 'international',
      apiUrl: 'https://phone.gexarus.com/api',
      floatingLabel: false,
      requiredVerification: false,
    };

    this.settings = { ...defaults, ...options };
    this.inputElement = inputElement;

    this.getVerificationCode = this.getVerificationCode.bind(this);

    this.tooltipOpen = false;
    this.tooltipStatusType = 'sent'; // send | sending | resend
    this.tooltipHide = true;
    this.changeCountry = false;

    this.loadDependencies()
      .then(() => this.init())
      .catch((error) => console.error(error));
  }

  async init() {
    this.initPhoneWrapper();
    this.bindEvents();
    await this.fetchCountries();
    this.setDefaultCountry();

    const self = this;
    const valueDescriptor = Object.getOwnPropertyDescriptor(
      Object.getPrototypeOf(this.inputElement),
      'value'
    );

    Object.defineProperty(this.inputElement, 'value', {
      get() {
        return valueDescriptor.get.call(this);
      },
      set(v) {
        const oldValue = valueDescriptor.get.call(this);
        valueDescriptor.set.call(this, v);
        if (!self.internalSet && v !== oldValue) {
          self.onProgrammaticValueChange();
        }
      },
      configurable: true,
      enumerable: true,
    });

    if (this.inputElement.value) {
      this.processPhoneNumber(this.inputElement.value);
    }

    this.initCombobox();
    this.initTooltip();
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

  bindEvents() {
    this.inputElement.addEventListener(
      'input',
      this.onPhoneNumberInput.bind(this)
    );
    this.inputElement.addEventListener(
      'paste',
      this.onPhoneNumberPaste.bind(this)
    );

    this.inputElement.addEventListener(
      'valueChanged',
      this.onProgrammaticValueChange.bind(this)
    );
  }

  resetTooltipWithInput() {
    if (this.tooltipHide === false) {
      this.tooltipStatusType = 'sent';
      this.tooltip.hide();
      this.tooltipHide = true;
    }
    this.phoneIconsWrapper.innerHTML = '';
  }

  async onPhoneNumberInput(event) {
    this.resetTooltipWithInput();
    if (this.settings.requiredVerification && this.wasFilled === true) {
      this.phoneWrapper.classList.add('error');
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
    this.resetTooltipWithInput();
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

  onProgrammaticValueChange() {
    this.resetTooltipWithInput();
    const newValue = this.inputElement.value;
    this.processPhoneNumber(newValue);
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
          changeCountry: this.changeCountry,
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

  applyInputMask(formatTemplate) {
    if (this.mask) {
      this.mask.destroy();
    }

    const maskPattern = formatTemplate.replace(/X/g, '0');

    if (typeof IMask !== 'undefined') {
      this.mask = IMask(this.inputElement, { mask: maskPattern });
    } else {
      scriptLoadPromise
        .then(() => {
          this.mask = IMask(this.inputElement, { mask: maskPattern });
        })
        .catch((error) => {
          console.error('Error loading IMask:', error);
        });
    }
  }

  updatePhoneNumberField(data) {
    const phoneInfo = data.phone;
    const countryInfo = data.country;
    const phoneType = data.phone.type;

    this.internalSet = true;

    if (countryInfo.code) {
      this.inputElement.value = phoneInfo.formatted.local;
      this.applyInputMask(data.mask.local);
    } else {
      this.countryCodeElement.textContent = '';
      this.inputElement.value = phoneInfo.formatted[this.settings.format];
      this.applyInputMask(data.mask[this.settings.format]);
    }

    this.inputElement.dataset.value = phoneInfo.base;

    this.internalSet = false;

    this.updateCountryInfo(countryInfo);

    if (phoneType) {
      let phoneDetail = `Тип номера: ${phoneType.ru}\n`;
      if (data.local) {
        phoneDetail += `Регион: ${data.local.region}\nОператор: ${data.local.operator}\n`;

        if (data.local.registration_operator) {
          phoneDetail += `Регистрирующий оператор: ${data.local.registration_operator}\n`;
        }
      }

      this.phoneIconsWrapper.innerHTML = '';
      this.phoneIcon.src = phoneType.icon.small;
      this.phoneIcon.title = phoneDetail;
      this.phoneIconsWrapper.appendChild(this.phoneIcon);
    } else {
      this.phoneIcon.src = '';
      this.phoneIcon.title = '';
      this.phoneIconsWrapper.innerHTML = '';
    }

    if (this.settings.requiredVerification) {
      this.wasFilled = true;

      if (data.isVerifed) {
        this.onVerificationSuccess();
      } else {
        if (phoneType.name === 'mobile') {
          // this.phoneTypeIcon.style.display = 'none';
          this.phoneWrapper.classList.remove('error');
          this.getCodeTooltip();
          this.tooltipState();
          // this.startVerificationCountdown();
        } else {
          this.phoneWrapper.classList.add('error');
        }
      }
    }
  }

  updateCountryInfo(country) {
    if (country.icon) {
      this.countryFlag.style.display = 'block';
      this.countryFlag.src = country.icon;
    } else {
      this.countryFlag.style.display = 'none';
      this.countryFlag.src = '';
    }

    this.iso = country.iso;

    if (country.code) {
      this.countryCode.textContent = '+' + country.code;
    } else {
      this.countryCode.textContent = '';
    }
  }

  setDefaultCountry() {
    // if (this.inputElement.value) return;
    const country = this.defaultCountry;
    this.iso = country.iso;
    this.updateCountryInfo(country);
    this.applyInputMask(country.mask[this.settings.format]);
  }

  initTooltip() {
    this.tooltip = new Tooltip({
      type: 'with-button',
      content: `<div id='tooltipContent${this.settings.selector.replace(
        /[^a-z]/gi,
        ''
      )}' ></div>`,
      openMethod: 'auto',
      selector: this.settings.selector,
      side: 'bottom',
      align: 'center',
      onClose: () => {
        this.tooltipHide = true;

        this.phoneIconsWrapper.innerHTML = '';
        this.phoneIconsWrapper.appendChild(this.phoneTooltipIconTrigger);
      },
      onOpen: () => {
        this.tooltipHide = false;
      },
      width: 250,
      closeButton: true,
      classNames: 'gx-phone-input-tooltip',
    });
    this.tooltip.addClass('gx-phone-input-tooltip');
  }

  clearTimer() {
    clearInterval(this.timerInterval);
  }

  startTimer(duration) {
    let remainingTime = duration;
    this.getCodeContentButton.textContent = `Новый код ${remainingTime} секунд`;

    this.timerInterval = setInterval(() => {
      remainingTime -= 1;
      this.getCodeContentButton.textContent = `Новый код ${remainingTime} секунд`;

      if (remainingTime <= 0) {
        clearInterval(this.timerInterval);
        this.getCodeContentButton.textContent = `Получить новый код`;
        this.getCodeContentButton.disabled = false;
      }
    }, 1000);
  }

  tooltipState() {
    const disabledBtn = () => {
      this.getCodeContentButton.disabled = true;
      this.getCodeContentButton.classList.add('loading');
    };

    const activeBtn = () => {
      this.getCodeContentButton.disabled = false;
      this.getCodeContentButton.classList.remove('loading');
    };

    switch (this.tooltipStatusType) {
      case 'sent':
        activeBtn();
        this.getCodeContentSpan.textContent =
          'Код подтверждения будет отправлен в телеграм на ваш номер';
        this.getCodeContentButton.textContent = 'Получить код';
        break;

      case 'sending':
        this.getCodeContentSpan.textContent = 'Отправка кода...';
        this.getCodeContentButton.textContent = 'Получить код';
        this.phoneIconsWrapper.innerHTML = '';
        this.phoneIconsWrapper.appendChild(this.phoneTooltipIconTrigger);
        disabledBtn();
        break;

      case 'resend':
        this.getCodeContentButton.textContent = 'Повторить отправку кода';
        this.getCodeContentButton.disabled = true;
        this.phoneIconsWrapper.innerHTML = '';
        this.phoneIconsWrapper.appendChild(this.phoneTooltipIconTrigger);
        disabledBtn();
        this.startTimer(3); // Таймер на 30 секунд
        break;
    }
  }

  getCodeTooltip() {
    this.getCodeContentSpan = document.createElement('span');
    this.getCodeContentButton = document.createElement('button');
    this.getCodeContentButton.classList.add('gx-tooltip-button');
    this.getCodeContentButton.addEventListener(
      'click',
      this.getVerificationCode
    );
    this.tooltip.show();
    this.tooltip.setContent([
      this.getCodeContentSpan,
      this.getCodeContentButton,
    ]);
  }

  async startVerificationSession() {
    let phone = this.inputElement.dataset.value;
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

  showCodeInputFields(message, sessionKey) {
    this.verificationSessionKey = sessionKey;
    const textContent = document.createElement('div');
    textContent.innerHTML = `${message} <span class='getNewCodeBtn' ></span>`;
    const textContentSpan = textContent.querySelector('span');
    textContentSpan.innerHTML = `+79374061979 &#9998;`;
    textContentSpan.addEventListener('click', () => {
      this.clearTimer();
      this.tooltipStatusType = 'sent';
      this.tooltip.hide();
      this.tooltipState();

      this.phoneInputCodeVerification.classList.add('hide');
      setTimeout(() => {
        this.phoneInputCodeVerification.classList.remove('hide');
        this.phoneInputCodeVerification.classList.remove('active');
      }, 300);
      this.getCodeContentButton.disabled = true;
      this.inputElement.focus();
      console.log('clicker');
    });

    this.getCodeContentSpan.appendChild(textContent);

    this.getCodeContentSpan.innerHTML = '';
    this.getCodeContentSpan.appendChild(textContent);
    this.setupCodeInputEvents();
  }

  async getVerificationCode() {
    this.tooltipStatusType = 'sending';
    this.tooltipState();
    await this.startVerificationSession();
    this.tooltipStatusType = 'resend';
    this.tooltipState();
  }

  setupCodeInputEvents() {
    this.codeInputs = [
      ...this.phoneInputCodeVerification.querySelectorAll('input'),
    ];
    this.phoneInputsWrapper.appendChild(this.phoneInputCodeVerification);
    setTimeout(() => {
      this.phoneInputCodeVerification.classList.add('active');
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

  showCodeError(text) {
    // this.messageElement.textContent = text;
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

  initCombobox() {
    const offsetSize = window
      .getComputedStyle(this.comboboxWidth)
      .getPropertyValue('border-bottom-width')
      .replace('px', '');

    this.combobox = new Combobox(`${this.settings.selector}Flags`, {
      data: this.countries,
      width: this.comboboxWidth.offsetWidth,
      renderItem: (item) => `
        <li class="listItemCountry" >
          <span class="gxCountryPhoneCode" >+${item.code}</span>
          <img src="${item.icon}" class="gxCountryFlag" /> 
          <span>${item.ru}</span>
      </li>`,
      onToggle: false,
      onItemSelect: (country) => {
        this.defaultCountry = country;
        this.changeCountry = true;
        this.setDefaultCountry();
      },
      offset: +offsetSize || 0,
      noResultsMessage: 'Совпадений не найдено',
    });

    this.combobox.setContentWidth(this.comboboxWidth.offsetWidth);
  }

  initPhoneWrapper() {
    this.phoneWrapper = document.createElement('div');
    this.phoneWrapper.classList.add('phoneWrapper');

    this.comboboxWidth = this.phoneWrapper;

    this.phoneInputsWrapper = document.createElement('div');
    this.phoneInputsWrapper.classList.add('phoneInputsWrapper');

    this.phoneInputNumber = document.createElement('div');
    this.phoneInputNumber.classList.add('phoneInputNumber');

    this.countryComboboxTrigger = document.createElement('button');
    this.countryComboboxTrigger.classList.add('gxPhoneCountryFlag');
    this.countryComboboxTrigger.dataset.smartselect = `${this.settings.selector}Flags`;
    this.countryComboboxTrigger.dataset.smartbox = `${this.settings.selector}Flags`;

    this.countryFlag = document.createElement('img');
    this.countryFlag.style.display = 'none';

    this.countryCode = document.createElement('span');

    this.countryCode.textContent = '+7';

    this.countryComboboxTrigger.appendChild(this.countryFlag);
    this.countryComboboxTrigger.appendChild(this.countryCode);

    this.phoneInputsWrapper.appendChild(this.phoneInputNumber);

    this.phoneInputCodeVerification = document.createElement('div');
    this.phoneInputCodeVerification.classList.add('phoneInputCodeVerification');

    for (let i = 0; i < 4; i++) {
      const codeInput = document.createElement('input');
      codeInput.type = 'tel';
      codeInput.maxLength = 1;
      codeInput.classList.add('gx-code-input');
      this.phoneInputCodeVerification.appendChild(codeInput);
    }
    this.phoneIconsWrapper = document.createElement('div');
    this.phoneIconsWrapper.classList.add('phoneIconsWrapper');
    this.phoneIcon = document.createElement('img');
    this.phoneIcon.classList.add('phoneIcon');
    this.phoneTooltipIconTrigger = document.createElement('span');
    this.phoneTooltipIconTrigger.innerHTML = '&#128712;';
    this.phoneTooltipIconTrigger.classList.add(
      'phoneTooltipIconTrigger',
      'phoneIcon'
    );

    let isClickable = true;

    this.phoneTooltipIconTrigger.addEventListener('click', () => {
      if (!isClickable) return;
      isClickable = false;
      if (this.tooltipHide) {
        this.tooltip.show();
        this.tooltip.setContent([
          this.getCodeContentSpan,
          this.getCodeContentButton,
        ]);
        this.tooltipHide = false;
      } else {
        this.tooltip.hide();
        this.tooltipHide = true;
      }
      setTimeout(() => {
        isClickable = true;
      }, 200);
    });

    this.phoneWrapper.appendChild(this.phoneInputsWrapper);
    this.phoneWrapper.appendChild(this.phoneIconsWrapper);

    const inputClasses = this.inputElement.classList;

    this.phoneWrapper.classList.add(
      inputClasses['value'].split(' '),
      'gxPhoneInputWrapper'
    );

    this.inputElement.classList.remove(inputClasses['value'].split(' '));
    this.inputElement.classList.add('gxPhoneInputClean');

    this.inputElement.parentNode.insertBefore(
      this.phoneWrapper,
      this.inputElement
    );
    this.phoneWrapper.id = this.inputElement.id;
    this.inputElement.removeAttribute('id');

    this.phoneInputNumber.appendChild(this.countryComboboxTrigger);
    this.phoneInputNumber.appendChild(this.inputElement);
  }
}

GxPhone = (selector, options = {}) => {
  if (selector instanceof HTMLElement) {
    new Phone(selector, options);
  } else if (typeof selector === 'string') {
    document
      .querySelectorAll(selector)
      .forEach((input) => new Phone(input, { ...options, selector }));
  } else {
    console.error('Invalid selector: must be a DOM element or a string.');
  }
};
