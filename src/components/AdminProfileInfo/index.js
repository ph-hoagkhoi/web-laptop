import classNames from 'classnames/bind';
import styles from './AdminProfileInfo.module.scss';
import { useReducer, useEffect, useState } from 'react';
import { initStateUser, userReducer } from '~/reducers/userReducers';

import {
    setIDAccount,
    setFullName,
    setGender,
    setEmail,
    setNumberPhone,
    setDateOfBirth,
    setCCCD,
    setPassword,
    setAvatar,
    deleteAvatar,
} from '~/actions/userActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function ProfileInfo() {
    const [cookies, setCookies] = useCookies(['name']);
    const [stateUser, dispatchUser] = useReducer(userReducer, initStateUser);
    const [password, setPassword] = useState('');
    let navigate = useNavigate();
    console.log(stateUser);
    useEffect(() => {
        if (cookies.name) {
            dispatchUser(setIDAccount(cookies.name.ID));
            axios
                .post('http://26.87.217.216:8080/api/taikhoan/post', {
                    type: 'get',
                    data: { ID_TAIKHOAN: cookies.name.ID },
                })
                .then((res) => {
                    dispatchUser(setFullName(res.data[0].HOVATEN));
                    dispatchUser(setGender(res.data[0].GIOITINH));
                    dispatchUser(setCCCD(res.data[0].CCCD));
                    dispatchUser(setEmail(res.data[0].EMAIL));
                    dispatchUser(setNumberPhone(res.data[0].SDT));
                    dispatchUser(setDateOfBirth(res.data[0].NAMSINH));
                    setPassword(res.data[0].MATKHAU);
                    dispatchUser(setAvatar(res.data[0].HINHANH));
                });
        } else {
            navigate('/login');
        }
    }, []);

    // Convert input sang base 64
    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        dispatchUser(setAvatar(base64));
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios
            .post('http://26.87.217.216:8080/api/taikhoan/post', {
                type: 'update',
                data: stateUser,
            })
            .then((res) => {
                    console.log(res.data);
                // if (res.data == 1) {
                //     alert('Cập nhật thành công');
                //     window.location.reload();
                // }
            });
    };

    return (
        <>
            <h2 className={cx('title')}>Thông tin tài khoản</h2>
            <form className={cx('profile')} onSubmit={handleSubmit}>
                <div className={cx('product_img')}>
                    <div className={cx('img_item')}>
                        <div className={cx('file_upload')}>
                            <input
                                className={cx('upload')}
                                type="file"
                                disabled={stateUser.HINHANH}
                                onChange={(e) => uploadImage(e)}
                            />
                            <FontAwesomeIcon
                                icon={faArrowUp}
                                className={cx(stateUser.HINHANH ? 'fadeout' : '')}
                            ></FontAwesomeIcon>
                            <div className={cx('img_box', stateUser.HINHANH ? 'fadein' : '')}>
                                <img alt="" className={cx('img')} src={stateUser.HINHANH ? stateUser.HINHANH : ''} />
                                <div className={cx('delete_box', stateUser.HINHANH ? 'active' : '')}>
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        className={cx('btn_delete')}
                                        onClick={(e) => dispatchUser(deleteAvatar())}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('info')}>
                    <input
                        type="text"
                        className={cx('info_txt')}
                        id="full-name"
                        required
                        value={stateUser.HOVATEN ? stateUser.HOVATEN : null}
                        onChange={(e) => dispatchUser(setFullName(e.target.value))}
                    />
                    <label htmlFor="full-name" className={cx('info_label')}>
                        Họ và Tên
                    </label>
                </div>
                <div className={cx('info')}>
                    <input
                        type="email"
                        className={cx('info_txt')}
                        id="user_email"
                        required
                        value={stateUser.EMAIL ? stateUser.EMAIL : null}
                        onChange={(e) => dispatchUser(setEmail(e.target.value))}
                    />
                    <label htmlFor="user_email" className={cx('info_label')}>
                        Email
                    </label>
                </div>
                <div className={cx('info')}>
                    <input
                        type="password"
                        className={cx('info_txt')}
                        id="user_password"
                        value={password}
                        autoComplete="off"
                        onChange={(e) => e.target.value}
                    />
                    <label htmlFor="user_password" className={cx('info_label')}>
                        Mật khẩu
                    </label>
                </div>
                <div className={cx('info')}>
                    <input
                        type="text"
                        className={cx('info_txt')}
                        id="gender"
                        maxLength="5"
                        value={stateUser.GIOITINH ? stateUser.GIOITINH : null}
                        onChange={(e) => dispatchUser(setGender(e.target.value))}
                    />
                    <label htmlFor="gender" className={cx('info_label')}>
                        Giới tính
                    </label>
                </div>
                <div className={cx('info')}>
                    <input
                        type="text"
                        className={cx('info_txt')}
                        id="phone-number"
                        required
                        maxLength="10"
                        value={stateUser.SDT ? stateUser.SDT : null}
                        onChange={(e) => dispatchUser(setNumberPhone(e.target.value))}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                    />
                    <label htmlFor="phone-number" className={cx('info_label')}>
                        Số điện thoại
                    </label>
                </div>
                <div className={cx('info')}>
                    {/* cmt = chứng minh thư */}
                    <input
                        type="text"
                        className={cx('info_txt')}
                        id="user_cmt"
                        required
                        maxLength="12"
                        value={stateUser.CCCD ? stateUser.CCCD : null}
                        onChange={(e) => dispatchUser(setCCCD(e.target.value))}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                    />
                    <label htmlFor="user_cmt" className={cx('info_label')}>
                        CCCD/CMND
                    </label>
                </div>
                <div className={cx('info')}>
                    <input
                        type="date"
                        className={cx('info_txt')}
                        id="user_date"
                        required
                        value={stateUser.NAMSINH ? stateUser.NAMSINH : null}
                        onChange={(e) => dispatchUser(setDateOfBirth(e.target.value))}
                    />
                    <label htmlFor="user_date" className={cx('info_label')}>
                        Ngày sinh
                    </label>
                </div>
                <button className={cx('update_btn')} type="update">
                    Cập nhật
                </button>
            </form>
        </>
    );
}

export default ProfileInfo;
