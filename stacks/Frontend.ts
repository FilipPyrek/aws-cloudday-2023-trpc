import { NextjsSite, StackContext, use } from 'sst/constructs'

import { API } from './Api'

export function Frontend({ stack }: StackContext): void {
	const { api } = use(API)

	const frontend = new NextjsSite(stack, 'Frontend', {
		path: 'packages/frontend',
		environment: {
			NEXT_PUBLIC_API_ENDPOINT: api.url
		}
	})

	stack.addOutputs({
		frontendUrl: frontend.url
	})
}
