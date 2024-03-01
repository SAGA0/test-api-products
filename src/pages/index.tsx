import { Route, Routes } from 'react-router-dom'
import { BaseLayout } from '../layout/base-loyout'
import { routes } from './router'
import { Suspense } from 'react'

const Routing = () => {
	return (
		<Routes>
			<Route element={<BaseLayout />}>
				{routes.map(({ path, Component }) => (
					<Route
						key={path}
						path={path}
						element={
							<Suspense fallback={<>Loading...</>}>
								<Component />
							</Suspense>
						}
					/>
				))}
			</Route>
		</Routes>
	)
}

export default Routing
