import './App.css';
import NavbarComponent from './components/navbar.component';
import HomeComponent from './pages/home.component';
import FooterComponent from './components/footer.component';
import ProductsComponent from './pages/products.component';
import CartComponent from './pages/cart.component';
import LoginComponent from './pages/login.component';
import RegisterComponent from './pages/register.component';
import ProfileComponent from './pages/profile.component';
import OrderDetailsComponent from './pages/order.component';
import MyOrdersComponent from './pages/my-orders.component';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<HomeComponent />}/>
          <Route path="/products" element={<ProductsComponent />}/>
          <Route path="/cart" element={<CartComponent />}/>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
          <Route path="/profile" element={<ProfileComponent />} />
          <Route path="/order-details" element={<OrderDetailsComponent />} />
          <Route path="/my-orders" element={<MyOrdersComponent />} />
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
