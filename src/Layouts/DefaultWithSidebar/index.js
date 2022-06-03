import Sidebar from '~/Layouts/components/Sidebar';
import Header from '~/Layouts/components/Header';
import Footer from '~/Layouts/DefaultLayout/Footer';

function DefaultWithSidebar({ children }) {
    return (
        <>
            <Header />
            <div className="container grid wide">
                <Sidebar>{children}</Sidebar>
            </div>
            <Footer />
        </>
    );
}

export default DefaultWithSidebar;
