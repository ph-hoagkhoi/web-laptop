import Image from '~/components/Image';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './Shopping.module.scss';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NumberFormat from 'react-number-format';
import ShoppingItem from '~/components/ShoppingItem';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);
function Shipping() {
    const [cookies, setCookie] = useCookies(['name']);
    const [shoppingCart, setShoppingCart] = useState([]);
    const debounced = useDebounce(shoppingCart, 500);

    let money = 0;
    const delivery = 30000;
    let navigate = useNavigate();
    useEffect(() => {
        if (cookies.name) {
            axios
                .post('http://localhost:8080/api/giohang/post', {
                    type: 'get',
                    data: { ID_TAIKHOAN: cookies.name.ID },
                })
                .then((res) => {
                    setShoppingCart(res.data);
                });
        } else {
            navigate('/login');
        }
    }, [debounced]);

    return (
        <div className={cx('grid', 'wide')}>
            <div className={cx('row', 'bag')}>
                <div className={cx('col', 'l-8', 'detail')}>
                    <h2 className={cx('detail_heading')}>Giỏ hàng</h2>
                    {shoppingCart != 0 ? (
                        shoppingCart.map((product, index) => {
                            const count = product.GIA * product.SOLUONG;
                            money += count;
                            return (
                                <ShoppingItem
                                    key={index}
                                    ANH1={product.ANH1}
                                    TENSANPHAM={product.TENSANPHAM}
                                    TENTHELOAI={product.TENTHELOAI}
                                    SOLUONG={product.SOLUONG}
                                    GIA={product.GIA}
                                    ID_TAIKHOAN={product.ID_TAIKHOAN}
                                    ID_SANPHAM={product.ID_SANPHAM}
                                    SOLUONGKHO={product.SOLUONGKHO}
                                />
                            );
                        })
                    ) : (
                        <h2>Không có sản phẩm</h2>
                    )}
                </div>
                <div className={cx('col', 'l-4', 'summary')}>
                    <h2 className={cx('summary-heading')}>Sơ lược</h2>
                    <div className={cx('subtotal', 'row')}>
                        <p className={cx('subtotal-title', 'col', 'l-8')}>Giá tiền</p>
                        <p className={cx('subtotal-money', 'col', 'l-4')}>
                            <NumberFormat value={money} displayType={'text'} thousandSeparator={true} suffix={'đ'} />
                        </p>
                    </div>
                    <div className={cx('shipping', 'row')}>
                        <p className={cx('shipping-title', 'col', 'l-8')}>Vận chuyển</p>
                        <div className={cx('shipping-money', 'col', 'l-4')}>
                            <NumberFormat value={delivery} displayType={'text'} thousandSeparator={true} suffix={'đ'} />
                        </div>
                    </div>
                    <div className={cx('total', 'row')}>
                        <p className={cx('total-title', 'col', 'l-8')}>Tổng tiền</p>
                        <div className={cx('total-money', 'col', 'l-4')}>
                            <NumberFormat
                                value={delivery + money}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'đ'}
                            />
                        </div>
                    </div>

                    <Button
                        to={`/@${cookies.name.ID}/checkout`}
                        disabled={shoppingCart == 0 ? true : false}
                        state={{ data: { money: money, delivery: delivery } }}
                        className={cx('checkout')}
                    >
                        Thanh toán
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Shipping;
