import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './ShoppingItem.module.scss';
import NumberFormat from 'react-number-format';
import axios from 'axios';

import { useState } from 'react';
const cx = classNames.bind(styles);

function ShoppingItem({ ANH1, TENSANPHAM, TENTHELOAI, GIA, SOLUONG, ID_TAIKHOAN, ID_SANPHAM, SOLUONGKHO }) {
    const [quantity, setQuantity] = useState(Number(SOLUONG));

    const deleteItem = async () => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            await axios
                .post('http://localhost:8080/api/giohang/post', {
                    type: 'delete',
                    data: { ID_TAIKHOAN: ID_TAIKHOAN, ID_SANPHAM: ID_SANPHAM },
                })
                .then((res) => {
                    if ((res.data != 0) & (res.data != -1)) {
                        alert('Xóa sản phẩm khỏi giỏ hàng thành công');
                        window.location.reload();
                    } else {
                        alert('Xóa sản phẩm khỏi giỏ hàng thất bại');
                    }
                });
        }
    };

    const quantityUp = async () => {
        if (Number(SOLUONG) < Number(SOLUONGKHO)) {
            await axios
                .post('http://localhost:8080/api/giohang/post', {
                    type: 'update',
                    data: { ID_TAIKHOAN: ID_TAIKHOAN, ID_SANPHAM: ID_SANPHAM, SOLUONG: Number(SOLUONG) + 1 },
                })
                .then((res) => console.log(res.data));
        }
    };

    const quantityDown = async () => {
        if (Number(SOLUONG) > 1) {
            await axios
                .post('http://localhost:8080/api/giohang/post', {
                    type: 'update',
                    data: { ID_TAIKHOAN: ID_TAIKHOAN, ID_SANPHAM: ID_SANPHAM, SOLUONG: Number(SOLUONG) - 1 },
                })
                .then((res) => console.log(res.data));
        }
    };

    return (
        <div className={cx('row', 'item')}>
            <div className={cx('col', 'l-3', 'item_box')}>
                <img className={cx('item_img')} src={ANH1} alt={TENSANPHAM} />
            </div>
            <div className={cx('col', 'l-9', 'info')}>
                <div className={cx('row')}>
                    <div className={cx('col', 'l-8')}>
                        <p className={cx('item_name')}>{TENSANPHAM}</p>
                        <div className={cx('brand')}>{TENTHELOAI}</div>
                        <div className={cx('options')}>
                            <div className={cx('info_quantity')}>
                                <span className={cx('minus')} onClick={quantityDown}>
                                    -
                                </span>
                                <span className={cx('num')}>
                                    {Number(SOLUONG) < 10 ? '0' + Number(SOLUONG) : Number(SOLUONG)}
                                </span>
                                <span className={cx('plus')} onClick={quantityUp}>
                                    +
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('col', 'l-4')}>
                        <p className={cx('item_money')}>
                            <span>Giá : </span>
                            <NumberFormat
                                value={Number(SOLUONG) * GIA}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'đ'}
                            />
                        </p>
                    </div>
                </div>
                <div className={cx('action')}>
                    <FontAwesomeIcon icon={faTrashAlt} className={cx('remove')} onClick={deleteItem} />
                </div>
            </div>
        </div>
    );
}

export default ShoppingItem;
