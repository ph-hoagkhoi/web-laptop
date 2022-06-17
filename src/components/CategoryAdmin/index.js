import classNames from 'classnames/bind';
import styles from './CategoryAdmin.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useState, useReducer, useEffect } from 'react';
import axios from 'axios';

import Button from '~/components/Button';
import { initStateBrand, detailBrandReducer } from '~/reducers/brandReducers';
import { setBrandName, setDesBrand, setImgBrand, deleteImgBrand } from '~/actions/brandActions';

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
        document.title = 'Danh mục';
    }, []);

    const getCourses = async () => {
        try {
            await axios
                .get('http://localhost:8080/api/theloai/get')
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
        try {
            if (window.confirm('Bạn có chắc chắn muốn thêm thương hiệu này không?')) {
                axios
                    .post('http://localhost:8080/api/theloai/post', {
                        type: 'create',
                        data: stateBrand,
                    })
                    .then((res) => {
                        if (res.data == 1) {
                            alert('Thêm thương hiệu thành công');
                            setStatusModal(false);
                            getCourses();
                        } else if (res.data == -1) {
                            alert('Thêm thương hiệu thất bại');
                        }
                    });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmitDeleteBrand = ({ item }) => {
        try {
            if (window.confirm('Bạn thật sự muốn xóa!!')) {
                axios
                    .post('http://localhost:8080/api/theloai/post', {
                        type: 'delete',
                        data: { ID_THELOAI: item.ID_THELOAI },
                    })
                    .then((res) => {
                        if (res.data == 1) {
                            alert('Xóa thương hiệu thành công');
                            getCourses();
                        } else if (res.data == -1) {
                            alert('Xóa thương hiệu thất bại');
                        }
                    });
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Convert input sang base 64
    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        dispatchBrand(setImgBrand(base64));
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    return (
        <>
            <div className={cx('wrapper')}>
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
                                <td className={cx('details-title-item')}>Ảnh</td>
                                <td className={cx('details-title-item')}>Mô tả</td>
                            </tr>
                        </thead>
                        {brandData.map((item, index) => (
                            <tbody className={cx('details-tbody')} key={item.ID_THELOAI}>
                                <tr className={cx('details-content-list')}>
                                    <td className={cx('details-content-item')}>{item.ID_THELOAI}</td>
                                    <td className={cx('details-content-item')}>{item.TENTHELOAI}</td>
                                    <td className={cx('details-content-item')}>
                                        <img className={cx('details-content-item-img')} src={item.ANHMOTA} />
                                    </td>
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
                                                    ANHMOTA: item.ANHMOTA,
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
                            <div className={cx('product_img')}>
                                <div className={cx('img_item')}>
                                    <div className={cx('file_upload')}>
                                        <input
                                            className={cx('upload')}
                                            type="file"
                                            disabled={stateBrand.ANHMOTA}
                                            onChange={(e) => uploadImage(e)}
                                        />
                                        <FontAwesomeIcon
                                            icon={faArrowUp}
                                            className={cx(stateBrand.ANHMOTA ? 'fadeout' : '')}
                                        ></FontAwesomeIcon>
                                        <div className={cx('img_box', stateBrand.ANHMOTA ? 'fadein' : '')}>
                                            <img
                                                alt={stateBrand.TENTHELOAI ? stateBrand.TENTHELOAI : ''}
                                                className={cx('img')}
                                                src={stateBrand.ANHMOTA ? stateBrand.ANHMOTA : ''}
                                            />
                                            <div className={cx('delete_box', stateBrand.ANHMOTA ? 'active' : '')}>
                                                <FontAwesomeIcon
                                                    icon={faXmark}
                                                    className={cx('btn_delete')}
                                                    onClick={(e) => dispatchBrand(deleteImgBrand(stateBrand.ANHMOTA))}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

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
            </div>
        </>
    );
}

export default AdminUser;
