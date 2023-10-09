/* eslint-disable @typescript-eslint/no-unused-vars */
import { DynamoDB } from '@aws-sdk/client-dynamodb'
import {
	awsLambdaRequestHandler,
	CreateAWSLambdaContextOptions
} from '@trpc/server/adapters/aws-lambda'
import { appRouter, Context } from '@trpc-demo/core/trpc/router'
import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { nanoid } from 'nanoid'
import { Table } from 'sst/node/table'

const createContext = ({
	event
}: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>): Context => {
	const userId = '0da2198e-62ab-11ee-8c99-0242ac120002' // load user ID from the event
	return {
		userId,
		getDbClient: () => {
			const dynamo = new DynamoDB()

			return {
				getPost: async (id) => {
					const post = await dynamo.getItem({
						TableName: Table.PostsTable.tableName,
						Key: {
							id: {
								S: id
							}
						}
					})

					if (typeof post.Item === 'undefined') {
						return null
					}

					return {
						id: `${post.Item.id.S}`,
						body: `${post.Item.body.S}`,
						name: `${post.Item.name.S}`
					}
				},
				listPosts: async () => {
					const posts = await dynamo.scan({
						TableName: Table.PostsTable.tableName,
						AttributesToGet: ['id', 'name']
					})

					return (posts.Items ?? []).map((result) => ({
						id: `${result.id.S}`,
						name: `${result.name.S}`
					}))
				},
				createPost: async ({ name, body }) => {
					const id = nanoid()

					await dynamo.putItem({
						TableName: Table.PostsTable.tableName,
						Item: {
							id: {
								S: id
							},
							name: {
								S: name
							},
							body: {
								S: body
							}
						}
					})

					return {
						id: id
					}
				},
				removePost: async ({ id }) => {
					await dynamo.deleteItem({
						TableName: Table.PostsTable.tableName,
						Key: {
							id: {
								S: id
							}
						}
					})
				}
			}
		}
	}
}

export const handler = awsLambdaRequestHandler({
	router: appRouter,
	createContext
})
