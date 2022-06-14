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
            .post('http://26.87.217.216:8080/api/sanpham/search', {
                data: { keysearch: debounced },
            })
            .then((res) => {
                console.log(res.data);
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
                            searchResult.map((result) => {
                                return (
                                    <ProductItem
                                        SHOESDESCRIPTION={result.GIOITHIEU}
                                        key={result.ID_SANPHAM}
                                        SHOESID={result.ID_SANPHAM}
                                        BRANDNAME={result.TENTHELOAI}
                                        IMAGESHOES1={result.ANH1}
                                        imgProducts={{
                                            IMAGEID: result.ID_ANH,
                                            IMAGESHOES1: result.ANH1,
                                            IMAGESHOES2: result.ANH2,
                                            IMAGESHOES3: result.ANH3,
                                            IMAGESHOES4: result.ANH4,
                                        }}
                                        SHOESNAME={result.TENSANPHAM}
                                        SHOESPRICE={result.GIA}
                                    />
                                );
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
