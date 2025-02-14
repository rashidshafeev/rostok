import {
  computePosition,
  offset,
  shift,
} from 'https://cdn.jsdelivr.net/npm/@floating-ui/dom@1.6.12/+esm';

class Overlay {
  constructor(selector, options = {}) {
    this.reference = document.querySelector(selector);
    this.content = options.content;
    this.overlayElement = null;
    this.options = {
      trigger: options.trigger || 'click',
      placement: options.placement || 'bottom-start',
      hideOnClickOutside: options.hideOnClickOutside !== false,
      hideOnEsc: options.hideOnEsc !== false,
      autoClose: options.autoClose !== false,
    };

    if (!this.reference) {
      throw new Error('Reference element not found');
    }

    this.init();
  }

  init() {
    if (this.options.trigger === 'click') {
      this.reference.addEventListener('click', this.toggleOverlay.bind(this));
    } else if (this.options.trigger === 'hover') {
      this.reference.addEventListener(
        'mouseenter',
        this.showOverlay.bind(this)
      );
      this.reference.addEventListener('mouseleave', () =>
        setTimeout(this.hideOverlay.bind(this), 200)
      );
      this.reference.addEventListener('click', this.toggleOverlay.bind(this));
    }

    if (this.options.hideOnClickOutside) {
      document.addEventListener('click', this.handleOutsideClick.bind(this));
    }

    if (this.options.hideOnEsc) {
      document.addEventListener('keydown', this.handleEscKey.bind(this));
    }
  }

  createOverlayElement() {
    this.overlayElement = document.createElement('div');
    this.overlayElement.className = 'overlay';
    const contentElement = document.createElement('div');
    contentElement.innerHTML = this.content;
    this.overlayElement.appendChild(contentElement);
    document.body.appendChild(this.overlayElement);
  }

  showOverlay() {
    if (
      this.overlayElement &&
      !this.overlayElement.classList.contains('hidden')
    )
      return;

    if (!this.overlayElement) {
      this.createOverlayElement();
    }

    this.overlayElement.classList.remove('hidden');
    this.updatePosition();

    if (this.options.autoClose) {
      document.addEventListener('click', this.handleAutoClose.bind(this));
    }
  }

  hideOverlay() {
    if (
      !this.overlayElement ||
      this.overlayElement.classList.contains('hidden')
    )
      return;

    this.overlayElement.classList.add('hidden');
    setTimeout(() => {
      if (this.overlayElement) {
        this.overlayElement.remove();
        this.overlayElement = null;
      }
    }, 300);

    if (this.options.autoClose) {
      document.removeEventListener('click', this.handleAutoClose.bind(this));
    }
  }

  toggleOverlay(event) {
    if (
      this.overlayElement &&
      !this.overlayElement.classList.contains('hidden')
    ) {
      this.hideOverlay();
    } else {
      this.showOverlay();
    }
  }

  handleOutsideClick(event) {
    if (
      this.overlayElement &&
      !this.overlayElement.contains(event.target) &&
      event.target !== this.reference
    ) {
      this.hideOverlay();
    }
  }

  handleEscKey(event) {
    if (
      event.key === 'Escape' &&
      this.overlayElement &&
      !this.overlayElement.classList.contains('hidden')
    ) {
      this.hideOverlay();
    }
  }

  handleAutoClose(event) {
    if (
      !this.overlayElement.contains(event.target) &&
      event.target !== this.reference
    ) {
      this.hideOverlay();
    }
  }

  closeActions() {
    if (this.overlayElement) {
    }
    this.hideOverlay();
  }

  destroyActions() {
    this.reference.removeEventListener('click', this.toggleOverlay.bind(this));
    this.reference.removeEventListener(
      'mouseenter',
      this.showOverlay.bind(this)
    );
    this.reference.removeEventListener(
      'mouseleave',
      this.hideOverlay.bind(this)
    );
    document.removeEventListener('click', this.handleOutsideClick.bind(this));
    document.removeEventListener('keydown', this.handleEscKey.bind(this));
  }

  updatePosition() {
    if (!this.overlayElement) return;

    computePosition(this.reference, this.overlayElement, {
      placement: this.options.placement,
      middleware: [offset(10), shift()],
    }).then(({ x, y }) => {
      Object.assign(this.overlayElement.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    });
  }
}
