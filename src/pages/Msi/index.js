import Products from '~/components/Products';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Msi.module.scss';
const cx = classNames.bind(styles);

function MSI() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const brand = 'MSI';
    const [sort, setSort] = useState('');
    const setSortPriceLowToHigh = () => {
        setSort('price_low_to_high');
    };

    const setSortPriceHighToLow = () => {
        setSort('price_high_to_low');
    };
    useEffect(() => {
        axios
            .get('http://localhost:8080/api/sanpham/get')
            .then(async (res) => {
                setItems(res.data);
                setIsLoaded(true);
                setItems(res.data);
            })
            .catch((error) => {
                setIsLoaded(true);
                setError(error);
            });
    }, []);
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <div className={cx('filter')}>
                    <span className={cx('filter-label')}>Sắp xếp theo</span>

                    <div className={cx('select-input')}>
                        <span className={cx('select-input__label')}>Giá</span>
                        <FontAwesomeIcon icon={faAngleDown} className={cx('select-input__icon')} />

                        <ul className={cx('select-input__list')}>
                            <li className={cx('select-input__item')}>
                                <div className={cx('select-input__link')} onClick={setSortPriceLowToHigh}>
                                    Thấp đến cao
                                </div>
                            </li>
                            <li className={cx('select-input__item')}>
                                <div className={cx('select-input__link')} onClick={setSortPriceHighToLow}>
                                    Cao đến thấp
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={cx('row')}>
                    {items ? (
                        sort == 'price_low_to_high' ? (
                            items
                                .sort((a, b) => a.GIA - b.GIA)
                                .map((item) => {
                                    if (item.TENTHELOAI.toLowerCase() === brand.toLowerCase()) {
                                        return (
                                            <div className={cx('col', 'l-3')} key={item.ID_SANPHAM}>
                                                <Products
                                                    id={item.ID_SANPHAM}
                                                    name={item.TENSANPHAM}
                                                    price={item.GIA}
                                                    imgID={item.ID_ANH}
                                                    description={item.GIOITHIEU}
                                                    thongso={item.THONGSO}
                                                    soluong={item.SOLUONG}
                                                    brand={item.TENTHELOAI}
                                                />
                                            </div>
                                        );
                                    }
                                })
                        ) : sort == 'price_high_to_low' ? (
                            items
                                .sort((a, b) => b.GIA - a.GIA)
                                .map((item) => {
                                    if (item.TENTHELOAI.toLowerCase() === brand.toLowerCase()) {
                                        return (
                                            <div className={cx('col', 'l-3')} key={item.ID_SANPHAM}>
                                                <Products
                                                    id={item.ID_SANPHAM}
                                                    name={item.TENSANPHAM}
                                                    price={item.GIA}
                                                    imgID={item.ID_ANH}
                                                    soluong={item.SOLUONG}
                                                    description={item.GIOITHIEU}
                                                    thongso={item.THONGSO}
                                                    brand={item.TENTHELOAI}
                                                />
                                            </div>
                                        );
                                    }
                                })
                        ) : (
                            items.map((item) => {
                                if (item.TENTHELOAI.toLowerCase() === brand.toLowerCase()) {
                                    return (
                                        <div className={cx('col', 'l-3')} key={item.ID_SANPHAM}>
                                            <Products
                                                id={item.ID_SANPHAM}
                                                name={item.TENSANPHAM}
                                                price={item.GIA}
                                                imgID={item.ID_ANH}
                                                description={item.GIOITHIEU}
                                                thongso={item.THONGSO}
                                                soluong={item.SOLUONG}
                                                brand={item.TENTHELOAI}
                                            />
                                        </div>
                                    );
                                }
                            })
                        )
                    ) : (
                        <></>
                    )}
                </div>
            </>
        );
    }
}

export default MSI;
