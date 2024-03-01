import { create } from 'zustand'
import { fetchProducts, fetchTotalPages } from '../../entities/api'
import { ProductsService } from '../../shared/api/services'

interface State {
	products: []
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
			const products = await ProductsService.getProducts()
			// get().currentPage,
			// get().searchTerm,

			set({ products })
			// const totalPages = await ProductsService.getTotalPages()
		} catch (error) {
			set({ isLoading: false })
		}
	},
	setCurrentPageAction: (page: any) => set({ currentPage: page }),
	setSearchTermAction: (term: any) => set({ searchTerm: term }),
}))

export { productStore }
