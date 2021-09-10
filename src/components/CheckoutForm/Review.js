import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';

const Review = ({checkoutToken}) => {
    console.log(checkoutToken);
    console.log(checkoutToken.live.subtotal.formatted_with_symbol);
    return (
        <>
            <Typography variant="h6">Order Summary</Typography>
            <List disablePadding>
                {checkoutToken.live.line_items.map((product)=>(
                    <ListItem style={{padding: "0 10px"}} key={product.name}>
                        <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`}/>
                        <Typography variant="body2">{product.line_total.formatted_with_symbol}</Typography>
                    </ListItem>
                ))}
                <ListItem style={{padding: "0 10px"}}>
                    <ListItemText primary="Total"/>
                    <Typography variant="subtitle1">
                        {checkoutToken.live.subtotal.formatted_with_symbol}
                    </Typography>
                </ListItem>
                {/* <Typography variant="subtitle1"> */}
                
            </List>
        </>
    )
}

export default Review;
