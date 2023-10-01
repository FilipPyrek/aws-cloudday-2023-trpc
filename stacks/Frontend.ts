import { NextjsSite, StackContext } from 'sst/constructs'

export function Frontend({ stack }: StackContext): void {
	const frontend = new NextjsSite(stack, 'Frontend', {
		path: 'packages/frontend'
	})

	stack.addOutputs({
		frontendUrl: frontend.url
	})
}
