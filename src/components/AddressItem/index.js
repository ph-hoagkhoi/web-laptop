import { useState, useReducer, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { initStateAddress, addressReducer } from '~/reducers/addressReducers';
import { setIDAccount, setInfoPhone, setInfoName, setAddress, setIDInfo } from '~/actions/addressActions';

import classNames from 'classnames/bind';
import styles from './AddressItem.module.scss';

const cx = classNames.bind(styles);

function AddressItem({ ID_GIAOHANG, ID_TAIKHOAN, TENNGUOINHAN, SDT, TENDIACHI, nonUpdate }) {
    const [statusModal, setStatusModal] = useState(false);
    const [stateAddress, dispatchAddress] = useReducer(addressReducer, initStateAddress);
    useEffect(() => {
        document.title = "Danh sách địa chỉ";
        dispatchAddress(setIDAccount(ID_TAIKHOAN));
        dispatchAddress(setIDInfo(ID_GIAOHANG));
        dispatchAddress(setInfoName(TENNGUOINHAN));
        dispatchAddress(setInfoPhone(SDT));
        dispatchAddress(setAddress(TENDIACHI));
    }, []);

    const showBuyTickets = () => {
        setStatusModal(true);
    };
    const hideBuyTickets = () => {
        setStatusModal(false);
    };
    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        await updateAddress({
            stateAddress,
        });
    };
    const updateAddress = async () => {
        await axios
            .post('http://26.87.217.216:8080/api/giaohang/post', {
                type: 'update',
                data: stateAddress,
            })
            .then((res) => {
                if (res.data == 1) {
                    alert('Cập nhật địa chỉ thành công');
                    window.location.reload();
                } else if (res.data == -1) {
                    alert('Cập nhật địa chỉ thất bại');
                }
            });
    };

    const deleteAddress = async () => {
        if (window.confirm('Bạn có chắc chắn muốn xóa địa chỉ này?')) {
            await axios
                .post('http://26.87.217.216:8080/api/giaohang/post', {
                    type: 'delete',
                    data: { ID_TAIKHOAN: ID_TAIKHOAN, ID_GIAOHANG: ID_GIAOHANG },
                })
                .then((res) => {
                    if (res.data == 1) {
                        alert('Xóa địa chỉ thành công');
                        window.location.reload();
                    } else if (res.data == -1) {
                        alert('Xóa địa chỉ thất bại');
                    }
                });
        }
    };
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('name')}>{TENNGUOINHAN}</div>
                    <div className={cx('address')}>{TENDIACHI}</div>
                    <div className={cx('phone')}>{SDT}</div>

                    <div className={cx('action')}>
                        {nonUpdate ? (
                            ''
                        ) : (
                            <button className={cx('update_btn')} onClick={showBuyTickets}>
                                Cập nhật
                            </button>
                        )}
                        <button className={cx('delete_btn')} onClick={deleteAddress}>
                            Xóa
                        </button>
                    </div>
                </div>
            </div>

            {/* Begin modal */}
            <div className={cx('modal', statusModal ? 'open' : '')} onClick={hideBuyTickets}>
                <div
                    className={cx('modal-detail')}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <div className={cx('modal-header')}>
                        <h2 className={cx('modal-heading')}>Cập nhật địa chỉ</h2>
                        <FontAwesomeIcon className={cx('modal--close')} icon={faXmark} onClick={hideBuyTickets} />
                    </div>

                    <form onSubmit={handleSubmitUpdate}>
                        <div className={cx('stock-list')}>
                            <div className={cx('info')}>
                                <label htmlFor="" className={cx('input-label')}>
                                    Tên người nhận
                                </label>
                                <input
                                    className={cx('input-item')}
                                    type="text"
                                    value={stateAddress.TENNGUOINHAN ? stateAddress.TENNGUOINHAN : null}
                                    placeholder="Tên người nhận"
                                    onChange={(e) => dispatchAddress(setInfoName(e.target.value))}
                                />
                            </div>
                            <div className={cx('info')}>
                                <label htmlFor="" className={cx('input-label')}>
                                    Địa chỉ
                                </label>
                                <input
                                    className={cx('input-item')}
                                    type="text"
                                    placeholder="Địa chỉ"
                                    value={stateAddress.TENDIACHI ? stateAddress.TENDIACHI : null}
                                    onChange={(e) => dispatchAddress(setAddress(e.target.value))}
                                />
                            </div>
                            <div className={cx('info')}>
                                <label htmlFor="" className={cx('input-label')}>
                                    Số điện thoại
                                </label>
                                <input
                                    maxLength={10}
                                    className={cx('input-item')}
                                    type="text"
                                    value={stateAddress.SDT ? stateAddress.SDT : null}
                                    placeholder="Số điện thoại"
                                    name="phone"
                                    onChange={(e) => dispatchAddress(setInfoPhone(e.target.value))}
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <button className={cx('btn')}>Save</button>
                    </form>
                </div>
            </div>
            {/* End modal */}
        </>
    );
}

export default AddressItem;
