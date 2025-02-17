import React, { useContext, useState } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
	const { food_list, cartItems, addToCart, removeFromCart,url } =
		useContext(StoreContext);
	const [selectedFood, setSelectedFood] = useState(null); // Track the selected food item
	const [showModal, setShowModal] = useState(false); // Track whether the modal is visible

	const handleFoodClick = (item) => {
		setSelectedFood(item);
		setShowModal(true); // Show modal with selected food details
	};

	const handleCloseModal = () => {
		setShowModal(false); // Close the modal
	};

	return (
		<div className='food-display' id='food-display'>
			<h2>Top dishes near you</h2>
			<div className='food-display-list'>
				{food_list.map((item, index) => {
					if (category === 'All' || category === item.category) {
						return (
							<FoodItem
								key={index}
								id={item._id}
								name={item.name}
								description={item.description}
								price={item.price}
								image={item.image}
								onClick={() => handleFoodClick(item)} // Handle click to open the modal
							/>
						);
					}
				})}
			</div>

			{showModal && selectedFood && (
				<div className='food-modal-overlay' onClick={handleCloseModal}>
					<div className='food-modal' onClick={(e) => e.stopPropagation()}>
						<button className='close-btn' onClick={handleCloseModal}>
							X
						</button>
						<div className='food-modal-content'>
							{/* Hiển thị thông tin sản phẩm */}
							<img
								src={url+"/images/"+selectedFood.image}
								alt={selectedFood.name}
								className='food-modal-img'
							/>
							<div className='food-modal-details'>
								<h3>{selectedFood.name}</h3>
								<p>{selectedFood.description}</p>
								<p>Price: ${selectedFood.price}</p>
								{/* Bộ đếm tăng/giảm số lượng */}
								<div className='food-modal-counter'>
									<label>Quantity:</label>
									{!cartItems[selectedFood._id] ? (
										<img
											className='add'
											onClick={(e) => {
												e.stopPropagation(); // Ngăn sự kiện click ảnh hưởng đến modal
												addToCart(selectedFood._id);
											}}
											src={assets.add_icon_white}
											alt='Add'
										/>
									) : (
										<div className='food-modal-quantity'>
											<img
												onClick={(e) => {
													e.stopPropagation(); // Ngăn sự kiện click ảnh hưởng đến modal
													removeFromCart(selectedFood._id);
												}}
												src={assets.remove_icon_red}
												alt='Remove'
											/>
											<p>{cartItems[selectedFood._id]}</p>
											<img
												onClick={(e) => {
													e.stopPropagation(); // Ngăn sự kiện click ảnh hưởng đến modal
													addToCart(selectedFood._id);
												}}
												src={assets.add_icon_green}
												alt='Add'
											/>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default FoodDisplay;
