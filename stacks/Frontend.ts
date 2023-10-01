import { NextjsSite, StackContext } from 'sst/constructs'

export function Frontend({ stack }: StackContext): void {
	new NextjsSite(stack, 'Frontend', {
		path: 'packages/frontend'
	})
}
