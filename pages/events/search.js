import qs from 'qs';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@config/index';
//this is being rendered on client;
export default function SearchPage({ events }) {
	const router = useRouter();
	return (
		<Layout title='Search Results'>
			<Link href='/events'>Go Back</Link>
			<h1>Search Results for {router.query.term}</h1>
			{events.length === 0 && <h3>No events to show</h3>}

			{events.map((evt) => (
				<EventItem key={evt.id} evt={evt} />
			))}
		</Layout>
	);
}
//this is being rendered on server;
//below is a function that runs on serve time
export async function getServerSideProps({ query: { term } }) {
	const query = qs.stringify({
		_where: {
			_or: [
				{ name_contains: term },
				{ performers_contains: term },
				{ description_contains: term },
				{ venue_contains: term },
				// { date_contains: term }, DON'T USE IT BECAUSE IT WILL GIVE ERROR IF STRING IS TERM
			],
		},
	});
	const res = await fetch(`${API_URL}/events?${query}`);
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
