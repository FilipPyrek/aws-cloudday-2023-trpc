import { StackContext, Table } from 'sst/constructs'

export interface ResourcesOutputs {
	postsTable: Table
}

export function Resources({ stack }: StackContext): ResourcesOutputs {
	const postsTable = new Table(stack, 'PostsTable', {
		fields: {
			id: 'string'
		},
		primaryIndex: {
			partitionKey: 'id'
		}
	})

	return {
		postsTable
	}
}
