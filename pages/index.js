import Link from 'next/link';
import Layout from '@/components/Layout';
import { API_URL } from '@config/index';
//this is being rendered on client;
export default function HomePage({ events }) {
	return (
		<Layout>
			<h1>Upcoming events</h1>
			<Link href='/about'>About</Link>
		</Layout>
	);
}
//this is being rendered on server;
//below is a function that runs on serve time
export async function getServerSideProps() {
	const res = await fetch(`${API_URL}/api/events`);
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
