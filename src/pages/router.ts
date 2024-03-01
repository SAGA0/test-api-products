import { lazy } from 'react'

const ProductsPage = lazy(() => import('./products/index'))

export const routes = [{ path: '/', Component: ProductsPage }]
