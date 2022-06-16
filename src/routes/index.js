import config from '~/config';

// Layout
import ProfileAccount from '~/layouts/ProfileAccount';
import DefaultWithSidebar from '~/layouts/DefaultWithSidebar';
import Login from '~/layouts/Login';
import Admin from '~/layouts/Admin';

// Pages
import Laptop from '~/pages/Laptop';
import Home from '~/pages/Home';
import Msi from '~/pages/Msi';
import Acer from '~/pages/Acer';
import Asus from '~/pages/Asus';
import SignIn from '~/components/SignIn';
import Profile from '~/pages/Profile';
import AddressProfile from '~/pages/AddressProfile';
import DetailProduct from '~/components/DetailProduct';
import Shopping from '~/components/Shopping';
import Checkout from '~/components/Checkout';

// routes Admin
import Dashboard from '~/components/Dashboard';
import CategoryAdmin from '~/components/CategoryAdmin';
import AdminUsers from '~/components/AdminUsers';
import AdminManagers from '~/components/AdminManagers';
import AdminProduct from '~/components/AdminProduct';
import AddProduct from '~/components/AddProduct';
import AdminBill from '~/components/AdminBill';
import ViewBill from '~/components/ViewBill';
import AdminSlider from '~/components/AdminSlider';
import UpdateBrand from '~/components/UpdateBrand';
import AdminStock from '~/components/AdminStock';
import AdminProfileInfo from '~/components/AdminProfileInfo';
import AdminReport from '~/components/AdminReport';
//

//
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.msi, component: Msi, layout: DefaultWithSidebar },
    { path: config.routes.acer, component: Acer, layout: DefaultWithSidebar },
    { path: config.routes.asus, component: Asus, layout: DefaultWithSidebar },
    { path: config.routes.login, component: SignIn, layout: Login },
    { path: config.routes.laptop, component: Laptop, layout: DefaultWithSidebar },

    // Profile
    { path: config.routes.profile, component: Profile, layout: ProfileAccount },
    { path: config.routes.addressProfile, component: AddressProfile, layout: ProfileAccount },
    { path: config.routes.shoppingCart, component: Shopping },
    { path: config.routes.checkout, component: Checkout },
    // Product
    { path: config.routes.product, component: DetailProduct },
    { path: config.routes.adminStock, component: AdminStock, layout: Admin },
    //Report
];

const privateRoutes = [
    // Admin
    { path: config.routes.admin, component: Dashboard, layout: Admin },
    { path: config.routes.adminCategory, component: CategoryAdmin, layout: Admin },
    { path: config.routes.adminUsers, component: AdminUsers, layout: Admin },
    { path: config.routes.adminManagers, component: AdminManagers, layout: Admin },
    { path: config.routes.adminProduct, component: AdminProduct, layout: Admin },
    { path: config.routes.adminAddProduct, component: AddProduct, layout: Admin },
    { path: config.routes.adminBill, component: AdminBill, layout: Admin },
    { path: config.routes.adminViewBill, component: ViewBill, layout: Admin },
    { path: config.routes.adminSlider, component: AdminSlider, layout: Admin },
    { path: config.routes.adminUpdateBrand, component: UpdateBrand, layout: Admin },
    { path: config.routes.adminReport, component: AdminReport, layout: Admin },

    { path: config.routes.home, component: Home },
    { path: config.routes.msi, component: Msi, layout: DefaultWithSidebar },
    { path: config.routes.acer, component: Acer, layout: DefaultWithSidebar },
    { path: config.routes.asus, component: Asus, layout: DefaultWithSidebar },
    { path: config.routes.login, component: SignIn, layout: Login },
    // Profile
    { path: config.routes.profile, component: Profile, layout: ProfileAccount },
    { path: config.routes.adminProfileInfo, component: AdminProfileInfo, layout: Admin },
    { path: config.routes.addressProfile, component: AddressProfile, layout: ProfileAccount },
    { path: config.routes.shoppingCart, component: Shopping },
    { path: config.routes.checkout, component: Checkout },
    { path: config.routes.laptop, component: Laptop, layout: Admin },
    // Product
    { path: config.routes.product, component: DetailProduct },
];

export { publicRoutes, privateRoutes };
