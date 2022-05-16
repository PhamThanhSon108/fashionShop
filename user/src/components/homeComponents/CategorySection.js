import React from 'react'
import { Link } from 'react-router-dom'

export default function CategorySection() {

    return (
        <div className="section-div col-lg-2 col-md-3">
            <div className="Category-section">
                <div className="section-flex">
                    <i class="fas fa-align-left"></i>
                    <h2 className="Category-section__h2">Category</h2>
                </div>
                <ul className="Category-section__list">
                    <li className="Category-section__li">
                        <Link to={'#'}>
                            Dress
                        </Link>
                    </li>
                    <li className="Category-section__li">
                        <Link to={'#'}>
                            Shirt Men
                        </Link>
                    </li>
                    <li className="Category-section__li">
                        <Link to={'#'}>
                            Shirt Woman
                        </Link>
                    </li>
                    <li className="Category-section__li">
                        <Link to={'#'}>
                            Prant
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="Category-search">
                <div className="section-flex">
                    <i class="fas fa-filter "></i>
                    <h2 className="Category-section__h2 Category-search__h2">Search</h2>
                </div>
                <form className="Category-search__form">
                    <div className="Category-search__flex">
                        <input className="Category-search__form-input" id="checkbox-1" type="checkbox"></input>
                        <label for="checkbox-1" className="Category-section__li Category-search__form-lable">Dress</label>
                    </div>
                    <div className="Category-search__flex">
                        <input className="Category-search__form-input" id="checkbox-2" type="checkbox"></input>
                        <label for="checkbox-2" className="Category-section__li Category-search__form-lable">Dress</label>
                    </div>
                    <div className="Category-search__flex">
                        <input className="Category-search__form-input" id="checkbox-3" type="checkbox"></input>
                        <label for="checkbox-3" className="Category-section__li Category-search__form-lable">Dress</label>
                    </div>
                    <div className="Category-search__flex">
                        <input className="Category-search__form-input" id="checkbox-4" type="checkbox"></input>
                        <label for="checkbox-4" className="Category-section__li Category-search__form-lable">Dress</label>
                    </div>
                </form>
            </div>
        </div>
    )
}