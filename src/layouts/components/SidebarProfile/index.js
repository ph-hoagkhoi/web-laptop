import { faAddressCard, faClockRotateLeft, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import classNames from 'classnames/bind';
import styles from './SidebarProfile.module.scss';
import { faCreditCard } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function SidebarProfile() {
    const [cookies, setCookies] = useCookies(['name']);
    return (
        <div className={cx('col', 'l-4')}>
            <ul className={cx('menu')}>
                <li className={cx('menu-item')}>
                    <Link to={`/@${cookies.name.ID}`} className={cx('menu-link')}>
                        <FontAwesomeIcon icon={faUser} className={cx('icon')} />
                        Thông tin tài khoản
                    </Link>
                </li>
                {/* <li className={cx('menu-item')}>
                    <Link to={`/@${cookies.name.ID}/payment-method`} className={cx('menu-link')}>
                        <FontAwesomeIcon icon={faCreditCard} className={cx('icon')} />
                        Phương thức thanh toán
                    </Link>
                </li> */}
                <li className={cx('menu-item')}>
                    <Link to={`/@${cookies.name.ID}/address-shipping`} className={cx('menu-link')}>
                        <FontAwesomeIcon icon={faAddressCard} className={cx('icon')} />
                        Địa chỉ giao hàng
                    </Link>
                </li>
                {/* <li className={cx('menu-item')}>
                    <Link to={`/@${cookies.name.ID}/history-buy-product`} className={cx('menu-link')}>
                        <FontAwesomeIcon icon={faClockRotateLeft} className={cx('icon')} />
                        Lịch sử mua hàng
                    </Link>
                </li> */}
            </ul>
        </div>
    );
}

export default SidebarProfile;
