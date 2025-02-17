import './Header.css';
import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext'; // Import LanguageContext

const Header = () => {
    const [menu, setMenu] = useState('Home');
    const { language } = useLanguage(); // Lấy ngôn ngữ từ context
    
    const content = {
        en: {
            title: "Order your favorite food here",
            description: "Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.",
            buttonText: "View Menu"
        },
        vi: {
            title: "Đặt món ăn yêu thích của bạn tại đây",
            description: "Chọn từ một thực đơn đa dạng với nhiều món ăn ngon được chế biến từ nguyên liệu tốt nhất và tay nghề ẩm thực. Sứ mệnh của chúng tôi là thỏa mãn cơn thèm ăn của bạn và nâng cao trải nghiệm ẩm thực của bạn, từng bữa ăn ngon một.",
            buttonText: "Xem Thực Đơn"
        }
    };

    return (
        <div className='header'>
            <div className='header-contents'>
                <h2>{content[language].title}</h2>
                <p>{content[language].description}</p>
                <button>
                    <a
                        href='#explore-menu'
                        onClick={() => setMenu('Menu')}
                        className={menu === 'Menu' ? 'active' : ''}
                    >
                        {content[language].buttonText}
                    </a>
                </button>
            </div>
        </div>
    );
};

export default Header;