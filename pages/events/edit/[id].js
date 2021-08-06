import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '@/components/Layout';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { API_URL } from '@/config/index';
import styles from '@/styles/Form.module.css';
import moment from 'moment';
import Image from 'next/image';
import { FaImage } from 'react-icons/fa';
import Modal from '@/components/Modal';
export default function EditEventPage({ evt }) {
	const [values, setValues] = useState({
		name: evt.name,
		performers: evt.performers,
		venue: evt.venue,
		address: evt.address,
		date: evt.date,
		time: evt.time,
		description: evt.description,
	});

	const [imagePreview, setImagePreview] = useState(
		evt.image ? evt.image.formats.thumbnail.url : null
	);
	const [showModal, setShowModal] = useState(false);

	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const hasEmptyFields = Object.values(values).some(
			(element) => element === ''
		);
		if (hasEmptyFields) {
			toast.error('Please fill all fields');
			return;
		}
		const res = await fetch(`${API_URL}/events/${evt.id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(values),
		});
		if (!res.ok) {
			toast.error('Something went wrong');
			return;
		} else {
			const evt = await res.json();
			router.push(`/events/${evt.slug}`);
		}
	};
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};
	return (
		<Layout title='Edit Event'>
			<Link href='/events'>Go Back</Link>
			<h1>Edit Event</h1>
			<ToastContainer />
			<form onSubmit={handleSubmit} className={styles.form}>
				<div className={styles.grid}>
					<div>
						<label htmlFor='name'>Event name: </label>
						<input
							type='text'
							id='name'
							name='name'
							value={values.name}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='performers'>Event performers: </label>
						<input
							type='text'
							id='performers'
							name='performers'
							value={values.performers}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='venue'>Event venue: </label>
						<input
							type='text'
							id='venue'
							name='venue'
							value={values.venue}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='address'>Event address: </label>
						<input
							type='text'
							id='address'
							name='address'
							value={values.address}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='date'>Event date: </label>
						<input
							type='date'
							id='date'
							name='date'
							value={moment(values.date).format('yyyy-MM-DD')}
							onChange={handleInputChange}
						/>
					</div>
					<div>
						<label htmlFor='time'>Event time: </label>
						<input
							type='text'
							id='time'
							name='time'
							value={values.time}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				<div>
					<label htmlFor='description'>Enter description</label>
					<textarea
						type='text'
						name='description'
						id='description'
						value={values.description}
						onChange={handleInputChange}
					/>
				</div>
				<input type='submit' value='Update Event' className='btn' />
			</form>
			<h2>Event Image</h2>
			{imagePreview ? (
				<Image src={imagePreview} height={100} width={170} />
			) : (
				<div>
					<p>No image uploaded</p>
				</div>
			)}
			<div>
				<button
					className='btn btn-secondary'
					onClick={() => setShowModal(true)}
				>
					<FaImage /> Set Image
				</button>
			</div>
			<Modal show={showModal} onClose={() => setShowModal(false)}>
				IMAGE UPLOAD
			</Modal>
		</Layout>
	);
}

export async function getServerSideProps({ params: { id } }) {
	const res = await fetch(`${API_URL}/events/${id}`);
	const evt = await res.json();
	return {
		props: {
			evt,
		},
	};
}
