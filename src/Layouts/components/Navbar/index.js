import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function Navbar() {
    const [navData, setnavData] = useState([]);
    useEffect(() => {
        getCourses();
    }, []);

    const getCourses = async () => {
        try {
            await axios
                .get('http://localhost:8080/api/theloai')
                .then(async (res) => {
                    setnavData(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <ul className={cx('navbar')}>
            <li className={cx('navbar-item')}>
                <Link className={cx('navbar-link')} to={config.routes.home}>
                    Trang chủ
                </Link>
            </li>
            <li className={cx('navbar-item')}>
                <Link className={cx('navbar-link')} to={config.routes.laptop}>
                    Laptop
                </Link>
            </li>
            {navData != 0 ? (
                navData.map((nav, index) => {
                    return (
                        <li className={cx('navbar-item')} key={nav.ID_THELOAI}>
                            <Link className={cx('navbar-link')} to={`/${nav.TENTHELOAI.toLowerCase()}`}>
                                {nav.TENTHELOAI}
                            </Link>
                        </li>
                    );
                })
            ) : (
                <></>
            )}
        </ul>
    );
}

export default Navbar;
