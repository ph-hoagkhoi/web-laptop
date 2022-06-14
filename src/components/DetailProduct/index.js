import Breadcrumbs from '~/components/Breadcrumbs';
import { useLocation } from 'react-router-dom';
import React from 'react';
import { useState, useRef, useEffect, useReducer } from 'react';
import { useCookies } from 'react-cookie';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Image from '~/components/Image';
import classNames from 'classnames/bind';
import styles from './DetailProduct.module.scss';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { initStateShoppingCart, shoppingCartReducer } from '~/reducers/shoppingCartReducers';
import { setIDAccount, setIDSP, setQuantityUP, setQuantityDown, setQuantity } from '~/actions/shoppingCartActions';

import NumberFormat from 'react-number-format';

const cx = classNames.bind(styles);

function DetailProduct() {
    const [cookies, setCookie] = useCookies(['name']);
    const [stateShopping, dispatchShopping] = useReducer(shoppingCartReducer, initStateShoppingCart);
    let location = useLocation();
    const [quantity, setQuantityData] = useState(1);
    let navigate = useNavigate();

    console.log(location.state.data);

    useEffect(() => {
        if (cookies.name) {
            dispatchShopping(setIDAccount(cookies.name.ID));
        }
        dispatchShopping(setIDSP(location.state.data.ID_SANPHAM));
    }, []);

    const quantityUp = () => {
        if (stateShopping.SOLUONG < location.state.data.SOLUONG) {
            dispatchShopping(setQuantityUP());
            setQuantityData(quantity + 1);
        }
    };

    const quantityDown = () => {
        if (quantity > 1) {
            dispatchShopping(setQuantityDown());
            setQuantityData(quantity - 1);
        }
    };

    function createMarkup() {
        return { __html: location.state.data.GIOITHIEU };
    }
    function createMarkupTHONGSO() {
        return { __html: location.state.data.THONGSO };
    }

    const handleShoppingCart = () => {
        if (cookies.name) {
            axios
                .post('http://26.87.217.216:8080/api/giohang/post', {
                    type: 'create',
                    data: stateShopping,
                })
                .then(async (res) => {
                    if (res.data == 1) {
                        alert('Thêm vào giỏ hàng thành công !!!');
                    } else if (res.data != 1) {
                        alert('Sản phẩm đã tồn tại trong giỏ hàng !!!');
                    } else {
                        alert('Thêm vào giỏ hàng thất bại  !!!');
                    }
                });
        } else {
            navigate('/login');
        }
    }; 
    console.log(stateShopping);
    const handleBuyNow = () => {
        if (cookies.name) {
            handleShoppingCart();
            navigate(`/@${cookies.name.ID}/shopping-cart`);
        } else {
            navigate('/login');
        }
    };
    return (
        <div className="grid wide">
            <div className="row">
                <Breadcrumbs />
                <div className={cx('slide-container', 'col', 'l-5')}>
                    <Fade>
                        {Object.keys(location.state.data.IMAGE)
                            .filter((key) => key !== 'ID_ANH')
                            .map((key, index) => {
                                return (
                                    location.state.data.IMAGE[key] !== '' && (
                                        <div className="each-fade" key={index}>
                                            <div className={cx('image-container')}>
                                                <Image
                                                    className={cx('fill')}
                                                    src={location.state.data.IMAGE[key]}
                                                    alt={location.state.data.TENSANPHAM}
                                                />
                                            </div>
                                        </div>
                                    )
                                );
                            })}
                    </Fade>
                </div>
                <div className={cx('col', 'l-7', 'info')}>
                    <h2 className={cx('info-heading')}>{location.state.data.TENSANPHAM}</h2>
                    <p className={cx('brand')}>{location.state.data.TENTHELOAI}</p>
                    <p className={cx('info-money')}>
                        <span>Giá : </span>
                        <NumberFormat
                            value={location.state.data.GIA}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'đ'}
                        />
                    </p>

                    <div className={cx('options')}>
                        <div className={cx('info_quantity')}>
                            <span className={cx('minus')} onClick={quantityDown}>
                                -
                            </span>
                            <span className={cx('num')}>{quantity < 10 ? '0' + quantity : quantity}</span>
                            <span className={cx('plus')} onClick={quantityUp}>
                                +
                            </span>
                        </div>
                    </div>

                    <div className={cx('info-btn')}>
                        <button className={cx('info-btn-bag')} onClick={handleShoppingCart}>
                            Thêm vào giỏ hàng
                        </button>
                        <button className={cx('info-btn-buy')} onClick={handleBuyNow}>
                            Mua ngay
                        </button>
                    </div>
                </div>
            </div>
            <div className={cx('row', 'description')}>
                <div className={cx('col', 'l-8', 'describe')}>
                    <h2 className={cx('describe_heading')}>Mô tả sản phẩm</h2>
                    <div className={cx('describe_content')}>
                        <h3 className={cx('describe_content-name')}>{location.state.data.TENSANPHAM}</h3>
                        <div className={cx('describe_content-summary')}>
                            <h3 className={cx('describe_content-summary-heading')}>Sơ lược sản phẩm</h3>
                            <p
                                className={cx('describe_content-summary-content')}
                                dangerouslySetInnerHTML={createMarkup()}
                            ></p>
                        </div>
                    </div>
                </div>
                <div className={cx('col', 'l-4', 'detailed_informations')}>
                    <h2 className={cx('detailed_informations-heading')}>Thông tin chi tiết</h2>
                    <div className={cx('details')} dangerouslySetInnerHTML={createMarkupTHONGSO()}></div>
                </div>
            </div>
        </div>
    );
}

export default DetailProduct;
