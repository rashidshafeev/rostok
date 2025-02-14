class Combobox {
  constructor(selector, options) {
    this.initOptions(selector, options);
    this.smartbox = new Smartbox(selector, {
      ...options,
      contentClass: this.options.contentClass,
      content: '<input/><ul></ul>',
      onOpen: () => {
        this.init();
        this.autoFocusInput();
      },
      onClose: () => {
        this.filteredData = [...this.data];
        this.activeIndex = -1;
        this.renderList();
      },
    });
  }

  initOptions(selector, options) {
    this.selector = selector;
    this.trigger = document.querySelector(`[data-smartselect="${selector}"]`);
    if (!this.trigger) {
      throw new Error(
        `Trigger element with selector [data-smartselect="${selector}"] not found.`
      );
    }

    this.trigger.setAttribute('data-smartbox', selector);
    this.options = {
      contentClass: 'combobox-content',
      data: [],
      noResultsMessage: 'Ничего не найдено',
      renderItem: (item) => `<li>${item}</li>`,
      onItemSelect: (item) => console.log(item),
      closeOnSelect: true,
      ...options,
    };

    this.data = this.options.data;
    this.getData = this.options.getData;
    this.filteredData = [...this.data];
    this.activeIndex = -1; // Для отслеживания активного элемента
  }

  init() {
    this.cacheDOM();
    this.bindEvents();
    this.renderList();
  }

  cacheDOM() {
    this.input = this.smartbox.smartboxContent.querySelector('input');
    this.input.classList.add('combobox_input');
    this.list = this.smartbox.smartboxContent.querySelector('ul');
    this.list.classList.add('combobox_list');
  }

  bindEvents() {
    this.input.click();
    this.input.addEventListener('input', (e) =>
      this.handleInput(e.target.value)
    );
    this.input.addEventListener('keydown', (e) => this.handleKeyDown(e)); // Добавить обработку клавиатуры
  }

  setData(data) {
    this.data = data;
    this.filteredData = [...data];
    this.renderList();
  }

  autoFocusInput() {
    setTimeout(() => {
      if (this.input) {
        this.input.focus();
      }
    }, 20);
  }

  handleInput(query) {
    this.filterData(query);
    this.renderList();
    this.activeIndex = -1;
  }

  setContentWidth(width) {
    this.smartbox.setContentWidth(width);
  }

  handleKeyDown(e) {
    const items = this.list.querySelectorAll('.combobox-item');

    if (!items.length) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.activeIndex = (this.activeIndex + 1) % items.length;
        this.updateActiveItem(items);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.activeIndex = (this.activeIndex - 1 + items.length) % items.length;
        this.updateActiveItem(items);
        break;
      case 'Enter':
        e.preventDefault();
        if (this.activeIndex !== -1) {
          const selectedItem = this.filteredData[this.activeIndex];
          this.handleItemSelect(selectedItem);
        }
        break;
      default:
        break;
    }
  }

  updateActiveItem(items) {
    items.forEach((item, index) => {
      item.classList.toggle('active', index === this.activeIndex);
    });
  }

  filterData(query = '') {
    const lowerCaseQuery = query.toLowerCase().trim();
    this.filteredData = lowerCaseQuery
      ? this.data.filter((item) => {
          if (typeof item === 'string') {
            return item.toLowerCase().includes(lowerCaseQuery);
          } else {
            if (this.options.filterProperty) {
              return item[this.options.filterProperty]
                .toLowerCase()
                .includes(lowerCaseQuery);
            } else {
              return Object.keys(item).some((key) => {
                return `${item[key]}`.toLowerCase().includes(lowerCaseQuery);
              });
            }
          }
        })
      : [...this.data];
  }

  renderList() {
    this.list.innerHTML = '';

    if (this.filteredData.length === 0) {
      this.list.classList.remove('show');
      this.renderNoResults();
      return;
    }

    this.filteredData.forEach((item, index) =>
      this.renderListItem(item, index)
    );
    this.list.classList.add('show');

    this.smartbox.calculateCoordinates();
    this.smartbox.updatePosition();
  }

  renderListItem(item, index) {
    const listItem = document.createElement('div');
    listItem.classList.add('combobox-item');
    if (index === this.activeIndex) {
      listItem.classList.add('active');
    }
    listItem.innerHTML = this.options.renderItem(item);

    listItem.addEventListener('click', () => {
      this.handleItemSelect(item);
    });

    this.list.appendChild(listItem);
  }

  renderNoResults() {
    const noResultsItem = document.createElement('div');
    noResultsItem.classList.add('combobox-no-results');
    noResultsItem.textContent = this.options.noResultsMessage;
    this.list.appendChild(noResultsItem);
  }

  handleItemSelect(item) {
    this.options.onItemSelect(item);
    this.input.value = typeof item === 'string' ? item : item.name;

    if (this.options.closeOnSelect) {
      this.list.classList.remove('show');
      this.smartbox.closeContent();
    }
  }
}
