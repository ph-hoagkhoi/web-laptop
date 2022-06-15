import Products from '~/components/Products';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Acer() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const brand = 'Acer';

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        axios
            .get('http://26.87.217.216:8080/api/sanpham/get')
            .then(async (res) => {
                setItems(res.data);
                setIsLoaded(true);
                setItems(res.data);
            })
            .catch((error) => {
                setIsLoaded(true);
                setError(error);
            });
    }, []);
    if (error) {    
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="row">
                {items.map((item) => {
                    if (item.TENTHELOAI.toLowerCase() === brand.toLowerCase()) {
                        return (
                            <div className="col l-3" key={item.ID_SANPHAM}>
                                <Products
                                    id={item.ID_SANPHAM}
                                    name={item.TENSANPHAM}
                                    price={item.GIA}
                                    imgID={item.ID_ANH}
                                    description={item.GIOITHIEU}
                                    brand={item.TENTHELOAI}
                                    thongso={item.THONGSO}
                                    soluong={item.SOLUONG}
                                />
                            </div>
                        );
                    }
                })}
            </div>
        );
    }
}

export default Acer;
