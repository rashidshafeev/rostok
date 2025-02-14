class ClickOutsideHandler {
  constructor(triggerSelector, targetSelector, onOpen, onClose) {
    this.trigger = document.querySelector(triggerSelector);
    this.target = document.querySelector(targetSelector);
    this.isOpen = false;
    this.wasTriggered = false;
    this.onOpen = onOpen || (() => {});
    this.onClose = onClose || (() => {});

    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.handleTriggerClick = this.handleTriggerClick.bind(this);

    this.init();
  }

  init() {
    if (!this.trigger || !this.target) {
      console.error('Trigger or target element not found!');
      return;
    }

    this.trigger.addEventListener('click', this.handleTriggerClick);
  }

  handleTriggerClick(event) {
    event.stopPropagation();

    if (!this.isOpen) {
      this.open();
    } else {
      // Если был клик по триггеру, не закрываем
      this.wasTriggered = true;
      setTimeout(() => (this.wasTriggered = false), 0); // Сбрасываем флаг после текущего цикла
    }
  }

  handleDocumentClick(event) {
    // Если клик был по триггеру, игнорируем
    if (this.wasTriggered) return;

    if (!this.target.contains(event.target)) {
      this.close();
    }
  }

  open() {
    this.isOpen = true;
    this.target.style.display = 'block'; // Или другой способ показать элемент
    this.onOpen();
    document.addEventListener('click', this.handleDocumentClick);
  }

  close() {
    this.isOpen = false;
    this.target.style.display = 'none'; // Или другой способ скрыть элемент
    this.onClose();
    document.removeEventListener('click', this.handleDocumentClick);
  }
}

// Пример использования:
const clickOutsideHandler = new ClickOutsideHandler(
  '#trigger', // Селектор триггера
  '#dropdown', // Селектор блока
  () => console.log('Открыто'), // Коллбек на открытие
  () => console.log('Закрыто') // Коллбек на закрытие
);
