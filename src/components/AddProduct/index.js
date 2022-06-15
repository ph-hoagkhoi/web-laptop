import classNames from 'classnames/bind';
import styles from './AddProduct.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faChevronDown, faChevronUp, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useReducer, useEffect } from 'react';
import axios from 'axios';
import config from '~/config';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { initState, productDetailsReducer } from '~/reducers/productReducers';
import {
    setID,
    setName,
    setPrice,
    setDescription,
    setImg,
    deleteImg,
    setBrand,
    setSoLuong,
    setThongSo,
} from '~/actions/productActions';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function AddProduct() {
    const [state, dispatch] = useReducer(productDetailsReducer, initState);
    const [brandData, setBrandData] = useState([]);
    let location = useLocation();
    let navigate = useNavigate();

    useEffect(() => {
        document.title = 'Thêm sản phẩm';
        if (location.state) {
            if (location.state.data) {
                dispatch(setID(location.state.data.ID_SANPHAM));
                dispatch(setDescription(location.state.data.GIOITHIEU));
                dispatch(setPrice(location.state.data.GIA));
                dispatch(setName(location.state.data.TENSANPHAM));
                dispatch(setThongSo(location.state.data.THONGSO));
                dispatch(setSoLuong(location.state.data.SOLUONG));

                axios
                    .post('http://26.87.217.216:8080/api/ctanh/post', {
                        type: 'get',
                        data: { ID_ANH: location.state.data.ID_ANH },
                    })
                    .then((res) => {
                        var array = Object.keys(res.data[0])
                            .filter((key) => key !== 'ID_ANH')
                            .map(function (key) {
                                return res.data[0][key];
                            });

                        if (array[0] != '') {
                            dispatch(setImg(array[0]));
                        }
                        if (array[1] != '') {
                            dispatch(setImg(array[1]));
                        }
                        if (array[2] != '') {
                            dispatch(setImg(array[2]));
                        }

                        if (array[3] != '') {
                            dispatch(setImg(array[3]));
                        }
                    });

                axios
                    .post('http://26.87.217.216:8080/api/theloai/post', {
                        type: 'get',
                        data: { ID_THELOAI: location.state.data.ID_THELOAI },
                    })
                    .then((res) => {
                        dispatch(setBrand(res.data[0]));
                    });
            }
        }
        axios.post('http://26.87.217.216:8080/api/theloai/get').then((res) => {
            setBrandData(res.data);
        });
    }, []);

    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        const response = await handleSubmitUpdateProduct({
            state,
        });
    };

    const handleSubmitUpdateProduct = (data) => {
        axios
            .post('http://26.87.217.216:8080/api/sanpham/post', {
                type: 'update',
                data: state,
            })
            .then((response) => {
                // console.log(response.data);
                if ((response.data != 0) & (response.data != -1)) {
                    alert('Sửa thành công!');
                    navigate('/admin/product');
                }
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await handleSubmitLogin({
            state,
        });
    };

    const handleSubmitLogin = (data) => {
        axios
            .post('http://26.87.217.216:8080/api/sanpham/post', {
                type: 'create',
                data: state,
            })
            .then((response) => {
                console.log(response.data);
                if (response.data == 1) {
                    alert('Thêm sản phẩm thành công!');
                    navigate('/admin/product');
                }
            });
    };

    // Convert input sang base 64
    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        dispatch(setImg(base64));
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
                <div className={cx('inner')}>
                    <h2 className={cx('heading')}>Thêm sản phẩm</h2>
                    <Button
                        rightIcon={<FontAwesomeIcon icon={faXmark} />}
                        to={config.routes.adminProduct}
                        className={cx('close-btn')}
                    >
                        Hủy
                    </Button>
                </div>
                <form className={cx('product')} onSubmit={location.state ? handleSubmitUpdate : handleSubmit}>
                    <div className={cx('group')}>
                        <div className={cx('info')}>
                            <label htmlFor="idproduct" className={cx('info-heading')}>
                                Mã sản phẩm
                            </label>
                            <input
                                disabled={location.state ? true : false}
                                className={cx('info-txt')}
                                id="idproduct"
                                type="text"
                                value={location.state ? state.ID_SANPHAM : null}
                                placeholder="Mã sản phẩm"
                                onChange={(e) => dispatch(setID(e.target.value))}
                            />
                        </div>
                        <div className={cx('info')}>
                            <label htmlFor="name" className={cx('info-heading')}>
                                Tên sản phẩm
                            </label>
                            <input
                                className={cx('info-txt')}
                                type="text"
                                id="name"
                                value={location.state ? state.TENSANPHAM : null}
                                placeholder="Tên sản phẩm"
                                onChange={(e) => dispatch(setName(e.target.value))}
                            />
                        </div>
                    </div>
                    <div className={cx('group')}>
                        <div className={cx('info')}>
                            <label htmlFor="price" className={cx('info-heading')}>
                                Giá tiền
                            </label>
                            <input
                                className={cx('info-txt')}
                                type="text"
                                id="price"
                                value={location.state ? state.GIA : null}
                                placeholder="Giá tiền"
                                onChange={(e) => dispatch(setPrice(e.target.value))}
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                            />
                        </div>
                        <div className={cx('info')}>
                            <label htmlFor="quantity" className={cx('info-heading')}>
                                Số lượng
                            </label>
                            <input
                                className={cx('info-txt')}
                                type="number"
                                id="quantity"
                                placeholder="Số lượng"
                                value={location.state ? state.SOLUONG : null}
                                onChange={(e) => dispatch(setSoLuong(e.target.value))}
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className={cx('group')}>
                        <div className={cx('select-box')}>
                            <input type="checkbox" className={cx('select_view')} />
                            <div className={cx('select-button')}>
                                <div className={cx('selected-value')}>
                                    <span>
                                        {location.state
                                            ? state.ID_THELOAI.TENTHELOAI
                                            : brandData != 0
                                            ? 'Chọn thương hiệu'
                                            : 'Chưa có thương hiệu'}
                                    </span>
                                </div>
                                <div className={cx('chevrons')}>
                                    <FontAwesomeIcon className={cx('action-show')} icon={faChevronUp} />
                                    <FontAwesomeIcon className={cx('action-show')} icon={faChevronDown} />
                                </div>
                            </div>
                            <div className={cx('options')}>
                                {brandData != 0 ? (
                                    brandData.map((brand) => {
                                        return (
                                            <div className={cx('option')} key={brand.ID_THELOAI}>
                                                <input
                                                    className={cx('s-c', 'top')}
                                                    type="radio"
                                                    name="brand"
                                                    value={brand.ID_THELOAI}
                                                    onChange={(e) => dispatch(setBrand(e.target.value))}
                                                />
                                                <input
                                                    className={cx('s-c', 'bottom')}
                                                    type="radio"
                                                    name="brand"
                                                    value={brand.ID_THELOAI}
                                                    onChange={(e) => dispatch(setBrand(e.target.value))}
                                                />
                                                <FontAwesomeIcon
                                                    icon={faFacebook}
                                                    className={cx('logo_brand')}
                                                ></FontAwesomeIcon>
                                                <span className={cx('item_label')}>{brand.TENTHELOAI}</span>
                                                <span className={cx('opt-val')}>{brand.TENTHELOAI}</span>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <></>
                                )}
                                <div className={cx('option-bg')}></div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('description')}>
                        <div className={cx('description_item')}>
                            <h2 className={cx('item_heading')}>Mô tả sản phẩm</h2>
                            <CKEditor
                                className={cx('item_content')}
                                editor={ClassicEditor}
                                data={location.state ? location.state.data.GIOITHIEU : ''}
                                onChange={(e, editor) => {
                                    const data = editor.getData();
                                    dispatch(setDescription(data));
                                }}
                            />
                        </div>

                        <div className={cx('description_item')}>
                            <h2 className={cx('item_heading')}>Thông số kỹ thuật</h2>
                            <CKEditor
                                className={cx('item_content')}
                                editor={ClassicEditor}
                                data={location.state ? location.state.data.THONGSO : ''}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    dispatch(setThongSo(data));
                                }}
                            />
                        </div>
                    </div>

                    <div className={cx('product_img')}>
                        <div className={cx('img_item')}>
                            <div className={cx('file_upload')}>
                                <input
                                    className={cx('upload')}
                                    type="file"
                                    disabled={state.IMG[0]}
                                    onChange={(e) => uploadImage(e)}
                                />
                                <FontAwesomeIcon
                                    icon={faArrowUp}
                                    className={cx(state.IMG[0] ? 'fadeout' : '')}
                                ></FontAwesomeIcon>
                                <div className={cx('img_box', state.IMG[0] ? 'fadein' : '')}>
                                    <img alt="" className={cx('img')} src={state.IMG[0] ? state.IMG[0] : ''} />
                                    <div className={cx('delete_box', state.IMG[0] ? 'active' : '')}>
                                        <FontAwesomeIcon
                                            icon={faXmark}
                                            className={cx('btn_delete')}
                                            onClick={(e) => dispatch(deleteImg(state.IMG[0]))}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={cx('img_item')}>
                            <div className={cx('file_upload')}>
                                <input
                                    className={cx('upload')}
                                    type="file"
                                    disabled={state.IMG[1]}
                                    onChange={(e) => uploadImage(e)}
                                />
                                <FontAwesomeIcon
                                    icon={faArrowUp}
                                    className={cx(state.IMG[1] ? 'fadeout' : '')}
                                ></FontAwesomeIcon>
                                <div className={cx('img_box', state.IMG[1] ? 'fadein' : '')}>
                                    <img alt="" className={cx('img')} src={state.IMG[1] ? state.IMG[1] : ''} />
                                    <div className={cx('delete_box', state.IMG[1] ? 'active' : '')}>
                                        <FontAwesomeIcon
                                            icon={faXmark}
                                            className={cx('btn_delete')}
                                            onClick={(e) => dispatch(deleteImg(state.IMG[1]))}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={cx('img_item')}>
                            <div className={cx('file_upload')}>
                                <input
                                    className={cx('upload')}
                                    type="file"
                                    disabled={state.IMG[2]}
                                    onChange={(e) => uploadImage(e)}
                                />
                                <FontAwesomeIcon
                                    icon={faArrowUp}
                                    className={cx(state.IMG[2] ? 'fadeout' : '')}
                                ></FontAwesomeIcon>
                                <div className={cx('img_box', state.IMG[2] ? 'fadein' : '')}>
                                    <img alt="" className={cx('img')} src={state.IMG[2] ? state.IMG[2] : ''} />
                                    <div className={cx('delete_box', state.IMG[2] ? 'active' : '')}>
                                        <FontAwesomeIcon
                                            icon={faXmark}
                                            className={cx('btn_delete')}
                                            onClick={(e) => dispatch(deleteImg(state.IMG[2]))}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={cx('img_item')}>
                            <div className={cx('file_upload')}>
                                <input
                                    className={cx('upload')}
                                    type="file"
                                    disabled={state.IMG[3]}
                                    onChange={(e) => uploadImage(e)}
                                />
                                <FontAwesomeIcon
                                    icon={faArrowUp}
                                    className={cx(state.IMG[3] ? 'fadeout' : '')}
                                ></FontAwesomeIcon>
                                <div className={cx('img_box', state.IMG[3] ? 'fadein' : '')}>
                                    <img alt="" className={cx('img')} src={state.IMG[3] ? state.IMG[3] : ''} />
                                    <div className={cx('delete_box', state.IMG[3] ? 'active' : '')}>
                                        <FontAwesomeIcon
                                            icon={faXmark}
                                            className={cx('btn_delete')}
                                            onClick={(e) => dispatch(deleteImg(state.IMG[3]))}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className={cx('btn_add')}>Save</button>
                </form>
            </div>
        </>
    );
}

export default AddProduct;
