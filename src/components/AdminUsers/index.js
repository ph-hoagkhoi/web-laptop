import classNames from 'classnames/bind';
import styles from './AdminUsers.module.scss';
import Button from '~/components/Button';

import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function AdminUsers() {
    const [userData, setuserData] = useState([]);
    useEffect(() => {
        getCourses();
    }, []);

    const getCourses = async () => {
        try {
            await axios
                .post('http://localhost:8080/api/taikhoan/khachhang', {
                    type: 'get',
                })
                .then(async (res) => {
                    setuserData(res.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error(error);
        }
    };
    const xoaKhachHang  = async(ID_TAIKHOAN)=>{
        if(window.confirm('Bạn chắc có chắc chắn xóa khách hàng này?')){
            await axios.post('http://localhost:8080/api/taikhoan/khachhang',{
            type:'delete',
            data: {ID_TAIKHOAN:ID_TAIKHOAN},
        })
        .then((res) => {
            if(res.data == 1){
                alert('Xóa thành công!');
                window.location.reload();
            }
        });
        }
        };
    const handleDeleteProduct = (data) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            axios
                .post('ttp://localhost:8080/api/taikhoan/khachhang', {
                    type: 'delete',
                    data: { ID_TAIKHOAN: data },
                })
                .then((response) => {
                    getCourses();
                });
        }
    };
    return (
        <>
            {/* <!-- Begin adminUsers --> */}
            <div className={cx('users-header')}>
                <h2 className={cx('users-heading')}>Danh sách khách hàng</h2>
            </div>

            {userData != 0 ? (
                <table className={cx('details-table')}>
                    <thead className={cx('details-thead')}>
                        <tr className={cx('details-title-list')}>
                            <td className={cx('details-title-item')}>ID Khách hàng</td>
                            <td className={cx('details-title-item')}>Tên khách hàng</td>
                            <td className={cx('details-title-item')}>Giới tính</td>
                            <td className={cx('details-title-item')}>Năm sinh</td>
                            <td className={cx('details-title-item')}>Email</td>
                            <td className={cx('details-title-item')}>Hình ảnh</td>
                            <td className={cx('details-title-item')}>Tên tài khoản</td>
                            <td className={cx('details-title-item')}>Mật khẩu</td>
                        </tr>
                    </thead>
                    {userData.map((user, index) => {
                        return (
                            <tbody className={cx('details-tbody')} key={user.ID_TAIKHOAN}>
                                <tr className={cx('details-content-list')}>
                                    <td className={cx('details-content-item')}>{user.ID_TAIKHOAN}</td>
                                    <td className={cx('details-content-item')}>{user.HOVATEN}</td>
                                    <td className={cx('details-content-item')}>{user.GIOITINH}</td>
                                    <td className={cx('details-content-item')}>{user.NAMSINH}</td>
                                    <td className={cx('details-content-item')}>{user.EMAIL}</td>
                                    <td className={cx('details-content-item')}>
                                        <img src={user.HINHANH} className={cx('content-img')} />
                                    </td>
                                    <td className={cx('details-content-item')}>{user.TENTAIKHOAN}</td>
                                    <td className={cx('details-content-item')}>{user.MATKHAU}</td>
                                    <td className={cx('details-content-item')}>
                                        <Button 
                                        onClick={(e)=>{
                                            xoaKhachHang(user.ID_TAIKHOAN);
                                        }}
                                        className={cx('details-content-item-btn')}>Xóa</Button>
                                    </td>
                                </tr>
                            </tbody>
                        );
                    })}
                </table>
            ) : (
                <h2> Không có dữ liệu</h2>
            )}
            {/* <!-- End adminUsers --> */}
        </>
    );
}

export default AdminUsers;
