import React from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({ url }) => {
	const [image, setImage] = useState(null);
	const [data, setData] = useState({
		name: '',
		description: '',
		category: 'Burger',
		price: '',
	});

	const onChangeHandler = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setData((data) => ({ ...data, [name]: value }));
	};

	const onSubmitHandler = async (event) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append('name', data.name);
		formData.append('description', data.description);
		formData.append('category', data.category);
		formData.append('price', Number(data.price));
		formData.append('image', image);
		const response = await axios.post(`${url}/api/food/add`, formData);
		if (response.data.success) {
			setData({
				name: '',
				description: '',
				category: 'Burger',
				price: '',
			});
			setImage(false);
			toast.success(response.data.message);
		} else {
			toast.error('Error adding product');
		}
	};

	return (
		<div className='add'>
			<form className='flex-col' onSubmit={onSubmitHandler}>
				<div className='add-img-upload flex-col'>
					<p>Upload Image</p>
					<label htmlFor='image'>
						<img
							src={image ? URL.createObjectURL(image) : assets.upload_area}
							alt=''
						/>
					</label>
					<input
						onChange={(e) => setImage(e.target.files[0])}
						type='file'
						id='image'
						hidden
						required
					/>
				</div>
				<div className='add-product-name flex-col'>
					<p>Product Name</p>
					<input
						onChange={onChangeHandler}
						value={data.name}
						type='text'
						name='name'
						placeholder='Add name'
					/>
				</div>
				<div className='add-product-description flex-col'>
					<p>Product Description</p>
					<textarea
						onChange={onChangeHandler}
						value={data.description}
						name='description'
						rows='6'
						placeholder='Add description'
						required
					></textarea>
				</div>
				<div className='add-category-price'>
					<div className='add-category flex-col'>
						<p>Product Category</p>
						<select onChange={onChangeHandler} name='category'>
							<option value='Burger'>Burger</option>
							<option value='Combo'>Combo</option>
							<option value='Fried Chiken'>Fried Chiken</option>
							<option value='King Rice'>King Rice</option>
							<option value='Pasta'>Pasta</option>
							<option value='Happy Snacks'>Happy Snacks</option>
							<option value='Drink'>Drink</option>
							<option value='Dessert'>Dessert</option>
						</select>
					</div>
					<div className='add-price flex-col'>
						<p>Product Price</p>
						<input
							onChange={onChangeHandler}
							value={data.price}
							type='Number'
							name='price'
							placeholder='USD Price'
						/>
					</div>
				</div>
				<button type='submit' className='add-btn'>
					Add
				</button>
			</form>
		</div>
	);
};

export default Add;
