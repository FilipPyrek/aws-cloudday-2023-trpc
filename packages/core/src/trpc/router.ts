import { initTRPC, TRPCError } from '@trpc/server'
import { z } from 'zod'

export type Context = {
	userId: string
	getDbClient: () => {
		getPost: (
			id: string
		) => Promise<{ id: string; body: string; name: string } | null>
		listPosts: () => Promise<{ id: string; name: string }[]>
		createPost: (input: {
			name: string
			body: string
		}) => Promise<{ id: string }>
		removePost: (input: { id: string }) => Promise<void>
	}
}

export type Meta = {
	adminOnly: boolean
}

export const t = initTRPC.context<Context>().meta<Meta>().create()

const isAdmin = t.middleware(async (opts) => {
	const { ctx, meta, rawInput } = opts
	if (
		meta?.adminOnly === true &&
		// @ts-ignore to simplify things
		rawInput?.adminPassword !== 'heslo123'
	) {
		throw new TRPCError({ code: 'UNAUTHORIZED' })
	}
	return opts.next({
		ctx: {
			...ctx,
			isAdmin: meta?.adminOnly ?? false
		}
	})
})

export const appRouter = t.router({
	getPost: t.procedure
		.input(
			z.object({
				id: z.string()
			})
		)
		.query((opts) => {
			const db = opts.ctx.getDbClient()

			return db.getPost(opts.input.id)
		}),
	listPosts: t.procedure.query((opts) => {
		const db = opts.ctx.getDbClient()

		return db.listPosts()
	}),
	createPost: t.procedure
		.use(isAdmin)
		.meta({ adminOnly: true })
		.input(
			z.object({
				adminPassword: z.string(),
				name: z.string(),
				body: z.string()
			})
		)
		.mutation((opts) => {
			console.log('isAdmin', opts.ctx.isAdmin)
			const db = opts.ctx.getDbClient()

			db.createPost(opts.input)
		}),
	removePost: t.procedure
		.use(isAdmin)
		.meta({ adminOnly: true })
		.input(
			z.object({
				adminPassword: z.string(),
				id: z.string()
			})
		)
		.mutation((opts) => {
			console.log('isAdmin', opts.ctx.isAdmin)
			const db = opts.ctx.getDbClient()

			db.removePost(opts.input)
		})
})

// export type definition of API
export type AppRouter = typeof appRouter
