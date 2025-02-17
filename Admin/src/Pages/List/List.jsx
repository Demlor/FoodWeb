import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url }) => {
	const [list, setList] = useState([]);
	const [formData, setFormData] = useState({ name: '', category: '', price: '' });
	const [editingId, setEditingId] = useState(null);

	const fetchList = async () => {
		const response = await axios.get(`${url}/api/food/list`);
		console.log(response.data);
		if (response.data.success) {
			setList(response.data.data);
		} else {
			toast.error('Error fetching food list');
		}
	};

	const editFood = async (foodId, updatedData) => {
		const response = await axios.post(`${url}/api/food/edit`, { id: foodId, ...updatedData });
		await fetchList();
		if (response.data.success) {
			toast.success(response.data.message);
		} else {
			toast.error('Error editing food');
		}
	};

	const handleEditClick = (food) => {
		setFormData({ name: food.name, category: food.category, price: food.price });
		setEditingId(food._id);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		editFood(editingId, formData);
		setEditingId(null);
		setFormData({ name: '', category: '', price: '' });
	};

	const removeFood = async (foodId) => {
		const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
		await fetchList();
		if (response.data.success) {
			toast.success(response.data.message);
		} else {
			toast.error('Error deleting food');
		}
	};

	useEffect(() => {
		fetchList();
	}, []);

	return (
		<div className='list add flex-col'>
			<p className='text_list'>All List</p>
			{editingId && (
				<form onSubmit={handleFormSubmit} className='edit-form'>
					<input
						type='text'
						name='name'
						value={formData.name}
						onChange={handleInputChange}
						placeholder='Name'
					/>
					<input
						type='text'
						name='category'
						value={formData.category}
						onChange={handleInputChange}
						placeholder='Category'
					/>
					<input
						type='text'
						name='price'
						value={formData.price}
						onChange={handleInputChange}
						placeholder='Price'
					/>
					<button type='submit' className='save-btn'>Save</button>
				</form>
			)}
			<div className='list-table'>
				<div className='list-table-format title'>
					<b>Image</b>
					<b>Name</b>
					<b>Category</b>
					<b>Price</b>
					<b>Act</b>
				</div>
				{list.map((item, index) => {
					return (
						<div key={index} className='list-table-format'>
							<img src={`${url}/images/${item.image}`} alt='' />
							<p>{item.name}</p>
							<p>{item.category}</p>
							<p>{item.price}</p>
							<div className='list-table-format-act'>
								<p onClick={() => removeFood(item._id)} className='btn'>
									x
								</p>
								<p onClick={() => handleEditClick(item)} className='btn'>
									Edit
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default List;
