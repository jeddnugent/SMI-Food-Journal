import { useState } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import { useNavigate } from 'react-router-dom';
import type { Credentials } from '../interfaces/Credentials';
import { login } from "../api/users";
import { useUser } from '../contexts/UserContext';
import "../styles/LoginSignUp.css";

function LoginSignUp() {
	const [action] = useState("Log in");
	const [creds, setCreds] = useState({
		username: "",
		password: "",
	});
	const { setUser } = useUser();
	const navigate = useNavigate();

	function handleCredentialsChanged(event: { target: { name: string; value: string; }; }) {
		const { name, value } = event.target;
		setCreds(currentCreds => {
			return ({ ...currentCreds, [name]: value });
		});
	}

	async function logInActioned() {
		//TODO: Add Error Handling for when credentials are incorrect
		const credentials: Credentials = creds;
		console.log("actioned credentials", credentials);
		const result = await login(credentials.username, credentials.password);
		console.log(result.data);
		setUser(result.data);
		navigate('/create-new-entry');
	}

	return (
		<div className='LoginSignUpContainer'>
			<div className="header">
				<img
					src="https://successfulminds.com.au/wp-content/uploads/2019/09/web-200.png"
					alt="SMI logo"
					style={{ height: 100 }}
				/>
				<div className="text">{action}</div>
				<div className="underline"></div>
			</div>
			<div className="inputs">
				<div className="input">
					<EmailIcon className='img' />
					<input type="email" name="username" id="username" placeholder='Email' onChange={handleCredentialsChanged} value={creds.username} />
				</div>
				<div className="input">
					<HttpsIcon className='img' />
					<input type="password" name="password" id="password" placeholder='Password' onChange={handleCredentialsChanged} value={creds.password} />
				</div>
			</div>
			<div className="submitContainer">
				<div className={action === "Sign Up" ? "submit-gray" : "submit"} onClick={logInActioned}>Login</div>
			</div>
		</div>
	);
}

export default LoginSignUp;