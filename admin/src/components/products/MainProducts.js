import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Product from './Product';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../Redux/Actions/ProductActions';
import Loading from '../LoadingError/Loading';
import Message from '../LoadingError/Error';
import { ListCategory } from '../../Redux/Actions/categoryActions';
import Pagination from '../Home/pagination';

const MainProducts = () => {
    const dispatch = useDispatch();

    const [categoryFilter, setCategoryFilter] = useState('All category');

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
    let productss = [];
    const handleFilter = () => {
        if (categoryFilter !== 'All category') {
            productss = products ? products.filter((value) => value.category === categoryFilter) : [];
        } else {
            productss = products;
        }
    };
    handleFilter();
    const productDelete = useSelector((state) => state.productDelete);
    const { error: errorDelete, success: successDelete } = productDelete;
    //category
    const lcategories = useSelector((state) => state.CategoryList);
    const { categories } = lcategories;
    useEffect(() => {
        dispatch(listProducts());
        dispatch(ListCategory());
    }, [dispatch, successDelete]);

    // const handleSearch = (e) => {
    //     e.preventDefault();
    // };
    return (
        <section className="content-main">
            <div className="content-header">
                <h2 className="content-title">Products</h2>
                <div>
                    <Link to="/addproduct" className="btn btn-primary color-orange">
                        Create new
                    </Link>
                </div>
            </div>

            <div className="card mb-4 shadow-sm">
                <header className="card-header bg-white ">
                    <div className="row gx-3 py-3">
                        {/* <div className="col-lg-4 col-md-6 me-auto ">
                            <form onSubmit={handleSearch}>
                                <input type="search" placeholder="Search..." className="form-control p-2" />
                            </form>
                        </div> */}
                        <div className="col-lg-2 col-6 col-md-3">
                            <select
                                className="form-select"
                                value={categoryFilter}
                                onChange={(e) => {
                                    setCategoryFilter(e.target.value);
                                }}
                            >
                                <option>All category</option>
                                {categories.map((category) => (
                                    <option value={category._id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        {/* <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Latest added</option>
                <option>Cheap first</option>
                <option>Most viewed</option>
              </select>
            </div> */}
                    </div>
                </header>

                <div className="card-body">
                    {errorDelete && <Message variant="alert-danger">{errorDelete}</Message>}
                    {loading ? (
                        <Loading />
                    ) : error ? (
                        <Message variant="alert-danger">{error}</Message>
                    ) : (
                        <div className="row">
                            {/* Products */}
                            {productss.map((product) => (
                                <Product product={product} key={product._id} />
                            ))}
                        </div>
                    )}

                    
                        <Pagination pages={2}
                                    page={1}
                                    category={categoryFilter?categoryFilter:''}
                                    keyword={''}></Pagination>
                        
                </div>
            </div>
        </section>
    );
};

export default MainProducts;
