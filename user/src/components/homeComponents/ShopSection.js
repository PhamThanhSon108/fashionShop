import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import Pagination from './pagination';
import { useDispatch, useSelector } from 'react-redux';
import { listProduct} from '../../Redux/Actions/ProductActions';
import Loading from '../LoadingError/Loading';
import Message from '../LoadingError/Error';
import { listCart } from '../../Redux/Actions/cartActions';
import FilterSection from './FilterSection';

const ShopSection = (props) => {
    const { category, keyword, pageNumber} = props;
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;
    useEffect(() => {
        dispatch(listCart());
    }, []);
    const rating = "3", minPrice="8", maxPrice = "11";
    useEffect(() => {
        dispatch(listProduct(category, keyword, pageNumber,rating,minPrice,maxPrice));
    }, [dispatch, category, keyword, pageNumber,rating, minPrice,maxPrice]);

    return (
        <>
            <div className="container">
                <div className="section">
                    <div className="col-lg-2 col-6 col-md-3">
                        <select className="form-select" onChange={(e) => {}}>
                            <option>Newest</option>
                            <option>Price descending</option>
                            <option>Prices gradually increase</option>
                            <option>Most prominent</option>
                        </select>
                    </div>

                    <div className="row">
                        <FilterSection></FilterSection>

                        <div className="col-lg-10 col-md-9 article">
                            <div className="shopcontainer row">
                                {loading ? (
                                    <div className="mb-5">
                                        <Loading />
                                    </div>
                                ) : error ? (
                                    <Message variant="alert-danger">{error}</Message>
                                ) : (
                                    <>
                                        {products.map((product) => (
                                            <div className="shop col-lg-3 col-md-6 col-sm-12" key={product._id}>
                                                <div className="border-product">
                                                    <Link to={`/products/${product._id}`}>
                                                        <div className="shopBack">
                                                            <img src={product.image} alt={product.name} />
                                                        </div>
                                                    </Link>

                                                    <div className="shoptext">
                                                        <p>
                                                            <Link to={`/products/${product._id}`}>{product.name}</Link>
                                                        </p>

                                                        <Rating
                                                            value={product.rating}
                                                            text={`${product.numReviews} reviews`}
                                                        />
                                                        <h3>${product.price}</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}

                                {/* Pagination */}
                                <Pagination pages={pages} page={page} category={category? category: ''} keyword={keyword ? keyword : ''} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShopSection;
