import { apiService } from '../../base'

export class ProductsService {
	static async getIds() {
		try {
			const response = await apiService.post('/', {
				action: 'get_ids',
				params: {
					offset: 10,
					limit: 30,
				},
			})

			const data = await JSON.parse(JSON.stringify(response))
			console.log(data)
			return data.result // Возвращаем только массив IDs
		} catch (error) {
			console.error('Ошибка при получении IDs:', error)
			return [] // Возвращаем пустой массив в случае ошибки
		}
	}

	static async getProducts() {
		try {
			const ids = await this.getIds() // Получаем IDs с помощью предыдущей функции
			const response = await apiService.post('/', {
				action: 'get_items',
				params: {
					ids: ids, // Используем полученные IDs
				},
			})

			const data = await JSON.parse(JSON.stringify(response))
			console.log(data.result) // Выводим данные о продуктах в консоль

			return JSON.stringify(data.result) // Возвращаем данные о продуктах в виде строки JSON
		} catch (error) {
			console.error('Ошибка при получении продуктов:', error)
			return JSON.stringify({ error: 'Ошибка при получении продуктов' })
		}
	}
}
