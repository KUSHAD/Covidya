import { Redirect, Route } from "react-router-dom";
import { useAuthUser } from "../context/Auth";

export default function AuthRoute({ component: Component, rest }) {
	const { auth } = useAuthUser();
	return (
		<Route
			{...rest}
			render={(props) =>
				auth ? <Component {...props} /> : <Redirect to='/blogs' />
			}
		/>
	);
}
