import { notFound } from 'next/navigation';
import { db } from '@/db';
import SnippetEditForm from '@/components/snippetEditForm';

interface SnippetEditPageProps {
	params: {
		id: string;
	};
}

export default async function SnippetEditPage(props: SnippetEditPageProps) {
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

	return <SnippetEditForm snippet={snippet} />;
}
