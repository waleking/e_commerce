import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';

const steps = ["Shipping address", "Payment details"];

const Checkout = ({cart, order, handleCaptureCheckout, error}) => {
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [activateStep, setActivateStep] = useState(0);
    const [shippingData, setShippingData] = useState({});
    const [isTimerFinished, setIsTimerFinished] = useState(false);
    const history = useHistory();

    if(order) console.log(order);

    useEffect(()=>{
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
                setCheckoutToken(token);
            } catch (error) {
                // if the cart is empty, we force the page redirect to homepage "/"
                history.push("/");
            }
        }
        // Because useEffect doesn't accept async function as its papramter directly,
        // we have to wrap the async part as an inner function. 
        generateToken();
    }, [cart]);

    const next = (data) => {
        console.log(data);
        setShippingData(data);
        nextStep();
    };

    const backStep = () => setActivateStep((prevActivateStep) => prevActivateStep - 1);
    const nextStep = () => setActivateStep((prevActivateStep) => prevActivateStep + 1);
    const timeOut = () => {
        setTimeout(() => {
            setIsTimerFinished(true);
        }, 3000);
    }

    const Form = () => {
        return activateStep===0 ? 
            <AddressForm checkoutToken={checkoutToken} next={next}/> 
            : <PaymentForm 
                checkoutToken={checkoutToken} 
                backStep={backStep} 
                nextStep={nextStep}
                shippingData={shippingData}
                handleCaptureCheckout={handleCaptureCheckout}
                timeout={timeOut}
              />;
    }

    const Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}</Typography>
                <Divider/>
                <Typography variant="subtitle2">Order ref: {order.customer_reference} </Typography>
            </div>
            <br/>
            <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
        </>
    ) : isTimerFinished ? (<>The payment is not done</>): (
        <div>
            <CircularProgress />
        </div>
    ) 

    if(error){
        return (
            <>
                <Typography variant="h5">{error}</Typography>
                <br/>
                <Button component={Link} to="/" variant="outlined" type="button">Back to Home</Button>
            </>
        )
    }

    return (
        <>
            {/* use CSSBaseline to fix the layout to mobile devices, mainly removing the margin around the material-ui (I guess). */}
            <CssBaseline />
            <div style={{height: "80px"}}/>
            <main>
                <Paper>
                    <Typography variant="h4" align="center">Check out</Typography>
                    <Stepper activeStep={activateStep}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>
                                    {step}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {/* activateStep === steps.length means it's the final step */}
                    {activateStep === steps.length ? <Confirmation/> : checkoutToken && <Form/> }
                </Paper>
            </main>
        </>
    )
}

export default Checkout;
