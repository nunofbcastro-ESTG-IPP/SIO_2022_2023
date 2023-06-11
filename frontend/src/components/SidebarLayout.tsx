import { Dialog, Transition } from "@headlessui/react"
import { MenuIcon, PresentationChartLineIcon, UploadIcon, XIcon } from "@heroicons/react/outline"
import clsx from "clsx"
import Link from "next/link"
import { Fragment, ReactNode, useState } from "react"

export function SidebarLayout({ children }: { children: ReactNode }) {
	const navigation = [
		{
			name: "Dashboard",
			href: "/",
			icon: PresentationChartLineIcon,
			current: false,
		},
		{
			name: "Upload",
			href: "/upload",
			icon: UploadIcon,
			current: false,
		},
	]

	const [sidebarOpen, setSidebarOpen] = useState(false)

	return (
		<>
			<div>
				<Transition.Root show={sidebarOpen} as={Fragment}>
					<Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
						<Transition.Child
							as={Fragment}
							enter="transition-opacity ease-linear duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="transition-opacity ease-linear duration-300"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
						</Transition.Child>
						<Transition.Child
							as={Fragment}
							enter="transition ease-in-out duration-300 transform"
							enterFrom="-translate-x-full"
							enterTo="translate-x-0"
							leave="transition ease-in-out duration-300 transform"
							leaveFrom="translate-x-0"
							leaveTo="-translate-x-full"
						>
							<div className="relative flex-1 flex flex-col max-w-xs w-full bg-blue-700">
								<Transition.Child
									as={Fragment}
									enter="ease-in-out duration-300"
									enterFrom="opacity-0"
									enterTo="opacity-100"
									leave="ease-in-out duration-300"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<div className="absolute top-0 right-0 -mr-12 pt-2">
										<button
											type="button"
											className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
											onClick={() => setSidebarOpen(false)}
										>
											<span className="sr-only">Close sidebar</span>
											<XIcon className="h-6 w-6 text-white" aria-hidden="true" />
										</button>
									</div>
								</Transition.Child>
								<div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
									<div className="flex-shrink-0 flex items-center px-4">
										<img
											className="h-8 w-auto"
											src="/icon.png"
											alt="Workflow"
										/>
									</div>
									<nav className="mt-5 px-2 space-y-1">
										{navigation.map((item) => (
											<Link
												key={item.name}
												href={item.href}
												className={clsx(
													item.current
														? "bg-blue-800 text-white"
														: "text-white hover:bg-blue-600 hover:bg-opacity-75",
													"group flex items-center px-2 py-2 text-base font-medium rounded-md"
												)}
											>
												<item.icon
													className="mr-4 flex-shrink-0 h-6 w-6 text-blue-300"
													aria-hidden="true"
												/>
												{item.name}
											</Link>
										))}
									</nav>
								</div>
							</div>
						</Transition.Child>
						<div className="flex-shrink-0 w-14" aria-hidden="true">
							{/* Force sidebar to shrink to fit close icon */}
						</div>
					</Dialog>
				</Transition.Root>

				{/* Static sidebar for desktop */}
				<div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
					{/* Sidebar component, swap this element with another sidebar if you like */}
					<div className="flex-1 flex flex-col min-h-0 shadow bg-blue-700 rounded-tr-md rounded-br-md">
						<div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
							<div className="flex items-center flex-shrink-0 px-4">
								<img
									className="h-8 w-auto"
									src="/icon.png"
									alt="Workflow"
								/>
							</div>
							<nav className="mt-5 flex-1 px-2 space-y-1">
								{navigation.map((item) => (
									<Link
										key={item.name}
										href={item.href}
										className={clsx(
											item.current
												? "bg-blue-800 text-white"
												: "text-white hover:bg-blue-600 hover:bg-opacity-75",
											"group flex items-center px-2 py-2 text-sm font-medium rounded-md"
										)}
									>
										<item.icon
											className="mr-3 flex-shrink-0 h-6 w-6 text-blue-300"
											aria-hidden="true"
										/>
										{item.name}
									</Link>
								))}
							</nav>
						</div>
					</div>
				</div>
				<div className="md:pl-64 flex flex-col flex-1">
					<div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
						<button
							type="button"
							className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
							onClick={() => setSidebarOpen(true)}
						>
							<span className="sr-only">Open sidebar</span>
							<MenuIcon className="h-6 w-6" aria-hidden="true" />
						</button>
					</div>
					<main className="flex-1">
						<div className="py-6">
							<div className="max-w-[110rem] mx-auto px-4 sm:px-6 md:px-8">{children}</div>
						</div>
					</main>
				</div>
			</div>
		</>
	)
}