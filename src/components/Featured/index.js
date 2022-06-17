import Products from '~/components/Products';
import styles from './Featured.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import * as httpRequest from '~/utils/httpRequest';
import * as searchServices from '~/services/searchServices';
import axios from 'axios';

const cx = classNames.bind(styles);

function Featured() {
    const [countProduct, setCountProduct] = useState([]);
    useEffect(() => {
        try {
            axios.post('http://localhost:8080/api/sanpham/noibat').then((res) => setCountProduct(res.data));
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <div className={cx('row', 'features')}>
            <h1 className={cx('features_heading', 'col', 'l-12')}>Sản phẩm nổi bật</h1>
            <div className={cx('row', 'item', 'l-12', 'col')}>
                {countProduct != 0 ? (
                    countProduct
                        .sort((a, b) => b.GIA - a.GIA)
                        .map((product, index) => {
                            if (index < 4) {
                                return (
                                    <div key={product.ID_SANPHAM} className={cx('col', 'l-3')}>
                                        <Products
                                            id={product.ID_SANPHAM}
                                            name={product.TENSANPHAM}
                                            price={product.GIA}
                                            imgID={product.ID_ANH}
                                            description={product.GIOITHIEU}
                                            thongso={product.THONGSO}
                                            brand={product.TENTHELOAI}
                                            featured
                                        />
                                    </div>
                                );
                            }
                        })
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

export default Featured;
