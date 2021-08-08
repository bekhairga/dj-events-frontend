import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { API_URL } from '@/config/index';
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState();
	const [error, setError] = useState(null);
	//register user
	const register = (user) => {
		console.log(user);
	};
	//login user
	const login = ({ email: identifier, password }) => {
		console.log(identifier, password);
	};
	//logout user
	const logout = () => {
		console.log('logout');
	};
	//check if user is logged in
	const checkUserLoggedIn = () => {
		console.log('Logged in');
	};

	return (
		<AuthContext.Provider value={{ user, error, register, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
