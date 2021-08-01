import Link from 'next/link';
import Layout from '../components/Layout';
export default function AboutPage() {
	return (
		<Layout title='About DJ events'>
			<h1>About</h1>
			<Link href='/'>Home</Link>
			<p>This is an app to find the latest DJ and other music events</p>
			<p>Version: 1.0.0</p>
		</Layout>
	);
}
