import { type PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../contexts/UserContext";

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
	const { user, loading } = useUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (!user && !loading) {
			navigate("/login-signup", { replace: true });
		}
	}, [user, loading]);

	return children;
};