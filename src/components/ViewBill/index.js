import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './ViewBill.module.scss';
import config from '~/config';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import NumberFormat from 'react-number-format';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faXmark, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function ViewBill() {
    const [infoBillData, setInfoBillData] = useState([]);
    let location = useLocation();

    useEffect(() => {
        getCourses();
    }, []);
    console.log(location.state.data);

    const getCourses = async () => {
        try {
            await axios
                .post('http://localhost:8080/api/cthd/post', {
                    type: 'get',
                    data: { ID_HOADON: location.state.data.ID_HOADON },
                })
                .then(async (res) => {
                    console.log(res.data);
                    setInfoBillData(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            {/* <!-- Begin adminBillTable --> */}
            <div className={cx('bill-header')}>
                <h2 className={cx('bill-heading')}>Mã hóa đơn: {location.state.data.ID_HOADON}</h2>
                <h2 className={cx('bill-heading')}>
                    <span>Tổng hóa đơn : </span>
                    <NumberFormat
                        value={location.state.data.THANHTIEN}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={'đ'}
                    />
                </h2>
            </div>
            {infoBillData != 0 ? (
                <table className={cx('details-table')}>
                    <thead className={cx('details-thead')}>
                        <tr className={cx('details-title-list')}>
                            <td className={cx('details-title-item')}>ID sản phẩm</td>
                            <td className={cx('details-title-item')}>Hình ảnh</td>
                            <td className={cx('details-title-item')}>Tên sản phẩm</td>
                            <td className={cx('details-title-item')}>SL sản phẩm</td>
                            <td className={cx('details-title-item')}>Thành tiền</td>
                        </tr>
                    </thead>
                    {infoBillData.map((product, index) => {
                        console.log(product.TENSANPHAM);
                        return (
                            <tbody className={cx('details-tbody')}>
                                <tr className={cx('details-content-list')}>
                                    <td className={cx('details-content-item')}>{product.ID_SANPHAM}</td>
                                    <td className={cx('details-content-item')}>
                                        <img src={product.ANH1} className={cx('product-img')} />
                                    </td>
                                    <td className={cx('details-content-item')}>{product.TENSANPHAM}</td>
                                    <td className={cx('details-content-item')}>{product.SOLUONG_CTHD}</td>
                                    <td className={cx('details-content-item')}>
                                        <NumberFormat
                                            value={product.SOLUONG_CTHD * product.GIA}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'đ'}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        );
                    })}
                </table>
            ) : (
                <h2>Bill không có sản phẩm</h2>
            )}

            <Button
                to={config.routes.adminBill}
                className={cx('btn_back')}
                leftIcon={<FontAwesomeIcon icon={faArrowLeft} />}
            >
                Trở về
            </Button>
            {/* <!-- End adminBillTable --> */}
        </>
    );
}

export default ViewBill;
