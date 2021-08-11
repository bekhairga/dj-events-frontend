import { API_URL } from '@/config/index';
import cookie from 'cookie';
import { parseCookies } from '@/helpers/index';
export default async (req, res) => {
	if (req.method === 'GET') {
		if (!req.headers.cookie) {
			res.status(403).json('Not authorized');
			return;
		}
		const { token } = parseCookies(req);
		const strapiRes = await fetch(`${API_URL}/users/me`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const user = await strapiRes.json();
		if (strapiRes.ok) {
			res.status(200).json(user);
		} else {
			res.status(403).json('User forbidden');
		}
	} else {
		res.setHeader('Allow', ['GET']);
		res.status(405).json({ message: `Method ${req.method} cannot be allowed` });
	}
};
