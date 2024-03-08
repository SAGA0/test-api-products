// @ts-nocheck
import React, { useEffect } from 'react'
import { TextField, Button, CircularProgress, Typography } from '@mui/material'
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
		getTotalPagesAction,
		setSearchTermAction,
	} = productStore()

	useEffect(() => {
		fetchProductsAction()
		getTotalPagesAction()
	}, [currentPage, searchTerm])

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTermAction(e.target.value)
		setCurrentPageAction(1)
	}

	console.log(`dsdsdsd`, { products })

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
						Поиск
					</Button>
				)}
			</div>
			<ul className="space-y-4">
				{isLoading ? (
					<CircularProgress size={24} />
				) : (
					products
						?.reduce((uniqueProducts, product) => {
							if (!uniqueProducts.some((p) => p.id === product.id)) {
								uniqueProducts.push(product)
							}
							return uniqueProducts
						}, [])
						.map((uniqueProduct) => (
							<li key={uniqueProduct.id} className="border p-4 rounded-lg">
								<strong>Бренд:</strong> {uniqueProduct.brand || 'N/A'}
								<br />
								<strong>ID:</strong> {uniqueProduct.id}
								<br />
								<strong>Цена:</strong> {`${uniqueProduct.price}₽` || 'N/A'}
								<br />
								<strong>Продукт:</strong> {uniqueProduct.product || 'N/A'}
							</li>
						))
				)}
			</ul>
			<div className="mt-4">
				<Typography>Страница: {currentPage}</Typography>
				<Pagination
					count={totalPages}
					page={currentPage}
					onChange={handlePageChange}
				/>
			</div>
		</div>
	)
}

export default MainFeature
