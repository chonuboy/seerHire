import Link from 'next/link';

export default function AddNewButton({title,url}:{title:string,url:string}) {
	return (
		<Link
			href={`/candidates/${url}`}
			className="flex h-8 items-center rounded-lg bg-blue-600 px-4 text-base text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
		>
			<span className="hidden md:block">{title}</span>{' '}
			<span className="md:hidden">+</span>
		</Link>
	);
}
