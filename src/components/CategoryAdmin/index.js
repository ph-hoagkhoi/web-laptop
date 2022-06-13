import classNames from 'classnames/bind';
import styles from './CategoryAdmin.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useReducer, useEffect } from 'react';
import axios from 'axios';

import Button from '~/components/Button';
import { initStateBrand, detailBrandReducer } from '~/reducers/brandReducers';
import { setBrandName, setDesBrand } from '~/actions/brandActions';

const cx = classNames.bind(styles);

function AdminUser() {
    const [statusModal, setStatusModal] = useState(false);
    const [stateBrand, dispatchBrand] = useReducer(detailBrandReducer, initStateBrand);
    const [brandData, setBrandData] = useState([]);

    // Begin : Tickets
    const showBuyTickets = () => {
        // add class open vào hàm open đã viết bên CSS
        setStatusModal(true);
    };
    // ẩn
    const hideBuyTickets = () => {
        // remove class open vào hàm open đã viết bên CSS
        setStatusModal(false);
    };
    // End : Tickets

    useEffect(() => {
        getCourses();
    }, []);

    const getCourses = async () => {
        try {
            await axios
                .get('http://26.87.217.216:8080/api/theloai/get')
                .then(async (res) => setBrandData(res.data))
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleSubmitNewBrand({
            stateBrand,
        });
    };

    const handleSubmitNewBrand = (data) => {
        axios
            .post('http://26.87.217.216:8080/api/theloai/post', {
                type: 'create',
                data: stateBrand,
            })
            .then((response) => {
                getCourses();
            });
    };

    const handleSubmitDeleteBrand = ({ item }) => {
        if(window.confirm("Right u wanna cc!")){
            axios
            .post('http://26.87.217.216:8080/api/theloai/post', {
                type: 'delete',
                data: { ID_THELOAI: item.ID_THELOAI },
            })
            .then((response) => {
                getCourses();
            });
        }
    };

    return (
        <>
            {/* <!-- Begin adminCategoriesTable --> */}
            <div className={cx('category-header')}>
                <h2 className={cx('category-heading')}>Thêm danh mục</h2>
                <button className={cx('category-create-btn')} onClick={showBuyTickets}>
                    Thêm mới
                </button>
            </div>
            {brandData != 0 ? (
                <table className={cx('details-table')}>
                    <thead className={cx('details-thead')}>
                        <tr className={cx('details-title-list')}>
                            <td className={cx('details-title-item')}>ID danh mục</td>
                            <td className={cx('details-title-item')}>Tên Danh mục</td>
                            <td className={cx('details-title-item')}>Mô tả</td>
                        </tr>
                    </thead>
                    {brandData.map((item, index) => (
                        <tbody className={cx('details-tbody')} key={item.ID_THELOAI}>
                            <tr className={cx('details-content-list')}>
                                <td className={cx('details-content-item')}>{item.ID_THELOAI}</td>
                                <td className={cx('details-content-item')}>{item.TENTHELOAI}</td>
                                <td className={cx('details-content-item', 'details-content-item--maxwith')}>
                                    <span>{item.MOTATHELOAI}</span>
                                </td>
                                <td className={cx('details-content-item')}>
                                    <Button
                                        to={`/admin/category/${item.TENTHELOAI}`}
                                        state={{
                                            data: {
                                                ID_THELOAI: item.ID_THELOAI,
                                                TENTHELOAI: item.TENTHELOAI,
                                                MOTATHELOAI: item.MOTATHELOAI,
                                            },
                                        }}
                                        className={cx('details-content-item-btn')}
                                    >
                                        Sửa
                                    </Button>
                                </td>
                                <td className={cx('details-content-item')}>
                                    <button
                                        className={cx('details-content-item-btn')}
                                        onClick={(e) => handleSubmitDeleteBrand({ item })}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            ) : (
                <h2>Không có dữ liệu</h2>
            )}

            {/* <!-- End adminCategoriesTable --> */}
            {/* <!--Begin Modal --> */}
            <div
                className={cx('modal', statusModal ? 'open' : '')}
                // lắng nge ra ngoài ; khi click vào khoảng không của modal
                // (ở ngoài cái ticket) sẽ ĐÓNG ticket lại
                // modal.addEventListener('click', hideBuyTickets);
                onClick={hideBuyTickets}
            >
                <div
                    className={cx('modal-papes')}
                    // ngừng việc nỗi bọt lại;  sẽ không đóng modal container lại nửa (tới đó nó bị công an chặn lại)
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <div className={cx('modal-header')}>
                        <h2 className={cx('modal__heading')}>Thêm danh mục</h2>
                        <FontAwesomeIcon
                            className={cx('modal-header-icon--close')}
                            // nge hành vi click vào button close
                            onClick={hideBuyTickets}
                            icon={faXmark}
                        />
                    </div>
                    <form className={cx('category-list')} onSubmit={handleSubmit}>
                        <label htmlFor="" className={cx('input-label')}>
                            Tên danh mục
                        </label>
                        <input
                            className={cx('input-item')}
                            type="text"
                            placeholder="Tên danh mục"
                            onChange={(e) => dispatchBrand(setBrandName(e.target.value))}
                        />
                        <label htmlFor="" className={cx('input-label')}>
                            Mô tả danh mục
                        </label>
                        <textarea
                            className={cx('input-item-description')}
                            cols="54"
                            rows="10"
                            onChange={(e) => dispatchBrand(setDesBrand(e.target.value))}
                        ></textarea>
                        <button className={cx('btn')}>Save</button>
                    </form>
                </div>
            </div>
            {/* <!--End Modal --> */}
        </>
    );
}

export default AdminUser;
