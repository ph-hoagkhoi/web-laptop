import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';
import Image from '~/components/Image';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';

const cx = classNames.bind(styles);

function ProductItem({ TENTHELOAI, ANH1, TENSANPHAM, GIA, ID_SANPHAM, GIOITHIEU, THONGSO, imgProducts }) {
    console.log(imgProducts);
    return (
        <Link
            to={`/laptop/${ID_SANPHAM}`}
            state={{
                data: {
                    ID_SANPHAM: ID_SANPHAM,
                    TENSANPHAM: TENSANPHAM,
                    GIOITHIEU: GIOITHIEU,
                    THONGSO :THONGSO,
                    TENTHELOAI: TENTHELOAI,
                    GIA: GIA,
                    IMAGE: imgProducts,
                },
            }}
            className={cx('wrapper')}
        >
            <Image className={cx('avatar')} src={ANH1} alt={TENSANPHAM} />
            <div className={cx('info')}>
                <div className={cx('box_name')}>
                    <h4 className={cx('name')}>
                        <span>{TENSANPHAM} </span>
                    </h4>
                    <span className={cx('username')}>{TENTHELOAI}</span>
                </div>
                <div className={cx('box_price')}>
                    <span className={cx('price')}>
                        <NumberFormat value={GIA} displayType={'text'} thousandSeparator={true} suffix={'đ'} />
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default ProductItem;
