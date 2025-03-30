import React from 'react';
import Sidebar from '../Components/SideBar';
import TopBar from '../Components/Topbar';
import Carousel from '../Components/Carousel';
import '../Styles/Carousel.css';

const CarouselPage = () => {
    return (
        <div className="carousel-page-container">
            {/* Top Bar */}
            <TopBar />

            {/* Main Content */}
            <div className="main-content">
                {/* Sidebar */}
                <Sidebar />

                {/* Carousel Content */}
                <Carousel />
            </div>
        </div>
    );
};

export default CarouselPage;
