import React from 'react'
import Slider from "react-slick";
import Rating from "./homeComponents/Rating";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

export default function Corousel() {

    const lists = [
        {
            id: 1,
            imger: 'https://m.media-amazon.com/images/I/711+-K5DG0L._AC_UL480_FMwebp_QL65_.jpg',
            name: 'Amazon Essentials Womens Classic-Fit Short-Sleeve V-Neck T-Shirt, Pack of 2',
            rating: 1,
            numReviews: 1,
            price: 15
        },
        {
            id: 2,
            imger: 'https://m.media-amazon.com/images/I/61Ju0tiHWML._AC_UL480_FMwebp_QL65_.jpg',
            name: 'Amazon Essentials Womens Classic-Fit Short-Sleeve V-Neck T-Shirt, Pack of 2',
            rating: 2,
            numReviews: 2,
            price: 15
        },
        {
            id: 3,
            name: 'Amazon Essentials Womens Classic-Fit Short-Sleeve V-Neck T-Shirt, Pack of 2',
            imger: 'https://m.media-amazon.com/images/I/711+-K5DG0L._AC_UL480_FMwebp_QL65_.jpg',
            rating: 3,
            numReviews: 3,
            price: 15
        },
        {
            id: 4,
            imger: 'https://m.media-amazon.com/images/I/61Ju0tiHWML._AC_UL480_FMwebp_QL65_.jpg',
            name: 'Amazon Essentials Womens Classic-Fit Short-Sleeve V-Neck T-Shirt, Pack of 2',
            rating: 4,
            numReviews: 4,
            price: 15
        },
        {
            id: 5,
            imger: 'https://m.media-amazon.com/images/I/711+-K5DG0L._AC_UL480_FMwebp_QL65_.jpg',
            name: 'Amazon Essentials Womens Classic-Fit Short-Sleeve V-Neck T-Shirt, Pack of 2',
            rating: 5,
            numReviews: 5,
            price: 15
        },
        {
            id: 6,
            imger: 'https://m.media-amazon.com/images/I/61Ju0tiHWML._AC_UL480_FMwebp_QL65_.jpg',
            name: 'Amazon Essentials Womens Classic-Fit Short-Sleeve V-Neck T-Shirt, Pack of 2',
            rating: 1,
            numReviews: 1,
            price: 15
        },
        {
            id: 7,
            imger: 'https://m.media-amazon.com/images/I/61Ju0tiHWML._AC_UL480_FMwebp_QL65_.jpg',
            name: 'Amazon Essentials Womens Classic-Fit Short-Sleeve V-Neck T-Shirt, Pack of 2',
            rating: 1,
            numReviews: 2,
            price: 15
        },
        {
            id: 8,
            name: 'Amazon Essentials Womens Classic-Fit Short-Sleeve V-Neck T-Shirt, Pack of 2',
            imger: 'https://m.media-amazon.com/images/I/711+-K5DG0L._AC_UL480_FMwebp_QL65_.jpg',
            rating: 1,
            numReviews: 1,
            price: 15
        },
        {
            id: 9,
            imger: 'https://m.media-amazon.com/images/I/61Ju0tiHWML._AC_UL480_FMwebp_QL65_.jpg',
            name: 'Amazon Essentials Womens Classic-Fit Short-Sleeve V-Neck T-Shirt, Pack of 2',
            rating: 1,
            numReviews: 1,
            price: 15
        },
        {
            id: 10,
            imger: 'https://m.media-amazon.com/images/I/711+-K5DG0L._AC_UL480_FMwebp_QL65_.jpg',
            name: 'Amazon Essentials Womens Classic-Fit Short-Sleeve V-Neck T-Shirt, Pack of 2',
            rating: 1,
            numReviews: 1,
            price: 15
        },
        {
            id: 11,
            imger: 'https://m.media-amazon.com/images/I/61Ju0tiHWML._AC_UL480_FMwebp_QL65_.jpg',
            name: 'Amazon Essentials Womens Classic-Fit Short-Sleeve V-Neck T-Shirt, Pack of 2',
            rating: 1,
            numReviews: 1,
            price: 15
        }
    ]

    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]

    };
    return (
        <div className="container corousel-container">
            <h2>Selling Products</h2>
            <div className="corousel">
                <Slider {...settings}>
                    {lists.map((list, index) => {
                        return (
                            <div key={index} className="corousel-div">
                                <Link to="#" className="corousel-link">
                                    <img src={list.imger} className="corousel-img"></img>
                                    <p className="corousel-noti">{list.name}</p>
                                    <div className="corousel-rating">
                                        <Rating
                                            value={list.rating}
                                            text={`${list.numReviews} reviews`}
                                        />
                                    </div>
                                    <p className="corousel-price">${list.price}</p>
                                </Link>
                            </div>
                        )
                    })}
                </Slider>
            </div>
        </div>
    );
}
