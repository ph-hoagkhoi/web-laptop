import classNames from 'classnames/bind';
import styles from './AdminStock.module.scss';
import Button from '~/components/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useReducer, useEffect } from 'react';

const cx = classNames.bind(styles);
function AdminStock() {
    const [statusModal, setStatusModal] = useState(false);

    const showBuyTickets = () => {
        setStatusModal(true);
    };
    const hideBuyTickets = () => {
        setStatusModal(false);
    };
    return (
        <>
            {/* <!-- Begin adminStock --> */}
            <div className={cx('stock-header')}>
                <h2 className={cx('stock-heading')}>Thêm kho</h2>
                <Button onClick={showBuyTickets} className={cx('stock-create-btn')}>
                    Thêm mới
                </Button>
            </div>
            <table className={cx('details-table')}>
                <thead className={cx('details-thead')}>
                    <tr className={cx('details-title-list')}>
                        <td className={cx('details-title-item')}>ID hình ảnh</td>
                        <td className={cx('details-title-item')}>Tên sản phẩm</td>
                        <td className={cx('details-title-item')}>Size</td>
                        <td className={cx('details-title-item')}>Số lượng</td>
                    </tr>
                </thead>
                {/* <!-- item 1 --> */}
                <tbody className={cx('details-tbody')}>
                    <tr className={cx('details-content-list')}>
                        <td className={cx('details-content-item')}>
                            <img
                                className={cx('stock-img')}
                                src="https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-de-thuong.jpg"
                            />
                        </td>
                        <td className={cx('details-content-item')}>GF63</td>
                        <td className={cx('details-content-item')}>44.5</td>
                        <td className={cx('details-content-item')}>2</td>
                        <td className={cx('details-content-item')}>
                            <button className={cx('details-content-item-btn')}>Sửa</button>
                        </td>
                        <td className={cx('details-content-item')}>
                            <button className={cx('details-content-item-btn')}>Xóa</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            {/* <!-- End adminStock --> */}

            {/* Begin modal */}
            <div className={cx('modal', statusModal ? 'open' : '')} onClick={hideBuyTickets}>
                <div
                    className={cx('modal-detail')}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <div className={cx('modal-header')}>
                        <h2 className={cx('modal-heading')}>Thêm kho</h2>
                        <FontAwesomeIcon className={cx('modal--close')} icon={faXmark} onClick={hideBuyTickets} />
                    </div>

                    <form>
                        <div className={cx('stock-list')}>
                            <div className={cx('info')}>
                                <label htmlFor="" className={cx('input-label', 'mt-10')}>
                                    Tên sản phẩm
                                </label>
                                <select className={cx('stock-select')}>
                                    <option value="0">Tên sản phẩm</option>
                                    <option value="1">MSI</option>
                                    <option value="2">ASUS</option>
                                </select>
                            </div>

                            <div className={cx('info')}>
                                <label htmlFor="" className={cx('input-label', 'mt-10')}>
                                    Chọn Size
                                </label>
                                <select className={cx('stock-select')}>
                                    <option value="0">Chọn Size</option>
                                    <option value="1">44.5</option>
                                    <option value="2">50</option>
                                </select>
                            </div>

                            <div className={cx('info')}>
                                <label htmlFor="" className={cx('input-label')}>
                                    Số lượng
                                </label>
                                <input className={cx('input-item')} type="text" placeholder="Số lượng" />
                            </div>
                        </div>
                        <button className={cx('btn')}>Save</button>
                    </form>
                </div>
            </div>
            {/* End modal */}
        </>
    );
}

export default AdminStock;
