import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/db';
import { deleteSnippet } from '@/actions';

interface SnippetShowPageProps {
	params: {
		id: string;
	};
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
	// Get to the DB and get the snippet where id === props.params.id
	// props.params.id comes through as a string,
	// so we need to parseInt it into an integer.
	const snippet = await db.snippet.findFirst({
		where: { id: parseInt(props.params.id) },
	});

	// If no snippet was returned from DB
	if (!snippet) {
		return notFound();
	}

	// Because we can't use an event handler in a server component,
	// we need to use a form to trigger the delete snippet action.
	//
	// Like in the snippetEditForm, we need to bind the snippet.id
	// to the deleteSnippet function so that it can be read in editSnippet.
	//
	// bind() is used to pre-build some values before the deleteSnippet function is called.
	//
	// We're adding the snippet.id to the deleteSnippet function.
	const deleteSnippetAction = deleteSnippet.bind(null, snippet.id);

	return (
		<div>
			<div className='flex m-4 justify-between items-center'>
				<h1 className='text-xl font-bold'>{snippet.title}</h1>
				<div className='flex gap-4'>
					<Link
						href={`/snippets/${snippet.id}/edit`}
						className='border p-2 bg-blue-200 rounded'
					>
						Edit
					</Link>
					<form action={deleteSnippetAction}>
						<button className='border p-2 rounded'>Delete</button>
					</form>
				</div>
			</div>
			<pre className='border p-2 rounded bg-gray-200 border-gray-200'>
				<code>{snippet.code}</code>
			</pre>
		</div>
	);
}

export async function generateStaticParams() {
	const snippets = await db.snippet.findMany();

	return snippets.map((snippet) => {
		return {
			id: snippet.id.toString(),
		};
	});
}
