import Link from 'next/link';
export default function HomePage() {
	return (
		<div className={''}>
			<h1>Home</h1>
			<Link href='/about'>About</Link>
		</div>
	);
}
