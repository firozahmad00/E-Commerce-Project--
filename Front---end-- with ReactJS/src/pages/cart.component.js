import { remove } from '../slices/cart.slice';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { incrementProductQuantity, decrementProductQuantity } from '../slices/cart.slice';
import { useNavigate } from 'react-router-dom';

function CartComponent() {
    const dispatch = useDispatch();
    const cartData = useSelector((state) => state.cart);
    const navigate = useNavigate();

    const removeProduct = (name) => {
        dispatch(remove(name));
        window.alert('Removed from the cart');
    }
    const decrementProduct = (name) => {
        dispatch(decrementProductQuantity(name));
    }
    const incrementProduct = (name) => {
        dispatch(incrementProductQuantity(name));
    }
    const proceedToPay = () => {
        navigate('/order-details');
    }
    return (
        <div>
            {cartData.products.length === 0 ? (
                <div className='container my-5 py-5'>
                    <div className='row'>
                        <div className='col-sm'>
                            <img src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" width="200px"/>
                            <h4>Missing Cart items?</h4>
                            <p>Login to see the items you added previously</p>
                            <button className='btn btn-warning'>Login</button>
                        </div>
                    </div>
                </div>) : (
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-12 text-end'>
                            <button onClick={proceedToPay} className="btn btn-success">Proceed to Pay</button>
                        </div>
                    </div>  
                    {cartData.products.map((product, index) => (
                        <div className="row my-4 border-bottom py-2" key={product._id}>
                            <div className="col-sm-3">
                                <img src={product.imgSrc} width="100px"/>
                            </div>
                            <div className="col-sm-6">
                                <h2 className='text-start'>{product.name}</h2>
                                <ul className='text-start'>
                                    {product.specifications.map((specify, i) => (
                                        <li key={i}>{specify}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="col-sm-3">
                                <h2>{product.price}</h2>
                                <h4>Quantity: 
                                    <button onClick={() => decrementProduct(product.name)} className="btn btn-danger me-2">-</button>
                                        {product.quantity}
                                    <button onClick={() => incrementProduct(product.name)} className="btn btn-success ms-2">+</button>
                                </h4>
                                <button onClick={() => removeProduct(product.name)} className="btn btn-danger">Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default CartComponent;