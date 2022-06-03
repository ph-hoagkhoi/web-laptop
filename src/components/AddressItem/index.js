import classNames from 'classnames/bind';
import styles from './AddressItem.module.scss';

const cx = classNames.bind(styles);

function AddressItem() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('name')}>Hoàng Khôi</div>
                <div className={cx('address')}>Khu vực 6, Phường 4, Thành phố Vị Thanh, Hậu Giang</div>
                <div className={cx('action')}>
                    <button className={cx('update_btn')}>Sửa</button>
                    <button className={cx('delete_btn')}>Xóa</button>
                </div>
            </div>
        </div>
    );
}

export default AddressItem;
