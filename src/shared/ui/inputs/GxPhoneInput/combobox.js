class Combobox {
  constructor(triggerSelector, options = {}) {
    this.trigger = document.querySelector(triggerSelector);
    this.options = {
      renderItem: (item) => item,
      clickItem: (item) => console.log(item),
      clickItemClose: true,
      renderItemClass: '',
      filterProperty: null,
      noResultsMessage: 'Не найдено',
      ...options,
    };
    this.activeIndex = -1;

    this.filteredData = options.data || [];

    const { comboboxWrapper, comboboxInput, comboboxUl } =
      this.createComboboxElements();
    this.combobox = comboboxWrapper;
    this.comboboxInput = comboboxInput;
    this.comboboxUl = comboboxUl;

    this.comboboxInput = this.float = new Float(triggerSelector, {
      ...options,
      content: comboboxWrapper,
      onOpen: () => {
        setTimeout(() => {
          comboboxInput.focus();
        }, 20);
      },
      onClose: () => {
        setTimeout(() => {
          this.activeIndex = -1;
          this.filteredData = this.options.data;
          comboboxInput.value = '';
          this.renderItems(this.options.data, comboboxUl);
        }, 200);
      },
    });
  }

  createComboboxElements() {
    const comboboxWrapper = document.createElement('div');
    const comboboxInput = document.createElement('input');
    const comboboxUl = document.createElement('ul');
    Object.assign(comboboxUl.style, {
      listStyle: 'none',
      padding: '0',
      margin: '0',
      overflowY: 'auto',
    });
    comboboxInput.placeholder = 'Поиск...';
    comboboxInput.addEventListener('input', (e) =>
      this.handleInput(e.target.value)
    );
    comboboxInput.addEventListener('keydown', (e) => this.handleKeyDown(e)); //
    this.renderItems(this.options.data, comboboxUl);
    comboboxWrapper.classList.add('comboboxWrapper');
    comboboxWrapper.appendChild(comboboxInput);
    comboboxWrapper.appendChild(comboboxUl);

    return { comboboxWrapper, comboboxUl, comboboxInput };
  }

  handleInput(query) {
    this.filterData(query);
    this.renderList();
    this.activeIndex = -1;
  }

  filterData(query = '') {
    const lowerCaseQuery = query.toLowerCase().trim();
    this.filteredData = lowerCaseQuery
      ? this.options.data.filter((item) => {
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
      : [...this.options.data];
  }

  renderItems(data, ul) {
    ul.innerHTML = '';
    data.forEach((item) => {
      const comboboxItemLi = document.createElement('li');
      const classes = Array.isArray(this.options.renderItemClass)
        ? this.options.renderItemClass
        : this.options.renderItemClass.length
        ? this.options.renderItemClass.split(' ')
        : [];
      comboboxItemLi.classList.add(...classes);
      comboboxItemLi.textContent = this.options.renderItem(item);
      comboboxItemLi.addEventListener('click', () => {
        this.options.clickItem(item);
        if (this.options.clickItemClose) this.float.hide();
      });
      ul.appendChild(comboboxItemLi);
    });
  }

  renderList() {
    this.comboboxUl.innerHTML = '';

    if (this.filteredData.length === 0) {
      this.comboboxUl.classList.remove('show');
      this.renderNoResults();
      return;
    }
    this.renderItems(this.filteredData, this.comboboxUl);
    this.comboboxUl.classList.add('show');

    this.float.calculateCoordinates();
    this.float.observer();
    this.float.updatePosition();
  }

  handleKeyDown(e) {
    const items = this.comboboxUl.querySelectorAll('li');

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
          this.options.clickItem(selectedItem);
          items[this.activeIndex].classList.remove('active');
          if (this.options.clickItemClose) this.float.hide();
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
    if (this.activeIndex !== -1 && items[this.activeIndex]) {
      items[this.activeIndex].scrollIntoView({
        block: 'nearest',
        inline: 'start',
      });
    }
  }

  renderNoResults() {
    const noResultsItem = document.createElement('span');
    noResultsItem.classList.add('combobox-no-results');
    noResultsItem.textContent = this.options.noResultsMessage;
    this.comboboxUl.appendChild(noResultsItem);
  }
}
