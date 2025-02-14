class SmartSelect {
  constructor(selector, options) {
    this.input = document.querySelector(`[data-smartselect="${selector}"]`);
    this.input.setAttribute('data-smartbox', selector);
    this.smartbox = new Smartbox(selector, {
      ...options,
      contentClass: options.contentClass || 'combobox-content',
      content: '<ul></ul>',
      width: 'max-width',
    });

    this.data = options.data || [];
    this.getData = options.getData || null;
    this.noResultsMessage = options.noResultsMessage || 'Ничего не найдено';

    this.init();
  }

  init() {
    this.input.addEventListener('input', this.handleInput.bind(this));
  }

  async handleInput() {
    const query = this.input.value.trim().toLowerCase();
    let filteredData;

    if (this.getData) {
      filteredData = await this.getData(query);
    } else {
      filteredData = this.data.filter((item) =>
        item.toLowerCase().includes(query)
      );
    }

    this.updateList(filteredData);
  }

  updateList(data) {
    const list = this.smartbox.smartboxContent.querySelector('ul');
    list.innerHTML = '';
    list.setAttribute('role', 'listbox');

    const inp = document.createElement('input');

    if (data.length === 0) {
      list.innerHTML = `<li>${this.noResultsMessage}</li>`;
    } else {
      list.appendChild(inp);
      data.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        li.setAttribute('role', 'option');
        li.setAttribute('aria-select', 'false');
        li.setAttribute('tab-index', '0');
        li.addEventListener('click', () => this.selectItem(item));
        list.appendChild(li);
      });
    }

    this.smartbox.calculateCoordinates();
    this.smartbox.updatePosition();
  }

  selectItem(item) {
    this.input.value = item;
    this.smartbox.closeContent();
  }
}
