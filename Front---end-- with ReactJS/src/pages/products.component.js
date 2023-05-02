import { useDispatch, useSelector } from 'react-redux';
import React, {useEffect} from 'react';
import { fetchProductsData } from '../slices/products.slice';
import { add } from '../slices/cart.slice';
import { useNavigate } from 'react-router-dom';

function ProductsComponent() {
    const dispatch = useDispatch();
    const { isLoading, data } = useSelector((state) => state.products);
    const cartData = useSelector((state) => state.cart);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchProductsData(cartData));
    }, []);
    const addToCart = (product) => {
        dispatch(add({...product, quantity: 1}));
        navigate('/cart');
    };
    console.log(data);
    const goToCart = () => {
        navigate('/cart');
    }
    return (
        <div className="container">
            {isLoading ? (
                    <React.Fragment>
                        <h2>Loading...</h2>
                    </React.Fragment>
                ): (
                    <React.Fragment>
                        {data.map(product => (
                            <div className="row my-4 border-bottom py-2" key={product._id}>
                                <div className="col-sm-3">
                                    <img src={product.imgSrc} width="100px"/>
                                </div>
                                <div className="col-sm-6">
                                    <h2 className='text-start'>{product.name}</h2>
                                    <ul className='text-start'>
                                        {product.specifications.map(specify => (
                                            <li key={specify}>{specify}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="col-sm-3">
                                    <h2>{product.price}</h2>
                                    {product.inCart ? (<button className='btn btn-warning' onClick={() => goToCart()}>Go to Cart</button>) : (<button className='btn btn-primary' onClick={() => addToCart(product)}>Add to Cart</button>)}
                                </div>
                            </div>
                        ))}
                    </React.Fragment>
                )}
        </div>
    )
}

export default ProductsComponent;