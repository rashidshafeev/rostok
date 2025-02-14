import {
  computePosition,
  shift,
  offset,
  autoUpdate,
  flip,
} from 'https://cdn.jsdelivr.net/npm/@floating-ui/dom@1.6.12/+esm';

class Core {
  constructor(triggerSelector, options = {}) {
    this.triggerSelector = triggerSelector;
    this.trigger = document.querySelector(triggerSelector);
    this.options = options;
    this.content = options.content || options.textContent || '';
    this.floatElement = null;
    this.isOpen = false;
    this.eventListener = options.eventListener || 'click';

    this.init();
  }

  init() {
    this.trigger.addEventListener(this.eventListener, () => {
      if (this.isOpen) {
        this.hide();
      } else {
        this.show();
      }
    });
  }

  actions() {}

  createFloatElement() {
    const floatElement = document.createElement('div');
    floatElement.classList.add('gx-float-content', 'hidden');
    Object.assign(floatElement.style, {
      position: 'absolute',
      zIndex: '9999',
    });
    this.floatElement = floatElement;
    this.setContent(this.content);

    return this.floatElement;
  }

  setMiddleware(middlewares = {}) {
    return Object.keys(middlewares).forEach((key) => {
      key(middlewares(key));
    });
  }

  setContent(content) {
    if (!this.floatElement) return;
    if (typeof content === 'string') {
      this.floatElement.textContent = content;
    } else if (content instanceof HTMLElement) {
      this.floatElement.innerHTML = '';
      this.floatElement.appendChild(content);
    }
  }

  show() {
    document.body.appendChild(this.createFloatElement());
    this.updatePosition();
    this.floatElement.classList.remove('hidden');

    this.isOpen = true;
  }

  hide() {
    this.floatElement.classList.add('hidden');
    this.floatElement.remove();

    this.isOpen = false;
  }

  updatePosition() {
    if (!this.floatElement) return;
    autoUpdate(
      this.trigger,
      this.floatElement,
      () => {
        computePosition(this.trigger, this.floatElement, {
          placement: this.options?.placement || 'right',
          strategy: this.options?.strategy || 'absolute',
          middleware: [
            // shift(),
            // offset(10),
            flip({
              // crossAxis: true,
              // fallbackAxisSideDirection: 'start',
              fallbackPlacements: ['top', 'bottom'],
              boundary: document.body,
              rootBoundary: 'viewport',
              // rootBoundary: 'viewport',
            }),
          ],
        }).then(({ x, y, ...other }) => {
          console.log(other);
          Object.assign(this.floatElement.style, {
            left: `${x}px`,
            top: `${y}px`,
          });
        });
      },

      {
        ancestorScroll: false,
        ancestorResize: false,
        elementResize: false,
        layoutShift: false,
        animationFrame: false,
      }
    );
  }
}

const tooltip = new Core('.gx-tooltip', {
  content: 'This is a tooltipP',
});
