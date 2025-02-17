import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import './UserList.css';
const UserList = ({ url }) => {
	const [list, setList] = useState([]);

	//lay danh sach user
	const fetchUserList = async () => {
		const response = await axios.get(`${url}/api/user/userList`);
		console.log(response.data);
		if (response.data.success) {
			setList(response.data.data);
		} else {
			toast.error('Error fetching Userlist');
		}
	};

	useEffect(() => {
		fetchUserList();
	}, []);

	//xoa user
	const Userremove = async (userId) => {
		const response = await axios.post(`${url}/api/user/Userremove`, {
			id: userId,
		});
		await fetchUserList();
		if (response.data.success) {
			toast.success(response.data.message);
		} else {
			toast.error('Error deleting user');
		}
	};
	return (
		<div className='list-user-table'>
			<div className='list-user-table-format title'>
				<b>Name</b>
				<b>Email</b>
				<b>Action</b>
			</div>
			{list.map((user) => {
				return (
					<div key={user._id} className='list-user-table-format'>
						<p>{user.name}</p>
						<p>{user.email}</p>
						<div className='list-user-act'>
							<p onClick={() => Userremove(user._id)}>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='16'
									height='16'
									fill='currentColor'
									className='bi bi-trash'
									viewBox='0 0 16 16'
								>
									<path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z' />
									<path d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z' />
								</svg>
							</p>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default UserList;
