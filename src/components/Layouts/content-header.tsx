import { roboto } from '@/lib/fonts';

export default function ContentHeader({ title }: { title: string }) {
	return (
		<header className="w-full flex justify-between items-center bg-(var(--content-background)) border-b border-gray-200 py-4 px-4 mb-8 z-10 cts-content-header">
			<h1 className={`${roboto.className} text-xl font-semibold text-(var(--foreground))`}>{title}</h1>
		</header>
	);
}