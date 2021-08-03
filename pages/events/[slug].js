import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { API_URL } from './../../config/index';
export default function EventPage({ evt }) {
	return (
		<Layout>
			<h1>{evt.name}</h1>
		</Layout>
	);
}
//it is not static
// export async function getServerSideProps({ query: { slug } }) {
// 	const res = await fetch(`${API_URL}/api/events/${slug}`);
// 	const events = await res.json();
// 	return {
// 		props: {
// 			evt: events[0],
// 		},
// 	};
// }

export async function getStaticPaths() {
	const res = await fetch(`${API_URL}/api/events`);
	const events = await res.json();
	const paths = events.map((evt) => {
		return {
			params: {
				slug: evt.slug,
			},
		};
	});
	return {
		paths,
		fallback: true,
	};
}

//it is static
export async function getStaticProps({ params: { slug } }) {
	const res = await fetch(`${API_URL}/api/events/${slug}`);
	const events = await res.json();
	return {
		props: {
			evt: events[0],
		},
		revalidate: 1,
	};
}
