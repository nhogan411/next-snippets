import { db } from '@/db';
import Link from 'next/link';

export default async function Home() {
	// Get an array of snippet objects from the DB
	const snippets = await db.snippet.findMany();

	// Create a div with the snippet.id as key and snippet.title as the h2 content
	// for each snippet in the array.
	const renderedSnippets = snippets.map((snippet) => {
		return (
			<Link
				key={snippet.id}
				href={`/snippets/${snippet.id}`}
				className='flex justify-between items-center p-2 border rounded '
			>
				<div>{snippet.title}</div>
				<div>View</div>
			</Link>
		);
	});

	return (
		<div>
			<div className='flex justify-between m-2 items-center'>
				<h1 className='text-xl font-bold'>Snippets</h1>
				<Link
					href='/snippets/new'
					className='border p-2 bg-blue-200 rounded'
				>
					New Snippet
				</Link>
			</div>
			<div className='flex flex-col gap-2'>{renderedSnippets}</div>
		</div>
	);
}
