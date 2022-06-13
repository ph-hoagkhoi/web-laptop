import classNames from 'classnames/bind';
import styles from './AdminUsers.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function AdminUsers() {
    return (
        <>
            {/* <!-- Begin adminUsers --> */}
            <div className={cx('users-header')}>
                <h2 className={cx('users-heading')}>Danh sách khách hàng</h2>
            </div>
            <table className={cx('details-table')}>
                <thead className={cx('details-thead')}>
                    <tr className={cx('details-title-list')}>
                        <td className={cx('details-title-item')}>ID Khách hàng</td>
                        <td className={cx('details-title-item')}>Tên khách hàng</td>
                        <td className={cx('details-title-item')}>Giới tính</td>
                        <td className={cx('details-title-item')}>Năm sinh</td>
                        <td className={cx('details-title-item')}>Email</td>
                        <td className={cx('details-title-item')}>Hình ảnh</td>
                        <td className={cx('details-title-item')}>Tên tài khoản</td>
                        <td className={cx('details-title-item')}>Mật khẩu</td>
                    </tr>
                </thead>
                {/* <!-- item 1 --> */}
                <tbody className={cx('details-tbody')}>
                    <tr className={cx('details-content-list')}>
                        <td className={cx('details-content-item')}>1</td>
                        <td className={cx('details-content-item')}>Khải Khùng</td>
                        <td className={cx('details-content-item')}>Nam</td>
                        <td className={cx('details-content-item')}>2000</td>
                        <td className={cx('details-content-item')}>ph.hoagkhoi@gmail.com</td>
                        <td className={cx('details-content-item')}>
                            <img src="https://i.imgur.com/ARKkf7k.png" className={cx('content-img')} />
                        </td>
                        <td className={cx('details-content-item')}>users</td>
                        <td className={cx('details-content-item')}>MD5</td>
                        <td className={cx('details-content-item')}>
                            <Button className={cx('details-content-item-btn')}>Xóa</Button>
                        </td>
                    </tr>
                </tbody>
            </table>
            {/* <!-- End adminUsers --> */}
        </>
    );
}

export default AdminUsers;
