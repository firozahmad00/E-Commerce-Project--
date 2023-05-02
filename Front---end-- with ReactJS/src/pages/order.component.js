import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrderApi } from '../slices/order.slice';
import { useNavigate } from 'react-router-dom';

function OrderDetailsComponent() {
    const [totalPrice, setTotalPrice] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartData = useSelector((state) => state.cart);
    const { userInfo, data } = useSelector((state) => state.userInfo);
    const orderInfo = useSelector((state) => state.orderInfo);
    useEffect(() => {
        if (cartData.products.length > 0) {
           setTotalPrice(cartData.products.reduce((acc, prod) => { return acc + (prod.price * prod.quantity)}, 0));
        }
    }, [cartData]);
    useEffect(() => {
        console.log(orderInfo);
        if (orderInfo.data && orderInfo.data.paymentId) {
            localStorage.removeItem('cart-products')
            navigate('/');
        }
    }, [orderInfo]);
    const proceedToPay = () => {
        const payload = {
            key: 'rzp_test_EzABhFAwaqK12A',
            amount: totalPrice * 100,
            currency: 'INR',
            name: 'Digital Lync',
            description: 'For purchasing products',
            order_id: '',
            prefill: {
                contact: userInfo.mobile,
                email: userInfo.email
            },
            handler: (response) => {
                console.log(response);
                const payload = {
                    userId: data.userId,
                    totalPrice: totalPrice,
                    paymentId: response.razorpay_payment_id,
                    products: cartData.products
                };
                dispatch(placeOrderApi(payload));
            }
        };

        const razorPayInstance = window.Razorpay(payload);
        razorPayInstance.open();
    };
    return (
        <div className='container'>
            <div className='row my-4'>
                <div className='col-sm-12 text-end'>
                    <h2 className='text-center'>Order Details</h2>
                    <h5>Total Amount: {totalPrice}</h5>
                    <button onClick={proceedToPay} className="btn btn-success">Proceed to Pay</button>
                </div>
            </div>
            {cartData.products.map((product, index) => (
                <div className="row my-4 border-bottom py-2" key={product._id}>
                    <div className="col-sm-3">
                        <img src={product.imgSrc} width="100px" />
                    </div>
                    <div className="col-sm-6">
                        <h2 className='text-start'>{product.name}</h2>
                        <h5>{product.price} * {product.quantity} = {product.price * product.quantity}</h5>
                    </div>
                    <div className="col-sm-3">
                        <h2>{product.price}</h2>
                        <h4>Quantity: {product.quantity}
                        </h4>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default OrderDetailsComponent;