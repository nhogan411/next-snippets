'use client';

import { createSnippet } from '@/actions';
import { useFormState } from 'react-dom';

export default function SnippetCreatePage() {
	// useFormState accepts two arguments:
	// 1. The action to be called when the form is submitted
	// 2. The initial state of the form.
	//
	// useFormState always returns an array of two objects:
	// 1. The form state. This will get updated in the action.
	// 2. The submitHandler function. This is the function that gets
	// called when the form is submitted.
	const [formState, createSnippetAction] = useFormState(createSnippet, { message: '' });

	return (
		<form action={createSnippetAction}>
			<h3 className='font-bold m-3'>Create a Snippet</h3>

			<div className='flex flex-col gap-4'>
				<div className='flex gap-4'>
					<label
						className='w-12'
						htmlFor='title'
					>
						Title
					</label>
					<input
						name='title'
						className='border rounded p-2 w-full'
						id='title'
						placeholder='Title'
					/>
				</div>

				<div className='flex gap-4'>
					<label
						className='w-12'
						htmlFor='code'
					>
						Code
					</label>
					<textarea
						name='code'
						className='border rounded p-2 w-full'
						id='code'
					/>
				</div>
				{formState.message && <div className='my-2 p-2 bg-red-200 border rounded border-red-400'>{formState.message}</div>}
				<button
					type='submit'
					className='rounded p-2 bg-blue-200'
				>
					Create Snippet
				</button>
			</div>
		</form>
	);
}
