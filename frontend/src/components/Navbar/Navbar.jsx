import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { useLanguage } from '../../context/LanguageContext'; // Import LanguageContext

const Navbar = ({ setShowLogin }) => {
    const [Menu, setMenu] = useState('Home');
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
    const { language, toggleLanguage } = useLanguage(); // Lấy ngôn ngữ từ context

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        navigate('/');
    };

    return (
        <div className='navbar'>
            <Link to='/'>
                <img src={assets.logo} alt='' className='logo' />
            </Link>
            <ul className='navbar-menu'>
                <Link
                    to='/'
                    onClick={() => setMenu('Home')}
                    className={Menu === 'Home' ? 'active' : ''}
                >
                    {language === 'en' ? 'Home' : 'Trang Chủ'}
                </Link>
                <a
                    href='#explore-menu'
                    onClick={() => setMenu('Menu')}
                    className={Menu === 'Menu' ? 'active' : ''}
                >
                    {language === 'en' ? 'Menu' : 'Thực Đơn'}
                </a>
                <a
                    href='#footer'
                    onClick={() => setMenu('Contact-us')}
                    className={Menu === 'Contact-us' ? 'active' : ''}
                >
                    {language === 'en' ? 'Contact us' : 'Liên Hệ'}
                </a>
            </ul>
            <div className='navbar-right'>
                <button onClick={toggleLanguage} className='language-toggle'>
                    {language === 'en' ? 'VN' : 'EN'}
                </button>
                <img src={assets.search_icon} alt='' />
                <div className='navbar-search-icon'>
                    <Link to='/cart'>
                        <img src={assets.basket_icon} alt='' />
                    </Link>
                    <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
                </div>
                {!token ? (
                    <button onClick={() => setShowLogin(true)}>Sign In</button>
                ) : (
                    <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt='' />
                        <ul className='nav-profile-dropdown'>
                            <li onClick={() => navigate('/myorders')}>
                                <img src={assets.bag_icon} alt='' />
                                <p>Orders</p>
                            </li>
                            <hr />
                            <li onClick={logout}>
                                <img src={assets.logout_icon} alt='' />
                                <p>Logout</p>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;