import { Sidebar } from './components/sidebar.js'
import { SELECTORS } from './selectors.js'
new Sidebar('#sidebar', '#sidebar-open')

init()

// инициализация функций при загрузке страницы
function init() {
  // подгрузка данных при загрузке страницы
  window.addEventListener('DOMContentLoaded', () => {
    loadJSON()
  })
}

// Функция загрузки товаров (WIP)
async function loadJSON() {
  try {
    const response = await fetch('http://localhost:3000/products')
    const data = await response.json()

    let html = ''

    if (data && Array.isArray(data)) {
      data.forEach((product) => {
        html += `
          <div class="w-full max-w-sm mb-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <a href="#" class="flex max-h-72">
                  <img class="p-4 rounded-lg object-cover" src="${product?.imgSrc}" alt="${
          product?.name ?? 'Изображение отсутствует'
        }" />
              </a>
              <div class="px-4 pb-4">
                  <a href="#">
                      <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">${
                        product?.name ?? 'Название отсутствует'
                      }</h5>
                      <span class="text-md font-medium text-gray-900">${
                        product?.description ?? 'Описание отсутствует'
                      }</span>
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
                  <div class="flex items-center justify-between">
                      <span class="text-3xl font-bold text-gray-900 dark:text-white">$${
                        product.price ?? 'Цена отсутствует'
                      }</span>
                      <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                  </div>
              </div>
          </div>
        `
      })
    }
    SELECTORS?.productsList?.insertAdjacentHTML('beforeend', html)
  } catch (error) {
    console.error('Ошибка загрузки данных:', error)
  }
}

/**
 * Функция создания продуктов
 * @param {object} product - Продукт
 */
async function createProduct(product) {
  try {
    const response = await fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
    if (!response.ok) throw new Error('Ошибка при добавлении продукта')
    return await response.json()
  } catch (error) {
    console.error('Ошибка POST:', error)
    throw error
  }
}

// Функция добавления продукта через форму (WIP)
export const addProductToPage = () => {
  if (SELECTORS?.addProductForm) {
    SELECTORS?.addProductForm?.addEventListener('submit', async (event) => {
      event.preventDefault()
      // Достаем форму
      const form = event.target

      const values = {
        name: form.name.value,
        rating: Number.parseInt(form.rating.value, 10),
        price: Number.parseInt(form.price.value, 10),
        category: form.category.value,
        imgSrc: form.imgSrc.value,
        description: form.description.value,
      }

      // Создаем продукт
      const result = await createProduct(values)
      console.log(result)
    })
  }
}

addProductToPage()
