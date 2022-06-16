import { useEffect, useState, useReducer } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './AdminSlider.module.scss';
import { initStateSlide, slideReducer } from '~/reducers/slideReducers';
import {
    setIMG1,
    setIMG2,
    setIMG3,
    setIMG4,
    deleteImg1,
    deleteImg2,
    deleteImg3,
    deleteImg4,
    addSlide,
} from '~/actions/slideActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AdminSlider() {
    const [stateSlide, dispatchSlide] = useReducer(slideReducer, initStateSlide);
    const [sliderData, setSliderData] = useState([]);

    useEffect(() => {
        axios.get(`http://26.87.217.216:8080/api/ctanh/get`).then((res) => {
            setSliderData(res.data);
            dispatchSlide(addSlide(res.data));
        });
    }, []);

    // Convert input sang base 64
    const uploadImage = async (e, callback) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        dispatchSlide(callback(base64));
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
        await handleSubmitSlide({
            stateSlide,
        });
    };

    const handleSubmitSlide = (data) => {
        axios
            .post('http://26.87.217.216:8080/api/ctanh/post', {
                type: 'update',
                data: stateSlide,
            })
            .then((res) => {
                if (res.data == 1) {
                    alert('Cập nhật Slider thành công');
                } else if (res.data == -1) {
                    alert('Cập nhật Slider thất bại !!\n Lỗi có thể do hình ảnh có dung lượng quá lớn');
                }
            });
    };

    const checkChangeSlide = () => {
        if (JSON.stringify(sliderData[0]) === JSON.stringify(stateSlide)) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <h2 className={cx('heading')}>Chỉnh sửa Slider</h2>
                </div>
                <div className={cx('wrapper_img')}>
                    <form className={cx('inner_img')} onSubmit={handleSubmit}>
                        <div className={cx('upload_box')}>
                            <div className={cx('file_upload')}>
                                <input
                                    type="file"
                                    className={cx('upload')}
                                    disabled={stateSlide.ANH1}
                                    onChange={(e) => uploadImage(e, setIMG1)}
                                />
                                <FontAwesomeIcon
                                    icon={faArrowUp}
                                    className={cx(stateSlide.ANH1 ? 'fadeout' : '')}
                                ></FontAwesomeIcon>
                                <div className={cx('img_box', stateSlide.ANH1 != '' ? 'fadein' : '')}>
                                    <img alt="" className={cx('img')} src={stateSlide.ANH1} />
                                    <div className={cx('delete_box', stateSlide.ANH1 != '' ? 'active' : '')}>
                                        <FontAwesomeIcon
                                            icon={faXmark}
                                            className={cx('btn_delete')}
                                            onClick={(e) => dispatchSlide(deleteImg1())}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={cx('file_upload')}>
                                <input
                                    type="file"
                                    className={cx('upload')}
                                    disabled={stateSlide.ANH2}
                                    onChange={(e) => uploadImage(e, setIMG2)}
                                />
                                <FontAwesomeIcon
                                    icon={faArrowUp}
                                    className={cx(stateSlide.ANH2 ? 'fadeout' : '')}
                                ></FontAwesomeIcon>
                                <div className={cx('img_box', stateSlide.ANH2 != '' ? 'fadein' : '')}>
                                    <img alt="" className={cx('img')} src={stateSlide.ANH2} />
                                    <div className={cx('delete_box', stateSlide.ANH2 != '' ? 'active' : '')}>
                                        <FontAwesomeIcon
                                            icon={faXmark}
                                            className={cx('btn_delete')}
                                            onClick={(e) => dispatchSlide(deleteImg2())}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('upload_box')}>
                            <div className={cx('file_upload')}>
                                <input
                                    type="file"
                                    className={cx('upload')}
                                    disabled={stateSlide.ANH3}
                                    onChange={(e) => uploadImage(e, setIMG3)}
                                />
                                <FontAwesomeIcon
                                    icon={faArrowUp}
                                    className={cx(stateSlide.ANH3 ? 'fadeout' : '')}
                                ></FontAwesomeIcon>
                                <div className={cx('img_box', stateSlide.ANH3 != '' ? 'fadein' : '')}>
                                    <img alt="" className={cx('img')} src={stateSlide.ANH3} />
                                    <div className={cx('delete_box', stateSlide.ANH3 != '' ? 'active' : '')}>
                                        <FontAwesomeIcon
                                            icon={faXmark}
                                            className={cx('btn_delete')}
                                            onClick={(e) => dispatchSlide(deleteImg3())}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={cx('file_upload')}>
                                <input
                                    type="file"
                                    className={cx('upload')}
                                    disabled={stateSlide.ANH4}
                                    onChange={(e) => uploadImage(e, setIMG4)}
                                />
                                <FontAwesomeIcon
                                    icon={faArrowUp}
                                    className={cx(stateSlide.ANH4 ? 'fadeout' : '')}
                                ></FontAwesomeIcon>
                                <div className={cx('img_box', stateSlide.ANH4 != '' ? 'fadein' : '')}>
                                    <img alt="" className={cx('img')} src={stateSlide.ANH4} />
                                    <div className={cx('delete_box', stateSlide.ANH4 != '' ? 'active' : '')}>
                                        <FontAwesomeIcon
                                            icon={faXmark}
                                            className={cx('btn_delete')}
                                            onClick={(e) => dispatchSlide(deleteImg4())}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className={cx('btn_update')} disabled={checkChangeSlide()}>
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AdminSlider;
