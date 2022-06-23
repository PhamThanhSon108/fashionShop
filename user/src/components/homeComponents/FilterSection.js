import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListCategory } from '../../Redux/Actions/categoryActions';
import { Link } from 'react-router-dom';
import isEmpty from 'validator/lib/isEmpty';
import Rating from './Rating';

export default function FilterSection(props) {
    const dispatch = useDispatch();

    const lcategories = useSelector((state) => state.CategoryList);
    const { categories } = lcategories;

    const [rating, setRating] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const [checkId, setCheckId] = useState('');
    if (rating) {
        props.setRating(rating);
    }

    //xủ lí logic check from
    const [price, SetPrice] = useState({});
    const checkPrice = () => {
        const msg = {};
        if (isEmpty(minPrice)) {
            msg.name = 'Please input your price';
        } else {
            if (minPrice < 0) {
                msg.name = 'Please enter the positive value';
            } else {
                if (isNaN(minPrice)) {
                    msg.name = 'Please enter the number';
                }
            }
        }
        if (isEmpty(maxPrice)) {
            msg.name = 'Please input your price';
        } else {
            if (minPrice < 0) {
                msg.name = 'Please enter the positive value';
            } else {
                if (isNaN(minPrice)) {
                    msg.name = 'Please enter the number';
                } else {
                    if (Number(minPrice) > Number(maxPrice)) {
                        msg.name = 'MinPrice is smaller MaxPrice';
                    }
                }
            }
        }
        SetPrice(msg);
        if (Object.keys(msg).length > 0) return false;
        return true;
    };
    const ApplyHandler = () => {
        if (!checkPrice()) return;
        props.setMinPrice(minPrice);
        props.setMaxPrice(maxPrice);
    };
    useEffect(() => {
        dispatch(ListCategory());
    }, [dispatch]);
    return (
        <div className="section-div col-lg-2 col-md-3">
            <div className="Category-section">
                <div className="section-flex">
                    <i class="fas fa-align-left"></i>
                    <h2 className="Category-section__h2">Category</h2>
                </div>
                <ul className="Category-section__list">
                    {categories.map((category) => (
                        <li
                            className="Category-section__li"
                            onClick={() => {
                                setCheckId(category._id);
                            }}
                        >
                            <Link
                                style={checkId === category._id ? { color: 'red' } : {}}
                                to={`/category/${category._id}`}
                            >
                                {category.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="Category-search">
                <div className="section-flex">
                    <i class="fas fa-filter "></i>
                    <h2 className="Category-section__h2 Category-search__h2">Filter</h2>
                </div>

                <div className="distance-price">
                    <p className="distance-price__p">Price range</p>
                    <div className="distance-price__flex" style={{ display: 'flex', alignItems: 'center' }}>
                        <input type="text" placeholder="$Min" onChange={(e) => setMinPrice(e.target.value)}></input>
                        <label>-</label>
                        <input type="text" placeholder="$Max" onChange={(e) => setMaxPrice(e.target.value)}></input>
                    </div>
                    <p style={{ fontSize: '14px', color: 'red' }}>{price.name}</p>
                    <button className="distance-price__submit" onClick={ApplyHandler}>
                        APPLY
                    </button>
                </div>
                <div className="assess-star">
                    <p className="distance-price__p">Review</p>
                    <div className="assess-star__div">
                        <div display={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="radio"
                                style={{ display: 'none' }}
                                className="star-none"
                                name="star"
                                id="five"
                                value={'5'}
                                onClick={(e) => {
                                    setRating(e.target.value);
                                }}
                            ></input>
                            <label for="five" className={rating === '5' ? 'rating-color' : ' '}>
                                <Rating value="5"></Rating>
                            </label>
                        </div>
                        <div display={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="radio"
                                style={{ display: 'none' }}
                                className="star-none"
                                name="star"
                                id="four"
                                value={'4'}
                                onClick={(e) => {
                                    setRating(e.target.value);
                                }}
                            ></input>
                            <label for="four" className={rating === '4' ? 'rating-color' : ' '}>
                                <Rating value="4" text={'& up'}></Rating>
                            </label>
                        </div>
                        <div display={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="radio"
                                style={{ display: 'none' }}
                                className="star-none"
                                name="star"
                                id="three"
                                value={'3'}
                                onClick={(e) => {
                                    setRating(e.target.value);
                                }}
                            ></input>
                            <label for="three" className={rating === '3' ? 'rating-color' : ' '}>
                                <Rating value="3" text={'& up'}></Rating>
                            </label>
                        </div>
                        <div display={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="radio"
                                style={{ display: 'none' }}
                                className="star-none"
                                name="star"
                                id="two"
                                value={'2'}
                                onClick={(e) => {
                                    setRating(e.target.value);
                                }}
                            ></input>
                            <label for="two" className={rating === '2' ? 'rating-color' : ' '}>
                                <Rating value="2" text={'& up'}></Rating>
                            </label>
                        </div>
                        <div display={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="radio"
                                style={{ display: 'none' }}
                                className="star-none"
                                name="star"
                                id="one"
                                value={'1'}
                                onClick={(e) => {
                                    setRating(e.target.value);
                                }}
                            ></input>
                            <label for="one" className={rating === '1' ? 'rating-color' : ''}>
                                <Rating value="1" text={'& up'}></Rating>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="" display={{ display: 'flex', alignItems: 'center' }}>
                    <button className="distance-price__submit" onClick={ApplyHandler}>
                        <Link className="navbar-brand" to="/" style={{ fontSize: '0.85rem', color: '#fff' }}>
                            DELETE ALL FILTER
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
}
