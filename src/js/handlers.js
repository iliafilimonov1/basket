import { SELECTORS } from './selectors'
import { createProduct } from './api'
import { Notification } from './components/notification'
import { generateTemplate } from './components/card'

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
      new Notification({ title: 'Добавление товара', subtitle: 'Товар был добавлен успешно' })
    })
  }
}
