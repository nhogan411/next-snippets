'use client';

import { useState } from 'react';
import type { Snippet } from '@prisma/client';
import Editor from '@monaco-editor/react';
import { editSnippet } from '@/actions';

interface SnippetEditFormProps {
	snippet: Snippet;
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps, submitHandler: any) {
	const [snippetTitle, setSnippetTitle] = useState(snippet.title);
	const [snippetCode, setSnippetCode] = useState(snippet.code);

	// When the title input changes, update the snippetTitle state so it can be
	// sent with formData to server on submit.
	const snippetTitleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSnippetTitle(event.target.value);
	};

	// When the code input changes, update the snippetCode state so it can be
	// sent to server on submit.
	const handleEditorChange = (value: string = '') => {
		setSnippetCode(value);
	};

	// Need to bind the snippetCode state to the editSnippet action so that
	// it can be read in editSnippet.
	// bind() is used to pre-build some values before the editSnippet function is called.
	//
	// We're adding the snippet.id and snippetCode to the editSnippet function,
	// which, when it's called, will also include the formData.
	const editSnippetAction = editSnippet.bind(null, snippet.id, snippetCode);

	return (
		<form action={editSnippetAction}>
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
						// When the field changes, run the snippetTitleChangeHandler function.
						onChange={snippetTitleChangeHandler}
						// Set the value of the input to the snippetTitle state.
						// This ensures the updates value of the input is submitted with formData.
						value={snippetTitle}
					/>
				</div>

				<div className='flex gap-4'>
					<label
						className='w-12'
						htmlFor='code'
					>
						Code
					</label>

					<Editor
						height='40vh'
						defaultLanguage='javascript'
						defaultValue={snippet.code}
						theme='vs-dark'
						options={{
							minimap: { enabled: false },
							scrollBeyondLastLine: false,
							stickyScroll: { enabled: true },
							tabSize: 2,
							insertSpaces: true,
						}}
						// When the code changes, run the handleEditorChange function.
						onChange={handleEditorChange}
					/>
				</div>
				<button
					type='submit'
					className='rounded p-2 bg-blue-200'
				>
					Save Snippet
				</button>
			</div>
		</form>
	);
}
