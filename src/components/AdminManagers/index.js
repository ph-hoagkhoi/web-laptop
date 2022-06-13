import classNames from 'classnames/bind';
import styles from './AdminManagers.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { initStateUser, userReducer } from '~/reducers/userReducers';
import {
    setAvatar,
    setFullName,
    setGender,
    setEmail,
    setNumberPhone,
    setDateOfBirth,
    deleteAvatar,
} from '~/actions/userActions';
import { initStateRegister, registerReducer } from '~/reducers/registerReducers';
import { setNameRegister, setPasswordRegister } from '~/actions/registerActions';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function AdminManagers() {
    const [statusModal, setStatusModal] = useState(false);
    const [managerData, setManagerData] = useState([]);
    const [stateTK, dispatchTK] = useReducer(registerReducer, initStateRegister);
    const [stateInfo, dispatchInfo] = useReducer(userReducer, initStateUser);

    useEffect(() => {
        getManager();
    }, []);

    const getManager = async () => {
        try {
            await axios
                .post('http://26.87.217.216:8080/api/taikhoan/nhanvien', {
                    type: 'get',
                })
                .then((res) => {
                    setManagerData(res.data);
                });
        } catch (e) {
            console.log(e);
        }
    };

    const handleSubmit = async () => {
        await axios.get('http://26.87.217.216:8080/api/taikhoan/nhanvien').then((res) => console.log(res.data));
    };

    const showBuyTickets = () => {
        setStatusModal(true);
    };

    const hideBuyTickets = () => {
        setStatusModal(false);
    };

    // Convert input sang base 64
    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        dispatchInfo(setAvatar(base64));
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
            {/* <!-- Begin adminManagers --> */}
            <div className={cx('managers-header')}>
                <h2 className={cx('managers-heading')}>Danh sách nhân viên</h2>
                <Button className={cx('managers-create-btn')} onClick={showBuyTickets}>
                    Thêm mới
                </Button>
            </div>
            <table className={cx('details-table')}>
                <thead className={cx('details-thead')}>
                    <tr className={cx('details-title-list')}>
                        <td className={cx('details-title-item')}>ID Nhân viên</td>
                        <td className={cx('details-title-item')}>Tên nhân viên</td>
                        <td className={cx('details-title-item')}>Giới tính</td>
                        <td className={cx('details-title-item')}>Năm sinh</td>
                        <td className={cx('details-title-item')}>Email</td>
                        <td className={cx('details-title-item')}>Hình ảnh</td>
                        <td className={cx('details-title-item')}>Tên tài khoản</td>
                        <td className={cx('details-title-item')}>Mật khẩu</td>
                    </tr>
                </thead>
                {/* <!-- item 1 --> */}
                {managerData.map((managerData, index) => {
                    return (
                        <tbody className={cx('details-tbody')}>
                            <tr className={cx('details-content-list')}>
                                <td className={cx('details-content-item')}>{managerData.ID_TAIKHOAN}</td>
                                <td className={cx('details-content-item')}>{managerData.HOVATEN}</td>
                                <td className={cx('details-content-item')}>{managerData.GIOITINH}</td>
                                <td className={cx('details-content-item')}>{managerData.NAMSINH}</td>
                                <td className={cx('details-content-item')}>{managerData.EMAIL}</td>
                                <td className={cx('details-content-item')}>
                                    <img src={managerData.HINHANH} className={cx('content-img')} />
                                </td>
                                <td className={cx('details-content-item')}>{managerData.TENTAIKHOAN}</td>
                                <td className={cx('details-content-item')}>{managerData.MATKHAU}</td>
                                <td className={cx('details-content-item')}>
                                    <Button className={cx('details-content-item-btn')}>Sửa</Button>
                                </td>
                                <td className={cx('details-content-item')}>
                                    <Button className={cx('details-content-item-btn')}>Xóa</Button>
                                </td>
                            </tr>
                        </tbody>
                    );
                })}
            </table>
            {/* <!-- End adminManagers --> */}
            {/* modal */}
            <div className={cx('modal', statusModal ? 'open' : '')} onClick={hideBuyTickets}>
                <div
                    className={cx('modal-detail')}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <div className={cx('modal-header')}>
                        <h2 className={cx('modal-heading')}>Thêm nhân viên</h2>
                        <FontAwesomeIcon className={cx('modal--close')} icon={faXmark} onClick={hideBuyTickets} />
                    </div>

                    <form>
                        <div className={cx('managers-list')}>
                            <div className={cx('managers-list-info-left')}>
                                <div className={cx('info')}>
                                    <label htmlFor="" className={cx('input-label')}>
                                        Tên khách hàng
                                    </label>
                                    <input
                                        className={cx('input-item')}
                                        type="text"
                                        placeholder="Tên khách hàng"
                                        onChange={(e) => dispatchInfo(setFullName(e.target.value))}
                                    />
                                </div>

                                <div className={cx('info')}>
                                    <label htmlFor="" className={cx('input-label')}>
                                        Giới tính
                                    </label>
                                    <input
                                        className={cx('input-item')}
                                        type="text"
                                        placeholder=" Giới tính"
                                        onChange={(e) => dispatchInfo(setGender(e.target.value))}
                                    />
                                </div>

                                <div className={cx('info')}>
                                    <label htmlFor="" className={cx('input-label')}>
                                        Năm sinh
                                    </label>
                                    <input
                                        className={cx('input-item')}
                                        type="text"
                                        placeholder="Năm sinh"
                                        onChange={(e) => dispatchInfo(setDateOfBirth(e.target.value))}
                                    />
                                </div>

                                <div className={cx('info')}>
                                    <label htmlFor="" className={cx('input-label')}>
                                        Số điện thoại
                                    </label>
                                    <input
                                        className={cx('input-item')}
                                        type="text"
                                        placeholder="Số điện thoại"
                                        onChange={(e) => dispatchInfo(setNumberPhone(e.target.value))}
                                    />
                                </div>

                                <div className={cx('info')}>
                                    <label htmlFor="" className={cx('input-label')}>
                                        Email
                                    </label>
                                    <input
                                        className={cx('input-item')}
                                        type="text"
                                        placeholder="Email"
                                        onChange={(e) => dispatchInfo(setEmail(e.target.value))}
                                    />
                                </div>
                            </div>

                            <div className={cx('managers-list-info-right')}>
                                <div className={cx('product_img')}>
                                    <div className={cx('img_item')}>
                                        <div className={cx('file_upload')}>
                                            <input
                                                className={cx('upload')}
                                                type="file"
                                                disabled={stateInfo.HINHANH}
                                                onChange={(e) => uploadImage(e)}
                                            />
                                            <FontAwesomeIcon
                                                icon={faArrowUp}
                                                className={cx(stateInfo.HINHANH ? 'fadeout' : '')}
                                            ></FontAwesomeIcon>
                                            <div className={cx('img_box', stateInfo.HINHANH ? 'fadein' : '')}>
                                                <img
                                                    alt=""
                                                    className={cx('img')}
                                                    src={stateInfo.HINHANH ? stateInfo.HINHANH : ''}
                                                />
                                                <div className={cx('delete_box', stateInfo.HINHANH ? 'active' : '')}>
                                                    <FontAwesomeIcon
                                                        icon={faXmark}
                                                        className={cx('btn_delete')}
                                                        onClick={(e) => dispatchInfo(deleteAvatar())}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('info')}>
                                    <label htmlFor="" className={cx('input-label')}>
                                        Tạo tài khoản
                                    </label>
                                    <input
                                        className={cx('input-item')}
                                        type="text"
                                        placeholder=" Tạo tài khoảnn"
                                        onChange={(e) => dispatchTK(setNameRegister(e.target.value))}
                                    />
                                </div>

                                <div className={cx('info')}>
                                    <label htmlFor="" className={cx('input-label')}>
                                        Mật khẩu
                                    </label>
                                    <input
                                        className={cx('input-item')}
                                        type="password"
                                        placeholder="Mật khẩu"
                                        autoComplete="off"
                                        onChange={(e) => dispatchTK(setPasswordRegister(e.target.value))}
                                    />
                                </div>
                            </div>
                        </div>

                        <button className={cx('btn')}>Save</button>
                    </form>
                </div>
            </div>
            {/* modal */}
        </>
    );
}

export default AdminManagers;
