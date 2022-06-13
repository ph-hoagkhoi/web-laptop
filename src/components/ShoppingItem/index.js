import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './ShoppingItem.module.scss';
import NumberFormat from 'react-number-format';
import axios from 'axios';

const cx = classNames.bind(styles);

function ShoppingItem({
    ANH1,
    TENSANPHAM,
    TENTHELOAI,
    GIA,
    SOLUONG,
    ID_TAIKHOAN,
    ID_SANPHAM,
}) {
    const deleteItem = async () => {
        await axios
            .post('http://26.87.217.216:8080/api/giohang/post', {
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
    };
    // const quantityUp = async () => {
    //     await axios
    //         .post('http://26.17.209.162/api/shoppingcart/post', {
    //             type: 'update',
    //             data: { IDACCOUNT: IDACCOUNT, IDSIZE: IDSIZE, SHOESID: SHOESID, QUANTITY: QUANTITY + 1 },
    //         })
    //         .then((res) => {
    //             if ((res.data != 0) & (res.data != -1)) {
    //                 window.location.reload();
    //             } else {
    //                 alert('Xóa sản phẩm khỏi giỏ hàng thất bại');
    //             }
    //         });
    // };
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
                                <span className={cx('minus')}>-</span>
                                <span className={cx('num')}>
                                    {Number(SOLUONG) < 10 ? '0' + SOLUONG : Number(SOLUONG)}
                                </span>
                                <span
                                    className={cx('plus')}
                                    onClick={(e) => {
                                        SOLUONG = Number(SOLUONG) + 1;
                                    }}
                                >
                                    +
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('col', 'l-4')}>
                        <p className={cx('item_money')}>
                            <span>Giá : </span>
                            <NumberFormat
                                value={SOLUONG * GIA}
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
