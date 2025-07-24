import { Sidebar } from './components/sidebar.js'
import { getProducts } from './api.js'
import { generateTemplate } from './templates.js'
import { SELECTORS, PRODUCTS_IN_BASKET } from './global.js'
import { createNewProduct } from './handlers.js'
import { renderBasket } from './templates.js'

window.addEventListener('DOMContentLoaded', async () => {
  // Получение продуктов
  const products = await getProducts()

  // Формирование шаблона
  generateTemplate(products, SELECTORS?.productsList)

  // Рендерим корзину
  renderBasket(PRODUCTS_IN_BASKET, SELECTORS?.basketList)

  // Вызываем сайдбар (основной)
  new Sidebar('#sidebar', '#sidebar-open')

  // Вызываем сайдбар (корзина)
  new Sidebar('#basket-sidebar', '#basket-button')

  // Навешиваем обработчик на форму добавления товара
  createNewProduct()
})
