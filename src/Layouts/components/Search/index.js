import { useEffect, useState, useRef } from 'react';
import { faCircleXmark, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import axios from 'axios';
import ProductItem from '~/components/ProductItem';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debounced = useDebounce(searchValue, 500);

    const inputRef = useRef();

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }
        setLoading(true);
        axios
            .post('http://localhost:8080/api/sanpham/timkiem', {
                data: { tukhoa: debounced },
            })
            .then((res) => {
                setSearchResult(res.data);
                setLoading(false);
            });
    }, [debounced]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    return (
        <HeadlessTippy
            interactive
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        {searchResult != 0 ? (
                            searchResult.map((result, index) => {
                                if (index < 4) {
                                    return (
                                        <ProductItem
                                            GIOITHIEU={result.GIOITHIEU}
                                            THONGSO={result.THONGSO}
                                            key={result.ID_SANPHAM}
                                            ID_SANPHAM={result.ID_SANPHAM}
                                            TENTHELOAI={result.TENTHELOAI}
                                            ANH1={result.ANH1}
                                            imgProducts={{
                                                IMAGEID: result.ID_ANH,
                                                ANH1: result.ANH1,
                                                ANH2: result.ANH2,
                                                ANH3: result.ANH3,
                                                ANH4: result.ANH4,
                                            }}
                                            TENSANPHAM={result.TENSANPHAM}
                                            GIA={result.GIA}
                                        />
                                    );
                                }
                            })
                        ) : (
                            <></>
                        )}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Tìm kiếm"
                    spellCheck={false}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setShowResult(true)}
                    className={cx('search-txt')}
                />
                {!!searchValue && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {/* <FontAwesomeIcon className={cx('loading')} icon={faSpinner} /> */}

                <button className={cx('search-btn')}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
