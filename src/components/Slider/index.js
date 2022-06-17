import styles from './Slider.module.scss';
import Image from '~/components/Image';
import classNames from 'classnames/bind';
import React from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
const cx = classNames.bind(styles);

function Slider() {
    const [slideData, setSlideData] = useState([]);

    useEffect(() => {
        axios
            .post('http://localhost:8080/api/ctanh/post', {
                type: 'get',
                data: { ID_ANH: '1' },
            })
            .then((response) => {
                setSlideData(response.data[0]);
            });
    }, []);

    return (
        <div className={cx('slide-container')}>
            <Fade>
                {Object.keys(slideData)
                    .filter((key) => key !== 'ID_ANH')
                    .map((key, index) => {
                        return (
                            slideData[key] !== '' && (
                                <div className="each-fade" key={index}>
                                    <div className={cx('image-container')}>
                                        <Image className={cx('fill')} src={slideData[key]} alt={''} />
                                    </div>
                                </div>
                            )
                        );
                    })}
            </Fade>
        </div>
    );
}
export default Slider;
