class Popover {
  constructor(triggerSelector, options) {
    this.triggerSelector = triggerSelector;
    this.trigger = document.querySelector(triggerSelector);
    this.options = {
      isCloseBtn: false,
      closeBtn: null,
      header: null,
      body: null,
      footer: null,
      textHeader: '',
      textBody: '',
      textFooter: '',
      ...options,
    };

    const { popoverHeader, popoverBody, popoverFooter, popoverCloseBtn } =
      this.createElements();

    this.float = new Float(triggerSelector, {
      ...this.options,
      appends: [popoverHeader, popoverBody, popoverFooter],
    });

    popoverCloseBtn.addEventListener('click', () => {
      this.float.hide();
    });

    this.init();
  }

  init() {
    try {
      if (!this.trigger) {
        throw new Error(`Триггер ${this.triggerSelector} не найден`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  setAppend(to, child, textChild) {
    if (child === null && textChild !== null) {
      to.textContent = textChild;
    } else {
      if (typeof child === 'string') {
        to.innerHTML = child;
      } else {
        to.appendChild(child);
      }
    }
  }

  createElements() {
    const popoverHeader = document.createElement('div');
    popoverHeader.classList.add('popover-header');
    const popoverCloseBtn = document.createElement('button');
    popoverCloseBtn.classList.add('popover-close-btn');
    popoverCloseBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 3L3 9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3 3L9 9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;
    const popoverBody = document.createElement('div');
    popoverBody.classList.add('popover-body');
    const popoverFooter = document.createElement('div');
    popoverFooter.classList.add('popover-footer');

    this.setAppend(popoverHeader, this.options.header, this.options.textHeader);
    this.setAppend(popoverBody, this.options.body, this.options.textBody);
    this.setAppend(popoverFooter, this.options.footer, this.options.textFooter);
    popoverHeader.appendChild(popoverCloseBtn);

    this.popoverHeader = popoverHeader;
    this.popoverBody = popoverBody;
    this.popoverFooter = popoverFooter;

    return { popoverHeader, popoverBody, popoverFooter, popoverCloseBtn };
  }

  close() {
    this.float.hide();
  }

  show() {
    this.float.show();
  }

  setContent(content) {
    this.float.setContent(content);
  }
}
