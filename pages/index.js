import Link from 'next/link';
import Layout from '@/components/layout';

export default function HomePage() {
	return (
		<Layout>
			<h1>Home</h1>
			<Link href='/about'>About</Link>
		</Layout>
	);
}
