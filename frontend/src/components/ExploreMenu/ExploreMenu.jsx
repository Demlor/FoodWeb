/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';
import { useLanguage } from '../../context/LanguageContext';

const ExploreMenu = ({ category, setCategory }) => {
    const menuRef = useRef(null);
    const { language } = useLanguage(); // Lấy ngôn ngữ từ context

    // Định nghĩa nội dung cho cả hai ngôn ngữ
    const content = {
        en: {
            title: "Explore our menu",
            description: "Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time."
        },
        vi: {
            title: "Khám Phá Thực Đơn Của Chúng Tôi",
            description: "Chọn từ một thực đơn đa dạng với nhiều món ăn ngon. Sứ mệnh của chúng tôi là thỏa mãn cơn thèm ăn của bạn và nâng cao trải nghiệm ẩm thực của bạn, từng bữa ăn ngon một."
        }
    };

    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>{content[language].title}</h1>
            <p className='explore-menu-text'>
                {content[language].description}
            </p>
            <div ref={menuRef} className='explore-menu-list'>
                {menu_list.map((item, index) => {
                    return (
                        <div
                            onClick={() =>
                                setCategory((prev) =>
                                    prev === item.menu_name ? 'All' : item.menu_name
                                )
                            }
                            key={index}
                            className='explore-menu-list-item'
                        >
                            <img
                                className={category === item.menu_name ? 'active' : ''}
                                src={item.menu_image}
                                alt={item.menu_name}
                            />
                            <p>{item.menu_name}</p>
                        </div>
                    );
                })}
            </div>
            <hr />
        </div>
    );
};

export default ExploreMenu;