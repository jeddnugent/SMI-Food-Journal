import { type PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../contexts/UserContext";

type ProtectedRouteProps = PropsWithChildren;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
	const user = useUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (user[0] === null) {
			navigate("/login-signup", { replace: true });
		}
	});

	return children;
};