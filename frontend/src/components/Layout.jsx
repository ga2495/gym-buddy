import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }) {

    return (

        <>

            <Navbar />

            <div className="container mt-4">

                {children}

            </div>

            <Footer />

        </>

    );

}

export default Layout;