import React from 'react';
import Sidebar from '../Components/SideBar';
import Carousel from '../Components/Carousel';
import '../Styles/Carousel.css';

const CarouselPage = () => {
    return (
        <div className="carousel-post-container">
            <div className='sidebar-carousel'>
                <Sidebar />
            </div>
            <div className="carousel-container-generator">
                <Carousel />
            </div>
        </div>
    );
}

export default CarouselPage;