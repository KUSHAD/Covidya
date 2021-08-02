import { createContext, useState, useContext } from "react";
const Auth = createContext();
export function AuthProvider({ children }) {
	const [auth, setAuth] = useState();
	function setUser(data) {
		return setAuth(data);
	}
	const value = {
		auth,
		setUser,
	};
	return <Auth.Provider value={value}>{children}</Auth.Provider>;
}
export function useAuthUser() {
	return useContext(Auth);
}
