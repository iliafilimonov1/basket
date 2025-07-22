export const SELECTORS = {
  /* Обертка счетчика */
  counterInput: document.querySelector('.counter__input'),
  /* Текст счетчика */
  counterText: document.querySelector('.counter__text'),
  /* Кнопка увеличения счетчика */
  counterBtnUp: document.querySelector('.counter__btn--up'),
  /* Кнопка уменьшения счетчика */
  counterBtnDown: document.querySelector('.counter__btn--down'),
  /* Кнопки добавления товара в корзину */
  addToCartBtns: document.querySelectorAll('.basket-btn'),
  /** Форма добавления товара */
  addProductForm: document.querySelector('#add-form'),
  /** Контейнер для отрисовки карточек */
  productsList: document.querySelector('.products-list'),
  /** Контейнер для отрисовки карточек в корзине */
  basketList: document.querySelector('#basket-list'),
}

// Товары в корзине
export const PRODUCTS_IN_BASKET = []
