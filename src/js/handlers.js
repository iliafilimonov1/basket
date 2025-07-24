import { SELECTORS } from './global'
import { createProduct } from './api'
import { generateTemplate } from './templates'
import { Notification } from './components/notification'
import { PRODUCTS_IN_BASKET } from './global'
import { renderBasket } from './templates'

// Функция добавления продукта через форму
export const createNewProduct = async () => {
  if (SELECTORS?.addProductForm) {
    SELECTORS?.addProductForm?.addEventListener('submit', async (event) => {
      event.preventDefault()
      const form = event.target

      const product = {
        name: form.name.value,
        rating: Number.parseInt(form.rating.value, 10),
        price: Number.parseInt(form.price.value, 10),
        category: form.category.value,
        imgSrc: form.imgSrc.value,
        description: form.description.value,
      }

      // Создаём продукт
      const newProduct = await createProduct(product)

      // Вставляем карточку на главную страницу
      generateTemplate(newProduct, SELECTORS?.productsList)

      form.reset()
    })
  }
}

// Функция добавления товара в корзину
export const addToBasket = (product) => {
  // Получаем текущие товары из localStorage или из PRODUCTS_IN_BASKET
  let basket = JSON.parse(localStorage.getItem('products-basket')) || []

  // Проверяем, есть ли уже такой товар
  const exists = basket.some((item) => item?.id === product?.id)
  if (!exists) basket.push(product)

  // Обновляем глобальный массив
  PRODUCTS_IN_BASKET.length = 0
  PRODUCTS_IN_BASKET.push(...basket)

  // Сохраняем в localStorage
  localStorage.setItem('products-basket', JSON.stringify(basket))

  renderBasket(PRODUCTS_IN_BASKET, SELECTORS?.basketList)

  new Notification({
    title: 'Добавление товара',
    subtitle: 'Товар добавлен в корзину',
  })
}

// Функция удаления товара из корзины
export const removeFromBasket = (carId) => {
  const index = PRODUCTS_IN_BASKET?.findIndex((item) => item?.id === carId)
  if (index !== -1) PRODUCTS_IN_BASKET.splice(index, 1)
  renderBasket(PRODUCTS_IN_BASKET, SELECTORS?.basketList)

  new Notification({
    title: 'Удаление товара',
    subtitle: 'Товар удален из корзины',
    align: 'left',
  })
}
