// Получаем продукты
export async function getProducts() {
  try {
    const response = await fetch('http://localhost:3000/products')
    return await response.json()
  } catch (error) {
    console.error('Ошибка загрузки данных:', error)
  }
}

/**
 * Функция создания продуктов
 * @param {object} product - Продукт
 */
export async function createProduct(product) {
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
  }
}
