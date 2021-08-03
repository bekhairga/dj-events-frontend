import Link from 'next/link';
import Layout from '@/components/Layout';
import { API_URL } from '@config/index';
import EventItem from '@/components/EventItem';
//this is being rendered on client;
export default function EventsPage({ events }) {
	return (
		<Layout>
			<h1>Events</h1>
			{events.length === 0 ? (
				<h3>No events to show</h3>
			) : (
				events.map((evt) => <EventItem key={evt.id} evt={evt} />)
			)}
		</Layout>
	);
}
//this is being rendered on server;
//below is a function that runs on serve time
export async function getServerSideProps() {
	const res = await fetch(`${API_URL}/events?_sort=date:ASC`);
	const events = await res.json();
	return {
		props: {
			events,
		},
	};
}
//below is a function that runs only at build time
// export async function getStaticProps() {
// 	const res = await fetch(`${API_URL}/api/events`);
// 	const events = await res.json();
// 	return {
// 		props: {
// 			events,
// //revalidate is when to rebuilt that page in a number of seconds when the props are changed
// 			revalidate: 1,
// 		},
// 	};
// }
