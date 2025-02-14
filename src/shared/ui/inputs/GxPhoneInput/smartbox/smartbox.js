class Smartbox {
  constructor(smartboxSelector, options = {}) {
    const { smartbox } = this.getSmartElements(smartboxSelector);
    this.onOpen = options.onOpen || (() => {});
    this.onClose = options.onClose || (() => {});
    this.changeSideContent = options.changeSideContent || (() => {});
    this.smartboxName = smartboxSelector;
    this.smartbox = smartbox;
    this.options = {
      ...options,
      offset: options.offset || 0,
      openMethod: options.openMethod || 'click',
    };
    this.contentStatus = 'close';
    this.defaultSide = options.side || 'bottom';
    this.defaultAlign = options.align || 'start';
    this.side = options.side || 'bottom';
    this.align = options.align || 'start';
    this.contentWidth = options?.width || 'max-content'; // max-content, max-width
    this.closeOnScroll = options.closeOnScroll || false;
    this.intersectionObserver = null;
    this.smartboxContent = null;
    this.smartboxParent = null;
    this.toggleShow = options.onToggle || true;
    this.coordinates = [];
    this.newObserver = null;
    this.oldObserver = null;
    this.positionReverse = false;
    this.initialize();
  }

  initialize() {
    this.addSmartboxClickHandler();
    this.initCloseButton();
    this.initTriggerHandler();
  }

  initTriggerHandler() {
    if (this.options.trigger) {
      this.options.trigger.addEventListener('click', () => {
        if (this.contentStatus === 'close') {
          this.contentStatus = 'open';
          this.showContent();
          this.updatePosition();
        } else if (this.contentStatus !== 'close' && !this.toggleShow) {
          this.closeContent();
        }
      });
    }
  }

  getSmartElements(name) {
    return { smartbox: document.querySelector(`[data-smartbox="${name}"]`) };
  }

  initCloseButton() {
    this.closeButton = document.createElement('button');
    this.closeButton.className = 'gx-tooltip-close';
    this.closeButton.innerHTML = `<span><svg width="18" height="18" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 3L3 9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3 3L9 9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      </span>`;
    this.closeButton.addEventListener('click', () => this.closeContent());
  }

  clearAutoCloseContent() {
    if (this.autoCloseTimer) {
      clearTimeout(this.autoCloseTimer);
    }
  }

  autoCloseContent() {
    if (this.options.autoClose) {
      let onTime =
        typeof this.options.autoClose === 'number'
          ? this.options.autoClose
          : 2000;
      this.autoCloseTimer = setTimeout(() => {
        this.closeContent();
      }, onTime);
    }
  }

  createContent() {
    const smartboxContent = document.createElement('div');
    smartboxContent.dataset.smartboxContent = this.smartboxName;
    smartboxContent.className = this.options.contentClass || '';
    if (this.options.closeButton) {
      smartboxContent.appendChild(this.closeButton);
      const smartboxContentInner = document.createElement('div');
      smartboxContentInner.innerHTML = this.options.content || '';
      smartboxContent.appendChild(smartboxContentInner);
    } else {
      smartboxContent.innerHTML = this.options.content || '';
    }

    return smartboxContent;
  }

  showContent() {
    this.smartboxContent = this.createContent();
    this.smartboxParent = this.getSmartboxParent();
    this.smartboxParent.style.position = 'relative';
    this.smartboxParent.appendChild(this.smartboxContent);
    this.initContentStyle();
    this.handleClickOutsideBind = this.handleClickOutside.bind(this);
    document.addEventListener('click', this.handleClickOutsideBind);
    this.calculateCoordinates();
    this.initIntersectionObserver();
    this.intersectionObserver.observe(this.smartboxContent);
    this.onOpen();
    this.autoCloseContent();
  }

  closeContent() {
    this.onClose();
    this.contentStatus = 'close';
    this.smartboxContent?.remove();
    this.intersectionObserver?.unobserve(this.smartboxContent);
    document.removeEventListener('click', this.handleClickOutsideBind);
    this.smartboxContent = null;
    this.smartboxParent = null;
    this.clearAutoCloseContent();
  }

  initContentStyle() {
    let width;
    if (typeof this.contentWidth === 'number') {
      width = `${this.contentWidth}px`;
    } else {
      width =
        this.contentWidth === 'max-content'
          ? 'max-content'
          : `${this.smartbox.offsetWidth}px`;
    }
    Object.assign(this.smartboxContent.style, {
      visibility: 'hidden',
      maxWidth: width,
    });
  }

  updateIntersectionObserver(height) {
    let newObserverOptions = {
      root: this.smartboxParent === document.body ? null : this.smartboxParent,
      rootMargin: `-${
        height + this.smartbox.offsetHeight + this.options.offset * 2
      }px 0px -${
        height + this.smartbox.offsetHeight + this.options.offset * 2
      }px`,
      threshold: [1],
    };

    this.intersectionObserver?.disconnect();

    return new IntersectionObserver((entries, observer) => {
      entries.forEach(({ intersectionRatio, target }) => {
        if (intersectionRatio === 1) {
          if (this.positionReverse) {
            this.side = this.defaultSide;
            this.changeSideContent(this.defaultSide);
            this.updatePosition();
            observer.unobserve(target);
            this.oldObserver.observe(target);
            this.intersectionObserver = this.oldObserver;
            this.positionReverse = false;
          }
        }
      });
    }, newObserverOptions);
  }

  initIntersectionObserver() {
    this.intersectionObserver?.disconnect();
    const direction = this.defaultSide;
    let startPositionY = 0;
    let changePositionY = 0;

    this.oldObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(
          ({ intersectionRatio, target, boundingClientRect, rootBounds }) => {
            startPositionY =
              startPositionY === 0
                ? boundingClientRect.top - rootBounds.top
                : startPositionY;
            changePositionY = boundingClientRect.top - rootBounds.top;

            if (intersectionRatio === 1) {
              this.side = this.defaultSide;
              this.updatePosition();
            } else {
              this.newObserver = this.updateIntersectionObserver(
                this.smartboxContent.offsetHeight
              );
              switch (direction) {
                case 'top': {
                  if (changePositionY <= 0) {
                    this.side = 'bottom';
                    this.changeSideContent('bottom');
                    this.updatePosition();
                    observer.unobserve(target);
                    this.newObserver.observe(target);
                    this.intersectionObserver = this.newObserver;
                    this.positionReverse = true;
                  }
                  break;
                }
                case 'bottom': {
                  if (
                    startPositionY <
                      rootBounds.height + boundingClientRect.height &&
                    changePositionY > 0
                  ) {
                    this.side = 'top';
                    this.changeSideContent('top');
                    this.changeSideContent;
                    this.updatePosition();
                    observer.unobserve(target);
                    this.newObserver.observe(target);
                    this.intersectionObserver = this.newObserver;
                    this.positionReverse = true;
                  }
                  break;
                }
              }
            }
          }
        );
      },
      {
        root:
          this.smartboxParent === document.body ? null : this.smartboxParent,
        rootMargin: '0px',
        threshold: [1],
      }
    );

    const currentObserver = this.oldObserver;
    this.intersectionObserver = currentObserver;
    setTimeout(() => {
      this.smartboxContent.style.visibility = 'visible';
    }, 20);
  }

  setContentWidth(size) {
    this.contentWidth = size;
  }

  calculateCoordinates() {
    let offsetTop, offsetLeft;
    const {
      offsetTop: smartboxTop,
      offsetLeft: smartboxLeft,
      offsetHeight,
      offsetWidth,
    } = this.smartbox;

    if (this.smartboxParent !== document.body) {
      offsetTop = smartboxTop;
      offsetLeft = smartboxLeft;
    } else {
      offsetTop = this.smartbox.getBoundingClientRect().top + window.scrollY;
      offsetLeft = this.smartbox.getBoundingClientRect().left + window.scrollX;
    }

    const { offsetHeight: contentHeight, offsetWidth: contentWidth } =
      this.smartboxContent;

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

  updatePosition() {
    const coordinates = this.coordinates;
    const [top, left] = coordinates[`${this.side}-${this.align}`] || [0, 0];
    Object.assign(this.smartboxContent.style, {
      position: 'absolute',
      top: `${top}px`,
      left: `${left}px`,
    });
  }

  handleClickOutside(event) {
    if (!this.options.closeButton) {
      if (
        !this.smartbox.contains(event.target) &&
        !this.smartboxContent?.contains(event.target)
      ) {
        this.closeContent();
        document.removeEventListener('click', this.handleClickOutsideBind);
      }
    }
  }

  addSmartboxClickHandler() {
    switch (this.options.openMethod) {
      case 'click':
        this.smartbox.addEventListener('click', () => {
          if (this.contentStatus === 'close') {
            this.contentStatus = 'open';
            this.showContent();
            this.updatePosition();
          } else if (this.contentStatus !== 'close' && !this.toggleShow) {
            this.closeContent();
          }
        });
        break;
      case 'hover':
        if (this.contentStatus === 'close') {
          this.smartbox.addEventListener('mouseenter', () => {
            this.contentStatus = 'open';
            this.showContent();
            this.updatePosition();
          });
          this.smartbox.addEventListener('mouseleave', () => {
            this.closeContent();
          });
        } else if (this.contentStatus !== 'close' && !this.toggleShow) {
          this.closeContent();
        }
      default:
        break;
    }
  }

  getSmartboxParent() {
    return (
      document.querySelector(
        `[data-smartbox-parent="${this.options?.parent || this.smartboxName}"]`
      ) || document.body
    );
  }

  setContent(htmlContent) {
    this.options.content = htmlContent;
    if (this.smartboxContent) {
      this.smartboxContent.innerHTML = htmlContent;
    }
  }

  updateContentClass(action, className) {
    this.smartboxContent?.classList[action](...className.split(' '));
  }

  addContentClass(className) {
    this.updateContentClass('add', className);
  }

  removeContentClass(className) {
    this.updateContentClass('remove', className);
  }
}
