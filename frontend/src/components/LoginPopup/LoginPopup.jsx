import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {
	const { url, setToken } = useContext(StoreContext);
	const [currState, setCurrState] = useState('Login');
	const [data, setData] = useState({
		name: '',
		email: '',
		password: '',
		newPassword: '',
		showPassword: false,
	});

	const onChangeHandler = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setData((prevData) => ({ ...prevData, [name]: value }));
	};

	const togglePasswordVisibility = () => {
		setData((prevState) => ({
			...prevState,
			showPassword: !prevState.showPassword,
		}));
	};

	const onLoginOrRegister = async (event) => {
		event.preventDefault();
		let newUrl =
			url + (currState === 'Login' ? '/api/user/Login' : '/api/user/Register');
		const response = await axios.post(newUrl, {
			name: data.name,
			email: data.email,
			password: data.password,
		});

		if (response.data.success) {
			setToken(response.data.token);
			localStorage.setItem('token', response.data.token);
			setShowLogin(false);
		} else {
			alert(response.data.message);
		}
	};

	const onChangePassword = async (event) => {
		event.preventDefault();
		const response = await axios.post(url + '/api/user/changePassword', {
			email: data.email,
			password: data.password,
			newPassword: data.newPassword,
		});

		if (response.data.success) {
			alert('Password changed successfully!');
			setCurrState('Login'); // Optionally reset to login state
		} else {
			alert(response.data.message);
		}
	};

	return (
		<div className='login-popup'>
			<form
				onSubmit={
					currState === 'Change Password' ? onChangePassword : onLoginOrRegister
				}
				className='login-popup-container'
			>
				<div className='login-popup-title'>
					<h2>{currState}</h2>
					<img
						onClick={() => setShowLogin(false)}
						src={assets.cross_icon}
						alt='close'
					/>
				</div>
				<div className='login-popup-inputs'>
					{currState === 'Change Password' ? (
						<>
							<input
								name='email'
								onChange={onChangeHandler}
								value={data.email}
								type='email'
								placeholder='Your Email'
								required
							/>
							<input
								name='password'
								onChange={onChangeHandler}
								value={data.password}
								type='password'
								placeholder='Current Password'
								required
							/>
							<input
								name='newPassword'
								onChange={onChangeHandler}
								value={data.newPassword}
								type='password'
								placeholder='New Password'
								required
							/>
						</>
					) : currState === 'Login' ? (
						<>
							<input
								name='email'
								onChange={onChangeHandler}
								value={data.email}
								type='email'
								placeholder='Your Email'
								required
							/>
							<div className='password-input'>
								<input
									name='password'
									onChange={onChangeHandler}
									value={data.password}
									type={data.showPassword ? 'text' : 'password'}
									placeholder='Password'
									required
								/>
								<button type='button' onClick={togglePasswordVisibility}>
									{data.showPassword ? 'Hide' : 'Show'}
								</button>
							</div>
						</>
					) : (
						<>
							<input
								name='name'
								onChange={onChangeHandler}
								value={data.name}
								type='text'
								placeholder='Your Name'
								required
							/>
							<input
								name='email'
								onChange={onChangeHandler}
								value={data.email}
								type='email'
								placeholder='Your Email'
								required
							/>
							<div className='password-input'>
								<input
									name='password'
									onChange={onChangeHandler}
									value={data.password}
									type={data.showPassword ? 'text' : 'password'}
									placeholder='Password'
									required
								/>
								<button type='button' onClick={togglePasswordVisibility}>
									{data.showPassword ? 'Hide' : 'Show'}
								</button>
							</div>
						</>
					)}
				</div>
				<button type='submit'>
					{currState === 'Sign Up'
						? 'Create Account'
						: currState === 'Change Password'
						? 'Change Password'
						: 'Login'}
				</button>
				<div className='login-popup-condition'>
					<input type='checkbox' required />
					<p>By Continuing, I agree to the terms of use & privacy policy</p>
				</div>
				{currState === 'Login' ? (
					<>
						<p>
							Change your password{' '}
							<span onClick={() => setCurrState('Change Password')}>
								Click Here
							</span>
						</p>
						<p>
							Create a new Account?{' '}
							<span onClick={() => setCurrState('Sign Up')}>Click Here</span>
						</p>
					</>
				) : (
					<p>
						Already have an Account?{' '}
						<span onClick={() => setCurrState('Login')}>Login Here</span>
					</p>
				)}
			</form>
		</div>
	);
};

export default LoginPopup;
