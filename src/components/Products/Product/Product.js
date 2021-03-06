import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import useStyles from './styles';

const Product = ({ product, onAddToCart }) => {
    const classes = useStyles();
    const funcClick = () => {
        onAddToCart(product.id, 1);
    }
    return (
        <div>
            <Card className={classes.root}>
                <CardMedia className={classes.media} image={product.media.source} title={product.name}></CardMedia>
                <CardContent >
                    <div className={classes.cardContent}>
                        <Typography variant="h5" gutterBottom>
                            {product.name}
                        </Typography>
                        <Typography variant="h5">
                            {product.price.formatted_with_symbol}
                        </Typography>
                    </div>
                    <Typography variant="body2" color="textSecondary" dangerouslySetInnerHTML={{__html: product.description}} />
                </CardContent>
                <CardActions disableSpacing className={classes.cardActions}>
                    <IconButton aria-label="Add to cart" onClick={funcClick}>
                        <AddShoppingCart />
                    </IconButton>
                </CardActions>
            </Card>
        </div>
    )
}

export default Product;
