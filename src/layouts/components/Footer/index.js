import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapLocation, faMobile } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import config from '~/config';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function Footer() {
    const [navData, setnavData] = useState([]);
    useEffect(() => {
        getCourses();
    }, []);

    const getCourses = async () => {
        try {
            await axios
                .get('http://26.87.217.216:8080/api/theloai')
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
        <footer className={cx('wrapper')}>
            <div className={cx('grid', 'wide')}>
                <div className={cx('inner', 'row')}>
                    <div className={cx('brand', 'col', 'l-4')}>
                        <img src={images.logo} alt="Laptop" className={cx('logo')} />
                        <p className={cx('slogan')}>Shop Laptop số 1 Cần Thơ</p>
                    </div>
                    <div className={cx('quicklinks', 'col', 'l-4')}>
                        <h2 className={cx('quicklinks-heading')}>Quick Links</h2>
                        <ul className={cx('quicklink')}>
                            {navData != 0 ? (
                                navData.map((nav, index) => {
                                    return (
                                        <li className={cx('quicklink-item')} key={nav.ID_THELOAI}>
                                            <Link to={`/${nav.TENTHELOAI.toLowerCase()}`}>{nav.TENTHELOAI}</Link>
                                        </li>
                                    );
                                })
                            ) : (
                                <></>
                            )}
                        </ul>
                    </div>
                    <div className={cx('contacts', 'col', 'l-4')}>
                        <h2 className={cx('contacts-heading')}>Contact</h2>
                        <ul className={cx('contact')}>
                            <li className={cx('contact-item')}>
                                <FontAwesomeIcon icon={faMobile} className={cx('contact-logo')}></FontAwesomeIcon>
                                <p className={cx('contact-content')}>+84 928135322</p>
                            </li>
                            <li className={cx('contact-item')}>
                                <FontAwesomeIcon icon={faEnvelope} className={cx('contact-logo')}></FontAwesomeIcon>
                                <p className={cx('contact-content')}>ph.hoagkhoi@gmail.com</p>
                            </li>
                            <li className={cx('contact-item')}>
                                <FontAwesomeIcon icon={faMapLocation} className={cx('contact-logo')}></FontAwesomeIcon>
                                <p className={cx('contact-content')}>Vị Thanh, Hậu Giang</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={cx('row', 'copyright')}>
                    <div className={cx('col', 'l-6', 'copyright-text')}>
                        Copyright <span>&copy;</span> by Der. All right reserved
                    </div>
                    <div className={cx('col', 'l-6', 'copyright-link')}>
                        <div className={cx('copyright-contact')}>
                            <a href="https://www.instagram.com/ph.hoagkhoi/" target="_blank">
                                <FontAwesomeIcon icon={faInstagram} className={cx('copyright-logo')}></FontAwesomeIcon>
                            </a>
                            <a href="https://www.facebook.com/ph.hoagkhoi/" target="_blank">
                                <FontAwesomeIcon icon={faFacebook} className={cx('copyright-logo')}></FontAwesomeIcon>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
