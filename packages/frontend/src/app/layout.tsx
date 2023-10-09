'use client'

import './globals.css'

import { Inter } from 'next/font/google'

import { trpc } from '@/utils/trpc'

const inter = Inter({ subsets: ['latin'] })

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<html lang="en">
			<body className={inter.className}>
				<main className="flex min-h-screen flex-col items-center p-24">
					<h1 className="text-3xl pb-2">TRPC Demo</h1>
					{children}
				</main>
			</body>
		</html>
	)
}

export default trpc.withTRPC(RootLayout)
