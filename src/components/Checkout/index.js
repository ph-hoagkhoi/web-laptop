import classNames from 'classnames/bind';
import styles from './Checkout.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef } from 'react';

const cx = classNames.bind(styles);

function Checkout() {
    const [statusModal, setStatusModal] = useState(false);

    const showBuyTickets = () => {
        setStatusModal(true);
    };

    const hideBuyTickets = () => {
        setStatusModal(false);
    };

    return (
        <>
            <div className={cx('container')}>
                <h1 className={cx('heading-primary')}>Accordion Checkout</h1>
                <div className={cx('accordion')}>
                    <div className={cx('accordion-content')}>
                        {/* accordion tab 2 - Shipping Info  */}
                        <a
                            href="#accordion2"
                            aria-expanded="false"
                            aria-controls="accordion2"
                            className={cx('accordion-title', 'js-accordionTrigger')}
                        >
                            Shipping Information
                        </a>
                        <div
                            className={cx('accordion-content', 'accordionItem is-collapsed')}
                            id="accordion2"
                            aria-hidden="true"
                        >
                            <div className={cx('container-fluid')}>
                                <div className={cx('main-container', 'grid', 'wide')}>
                                    <div className={cx('row')}>
                                        <div className={cx('col', 'l-12')}>
                                            <div className={cx('address-name')}>
                                                <p id="first-name">Hoàng Khải</p>
                                                <p id="address">cần thơ</p>
                                                <p id="number">0981242344</p>
                                                <div className={cx('action')}>
                                                    <button className={cx('update')}>Update</button>
                                                    <button className={cx('delete')}>Delete</button>
                                                </div>
                                            </div>
                                            <div>
                                                <button className={cx('address-btn')} onClick={showBuyTickets}>
                                                    Add Address
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* end accordion  */}
            </div>

            <div className={cx('modal', statusModal ? 'open' : '')} onClick={hideBuyTickets}>
                <div
                    className={cx('modal-detail')}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <div className={cx('modal-header')}>
                        <h2 className={cx('modal-heading')}>Thêm địa chỉ</h2>
                        <FontAwesomeIcon className={cx('modal--close')} icon={faXmark} onClick={hideBuyTickets} />
                    </div>

                    <form>
                        <div className={cx('address-list')}>
                            <div className={cx('info')}>
                                <label htmlFor="" className={cx('input-label')}>
                                    Tên người nhận
                                </label>
                                <input className={cx('input-item')} type="text" placeholder="Tên người nhận" />
                            </div>

                            <div className={cx('info')}>
                                <label htmlFor="" className={cx('input-label')}>
                                    Tên địa chỉ nhận
                                </label>
                                <input className={cx('input-item')} type="text" placeholder="Tên địa chỉ nhận" />
                            </div>

                            <div className={cx('info')}>
                                <label htmlFor="" className={cx('input-label')}>
                                    Số điện thoại người nhận
                                </label>
                                <input
                                    className={cx('input-item')}
                                    type="text"
                                    placeholder="Số điện thoại người nhận"
                                />
                            </div>
                        </div>
                        <button className={cx('btn')}>Save</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Checkout;
