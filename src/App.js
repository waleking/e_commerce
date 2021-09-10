import React, { useState, useEffect } from 'react'
// import Navbar from './components/Navbar/Navbar';
// import Products from './components/Products/Products'
import { Navbar, Products, Cart, Checkout } from './components';
import {commerce} from './lib/commerce';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMsg, setErrorMsg] =useState("");
    // console.log(commerce);

    const fetchProducts = async () => {
        const {data} = await commerce.products.list();
        setProducts(data);
    }

    const fetchCart = async () => {
        const response = await commerce.cart.retrieve();
        setCart(response);
    }

    const handleAddToCart = async (productId, quantity) => {
        const response = await commerce.cart.add(productId, quantity);
        setCart(response.cart);
    }

    const handleUpdateCartQty = async (productId, quantity) => {
        const response = await commerce.cart.update(productId, {quantity: quantity});
        setCart(response.cart);
    }

    const handleRemoveFromCart = async (productId) => {
        const response = await commerce.cart.remove(productId);
        setCart(response.cart);
    }

    const handleEmptyCart = async () => {
        const response = await commerce.cart.empty();
        setCart(response.cart);
    }

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();
        setCart(newCart);
    }

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
            setOrder(incomingOrder);
            refreshCart();
        } catch (error) {
            setErrorMsg(error.data.error.message);
        }
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    const myfunc = () => {
        // console.log("hello");
        // window.alert("hello");
        handleAddToCart("prod_zkK6oL9VaO5Xn0", 1);
    }

    // console.log(products);
    // console.log(cart);
    
    return (
        <BrowserRouter>
            <div>
                {/* use CSSBaseline to fix the layout to mobile devices, mainly removing the margin around the material-ui (I guess). */}
                <CssBaseline />
                <Navbar totalItems={cart.total_items}/>
                <Switch>
                    <Route exact path="/">
                        <Products products={products} onAddToCart={handleAddToCart}/>
                    </Route>
                    <Route exact path="/cart">
                        <
                            Cart 
                            cart={cart}
                            handleUpdateCartQty={handleUpdateCartQty}
                            handleRemoveFromCart={handleRemoveFromCart}
                            handleEmptyCart={handleEmptyCart}
                        />
                    </Route>
                    <Route exact path="/checkout">
                        <Checkout 
                            cart={cart}
                            order={order}
                            handleCaptureCheckout={handleCaptureCheckout}
                            error={errorMsg}
                        />
                    </Route>
                </Switch>
                {/* <button onClick={myfunc}>click</button> */}
            </div>
        </BrowserRouter>
    )
}

export default App;
