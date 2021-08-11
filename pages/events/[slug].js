import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '@/components/Layout';
import { API_URL } from './../../config/index';
import styles from '@/styles/Event.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/router';
import EventMap from '@/components/EventMap';
export default function EventPage({ evt }) {
	const router = useRouter();

	return (
		<Layout>
			<div className={styles.event}>
				{/* <div className={styles.controls}>
					<Link href={`/events/edit/${evt.id}`}>
						<a>
							<FaPencilAlt />
							Edit Event
						</a>
					</Link>
					<a href='#' className={styles.delete} onClick={deleteEvent}>
						<FaTimes />
						Delete
					</a>
				</div> */}
				<span>
					{new Date(evt.date).toLocaleDateString('en-US')} at {evt.time}
				</span>
				<h1>{evt.name}</h1>
				<ToastContainer />
				{evt.image && (
					<div className={styles.image}>
						<Image
							src={
								evt.image.formats.large
									? evt.image.formats.large.url
									: evt.image.formats.medium
									? evt.image.formats.medium.url
									: evt.image.formats.small
									? evt.image.formats.small.url
									: evt.image.formats.thumbnail.url
							}
							width={960}
							height={600}
						/>
					</div>
				)}
				<h3>Performers: </h3>
				<p>{evt.performers}</p>
				<h3>Description</h3>
				<p>{evt.description}</p>
				<h3>Venue: {evt.venue}</h3>
				<p>{evt.address}</p>
				<EventMap evt={evt} />
				<Link href={'/events'}>
					<a className={styles.back}>{'>'} Go Back</a>
				</Link>
			</div>
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
	const res = await fetch(`${API_URL}/events`);
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
	const res = await fetch(`${API_URL}/events?slug=${slug}`);
	const events = await res.json();
	return {
		props: {
			evt: events[0],
		},
		revalidate: 1,
	};
}
