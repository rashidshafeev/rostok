import {
  computePosition,
  offset,
  flip,
  shift,
} from 'https://cdn.jsdelivr.net/npm/@floating-ui/dom@1.6.12/+esm';

// Элементы
const button = document.getElementById('tooltip-button');
const tooltip = document.getElementById('tooltip');

// Состояние
let isOpen = false;
let currentStage = 0;

// Этапы
const stages = [
  {
    content: 'Start Stage',
    onEnter: () => console.log('Entering Start Stage'),
  },
  {
    content: 'Loading Stage',
    onEnter: () => console.log('Entering Loading Stage'),
  },
  {
    content: 'Finish Stage',
    onEnter: () => console.log('Entering Finish Stage'),
  },
];

// Открытие тултипа
async function openTooltip() {
  isOpen = true;
  tooltip.classList.remove('hidden');

  // Позиционирование с помощью Floating UI
  const { x, y } = await computePosition(button, tooltip, {
    middleware: [offset(10), flip(), shift()],
  });
  Object.assign(tooltip.style, {
    left: `${x}px`,
    top: `${y}px`,
  });

  // Выполнение функции onOpen
  console.log('Tooltip opened');
}

// Закрытие тултипа
function closeTooltip() {
  isOpen = false;
  tooltip.classList.add('hidden');

  // Выполнение функции onClose
  console.log('Tooltip closed');
}

// Обновление содержимого этапа
function updateStage(index) {
  if (index >= 0 && index < stages.length) {
    currentStage = index;
    const stage = stages[index];
    tooltip.innerHTML = stage.content;
    stage.onEnter();
  }
}

// Обработчик клика на кнопку
button.addEventListener('click', () => {
  if (isOpen) {
    closeTooltip();
  } else {
    openTooltip();
    updateStage(currentStage);
  }
});

// Эмуляция переходов между этапами
button.addEventListener('dblclick', () => {
  if (isOpen) {
    currentStage = (currentStage + 1) % stages.length;
    updateStage(currentStage);
  }
});
