import classNames from 'classnames/bind';
import styles from './AdminManagers.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef } from 'react';

const cx = classNames.bind(styles);

function AdminManagers() {
    const [statusModal, setStatusModal] = useState(false);

    const showBuyTickets = () => {
        setStatusModal(true);
    };

    const hideBuyTickets = () => {
        setStatusModal(false);
    };
    return (
        <>
            {/* <!-- Begin adminManagers --> */}
            <div className={cx('managers-header')}>
                <h2 className={cx('managers-heading')}>Danh sách nhân viên</h2>
                <Button className={cx('managers-create-btn')} onClick={showBuyTickets}>
                    Thêm mới
                </Button>
            </div>
            <table className={cx('details-table')}>
                <thead className={cx('details-thead')}>
                    <tr className={cx('details-title-list')}>
                        <td className={cx('details-title-item')}>ID Nhân viên</td>
                        <td className={cx('details-title-item')}>Tên nhân viên</td>
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
                        <td className={cx('details-content-item')}>Hoàng Khôi</td>
                        <td className={cx('details-content-item')}>Nam</td>
                        <td className={cx('details-content-item')}>2000</td>
                        <td className={cx('details-content-item')}>ph.hoagkhoi@gmail.com</td>
                        <td className={cx('details-content-item')}>
                            <img src="https://i.imgur.com/ARKkf7k.png" className={cx('content-img')} />
                        </td>
                        <td className={cx('details-content-item')}>admin</td>
                        <td className={cx('details-content-item')}>MD5</td>
                        <td className={cx('details-content-item')}>
                            <Button className={cx('details-content-item-btn')}>Sửa</Button>
                        </td>
                        <td className={cx('details-content-item')}>
                            <Button className={cx('details-content-item-btn')}>Xóa</Button>
                        </td>
                    </tr>
                </tbody>
            </table>
            {/* <!-- End adminManagers --> */}
            {/* modal */}
            <div className={cx('modal', statusModal ? 'open' : '')} onClick={hideBuyTickets}>
                <div
                    className={cx('modal-detail')}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <div className={cx('modal-header')}>
                        <h2 className={cx('modal-heading')}>Thêm nhân viên</h2>
                        <FontAwesomeIcon className={cx('modal--close')} icon={faXmark} onClick={hideBuyTickets} />
                    </div>

                    <form>
                        <div className={cx('managers-list')}>
                            <div className={cx('managers-list-info-left')}>
                                <div className={cx('info')}>
                                    <label htmlFor="" className={cx('input-label')}>
                                        Tên khách hàng
                                    </label>
                                    <input className={cx('input-item')} type="text" placeholder="Tên khách hàng" />
                                </div>

                                <div className={cx('info')}>
                                    <label htmlFor="" className={cx('input-label')}>
                                        Giới tính
                                    </label>
                                    <input className={cx('input-item')} type="text" placeholder=" Giới tính" />
                                </div>

                                <div className={cx('info')}>
                                    <label htmlFor="" className={cx('input-label')}>
                                        Năm sinh
                                    </label>
                                    <input className={cx('input-item')} type="text" placeholder="Năm sinh" />
                                </div>

                                <div className={cx('info')}>
                                    <label htmlFor="" className={cx('input-label')}>
                                        Số điện thoại
                                    </label>
                                    <input className={cx('input-item')} type="text" placeholder="Số điện thoại" />
                                </div>

                                <div className={cx('info')}>
                                    <label htmlFor="" className={cx('input-label')}>
                                        Email
                                    </label>
                                    <input className={cx('input-item')} type="text" placeholder="Email" />
                                </div>
                            </div>

                            <div className={cx('managers-list-info-right')}>
                                <div className={cx('info')}>
                                    <label htmlFor="" className={cx('input-label')}>
                                        Hình ảnh
                                    </label>
                                    <input className={cx('input-item')} type="text" placeholder="Tên địa chỉ nhận" />
                                </div>

                                <div className={cx('info')}>
                                    <label htmlFor="" className={cx('input-label')}>
                                        Tạo tài khoản
                                    </label>
                                    <input className={cx('input-item')} type="text" placeholder=" Tạo tài khoảnn" />
                                </div>

                                <div className={cx('info')}>
                                    <label htmlFor="" className={cx('input-label')}>
                                        Mật khẩu
                                    </label>
                                    <input className={cx('input-item')} type="text" placeholder="Mật khẩu" />
                                </div>
                            </div>
                        </div>
                        <button className={cx('btn')}>Save</button>
                    </form>
                </div>
            </div>
            {/* modal */}
        </>
    );
}

export default AdminManagers;
