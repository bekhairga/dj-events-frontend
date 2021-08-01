import { useRouter } from 'next/router';
export default function EventPage() {
	const router = useRouter();
	console.log(router);
	return (
		<div>
			<h1>Event-Page</h1>
			<p>{router.query.slug}</p>
			<button onClick={() => router.push('/')}>Redirect to HomePage</button>
		</div>
	);
}
