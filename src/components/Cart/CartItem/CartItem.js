import React from 'react'
import { Card, CardMedia, CardContent, Typography, Button } from '@material-ui/core';

const CartItem = ({item, onUpdateCartQty, onRemoveFromCart}) => {
    return (
            <Card>
                <CardMedia image={item.media.source} title={item.name}/>
                <CardContent>
                    <Typography variant="h4">{item.name}</Typography> 
                    <Typography variant="h5">{item.price.formatted_with_symbol}</Typography>
                </CardContent>
                <div>
                    <Button onClick={()=>{onUpdateCartQty(item.id, item.quantity-1); console.log("-")}} type="button" size="small">-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button onClick={()=>{onUpdateCartQty(item.id, item.quantity+1); console.log("+")}} type="button" size="small">+</Button>
                </div>
                <Button onClick={()=>{onRemoveFromCart(item.id)}} type="button" color="secondary">Remove</Button>
            </Card>
    )
}

export default CartItem;
