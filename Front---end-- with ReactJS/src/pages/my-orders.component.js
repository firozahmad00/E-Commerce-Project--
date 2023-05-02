import { myOrdersAPi } from '../slices/order.slice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

function MyOrdersComponent () {
    const dispatch = useDispatch();
    const { myOrders } = useSelector((state) => state.orderInfo);
    console.log(myOrders);
    useEffect(() => {
        dispatch(myOrdersAPi());
    }, []);
    const formatDate = (date) => {
        const dateObj = new Date(date);
        return `${dateObj.getDate()}/${dateObj.getMonth()}/${dateObj.getFullYear()}`;
    }
    return (
        <div className='container'>
            <div className='row my-4'>
                <div className='col-sm-12 text-end'>
                    <h2 className='text-center'>My Orders</h2>
                </div>
            </div>
            {myOrders.map((order, index) => (
                <div className="row my-4 border-bottom py-2" key={order._id}>
                    <div className="col-sm text-start">
                        <h5>Created Date: {formatDate(order.createdAt)}</h5>
                        <h5>Total Price: {order.totalPrice}</h5>
                        {order.products.map(product => (
                            <div className='row'>
                                <div className="col-sm-3">
                                    <img src={product.imgSrc} width="100px" />
                                </div>
                                <div className="col-sm-6">
                                    <h5 className='text-start'>{product.name}</h5>
                                    <h5 className='text-start'>{product.price}</h5>
                                </div>
                                <div className="col-sm-3">
                                    <h5>{product.price}</h5>
                                    <h4>Quantity: {product.quantity}
                                    </h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MyOrdersComponent;