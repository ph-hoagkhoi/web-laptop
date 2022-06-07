import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './SignIn.module.scss';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import { useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function SignIn() {
    const [isContainerActive, setIsContainerActive] = useState(false);
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [formData, setFormData] = useState({});
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const signUpButton = () => {
        setIsContainerActive(true);
    };
    const signInButton = () => {
        setIsContainerActive(false);
    };

    const renderErrorMessage = (name) =>
        name === errorMessages.name && <div className="error">{errorMessages.message}</div>;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormData({ username: username, password: password });

        const response = await handleSubmitLogin({
            formData,
        });
    };

    const handleSubmitLogin = (data) => {
        // var options = {
        //     methods: 'POST',
        //     header: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data),
        // };
        axios
            .post('http://26.17.209.162/api/account/signin', {
                data: formData,
            })
            .then((response) => {
                console.log(response);
            });
        // .catch(function (error) {
        //     console.log(error);
        // });
        // fetch('http://26.215.178.30/DACS/api/theloai', options)
        //     .then(function (response) {
        //         return response.json();
        //     })
        //     .then(callback);
    };

    return (
        <div className={cx('login')}>
            {/* <!-- Begin Trigger --> */}
            <Link to="/" className={cx('logo')} data-target="#login" data-toggle="modal">
                <img src={images.logo} alt="" className={cx('logo_img')} />
            </Link>
            <div className={cx('wrapper', `${isContainerActive ? 'right-panel-active' : ''}`)}>
                <div className={cx('inner', 'sign_up')}>
                    <form className={cx('morri-container')} onSubmit={handleSubmit}>
                        <h1 className={cx('heading')}>Tạo tài khoản</h1>
                        <div className={cx('social')}>
                            <Link to="" className={cx('social_item')}>
                                <FontAwesomeIcon icon={faFacebook} />
                            </Link>
                            <Link to="" className={cx('social_item')}>
                                <FontAwesomeIcon icon={faGoogle} />
                            </Link>
                        </div>
                        <span className={cx('subcontent')}>hoặc sử dụng email của bạn để đăng ký</span>
                        <input type="text" placeholder="Name" className={cx('morri_input')} />
                        <input type="email" placeholder="Email" className={cx('morri_input')} />
                        <input type="password" placeholder="Password" className={cx('morri_input')} />
                        <button className={cx('btn')}>Đăng kí</button>
                    </form>
                </div>
                <div className={cx('inner', 'sign_in')}>
                    <form action="#" className={cx('morri-container')}>
                        <h1 className={cx('heading')}>Đăng nhập</h1>
                        <div className={cx('social')}>
                            <Link to="" className={cx('social_item')}>
                                <FontAwesomeIcon icon={faFacebook} />
                            </Link>
                            <Link to="" className={cx('social_item')}>
                                <FontAwesomeIcon icon={faGoogle} />
                            </Link>
                        </div>
                        <span className={cx('subcontent')}>hoặc sử dụng tài khoản của bạn</span>
                        <input
                            type="text"
                            placeholder="Email"
                            className={cx('morri_input')}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className={cx('morri_input')}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Link to="/langquen" className={cx('forgot')}>
                            Quên mật khẩu?
                        </Link>
                        <button className={cx('btn')}>Đăng nhập</button>
                    </form>
                </div>
                <div className={cx('overlay-container')}>
                    <div className={cx('overlay')}>
                        <div className={cx('overlay-panel', 'overlay-left')}>
                            <h1 className={cx('heading')}>Chào mừng trở lại!</h1>
                            <p className={cx('overlay-content')}>
                                Để giữ kết nối với chúng tôi, vui lòng đăng nhập bằng thông tin cá nhân của bạn
                            </p>
                            <button className={cx('btn', 'ghost')} onClick={signInButton} id="signIn">
                                Đăng nhập
                            </button>
                        </div>
                        <div className={cx('overlay-panel', 'overlay-right')}>
                            <h1 className={cx('heading')}>Chào bạn!</h1>
                            <p className={cx('overlay-content')}>
                                Nhập thông tin cá nhân của bạn và bắt đầu hành trình với chúng tôi
                            </p>
                            <button className={cx('btn', 'ghost')} onClick={signUpButton} id="signUp">
                                Đăng kí
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End Trigger --> */}
        </div>
    );
}

export default SignIn;
