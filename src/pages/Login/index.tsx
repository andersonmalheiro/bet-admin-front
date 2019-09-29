import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import './style.css';
import logo from 'assets/img/trophy.svg';
import GradientContainer from 'components/GradientContainer';
import Auth from 'api/Auth';
import { errorHandler } from 'utils/error-handler';

const Login = () => {
	document.title = 'BetAdmin - Login';
	const [showpasswd, setShowPasswd] = useState(false);
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState('');
	const [passwd, setPasswd] = useState('');
	const [logged, setLogged] = useState(false);
	const togglePasswd = () => {
		setShowPasswd(!showpasswd);
	};

	const redirect = () => {
		return <Redirect to="/admin" />;
	};

	const authenticate = (e: any) => {
		e.preventDefault();
		const payload = {
			username: user,
			password: passwd
		};
		setLoading(true);
		Auth.login(payload)
			.then(res => {
				const { data } = res;
				if (data) {
					localStorage.setItem('access', data.access);
					localStorage.setItem('refresh', data.refresh);
				}
				setLoading(false);
				setLogged(true);
			})
			.catch(err => {
				setLoading(false);
				const { response } = err;
				errorHandler(response);
				setLogged(false);
			});
	};

	return (
		<GradientContainer>
			<div className="row justify-content-center">
				<div className="col-lg-6 col-md-8">
					<form onSubmit={e => authenticate(e)} className="login-card">
						<div className="logo">
							<img src={logo} alt="BetAdmin" />
							<span>BetAdmin</span>
						</div>
						<div className="form-group mb-4">
							<label htmlFor="user">Usuário</label>
							<input
								type="text"
								name="user"
								id="user"
								className="form-control"
								onChange={e => setUser(e.target.value)}
								required
							/>
						</div>
						<div className="form-group">
							<label htmlFor="passwd">Senha</label>
							<div className="input-group">
								<input
									type={showpasswd ? 'text' : 'password'}
									name="passwd"
									id="passwd"
									className="form-control"
									onChange={e => setPasswd(e.target.value)}
									required
									min={6}
									max={32}
								/>
								<div className="input-group-append">
									<span
										className="btn input-group-text"
										onClick={() => togglePasswd()}
									>
										<i
											className={showpasswd ? 'fas fa-eye-slash' : 'fas fa-eye'}
										/>
									</span>
								</div>
							</div>
						</div>
						<button
							className="btn btn-block btn-outline-dark my-5"
							disabled={loading}
							type="submit"
						>
							Entrar
							{loading ? <FaSpinner style={{ marginLeft: '10px' }} /> : ''}
						</button>
						<p className="text-center">
							Ainda não possui uma conta?
							<br />
							<Link to="/register" className="text-warning">
								Cadastre-se já!
							</Link>
						</p>
					</form>
				</div>
			</div>
			<ToastContainer />
			{logged ? <Redirect to="/admin" /> : ''}
		</GradientContainer>
	);
};

export default Login;
