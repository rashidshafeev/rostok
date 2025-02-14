class Float {
  constructor(triggerSelector, options = {}) {
    this.triggerSelector = triggerSelector;
    this.trigger = document.querySelector(triggerSelector);
    this.options = {
      offset: 0,
      isHover: false,
      isToggle: options.isHover ? false : true,
      isEsc: false,
      isOutside: false,
      isMove: false,
      isAutoClose: false,
      autoCloseTime: 2000,
      class: '',
      side: 'bottom',
      align: 'center',
      ...options,
    };
    this.width = null; // max-width | px | parent-width | selector-width
    this.floatElement = null;
    this.side = this.options.side;
    this.align = this.options.align;
    this.content = options.content || options.textContent || '';
    this.appends = options.appends || [];
    this.eventListener = options.eventListener || 'click';
    this.autoCloseTimeout = null;
    this.isOpen = false;
    this.init();
  }

  init() {
    try {
      if (!this.trigger) {
        throw new Error(`Триггер ${this.triggerSelector} не найден`);
      }

      this.actions();
    } catch (error) {
      console.error(error);
    }
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

  calculateCoordinates() {
    const { offsetHeight, offsetWidth } = this.trigger;
    const { offsetHeight: contentHeight, offsetWidth: contentWidth } =
      this.floatElement;
    const rect = this.trigger.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    const coors = {
      offsetTop: rect.top + scrollTop,
      offsetLeft: rect.left + scrollLeft,
    };
    const { offsetTop, offsetLeft } = coors;
    this.coordinates = {
      'top-center': [
        offsetTop - contentHeight - this.options.offset,
        offsetLeft + (offsetWidth - contentWidth) / 2,
      ],
      'top-start': [
        offsetTop - contentHeight - this.options.offset,
        offsetLeft,
      ],
      'top-end': [
        offsetTop - contentHeight - this.options.offset,
        offsetLeft + offsetWidth - contentWidth,
      ],
      'bottom-center': [
        offsetTop + offsetHeight + this.options.offset,
        offsetLeft + (offsetWidth - contentWidth) / 2,
      ],
      'bottom-start': [
        offsetTop + offsetHeight + this.options.offset,
        offsetLeft,
      ],
      'bottom-end': [
        offsetTop + offsetHeight + this.options.offset,
        offsetLeft + offsetWidth - contentWidth,
      ],
      'left-center': [
        offsetTop + (offsetHeight - contentHeight) / 2,
        offsetLeft - contentWidth - this.options.offset,
      ],
      'left-start': [
        offsetTop,
        offsetLeft - contentWidth - this.options.offset,
      ],
      'left-end': [
        offsetTop + offsetHeight - contentHeight,
        offsetLeft - contentWidth - this.options.offset,
      ],
      'right-center': [
        offsetTop + (offsetHeight - contentHeight) / 2,
        offsetLeft + offsetWidth + this.options.offset,
      ],
      'right-start': [
        offsetTop,
        offsetLeft + offsetWidth + this.options.offset,
      ],
      'right-end': [
        offsetTop + offsetHeight - contentHeight,
        offsetLeft + offsetWidth + this.options.offset,
      ],
    };
  }

  createFloatElement() {
    const floatElement = document.createElement('div');
    const classes = Array.isArray(this.options.class)
      ? this.options.class
      : this.options.class.length
      ? this.options.class.split(' ')
      : [];
    floatElement.classList.add('gx-float-content', 'hidden', ...classes);

    const options = this.options;

    const customWidth = () => {
      if (options.width === null) return null;
      if (typeof options.width === 'number') {
        return options.width;
      } else {
        if (options.width === 'parent') {
          return this.trigger.offsetWidth;
        } else {
          const el = document.querySelector(options.width);
          return el ? el.offsetWidth : null;
        }
      }
    };

    const additionalWidth = customWidth()
      ? { width: `${customWidth()}px` }
      : {};

    Object.assign(floatElement.style, {
      position: 'absolute',
      zIndex: '9999',
      ...additionalWidth,
    });
    this.floatElement = floatElement;
    if (this.appends.length) {
      this.appendChild(...this.appends);
    } else {
      this.setContent(this.content);
    }
    setTimeout(() => {
      this.floatElement.classList.remove('hidden');
      this.floatElement.classList.add('visible');
    }, 10);
    return this.floatElement;
  }

  updatePosition() {
    if (!this.floatElement) return;
    const coordinates = this.coordinates;

    const [top, left] = coordinates[`${this.side}-${this.align}`] || [0, 0];
    Object.assign(this.floatElement.style, {
      position: 'absolute',
      top: `${top}px`,
      left: `${left}px`,
    });
  }

  observer() {
    const defaultSide = this.options.side;
    const positions = {
      left: 'right',
      right: 'left',
      top: 'bottom',
      bottom: 'top',
    };

    let startPosition = { x: null, y: null };
    const { offsetHeight, offsetWidth } = this.floatElement;
    const refreshSide = () => {
      this.side = positions[this.side];
      this.updatePosition();
    };
    const rootMargin =
      defaultSide === 'bottom' || defaultSide === 'top'
        ? `${-(offsetHeight + this.options.offset)}px 0px`
        : `0px ${-(offsetWidth + this.options.offset)}px`;
    const handleIntersection = (entries) => {
      entries.forEach(
        ({ intersectionRatio, boundingClientRect, rootBounds }) => {
          const currentPosition = {
            y: boundingClientRect.top - rootBounds.top,
            x: boundingClientRect.left - rootBounds.left,
          };
          if (startPosition.y === null || startPosition.x === null) {
            startPosition = { ...currentPosition };
          }

          const deltaY = Math.abs(currentPosition.y - startPosition.y);
          const deltaX = Math.abs(currentPosition.x - startPosition.x);
          const isVertical = deltaY > deltaX;
          if (intersectionRatio === 1) {
            this.side = defaultSide;
            this.updatePosition();
            return;
          }
          const isOutOfBounds = isVertical
            ? {
                top: currentPosition.y < startPosition.y,
                bottom: currentPosition.y > startPosition.y,
              }
            : {
                left: currentPosition.x < startPosition.x,
                right: currentPosition.x > startPosition.x,
              };
          if (isOutOfBounds[defaultSide]) {
            refreshSide(isVertical);
          }
        }
      );
    };
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: rootMargin,
      threshold: 1,
    });
    observer.observe(this.trigger);
  }

  show() {
    if (!this.floatElement) {
      document.body.appendChild(this.createFloatElement());
      this.calculateCoordinates();
      this.updatePosition();
      if (this.options.isMove) this.observer();
      this.floatElement.classList.remove('hidden');
      this.isOpen = true;
      this.bindEvents();
      if (this.options.onOpen) this.options.onOpen();
    } else {
      if (this.autoCloseTimeout !== null) {
        clearTimeout(this.autoCloseTimeout);
      }
    }
  }

  hideActions() {
    this.floatElement.classList.remove('visible');
    this.floatElement.classList.add('hidden');
    if (this.options.onClose) this.options.onClose();
    setTimeout(() => {
      this.floatElement?.remove();
      this.floatElement = null;
      this.isOpen = false;
    }, 200);
  }

  hide() {
    if (this.floatElement) {
      if (this.options.isHover && this.options.isAutoClose) {
        this.autoCloseTimeout = setTimeout(
          () => this.hideActions(),
          this.options.autoCloseTime
        );
      } else {
        this.hideActions();
      }
    }
  }

  toggle() {
    if (this.isOpen) {
      this.hide();
    } else {
      this.show();
    }
  }

  actions() {
    if (this.options.isHover) {
      this.handleHover();
    }
    if (this.options.isToggle) {
      this.handleToggle();
    }
    if (this.options.isEsc) {
      this.handleEscape();
    }
    if (this.options.isOutside) {
      this.handleOutsideClick();
    }
  }

  handleHover() {
    const handleHoverEnter = () => this.show();
    const handleHoverLeave = () => this.hide();
    if (this.options.isHover && !this.floatElement) {
      this.trigger.addEventListener('mouseenter', handleHoverEnter);
      this.trigger.addEventListener('mouseleave', handleHoverLeave);
    } else if (this.options.isHover && this.floatElement) {
      this.trigger.removeEventListener('mouseenter', handleHoverEnter);
      this.trigger.removeEventListener('mouseleave', handleHoverLeave);
    }
  }

  handleToggle() {
    this.trigger.addEventListener(this.eventListener, () => {
      this.toggle();
    });
  }

  handleEscape() {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        this.hide();
      }
    };
    document.addEventListener('keydown', handleEscape);
  }

  handleOutsideClick() {
    const handleClickOutside = (event) => {
      if (
        this.floatElement &&
        !this.floatElement.contains(event.target) &&
        !this.trigger.contains(event.target)
      ) {
        this.hide();
      }
    };
    document.addEventListener('click', handleClickOutside);
  }

  bindEvents() {
    if (this.options.isEsc) {
      this.handleEscape();
    }
    if (this.options.isOutside) {
      this.handleOutsideClick();
    }
  }

  appendChild(...elements) {
    elements.forEach((element) => {
      this.floatElement.appendChild(element);
    });
  }

  updateContent(content) {
    if (!this.floatElement) return;
    console.log(content);
    this.setContent(content);
    this.calculateCoordinates();
    this.updatePosition();
    this.observer();
  }
}
