import { addToBasket, removeFromBasket } from './handlers'

/**
 * Рендерит корзину товаров
 * @param {array} basketProducts - Товары в корзине
 * @param {Element} basketElement - Контейнер корзины
 */
export const renderBasket = (basketProducts, basketElement) => {
  const basketFromStorage = JSON.parse(localStorage.getItem('products-basket'))
  if (basketFromStorage) {
    basketProducts = basketFromStorage
  }

  basketElement.innerHTML = ''

  let template = ''
  if (basketProducts && Array.isArray(basketProducts)) {
    basketProducts.forEach((product) => {
      template += `
        <div data-id="${
          product?.id
        }" class="basket-card w-full max-w-sm mb-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <a href="#" class="flex max-h-72 min-h-72">
            <img class="p-4 rounded-lg object-cover" src="${product?.imgSrc ?? ''}" alt="${
        product?.name ?? 'Изображение отсутствует'
      }"/>
          </a>
          <div class="px-4 pb-4">
            <a href="#">
              <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">${
                product?.name ?? 'Название отсутствует'
              }</h5>
              <span class="text-md font-medium text-gray-900">${product?.description ?? 'Описание отсутствует'}</span>
            </a>
            <div class="text-gray-500 text-sm mb-2">${product?.category ?? 'Категория не выбрана'}</div>
            <div class="flex items-center mt-2.5 mb-5">
              <div class="flex items-center space-x-1 rtl:space-x-reverse">
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">${
                  product.rating
                }</span>
              </div>
            </div>
            <div class="flex items-center justify-between mb-3">
              <span class="text-3xl font-bold text-gray-900 dark:text-white">$${
                product.price ?? 'Цена отсутствует'
              }</span>
            </div>
            <button type="button" class="remove-basket-btn text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">Удалить из корзины</button>
          </div>
        </div>
      `
    })
  }

  basketElement.insertAdjacentHTML('beforeend', template)

  // Need to fix
  const removeBtns = basketElement.querySelectorAll('.remove-basket-btn')
  removeBtns.forEach((button) => {
    button.addEventListener('click', (event) => {
      const card = event.target.closest('[data-id]')
      const carId = card?.getAttribute('data-id')

      if (carId) removeFromBasket(carId)
    })
  })
}

/**
 * Функция генерации и вставки шаблона (карточка)
 * @param {array} products - Продукты
 * @param {Element} parentElement - Родитель внутрь которого выполняется вставка
 */
export const generateTemplate = (products, parentElement) => {
  parentElement.innerHTML = ''
  let template = ''

  if (products && Array.isArray(products)) {
    products.forEach((product) => {
      template += `
    <div data-id="${
      product?.id
    }" class="w-full max-w-sm mb-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <a href="#" class="flex max-h-72 min-h-72">
            <img class="p-4 rounded-lg object-cover" src="${product?.imgSrc ?? ''}" alt="${
        product?.name ?? 'Изображение отсутствует'
      }"/>
        </a>
        <div class="px-4 pb-4">
            <a href="#">
                <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">${
                  product?.name ?? 'Название отсутствует'
                }</h5>
                <span class="text-md font-medium text-gray-900">${product?.description ?? 'Описание отсутствует'}</span>
            </a>
            <div class="text-gray-500 text-sm mb-2">${product?.category ?? 'Категория не выбрана'}</div>
            <div class="flex items-center mt-2.5 mb-5">
                <div class="flex items-center space-x-1 rtl:space-x-reverse">
                    <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                    <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">${
                      product.rating
                    }</span>
                </div>
            </div>
            <div class="flex items-center justify-between mb-3">
                <span class="text-3xl font-bold text-gray-900 dark:text-white">$${
                  product.price ?? 'Цена отсутствует'
                }</span>
            </div>

            <button type="button" class="basket-btn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add to basket</button>
        </div>
    </div>
  `
    })
  }

  parentElement.insertAdjacentHTML('beforeend', template)

  // Need to fix
  const allBtns = parentElement.querySelectorAll('.basket-btn')
  allBtns.forEach((button) => {
    button.addEventListener('click', (event) => {
      const card = event.target.closest('[data-id]')
      const carId = card?.getAttribute('data-id')
      const product = products?.find((element) => element?.id == carId)

      if (product) addToBasket(product)
    })
  })
}
