import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets/images';
import { useState, useEffect } from 'react';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { faBagShopping, faSignIn, faSignOut } from '@fortawesome/free-solid-svg-icons';
import Search from '../Search';
import Image from '~/components/Image';
import Menu from '~/components/Popper/Menu';
import config from '~/config';
import { useDebounce } from '~/hooks';
import axios from 'axios';
const cx = classNames.bind(styles);
const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faSignIn} />,
        title: 'Đăng nhập',
        to: '/login',
    },
];

function Header() {
    const [cookies, setCookie, removeCookie] = useCookies(['name']);
    const [countShopping, setCountShopping] = useState([]);
    const [accountData, setAccountData] = useState([]);
    const debounced = useDebounce(countShopping, 500);
    let navigate = useNavigate();
    const removeCK = () => {
        removeCookie('name');
        window.location.reload();
    };

    useEffect(() => {
        if (cookies.name) {
            axios
                .post('http://26.87.217.216:8080/api/giohang/post', {
                    type: 'get',
                    data: { ID_TAIKHOAN: cookies.name.ID },
                })
                .then((res) => {
                    if ((res.data != 0) & (res.data != -1)) {
                        console.log(res.data);
                        setCountShopping(res.data);
                    }
                });

            axios
                .post('http://26.87.217.216:8080/api/taikhoan/post', {
                    type: 'get',
                    data: { ID_TAIKHOAN: cookies.name.ID },
                })
                .then((res) => {
                    if (res.data) {
                        setAccountData(res.data[0]);
                    }
                });
        }
    }, [debounced]);
    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: cookies.name
                ? cookies.name.STATUS === 'e3afed0047b08059d0fada10f400c1e5'
                    ? 'Đi tới trang Admin'
                    : 'Thông tin tài khoản'
                : '',
            to: cookies.name
                ? cookies.name.STATUS === 'e3afed0047b08059d0fada10f400c1e5'
                    ? `${config.routes.admin}`
                    : `/@${cookies.name.ID}`
                : '',
        },
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Đăng xuất',
            separate: true,
            to: '/',
            onClick: removeCK,
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <Link to="/" className={cx('logo_box')}>
                <Image src={images.logo} className={cx('logo')} />
            </Link>
            <Navbar />
            <div className={cx('actions')}>
                <Search />
                {cookies.name ? (
                    <>
                        <Tippy delay={[0, 50]} content="Giỏ hàng" placement="bottom">
                            <Link
                                to={cookies.name ? `/@${cookies.name.ID}/shopping-cart` : ''}
                                className={cx('action-btn')}
                            >
                                <FontAwesomeIcon icon={faBagShopping} />
                                <span className={cx('badge')}>{countShopping.length}</span>
                            </Link>
                        </Tippy>
                    </>
                ) : (
                    <></>
                )}
                <Menu items={cookies.name ? userMenu : MENU_ITEMS}>
                    {cookies.name ? (
                        <Image
                            className={cx('user-avatar')}
                            src={accountData.HINHANH !== null ? accountData.HINHANH : ''}
                            alt={accountData.FULLNAME}
                        />
                    ) : (
                        <button className={cx('account-btn')}>
                            <FontAwesomeIcon icon={faUser} />
                        </button>
                    )}
                </Menu>
            </div>
        </header>
    );
}

export default Header;
