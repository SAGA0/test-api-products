import axios from 'axios'

const API_URL = 'http://api.valantis.store:40000/'

export const fetchProducts = async (
	currentPage: number,
	searchTerm: string,
) => {
	try {
		const response = await axios.post(API_URL, {
			action: 'get_items',
			params: {
				offset: (currentPage - 1) * 50,
				limit: 50,
				search: searchTerm,
			},
		})

		const result = response.data.result.reduce((acc: any, curr: any) => {
			const existingIndex = acc.findIndex((item: any) => item.id === curr.id)
			if (existingIndex === -1) {
				acc.push(curr)
			}
			return acc
		}, [])

		return result
	} catch (error) {
		console.error('Error fetching data:', error)
		throw error
	}
}

export const fetchTotalPages = async () => {
	try {
		const response = await axios.post(API_URL, {
			action: 'get_total_pages',
		})

		return response.data.totalPages
	} catch (error) {
		console.error('Error fetching total pages:', error)
		throw error
	}
}
