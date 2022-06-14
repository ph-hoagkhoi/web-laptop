import classNames from 'classnames/bind';
import styles from './AdminProduct.module.scss';
import Button from '~/components/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function AdminProduct() {
    const [productData, setProductData] = useState([]);
    useEffect(() => {
        document.title = "Quản lý sản phẩm";
        getCourses();
    }, []);
    function createMarkupGIOITHIEU(e) {
        return { __html: e.GIOITHIEU };
    }
    function createMarkupTHONGSO(e) {
        return { __html: e.THONGSO };
    }
    const getCourses = async () => {
        try {
            await axios
                .get('http://26.87.217.216:8080/api/sanpham/get')
                .then(async (res) => setProductData(res.data))
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteProduct = (data) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            axios
                .post('http://26.87.217.216:8080/api/sanpham/post', {
                    type: 'delete',
                    data: { ID_SANPHAM: data },
                })
                .then((response) => {
                    getCourses();
                });
        }
    };

    return (
        <>
            {/* <!-- Begin adminProductTable --> */}
            <div className={cx('account-header')}>
                <h2 className={cx('account-heading')}>Thêm sản phẩm</h2>
                <Button to={`/admin/product/new-item`} className={cx('account-create-btn')}>
                    Thêm mới
                </Button>
            </div>
            {productData != 0 ? (
                <table className={cx('details-table')}>
                    <thead className={cx('details-thead')}>
                        <tr className={cx('details-title-list')}>
                            <td className={cx('details-title-item')}>ID sản phẩm</td>
                            <td className={cx('details-title-item')}>Ảnh</td>
                            <td className={cx('details-title-item')}>ID Brand</td>
                            <td className={cx('details-title-item')}>Tên sản phẩm</td>
                            <td className={cx('details-title-item')}>Giá</td>
                            <td className={cx('details-title-item')}>Mô tả</td>
                            <td className={cx('details-title-item')}>Thông số</td>
                            <td className={cx('details-title-item')}>Số lượng</td>
                        </tr>
                    </thead>
                    {productData.map((product, index) => {
                        return (
                            <tbody className={cx('details-tbody')} key={product.ID_SANPHAM}>
                                <tr className={cx('details-content-list')}>
                                    <td className={cx('details-content-item')}>{product.ID_SANPHAM}</td>
                                    <td className={cx('details-content-item')}>
                                        <img className={cx('details-content-item-img')} src={product.ANH1} />
                                    </td>
                                    <td className={cx('details-content-item')}>{product.ID_THELOAI}</td>
                                    <td className={cx('details-content-item', 'justify_item')}>{product.TENSANPHAM}</td>
                                    <td className={cx('details-content-item')}>{product.GIA}</td>

                                    <td
                                        className={cx('details-content-item', 'justify_item')}
                                        dangerouslySetInnerHTML={createMarkupGIOITHIEU(product)}
                                    ></td>
                                    <td
                                        className={cx('details-content-item', 'justify_item')}
                                        dangerouslySetInnerHTML={createMarkupTHONGSO(product)}
                                    ></td>
                                    <td className={cx('details-content-item', 'justify_item')}>{product.SOLUONG}</td>
                                    <td className={cx('details-content-item')}>
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
                                    </td>
                                </tr>
                            </tbody>
                        );
                    })}
                </table>
            ) : (
                <h2> Không có dữ liệu</h2>
            )}
            {/* <!-- End adminProductTable --> */}
        </>
    );
}

export default AdminProduct;
