import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import { listCart, saveShippingAddress } from '../Redux/Actions/cartActions';
import { listMyOrders, orderGetAddress } from '../Redux/Actions/OrderActions';
import { ORDER_ADDRESS_MY_RESET } from '../Redux/Constants/OrderConstants';

const ShippingScreen = ({ history }) => {
    window.scrollTo(0, 0);
    const dispatch = useDispatch();
    const orderListMy = useSelector((state) => state.orderAddress);
    const { success: successOrder, orderAddress, loading: loadingOrder } = orderListMy;
    // const cart = useSelector((state) => state.cart);
    // const { shippingAddress } = cart;

    console.log(orderAddress);
    // const [address, setAddress] = useState(orders.length!=0  ? (orders[orders.length-1].shippingAddress.address):'');
    // const [city, setCity] = useState(orders.length!=0 ? (orders[orders.length-1].shippingAddress.city):'');
    // const [postalCode, setPostalCode] = useState(orders.length!=0  ? (orders[orders.length-1].shippingAddress.postalCode):'');
    // const [country, setCountry] = useState(orders.length!=0  ? (orders[orders.length-1].shippingAddress.postalCode): '');

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    // useEffect(() => {
    //   dispatch(orderGetAddress());
    //   console.log("lần 2 nè")
    // }, []);
    //console.log("Bug")
    useEffect(() => {
        dispatch(orderGetAddress());
    }, []);
    useEffect(() => {
        if (successOrder) {
            dispatch({ type: ORDER_ADDRESS_MY_RESET });
        } else {
            if (orderAddress?.address != undefined) {
                setAddress(orderAddress.address);
                setCity(orderAddress.city);
                setPostalCode(orderAddress.postalCode);
                setCountry(orderAddress.country);
            }
        }
    }, [dispatch, orderAddress, successOrder]);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        history.push('/payment');
    };
    return (
        <>
            <Header />
            <div className="container d-flex justify-content-center align-items-center login-center">
                <form className="Login col-md-8 col-lg-4 col-11" onSubmit={submitHandler}>
                    <h6>DELIVERY ADDRESS</h6>
                    <input
                        type="text"
                        placeholder="Enter address"
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Enter city"
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}
                    />
                    {/* <input
                        type="text"
                        placeholder="Enter postal code"
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                    /> */}
                    <input
                        type="text"
                        placeholder="Enter country"
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    <button type="submit">Continue</button>
                </form>
            </div>
        </>
    );
};

export default ShippingScreen;
