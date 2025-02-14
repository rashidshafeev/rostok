/*
  openMethod: click | hover | auto
  autoClose: number(ms) | boolean
  type: text | with button
*/

class Tooltip {
  constructor(options) {
    this.options = { ...options, type: options.type || 'text' };
    this.defaultOptions = { ...options, type: options.type || 'text' };
    this.selectorElement = options.selector.replace(/[^a-z]/gi, '');
    this.selector = document.querySelector(options.selector);
    this.initSmartbox();
  }

  initSmartbox() {
    this.selector.setAttribute('data-smartbox', this.selectorElement);
    this.smartbox = new Smartbox(this.selectorElement, {
      offset: 10,
      changeSideContent: (side) => {
        if (this.options.side !== side) {
          this.smartbox.removeContentClass(this.options.side);
          this.smartbox.addContentClass(side);
          this.options.side = side;
        } else {
          this.smartbox.removeContentClass(this.defaultOptions.side);
          this.smartbox.removeContentClass(side);
          this.smartbox.addContentClass(side);
        }
      },
      contentClass: `gx-tooltip-content ${this.options.side || 'bottom'} hide`,
      ...this.options,
      onOpen: () => {
        setTimeout(() => {
          this.smartbox.removeContentClass('hide');
        }, 0);
        this.init();
        if (this.options.onOpen) {
          this.options.onOpen();
        }
      },
    });
  }

  init() {
    this.cacheDOM();
  }

  cacheDOM() {
    switch (this.options.type) {
      case 'text':
        this.tooltipContent = this.smartbox.smartboxContent;
        break;
      case 'with-button':
        this.tooltipContent = this.smartbox.smartboxContent.querySelector(
          `#tooltipContent${this.selectorElement}`
        );
        const classNames =
          this.options.classNames || `${this.options.classNames}`;
        !!this.tooltipContent &&
          this.tooltipContent.classList.add('gxToolkitWrapper');
        classNames && this.tooltipContent.classList.add(classNames);
        break;

      default:
        break;
    }
  }

  setContent(content) {
    switch (this.options.type) {
      case 'text':
        this.tooltipContent.textContent = content;
        break;
      case 'with-button':
        if (Array.isArray(content)) {
          content.forEach((item) => this.tooltipContent.appendChild(item));
        } else {
          this.tooltipContent.appendChild(content);
        }
        break;

      default:
        break;
    }
    this.smartbox.calculateCoordinates();
    this.smartbox.updatePosition();
  }

  updatePosition() {
    this.smartbox.calculateCoordinates();
    this.smartbox.updatePosition();
  }

  show() {
    this.smartbox.showContent();
    this.smartbox.calculateCoordinates();
    this.smartbox.updatePosition();
  }

  hide() {
    this.smartbox.addContentClass('hide');
    setTimeout(() => {
      this.smartbox.closeContent();
    }, 300);
  }

  addClass(str) {
    this.smartbox.addContentClass(str);
  }
}
