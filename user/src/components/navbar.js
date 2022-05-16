import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar({ onRemove }) {
    return (
        < >
            {/* Pc-navbar */}
            <div className="navbar-menu">
                <ul className="navbar-list">
                    <li className="navbar-list__li">
                        <Link to={'#'}>Dress</Link>
                    </li>
                    <li className="navbar-list__li">
                        <Link to={'#'}>Shirt Men</Link>
                    </li>
                    <li className="navbar-list__li">
                        <Link to={'#'}>Shirt Woman</Link>
                    </li>
                    <li className="navbar-list__li">
                        <Link to={'#'}>Prant</Link>
                    </li>
                </ul>
            </div>
            {/* tablet-mobile modal */}
            <div className="navbar-tablet">
                <div className="modal-tablet"></div>
                <div className="modal-nav">
                    <div className="modal-nav__img">
                        <img src="/images/logo.png"></img>
                    </div>
                    <ul className="modal-nav__list">
                        <li className="modal-nav__li">
                            <Link to={'#'}>Dress</Link>
                        </li>
                        <li className="modal-nav__li">
                            <Link to={'#'}>Shirt Men</Link>
                        </li>
                        <li className="modal-nav__li">
                            <Link to={'#'}>Shirt Woman</Link>
                        </li>
                        <li className="modal-nav__li">
                            <Link to={'#'}>Prant</Link>
                        </li>
                    </ul>
                    <div className="modal-icon" onClick={onRemove}>
                        <i class="fas fa-times-circle"></i>
                    </div>
                </div>
            </div>
        </>
    )
}
