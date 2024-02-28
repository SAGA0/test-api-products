import { create } from 'zustand'
import { fetchProducts, fetchTotalPages } from '../../entities/api'

interface State {
	products?: any[]
	currentPage: number
	totalPages: number
	searchTerm: string
	isLoading: boolean
}

interface Actions {
	fetchProductsAction: () => void
	setCurrentPageAction: (page: number) => void
	setSearchTermAction: (term: string) => void
}

const productStore = create<State & Actions>((set, get) => ({
	products: [],
	currentPage: 1,
	totalPages: 1,
	searchTerm: '',
	isLoading: false,
	fetchProductsAction: async () => {
		set({ isLoading: true })
		try {
			const products = await fetchProducts(get().currentPage, get().searchTerm)
			set({ products })
			const totalPages = await fetchTotalPages()
			set({ totalPages, isLoading: false })
		} catch (error) {
			set({ isLoading: false })
		}
	},
	setCurrentPageAction: (page: any) => set({ currentPage: page }),
	setSearchTermAction: (term: any) => set({ searchTerm: term }),
}))

export { productStore }
