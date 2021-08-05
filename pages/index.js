import Link from 'next/link';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import EventItem from '@/components/EventItem';
//this is being rendered on client;
export default function HomePage({ events }) {
	return (
		<Layout>
			<h1>Upcoming events</h1>
			{events.length === 0 ? (
				<h3>No events to show</h3>
			) : (
				events.map((evt) => <EventItem key={evt.id} evt={evt} />)
			)}
			{events.length > 0 && (
				<Link href='/events'>
					<a className='btn btn-secondary'>View All Events</a>
				</Link>
			)}
		</Layout>
	);
}
//this is being rendered on server;
//below is a function that runs on serve time
// export async function getServerSideProps() {
// 	const res = await fetch(`${API_URL}/events`);
// 	const events = await res.json();
// 	return {
// 		props: {
// 			events: events.slice(0, 3),
// 		},
// 	};
// }
//below is a function that runs only at build time
export async function getStaticProps() {
	const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`);
	const events = await res.json();
	return {
		props: {
			events,
			//revalidate is when to rebuilt that page in a number of seconds when the props are changed
			revalidate: 1,
		},
	};
}
