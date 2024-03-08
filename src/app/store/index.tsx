import { create } from 'zustand'
import { ProductsService } from '../../shared/api/services'

interface Products {
	brand: string | null
	id: string
	price: number
	product: string
}

interface State {
	products: Products[]
	currentPage: number
	totalPages: number
	searchTerm: string
	isLoading: boolean
}

interface Actions {
	fetchProductsAction: () => void
	setCurrentPageAction: (page: number) => void
	getTotalPagesAction: () => void
	setSearchTermAction: (term: string) => void
}

const productStore = create<State & Actions>((set, get) => ({
	products: [],
	currentPage: 1,
	totalPages: 10,
	searchTerm: '',
	isLoading: false,
	fetchProductsAction: async () => {
		set({ isLoading: true })
		try {
			const products = await ProductsService.getProducts(get().currentPage)
			get().searchTerm
			set((prev) => ({ ...prev, products }))
		} finally {
			set((prev) => ({ ...prev, isLoading: false }))
		}
	},
	setCurrentPageAction: (page: any) => {
		set({ isLoading: true })
		try {
			set({ currentPage: page })
		} finally {
			set((prev) => ({ ...prev, isLoading: false }))
		}
	},
	getTotalPagesAction: async () => {
		set({ isLoading: true })
		try {
			const totalPages = await ProductsService.getTotalPages()
			console.log(`Total 2`, totalPages)
			set({ totalPages: totalPages })
		} finally {
			set((prev) => ({ ...prev, isLoading: false }))
		}
	},
	setSearchTermAction: (term: any) => set({ searchTerm: term }),
}))

export { productStore }
