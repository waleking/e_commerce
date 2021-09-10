import React from 'react';
import { Grid } from '@material-ui/core';
import Product from './Product/Product';


// const products = [
//     {
//         id: 1, 
//         name: "Shoes", 
//         description: "Running shoes.", 
//         price: 15,
//         image: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
//     },
//     {
//         id: 2, 
//         name: "Macbook", 
//         description: "Apple Macbook.", 
//         price: 2000,
//         image: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png",
//     }
// ];

const Products = ({ products, onAddToCart }) => {
    return (
        <main>
            <Grid container justify="center" >
                {
                    products.map((product) => (
                        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                            <Product product={product} onAddToCart={onAddToCart}/>
                        </Grid>
                    ))
                }
            </Grid>
        </main>
    )
}

export default Products;
