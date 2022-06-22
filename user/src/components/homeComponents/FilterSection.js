import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListCategory } from '../../Redux/Actions/categoryActions';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function FilterSection(props) {
    const dispatch = useDispatch();

    const lcategories = useSelector((state) => state.CategoryList);
    const { categories } = lcategories;

    const [rating, setRating] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    if (rating) {
        props.setRating(rating);
    }

    const ApplyHandler = () => {
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
                        <li className="Category-section__li">
                            <Link to={`/category/${category._id}`}>{category.name}</Link>
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
                            <label for="five">
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
                            <label for="four">
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
                            <label for="three">
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
                            <label for="two">
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
                            <label for="one">
                                <Rating value="1" text={'& up'}></Rating>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
