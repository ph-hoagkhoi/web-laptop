import { faAddressCard, faClockRotateLeft, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './SidebarProfile.module.scss';
import { faCreditCard } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function SidebarProfile() {
    return (
        <div className={cx('col', 'l-4')}>
            <ul className={cx('menu')}>
                <li className={cx('menu-item')}>
                    <Link to={'/@nhkkhaii'} className={cx('menu-link')}>
                        <FontAwesomeIcon icon={faUser} className={cx('icon')} />
                        Thông tin tài khoản
                    </Link>
                </li>
                <li className={cx('menu-item')}>
                    <Link to={'/@nhkkhaii/payment-method'} className={cx('menu-link')}>
                        <FontAwesomeIcon icon={faCreditCard} className={cx('icon')} />
                        Phương thức thanh toán
                    </Link>
                </li>
                <li className={cx('menu-item')}>
                    <Link to={'/@nhkkhaii/address-shipping'} className={cx('menu-link')}>
                        <FontAwesomeIcon icon={faAddressCard} className={cx('icon')} />
                        Địa chỉ giao hàng
                    </Link>
                </li>
                <li className={cx('menu-item')}>
                    <Link to={'/@nhkkhaii/history-buy-product'} className={cx('menu-link')}>
                        <FontAwesomeIcon icon={faClockRotateLeft} className={cx('icon')} />
                        Lịch sử mua hàng
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default SidebarProfile;
