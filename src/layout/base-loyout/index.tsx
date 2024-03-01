import { Outlet } from 'react-router-dom'

export const BaseLayout = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<div className="w-full flex-1 px-4 pt-8 pb-5 bg-[#eeeeeeaf] dark:bg-gray-900">
				<Outlet />
			</div>
		</div>
	)
}
