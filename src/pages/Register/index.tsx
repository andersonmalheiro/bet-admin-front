import * as React from 'react';
import 'pages/main-style.css';
import logo from 'assets/img/trophy.svg';
import GradientContainer from 'components/GradientContainer';
import Form from 'components/Form';
import { InputAttribs } from 'components/Input';
import Auth from 'api/Auth';
import { errorHandler } from 'utils/error-handler';
import { ToastContainer, toast } from 'react-toastify';
interface Props {}

const Register = () => {
	const config: InputAttribs[] = [
		{
			id: 'first_name',
			name: 'first_name',
			type: 'text',
			label: 'Nome',
			placeholder: 'Seu nome...',
			validators: {
				required: true,
				minLength: 3,
				maxLength: 50
			},
			stylingConfigs: {
				inputClass: 'form-control',
				wrapperClass: 'form-group'
			}
		},
		{
			id: 'username',
			name: 'username',
			type: 'text',
			label: 'Nome de usuário',
			placeholder: 'Seu nome de usuário na aplicação...',
			validators: {
				required: true,
				minLength: 3,
				maxLength: 50
			},
			stylingConfigs: {
				inputClass: 'form-control',
				wrapperClass: 'form-group'
			}
		},
		{
			id: 'email',
			name: 'email',
			type: 'email',
			label: 'E-mail',
			placeholder: 'Seu e-mail...',
			validators: {
				required: true,
				minLength: 3,
				maxLength: 50
			},
			stylingConfigs: {
				inputClass: 'form-control',
				wrapperClass: 'form-group'
			}
		},
		{
			id: 'password',
			name: 'password',
			type: 'password',
			label: 'Senha',
			placeholder: 'Digite sua senha...',
			validators: {
				required: true,
				minLength: 6,
				maxLength: 32
			},
			stylingConfigs: {
				inputClass: 'form-control',
				wrapperClass: 'form-group'
			}
		}
	];

	const register = (e: any, data: any) => {
		e.preventDefault();
		Auth.register(data)
			.then(res => {
				toast.success('Cadastrado com sucesso');
			})
			.catch(err => {
				const { response } = err;
				errorHandler(response);
			});
	};

	return (
		<GradientContainer>
			<div className="row justify-content-center">
				<div className="col-lg-6 col-md-10">
					<div>
						<div className="login-card">
							<div className="logo">
								<img src={logo} alt="BetAdmin" />
								<span>BetAdmin</span>
							</div>
							<h3 className="text-center">Cadastre-se</h3>
							<Form
								inputs={config}
								submit={register}
								submitText="Cadastrar"
								submitClass="btn btn-outline-dark btn-block mt-5"
							/>
						</div>
					</div>
				</div>
			</div>
			<ToastContainer />
		</GradientContainer>
	);
};

export default Register;
