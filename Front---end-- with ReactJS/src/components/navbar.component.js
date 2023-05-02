import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../slices/user.slice';

function NavbarComponent(args) {
    const { data } = useSelector((state) => state.userInfo);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const toggle = () => setIsOpen(!isOpen);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('--')
        if (data && data.userId) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [data]);
    const logoutCTA = () => {
        console.log('logout');
        dispatch(logout());
        navigate('/');
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><img src="https://www.digital-lync.com/images/digital-lyncs-devops-python-digital-marketing-training-hyderabad.png" width="200px"/></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/products">Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart">Cart</Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {isLoggedIn ? (
                                <React.Fragment>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/my-orders">My Orders</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/profile">Profile</Link>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" onClick={logoutCTA}>Logout</a>
                                    </li>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">Register</Link>
                                    </li>
                                </React.Fragment>
                            )}
                        </ul>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavbarComponent;
