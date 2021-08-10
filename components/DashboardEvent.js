import styles from '@/styles/DashboardEvent.module.css';
import Link from 'next/link';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
export default function DashboardEvent({ evt, deleteEvent }) {
	const handleDelete = () => {
		deleteEvent(evt.id);
	};
	return (
		<div className={styles.event}>
			<h4>
				<Link href={`/events/${evt.slug}`}>
					<a>{evt.name}</a>
				</Link>
			</h4>
			<Link href={`/events/edit/${evt.id}`}>
				<a className={styles.edit}>
					<FaPencilAlt /> <span>Edit Event</span>
				</a>
			</Link>

			<a href='#' className={styles.delete} onClick={() => handleDelete()}>
				<FaPencilAlt /> <span>Delete Event</span>
			</a>
		</div>
	);
}
