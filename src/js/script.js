import { Sidebar } from './components/sidebar.js'
import { getProducts } from './api.js'
import { generateTemplate } from './components/card.js'
import { SELECTORS } from './selectors.js'
import { createNewProduct } from './handlers.js'

window.addEventListener('DOMContentLoaded', async () => {
  // Получение продуктов
  const products = await getProducts()

  // Формирование шаблона
  generateTemplate(products, SELECTORS?.productsList)

  // Вызываем сайдбар
  new Sidebar('#sidebar', '#sidebar-open')

  // Навешиваем обработчик на форму добавления товара
  createNewProduct()
})
