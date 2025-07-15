import { SELECTORS } from './selectors'
import { createProduct } from './api'
import { Notification } from './components/notification'

// Функция добавления продукта через форму
export const addProductToPage = () => {
  if (SELECTORS?.addProductForm) {
    SELECTORS?.addProductForm?.addEventListener('submit', (event) => {
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
      const result = createProduct(values)

      new Notification({ title: 'Добавление товара', subtitle: 'Товар был добавлен успешно' })
    })
  }
}
