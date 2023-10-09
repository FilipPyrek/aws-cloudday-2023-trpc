import { Api, Function, StackContext, use } from 'sst/constructs'

import { Resources } from './Resources'

export interface ApiOutputs {
	api: Api
}

export function API({ stack }: StackContext): ApiOutputs {
	const resources = use(Resources)

	const handlerFunction = new Function(stack, 'TrpcHandler', {
		handler: 'packages/functions/src/trpc/handler.handler',
		bind: [resources.postsTable]
	})

	const api = new Api(stack, 'Api', {
		routes: {
			'GET /trpc/{proxy+}': handlerFunction,
			'POST /trpc/{proxy+}': handlerFunction
		},
		cors: true
	})

	stack.addOutputs({
		ApiEndpoint: api.url
	})

	return {
		api
	}
}
