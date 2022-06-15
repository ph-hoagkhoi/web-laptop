import classNames from 'classnames/bind';
import styles from './Products.module.scss';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import Image from '~/components/Image';
import { useEffect, useState, useReducer } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { initStateShoppingCart, shoppingCartReducer } from '~/reducers/shoppingCartReducers';
import { setIDSP, setIDAccount } from '~/actions/shoppingCartActions';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Products({ featured, id, name, price, imgID, description, brand, soluong, thongso }) {
    const [imgProducts, setImgProducts] = useState([]);
    const [stateCart, dispatchCart] = useReducer(shoppingCartReducer, initStateShoppingCart);
    const [cookies, setCookies] = useCookies(['name']);
    let navigate = useNavigate();
    useEffect(() => {
        if (cookies.name) {
            dispatchCart(setIDAccount(cookies.name.ID));
        }
        dispatchCart(setIDSP(id));

        axios
            .post('http://26.87.217.216:8080/api/ctanh/post', {
                type: 'get',
                data: { ID_ANH: imgID },
            })
            .then(async (res) => setImgProducts(res.data[0]));
    }, []);
    return (
        <div className={cx('card', featured ? 'featured' : '')}>
            <Link
                to={`/laptop/${id}`}
                state={{
                    data: {
                        ID_SANPHAM: id,
                        TENSANPHAM: name,
                        GIOITHIEU: description,
                        TENTHELOAI: brand,
                        GIA: price,
                        SOLUONG: soluong,
                        THONGSO: thongso,
                        IMAGE: imgProducts,
                    },
                }}
            >
                <div className={cx('product')}>
                    <Image src={imgProducts.ANH1} alt={name} className={cx('product-img')} />
                </div>
            </Link>
            <div className={cx('content')}>
                <h3 className={cx('name')}>{name}</h3>
                <p className={cx('price')}>
                    <span>Giá : </span>
                    <NumberFormat value={price} displayType={'text'} thousandSeparator={true} suffix={'đ'} />
                </p>
                <Link
                    to={`/laptop/${id}`}
                    state={{
                        data: {
                            ID_SANPHAM: id,
                            TENSANPHAM: name,
                            GIOITHIEU: description,
                            TENTHELOAI: brand,
                            GIA: price,
                            SOLUONG: soluong,
                            THONGSO: thongso,
                            IMAGE: imgProducts,
                        },
                    }}
                    className={cx('buy')}
                >
                    Mua Ngay
                </Link>
            </div>
        </div>
    );
}

export default Products;
