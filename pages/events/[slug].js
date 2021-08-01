import { useRouter } from 'next/router';
import Layout from '../components/Layout';
export default function EventPage() {
	const router = useRouter();
	console.log(router);
	return (
		<Layout>
			<h1>Event-Page</h1>
			<p>{router.query.slug}</p>
			<button onClick={() => router.push('/')}>Redirect to HomePage</button>
		</Layout>
	);
}
