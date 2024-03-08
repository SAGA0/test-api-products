import { apiService } from '../../base'

export class ProductsService {
	static async getIds(currentPage: number) {
		try {
			const response = await apiService.post('/', {
				action: 'get_ids',
				params: {
					offset: (currentPage - 1) * 50,
					limit: 50,
				},
			})

			const data = await JSON.parse(JSON.stringify(response))
			console.log(data)
			return data.result
		} catch (error) {
			console.error('Ошибка при получении IDs:', error)
			return []
		}
	}

	static async getProducts(currentPage: number) {
		try {
			const ids = await this.getIds(currentPage)
			const response = await apiService.post('/', {
				action: 'get_items',
				params: {
					ids: ids,
				},
			})

			const data = await JSON.parse(JSON.stringify(response))
			console.log(data.result)

			return data.result
		} catch (error) {
			console.error('Ошибка при получении продуктов:', error)
			return JSON.stringify({ error: 'Ошибка при получении продуктов' })
		}
	}

	static async getTotalPages() {
		try {
			const response = await apiService.post('/', {
				action: 'get_ids',
			})

			const data = await JSON.parse(JSON.stringify(response))
			const totalPages = Number(Math.round(data.result.length / 50))

			console.log(`Total 1`, totalPages)

			return totalPages
		} catch (error) {
			console.error('Ошибка при получении TotalPages:', error)
			return Number(10)
		}
	}
}
