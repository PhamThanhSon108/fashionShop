import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearFromCart, listCart } from '../Redux/Actions/cartActions';
import { createOrder } from '../Redux/Actions/OrderActions';
import { ORDER_CREATE_RESET } from '../Redux/Constants/OrderConstants';
import Header from './../components/Header';
import Message from './../components/LoadingError/Error';
import PayModal from '../components/Modal/PayModal';

const PlaceOrderScreen = ({ history }) => {
    window.scrollTo(0, 0);

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    // Calculate Price
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };
    console.log(cart);
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 20);
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
    cart.totalPrice =
        cart?.cartItems.length > 0
            ? (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)
            : 0;

    const orderCreate = useSelector((state) => state.orderCreate);
    const { order, success, error } = orderCreate;
    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [history, dispatch, success, order]);

    const placeOrderHandler = () => {
        //if (window.confirm("Are you sure"))
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            }),
        );
        dispatch(clearFromCart(userInfo._id));
    };
    console.log(cart);
    return (
        <>
            <Header />
            <div className="container">
                <PayModal
                    Title="PAY"
                    Body="Do you agree to pay?"
                    HandleSubmit={placeOrderHandler}
                    Close="modal"
                ></PayModal>
                <div className="row  order-detail">
                    <div className="col-lg-4 col-sm-4 mb-lg-4 mb-2 mb-sm-0 fix-bottom">
                        <div className="row " style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="col-md-2 center">
                                <div className="alert-success order-box">
                                    <i class="fas fa-user"></i>
                                </div>
                            </div>
                            <div className="col-md-10 center">
                                {/* <h5>
                                    <strong>Customer</strong>
                                </h5> */}
                                <p>{`Name: ${userInfo.name}`}</p>
                                <p>{`Phone: ${userInfo.phone}`}</p>
                            </div>
                        </div>
                    </div>
                    {/* 2 */}
                    <div className="col-lg-4 col-sm-4 mb-lg-4 mb-2 mb-sm-0 fix-bottom">
                        <div
                            className="row"
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}
                        >
                            <div className="col-md-2 center">
                                <div className="alert-success order-box">
                                    <i className="fas fa-map-marker-alt"></i>
                                </div>
                            </div>
                            <div className="col-md-10 center">
                                {/* <h5>
                                    <strong>Order info</strong>
                                </h5> */}
                                <p>
                                    Address:{' '}
                                    {`${cart.shippingAddress.city}, ${cart.shippingAddress.address}, ${cart.shippingAddress.country}`}
                                </p>
                                {/* <p>Pay method: {cart.paymentMethod}</p> */}
                            </div>
                        </div>
                    </div>
                    {/* 3 */}
                    <div className="col-lg-4 col-sm-4 mb-lg-4 mb-2 mb-sm-0 fix-bottom">
                        <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="col-md-2 center">
                                <div className="alert-success order-box">
                                    <i class="fab fa-paypal"></i>
                                </div>
                            </div>
                            <div className="col-md-10 center">
                                {/* <h5>
                                    <strong>Deliver to</strong>
                                </h5> */}
                                <p>
                                    <p>Pay method: {cart.paymentMethod}</p>
                                    {/* Address: {cart.shippingAddress.city}, {cart.shippingAddress.address} */}
                                    {/* ,{' '}
                                    {cart.shippingAddress.postalCode} */}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row order-products justify-content-between">
                    <div className="col-lg-12 fix-padding cart-scroll">
                        {cart.cartItems.length === 0 ? (
                            <Message variant="alert-info mt-5">Your cart is empty</Message>
                        ) : (
                            <>
                                {cart.cartItems.map((item, index) => (
                                    <div className="order-product row" key={index}>
                                        <div className="col-md-3 col-6">
                                            <img src={item.product.image} alt={item.product.name} />
                                        </div>
                                        <div className="col-md-5 col-6 d-flex align-items-center">
                                            <Link to={`/products/${item.product}`}>
                                                <h6>{item.product.name}</h6>
                                            </Link>
                                        </div>
                                        <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                                            <h4>QUANTITY</h4>
                                            <h6>{item.qty}</h6>
                                        </div>
                                        <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                                            <h4>SUBTOTAL</h4>
                                            <h6>${item.qty * item.product.price}</h6>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </div>
                <div className="row" style={{ padding: '10px 0', backgroundColor: '#fff', marginTop: '10px' }}>
                    {/* total */}
                    <div className="col-lg-6 d-flex align-items-end flex-column subtotal-order">
                        <table className="table table-bordered fix-bottom">
                            <tbody>
                                <tr>
                                    <td>
                                        <strong>Products</strong>
                                    </td>
                                    <td>${cart.itemsPrice}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Shipping</strong>
                                    </td>
                                    <td>${cart.shippingPrice}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Tax</strong>
                                    </td>
                                    <td>${cart.taxPrice}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>Total</strong>
                                    </td>
                                    <td>${cart.totalPrice}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-lg-6 fix-right" style={{ position: 'relative' }}>
                        {cart.cartItems.length === 0 ? null : (
                            <button
                                type="submit"
                                //onClick={placeOrderHandler}
                                // type="button"
                                class="btn btn-primary pay-button"
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"
                            >
                                PLACE ORDER
                            </button>
                        )}
                        {error && (
                            <div className="my-3 col-12">
                                <Message variant="alert-danger">{error}</Message>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PlaceOrderScreen;
