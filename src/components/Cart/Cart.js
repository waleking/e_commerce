import React from 'react'
import { Grid, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CartItem from './CartItem/CartItem';

const Cart = ({cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart}) => {
    const EmptyCart = () => (
        <div>
            The cart is empty. <Link to="/">Start adding some products</Link>.
        </div>
    );
    const FilledCart = ({cart}) => {
        return (
            <>
                <Grid container>
                    {
                        cart.line_items.map(
                            (item)=>{
                                console.log(item); // Why it's executed twice?
                                return (
                                    <Grid item key={item.id} xs={12} sm={4}>
                                        <CartItem 
                                            item={item} 
                                            onUpdateCartQty={handleUpdateCartQty}
                                            onRemoveFromCart={handleRemoveFromCart}
                                        />
                                    </Grid>
                                );
                            }
                        )
                    }
                </Grid>
                <Typography variant="h4">Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
                <Button onClick={handleEmptyCart} color="secondary">Empty cart</Button>
                <Button component={Link} to="/checkout" color="primary">Check out</Button>
            </>
        );
    };

    if (!cart.line_items) {
        return (
            <>
                <div sytle={{height: "200px"}}></div>
                <div>Loading...</div>
            </>
        );
    }

    return (
        <div>
            <div style={{height: "80px"}}/>
            <h2>Your Shopping Cart</h2>
            {
                cart.total_items === 0 ? <EmptyCart/> : <FilledCart cart={cart}/>
            }
        </div>
    )
}

export default Cart;
