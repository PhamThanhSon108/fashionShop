import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Rating from './Rating';

export default function FilterSection() {
    let history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {}, []);
    return (
        <div className="section-div col-lg-2 col-md-3">
            <div className="Category-search">
                <div className="section-flex">
                    <i class="fas fa-filter "></i>
                    <h2 className="Category-section__h2 Category-search__h2">Filter</h2>
                </div>
                <form className="Category-search__form">
                    <label>Price range</label>
                    <div className="">
                        <input className="Category-search__form-input" id="tu" type="" placeholder="$Min"></input>
                        <label>_</label>
                        <input className="Category-search__form-input" id="den" type="" placeholder="$Max"></input>
                    </div>

                    <label>Review</label>
                    <div className="Category-search__form">
                        <label for="checkbox-2" className="Category-section__li Category-search__form-lable" >
                            <Rating value="5" text={''} />
                        </label>
                        <label for="checkbox-2" className="Category-section__li Category-search__form-lable">
                            <Rating value="4" text={'& Up'} />
                        </label>
                        <label for="checkbox-2" className="Category-section__li Category-search__form-lable">
                            <Rating value="3" text={'& Up'} />
                        </label>
                        <label for="checkbox-2" className="Category-section__li Category-search__form-lable">
                            <Rating value="2" text={'& Up'} />
                        </label>
                        <label for="checkbox-2" className="Category-section__li Category-search__form-lable">
                            <Rating value="1" text={'& Up'} />
                        </label>
                    </div>

                    <label>Services and promotions</label>
                    <div className="Category-search__flex">
                        <input className="Category-search__form-input" id="checkbox-3" type="checkbox"></input>
                        <label for="checkbox-3" className="Category-section__li Category-search__form-lable">
                            on sale
                        </label>
                    </div>
                </form>
            </div>
        </div>
    );
}
