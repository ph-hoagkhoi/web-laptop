import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './AdminBill.module.scss';

import { useEffect, useState } from 'react';
import axios from 'axios';
import NumberFormat from 'react-number-format';

import config from '~/config';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AdminBill() {
    const [billData, setBillData] = useState([]);

    useEffect(() => {
        getCourses();
        document.title = 'Quản lý đơn hàng';
    }, []);

    const getCourses = async () => {
        try {
            await axios
                .get('http://26.87.217.216:8080/api/hoadon/get')
                .then(async (res) => setBillData(res.data))
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error(error);
        }
    };
    const capNhatTrangThai = async (ID_HOADON, TRANGTHAI) => {
        try {
            await axios
                .post('http://26.87.217.216:8080/api/hoadon/post', {
                    type: 'updatebill',
                    data: { ID_HOADON: ID_HOADON, TRANGTHAI: TRANGTHAI },
                })
                .then(async (res) => {
                    if (res.data == 1) {
                        alert('Cập nhật trạng thái hóa đơn thành công');
                    } else if (res.data == -1) {
                        alert('Cập nhật trạng thái hóa đơn thất bại');
                    }
                });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            {/* <!-- Begin adminProductTable --> */}
            <div className={cx('account-header')}>
                <h2 className={cx('account-heading')}>Hóa đơn sản phẩm</h2>
            </div>
            {billData !== 0 ? (
                <table className={cx('details-table')}>
                    <thead className={cx('details-thead')}>
                        <tr className={cx('details-title-list')}>
                            <td className={cx('details-title-item')}>ID hóa đơn</td>
                            <td className={cx('details-title-item')}>Tên khách hàng</td>
                            <td className={cx('details-title-item')}>Ngày lập</td>
                            <td className={cx('details-title-item')}>Thành tiền</td>
                            <td className={cx('details-title-item')}>Trạng thái</td>
                        </tr>
                    </thead>
                    {billData.map((bill, index) => {
                        // console.log(bill);
                        var trangthai = bill.TRANGTHAI;
                        // console.log(trangthai);
                        return (
                            <tbody className={cx('details-tbody')} key={bill}>
                                <tr className={cx('details-content-list')}>
                                    <td className={cx('details-content-item')}>{bill.ID_HOADON}</td>
                                    <td className={cx('details-content-item')}>{bill.HOVATEN}</td>
                                    <td className={cx('details-content-item')}>{bill.NGAYLAP}</td>
                                    <td className={cx('details-content-item')}>
                                        <NumberFormat
                                            value={bill.THANHTIEN}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'đ'}
                                        />
                                    </td>
                                    <td className={cx('details-content-item')}>
                                        <select
                                            onChange={(e) => {
                                                trangthai = e.target.value;
                                                console.log(trangthai);
                                            }}
                                            className={cx('details-content-select')}
                                        >
                                            <option value={bill.TRANGTHAI}>{bill.TRANGTHAI}</option>
                                            <option value="Đang giao hàng">Đang giao hàng</option>
                                            <option value="Trả về">Trả về</option>
                                            <option value="Thành công">Thành công</option>
                                        </select>
                                    </td>
                                    <td className={cx('details-content-item')}>
                                        <Button
                                            to={`${config.routes.adminBill}/${bill.ID_HOADON}`}
                                            state={{ data: { ID_HOADON: bill.ID_HOADON, THANHTIEN: bill.THANHTIEN } }}
                                            className={cx('details-content-item-btn')}
                                        >
                                            Xem
                                        </Button>
                                    </td>
                                    <td className={cx('details-content-item')}>
                                        <Button
                                            onClick={(e) => capNhatTrangThai(bill.ID_HOADON, trangthai)}
                                            className={cx('details-content-item-btn')}
                                        >
                                            Cập nhật
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        );
                    })}
                </table>
            ) : (
                <h2>Không có hóa đơn</h2>
            )}
            {/* <!-- End adminProductTable --> */}
        </>
    );
}

export default AdminBill;
