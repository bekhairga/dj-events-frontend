import Link from 'next/link';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import EventItem from '@/components/EventItem';
import Pagination from '@/components/Pagination';
const PER_PAGE = 5;
//this is being rendered on client;
export default function EventsPage({ events, page, total }) {
	return (
		<Layout>
			<h1>Events</h1>
			{events.length === 0 ? (
				<h3>No events to show</h3>
			) : (
				events.map((evt) => <EventItem key={evt.id} evt={evt} />)
			)}
			<Pagination page={page} total={total} PER_PAGE={PER_PAGE} />
		</Layout>
	);
}
//this is being rendered on server;
//below is a function that runs on serve time
export async function getServerSideProps({ query: { page = 1 } }) {
	const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;
	//getting total count of events
	const totalRes = await fetch(`${API_URL}/events/count`);
	const total = await totalRes.json();
	//getting all events
	const eventRes = await fetch(
		`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
	);
	const events = await eventRes.json();
	return {
		props: {
			events,
			page: +page,
			total: total,
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
