import { Sidebar } from './components/sidebar.js'
import { addProductToPage } from './handlers.js'
import { loadJSON } from './api.js'

// подгрузка данных при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
  loadJSON()
  addProductToPage()
  // ToDo: Должен уметь показываться/скрываться программно
  new Sidebar('#sidebar', '#sidebar-open')
})
