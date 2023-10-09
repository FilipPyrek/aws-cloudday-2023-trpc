import type { AppRouter } from '@core/trpc/router'
import { httpBatchLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'

function getBaseUrl(): string {
	return process.env.NEXT_PUBLIC_API_ENDPOINT ?? ''
}

export const trpc = createTRPCNext<AppRouter>({
	config() {
		return {
			links: [
				httpBatchLink({
					/**
					 * If you want to use SSR, you need to use the server's full URL
					 * @link https://trpc.io/docs/ssr
					 **/
					url: `${getBaseUrl()}/trpc/`,

					// You can pass any HTTP headers you wish here
					async headers() {
						return {
							// authorization: getAuthCookie(),
						}
					}
				})
			]
		}
	},
	/**
	 * @link https://trpc.io/docs/ssr
	 **/
	ssr: false
})
