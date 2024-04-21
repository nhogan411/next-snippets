'use server';

import { db } from '@/db';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function createSnippet(formState: {message: string}, formData: FormData) {
	// Check the user's inputs and ensure they're valid
	const title = formData.get('title');
	const code = formData.get('code');

	// Form 'Title' validation
	// If the title is not a string or is less than 3 characters long,
	// return error message.
	if ( typeof title !== 'string' || title.length < 3 ) {
		return { message: 'Title must be at least 3 characters long.' };
	}

	// Form 'Code' validation
	// If the code is not a string or is less than 10 characters long,
	// return error message.
	if ( typeof code !== 'string' || code.length < 10 ) {
		return { message: 'Code must be at least 10 characters long.' };
	}

	// Create a new record in the DB
	// Assign the formData.get('title') to the title field
	// Assign the formData.get('code') to the code field
	const snippet = await db.snippet.create({
		data: {
			title: title,
			code: code,
		},
	});

	// Bust the homepage cache
	// We've created a new snippet, so we should update the homepage to reflect that
	revalidatePath('/');

	// Redirect the user back to the root route
	redirect('/');
}

export async function deleteSnippet(id: number) {
	// Delete the record where snippet ID in the DB matches the id argument
	await db.snippet.delete({
		where: {
			id: id,
		},
	});

	// Bust the homepage cache
	// We've deleted a snippet, so we should update the homepage to reflect that
	revalidatePath('/');

	// Redirect the user back to the root route
	redirect('/');
}

export async function editSnippet(id: number, code: string, formData: FormData) {
	// Check the user's inputs and ensure they're valid
	const title = formData.get('title') as string;

	// Edit the record where snippet ID in the DB matches the id argument
	// Assign the formData.get('title') to the title field
	// Assign the code parameter to the code field (not an input on the edit form)
	const snippet = await db.snippet.update({
		where: {
			id: id,
		},
		data: {
			title: title,
			code: code,
		},
	});

	// Bust the homepage cache
	// This is only necessary because we allow for the user to change the name of the snippet
	revalidatePath('/');
	// We're caching the snippet view page, so we need to bust that cache afte editing the snippet
	revalidatePath(`/snippets/${id}`);

	// Redirect the user back to the view snippet route
	redirect(`/snippets/${id}`);
}
