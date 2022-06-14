import React from 'react';
import Header from './../components/Header';
import ShopSection from './../components/homeComponents/ShopSection';
import ContactInfo from './../components/homeComponents/ContactInfo';
import CalltoActionSection from './../components/homeComponents/CalltoActionSection';
import Footer from './../components/Footer';
import Silder from '../components/Silder';
import Sliders from '../components/Sliders';
import Corousel from '../components/SlideCorousel/Corousel';
import CorouselOder from '../components/SlideCorousel/CourouselOder';

const HomeScreen = ({ match }) => {
    window.scrollTo(0, 0);
    const keyword = match.params.keyword;
    const pagenumber = match.params.pagenumber;
    return (
        <div>
            <Header />
            {/* <Silder /> */}
            <Sliders />
            <Corousel />
            <CorouselOder />
            <ShopSection keyword={keyword} pagenumber={pagenumber} />

            <CalltoActionSection />
            <ContactInfo />
            <Footer />
        </div>
    );
};

export default HomeScreen;
