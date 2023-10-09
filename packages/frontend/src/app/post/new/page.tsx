'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { trpc } from '@/utils/trpc'

export const NewPost: React.FC = (): JSX.Element => {
	const router = useRouter()

	const [adminPassword, setAdminPassword] = useState('')
	const [name, setName] = useState('')
	const [body, setBody] = useState('')

	const createPostMutation = trpc.createPost.useMutation()

	const createPost = async () => {
		await createPostMutation.mutateAsync({
			adminPassword,
			body,
			name
		})

		router.push('/')
	}

	return (
		<div className="flex flex-col w-1/2">
			<h1 className="text-3xl pb-2">New post</h1>
			<div>
				<input
					className="w-full h-12 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
					type="password"
					placeholder="Admin password"
					value={adminPassword}
					onChange={(event) => setAdminPassword(event.target.value)}
				/>
				<input
					className="w-full h-12 px-4 mb-2 text-lg text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
					type="text"
					placeholder="Name"
					value={name}
					onChange={(event) => setName(event.target.value)}
				/>
				<textarea
					className="w-full px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline"
					placeholder="Body"
					rows={6}
					value={body}
					onChange={(event) => setBody(event.target.value)}
				></textarea>
			</div>
			<div className="flex justify-between">
				<Link href="/">
					<span className="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]">
						Back
					</span>
				</Link>
				<button
					disabled={createPostMutation.isLoading}
					onClick={createPost}
					className="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
				>
					Save
				</button>
			</div>
		</div>
	)
}

export default NewPost
