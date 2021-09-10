import React from 'react'
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import logo from "../../assets/commerce.png";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';

const Navbar = ({totalItems}) => {
    const location = useLocation();

    return (
        <div>
            {/* <AppBar position="fixed" className={classes.appBar} color="inherit"> */}
            <AppBar position="fixed" color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" color="inherit">
                        <img src={logo} alt="Commerce.js" height="25px"/>
                        Commerce.js
                    </Typography>
                    <div />
                    {
                        // only show the shopping cart icon in the url path "/"
                        location.pathname==="/" && 
                        (
                            <div>
                                <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                                    {/* <Badge> */}
                                    {/* </Badge> */}
                                    <Badge badgeContent={totalItems} color="secondary">
                                        <ShoppingCart/>
                                    </Badge>
                                </IconButton>
                            </div>
                        )
                    }
                </Toolbar>
            </AppBar> 
        </div>
    )
}

export default Navbar;
