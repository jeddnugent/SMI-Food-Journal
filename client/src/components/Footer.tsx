import "../styles/Footer.css";

function Footer(props: {
	mini: boolean;
}) {
	return props.mini ? (
		<footer>
			<div className="FooterLink">
				<a href="https://www.linkedin.com/in/jedd-nugent/" rel="noopener noreferrer">
					<img
						src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
						alt="LinkedIn"
						style={{ height: '20px', verticalAlign: 'middle', marginLeft: '8px', marginRight: '8px' }}
					/>
				</a>
				<a href="https://github.com/jeddnugent/SMI-Food-Journal" rel="noopener noreferrer">
					<img
						src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
						alt="GitHub"
						style={{ height: '20px', verticalAlign: 'middle' }}
					/>
				</a>
			</div>
		</footer>
	) : (
		<div>
			<footer>
				<div className="FooterLink">
					© {new Date().getFullYear()} Demo By Jedd Nugent <span />
					<a href="https://www.linkedin.com/in/jedd-nugent/" target="_blank" rel="noopener noreferrer">
						<img
							src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
							alt="LinkedIn"
							style={{ height: '20px', verticalAlign: 'middle', marginLeft: '8px', marginRight: '8px' }}
						/>
					</a>
					<a href="https://github.com/jeddnugent/SMI-Food-Journal" target="_blank" rel="noopener noreferrer">
						<img
							src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
							alt="GitHub"
							style={{ height: '20px', verticalAlign: 'middle' }}
						/>
					</a>
				</div>
			</footer>
		</div>
	);
}

export default Footer;
