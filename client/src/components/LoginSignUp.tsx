import { useState } from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage, type AuthProvider } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import { login } from "../api/users"
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import PersonIcon from '@mui/icons-material/Person';
import "../styles/LoginSignUp.css";



// const BRANDING = {
// 	logo: (
// 		<img
// 			src="https://successfulminds.com.au/wp-content/uploads/2019/09/web-200.png"
// 			alt="SMI logo"
// 			style={{ height: 100 }}
// 		/>
// 	),
// 	title: 'SMI Food Journal',
// };





function LoginSignUp() {
	const theme = useTheme();
	const signIn: (provider: AuthProvider) => void = async (provider) => {
		console.log(provider)
		console.log(provider.name)
	};

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [action, setAction] = useState("Sign Up")

	const providers = [{ id: 'credentials', name: 'Email and Password' }];


	return (
		// preview-start
		<div className='container'>
			<div className="header">
				<div className="text">{action}</div>
				<div className="underline"></div>
			</div>
			<div className="inputs">
				{action === "Login" ? <div></div> : 
				<div className="input">
					<PersonIcon className='img' />
					<input type="text" name="name" id="name" placeholder='Name' />
				</div>}
				<div className="input">
					<EmailIcon className='img' />
					<input type="email" name="email" id="email" placeholder='Email' />
				</div>
				<div className="input">
					<HttpsIcon className='img' />
					<input type="password" name="password" id="password" placeholder='Password' />
				</div>
			</div>
			{action === "Sign Up" ? <div></div> : 
			<div className="forgotPassword">Lost Password <span>Click Here!</span></div>}
			<div className="submitContainer">
				<div className={action === "Login" ? "submit-gray" : "submit"} onClick={() => { setAction("Sign Up") }}>Sign Up</div>
				<div className={action === "Sign Up" ? "submit-gray" : "submit"} onClick={() => { setAction("Login") }}>Login</div>
			</div>
		</div>
	);
}


export default LoginSignUp;