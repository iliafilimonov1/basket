import { Sidebar } from './components/sidebar.js'
import { getProducts } from './api.js'
import { generateTemplate } from './templates.js'
import { SELECTORS } from './global.js'
import { createNewProduct } from './handlers.js'

window.addEventListener('DOMContentLoaded', async () => {
  // Получение продуктов
  const products = await getProducts()

  // Формирование шаблона
  generateTemplate(products, SELECTORS?.productsList)

  // Вызываем сайдбар (основной)
  new Sidebar('#sidebar', '#sidebar-open')

  // Вызываем сайдбар (корзина)
  new Sidebar('#basket-sidebar', '#basket-button')

  // Навешиваем обработчик на форму добавления товара
  createNewProduct()
})
