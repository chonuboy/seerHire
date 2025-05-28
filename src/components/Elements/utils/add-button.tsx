import Link from 'next/link';

export default function AddNewButton({title,url}:{title:string,url:string}) {
	return (
		<Link
			href={`/candidates/${url}`}
			className="bg-blue-500 text-white px-4 py-1 rounded-md border-2 border-blue-500 hover:bg-white hover:text-blue-500 hover:shadow-lg transition duration-200 box-border"
		>
			<span className="hidden md:block">{title}</span>{' '}
			<span className="md:hidden">+</span>
		</Link>
	);
}
