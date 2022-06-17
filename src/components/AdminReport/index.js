import classNames from 'classnames/bind';
import styles from './AdminReport.module.scss';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';

import '~/config';

const cx = classNames.bind(styles);

function AdminReport() {
    const [reportData, setReportData] = useState([]);
    useEffect(() => {
        document.title = 'Quản lý thống kê';
        getCourses();
    }, []);
    const getCourses = async () => {
        try {
            await axios
                .get('http://localhost:8080/api/hoadon/get')
                .then(async (res) => setReportData(res.data))
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {/* <!-- Begin adminProductTable --> */}
            <div className={cx('report-header')}>
                <h2 className={cx('report-heading')}>Thống kê</h2>
                <select className={cx('report-select')}>
                    <option value="0">Chờ duyệt</option>
                    <option value="1">Đang giao hàng</option>
                    <option value="2">Trả về</option>
                    <option value="3">Thành công</option>
                </select>
            </div>
            <table className={cx('details-table')}>
                <thead className={cx('details-thead')}>
                    <tr className={cx('details-title-list')}>
                        <td className={cx('details-title-item')}>ID hóa đơn</td>
                        <td className={cx('details-title-item')}>Tên khách hàng</td>
                        <td className={cx('details-title-item')}>Ngày lập</td>
                        <td className={cx('details-title-item')}>Thành Tiền</td>
                        <td className={cx('details-title-item')}>Giá</td>
                    </tr>
                </thead>
                {reportData.map((report, index) => {
                    return (
                        <tbody className={cx('details-tbody')} key={report.ID_SANPHAM}>
                            <tr className={cx('details-content-list')}>
                                <td className={cx('details-content-item')}>{report.ID_HOADON}</td>
                                <td className={cx('details-content-item')}>{report.TENKHACHHANG}</td>
                                <td className={cx('details-content-item')}>{report.NGAYLAP}</td>
                                <td className={cx('details-content-item')}>{report.GIA}</td>
                                <td className={cx('details-content-item')}>{report.GIA}</td>
                                {/* <td className={cx('details-content-item')}>
                                    <Button
                                        to={`/admin/product/${product.ID_SANPHAM}`}
                                        state={{ data: product }}
                                        className={cx('details-content-item-btn')}
                                    >
                                        Sửa
                                    </Button>
                                </td>
                                <td className={cx('details-content-item')}>
                                    <Button
                                        className={cx('details-content-item-btn')}
                                        onClick={(e) => handleDeleteProduct(product.ID_SANPHAM)}
                                    >
                                        Xóa
                                    </Button>
                                </td> */}
                            </tr>
                        </tbody>
                    );
                })}
            </table>
        </>
    );
}

export default AdminReport;
