import React, { useEffect } from 'react'
import { TextField, Button, CircularProgress } from '@mui/material'
import { Pagination } from '@mui/material'
import { productStore } from '../../app/store'

const MainFeature = () => {
	const {
		products,
		currentPage,
		searchTerm,
		totalPages,
		isLoading,
		fetchProductsAction,
		setCurrentPageAction,
		setSearchTermAction,
	} = productStore()

	useEffect(() => {
		fetchProductsAction()
	}, [currentPage, searchTerm])

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTermAction(e.target.value)
		setCurrentPageAction(1)
	}

	console.log({ products })

	const handlePageChange = (
		event: React.ChangeEvent<unknown>,
		value: number,
	) => {
		setCurrentPageAction(value)
	}

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-4">Продуктовый Лист</h1>
			<div className="flex items-center space-x-2 mb-4">
				<TextField
					label="Поиск"
					variant="outlined"
					value={searchTerm}
					onChange={handleSearchChange}
				/>
				{isLoading ? (
					<CircularProgress size={24} />
				) : (
					<Button variant="contained" onClick={fetchProductsAction}>
						Search
					</Button>
				)}
			</div>
			<ul className="space-y-4">
				{products?.map((product: any) => (
					<li key={product.id} className="border p-4 rounded-lg">
						<strong>ID:</strong> {product.id}
						<br />
						<strong>Продукт:</strong> {product.product || 'dd'}
						<br />
						<strong>Цена:</strong> {`${product.price}₽` || 'ss'}
						<br />
						<strong>Бренд:</strong> {product.brand || 'N/A'}
					</li>
				))}
			</ul>
			<div className="mt-4">
				<Pagination
					count={totalPages}
					page={currentPage}
					onChange={handlePageChange}
					color="primary"
					variant="outlined"
					shape="rounded"
				/>
			</div>
		</div>
	)
}

export default MainFeature
