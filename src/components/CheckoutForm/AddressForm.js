import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from './CustomerTextField';
import { Link } from 'react-router-dom';

import { commerce } from '../../lib/commerce';

const AddressForm = ({checkoutToken, next}) => {
    const methods = useForm();

    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState("");
    const [shippingSubdivsions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivsion, setShippingSubdivision] = useState("");
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState("");


    const fetchShippingCountries = async (checkoutTokenId) => {
        commerce.services.localeListShippingCountries(checkoutTokenId).then(({countries}) => {
            setShippingCountries(countries);
            let countryCode = Object.keys(countries)[0];
            setShippingCountry(countryCode);
        });
    }

    const countries = Object.entries(shippingCountries).map(([code, country])=>({id: code, label: country}));

    const fetchSubdivisions = async (countryCode) => {
        commerce.services.localeListSubdivisions(countryCode).then((response)=>{
        // commerce.services.localeListShippingSubdivisions(checkoutTokenId, countryCode).then((response)=>{
            let subdivsions  = response.subdivisions;
            setShippingSubdivisions(subdivsions);
            setShippingSubdivision(Object.keys(subdivsions)[0]);
        });
    }

    const subdivisions = Object.entries(shippingSubdivsions).map(([code, subdivision])=>({id: code, label: subdivision}));

    const fetchShippingOptions = async (checkoutTokenId, countryCode, region=null) => {
        console.log("shipping options");
        commerce.checkout.getShippingOptions(checkoutTokenId, {country: countryCode, region}).then((options)=>{
            console.log(options);
            setShippingOptions(options);
            setShippingOption(options[0].id);
        });
    }

    const shippingOptionDesc = shippingOptions.map((option)=>({id: option.id, label: `${option.description} - ${option.price.formatted_with_symbol}`}));

    useEffect(()=>{
        fetchShippingCountries(checkoutToken.id);
    }, []);

    // Whenever the shippingCountry is changed, the funciton fetchSubdivisions will be executed. 
    useEffect(()=>{
        if(shippingCountry){
            fetchSubdivisions(shippingCountry);
            fetchShippingOptions(checkoutToken.id, shippingCountry);
        }        
    }, [shippingCountry]);

    return (
        <div>
            <Typography variant="h6">Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data)=> next({...data, shippingCountry, shippingSubdivsion, shippingOption}))}>
                    <Grid container spacing={3}>
                        <FormInput name="firstName" label="First Name" required/>
                        <FormInput name="lastName" label="Last Name" required/>
                        <FormInput name="address1" label="Address" required/>
                        <FormInput name="email" label="Email" required/>
                        <FormInput name="city" label="City" required/>
                        <FormInput name="zipcode" label="ZIP / Postal Code" required/>
                        <Grid item>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e)=>{setShippingCountry(e.target.value)}}>
                                {
                                    countries.map(country=>(
                                        <MenuItem key={country.id} value={country.id}>
                                            {country.label}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </Grid>
                        <Grid item>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={shippingSubdivsion} fullWidth onChange={(e)=>{setShippingSubdivision(e.target.value)}}>
                                {
                                    subdivisions.map(subdivision=>(
                                        <MenuItem key={subdivision.id} value={subdivision.id}>
                                            {subdivision.label}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </Grid>
                        <Grid item>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e)=>{setShippingOption(e.target.value)}}>
                                {
                                    shippingOptionDesc.map(optionDesc => (
                                        <MenuItem key={optionDesc.id} value={optionDesc.id}>
                                            {optionDesc.label}
                                        </MenuItem>
                                    ))
                                }
                                
                            </Select>
                        </Grid>
                    </Grid>
                    <br/>
                    <div>
                        <Button component={Link} to="/cart" variant="outlined">Back to Cart</Button>
                        <Button type="submit" variant="contained" color="primary">Next</Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}

export default AddressForm;
