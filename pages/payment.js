import Layout from '../components/Layout';
import { Typography, List, ListItem, TextField, Button, Link } from '@material-ui/core';
import useStyles from '../utils/styles';
import NextLink from 'next/link';
import { useContext, useEffect } from 'react';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useForm, Controller } from 'react-hook-form';
import CheckoutWizard from '../components/CheckoutWizard';


export default function Shipping(){

    const router = useRouter();
    const { redirect } = router.query;
    const { state, dispatch } = useContext(Store);
    const { userInfo, 
            cart: { shippingAddress }, 
        } = state;
    
    const { handleSubmit, 
            control, 
            formState: { errors }, 
            setValue,
            } = useForm();

    useEffect( ()=> {
        if(!userInfo) {
            router.push('/login?redirect=/shipping');
        }
        setValue('fullName', shippingAddress.fullName);
        setValue('address', shippingAddress.address);
        setValue('city', shippingAddress.city);
        setValue('postalCode', shippingAddress.postalCode);
        setValue('country', shippingAddress.country);

    }, []);


    const classes = useStyles();

    const submitHandler = ({ fullName, address, city, postalCode, country }) => {

        dispatch({ 
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: { fullName, address, city, postalCode, country } 
            });

        Cookies.set('shippingAddress', { fullName, address, city, postalCode, country
            });
        router.push('/payment');
        
    };
    return (
        <Layout title="Shipping Address">
            <CheckoutWizard activeStep={2} />
            <form onSubmit = {handleSubmit(submitHandler)} className= {classes.form}>
                <Typography component="h1" variant="h1">
                    Shipping Address
                </Typography>
                <List>

                    <ListItem >
                        <Controller
                        name="fullName"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: true,
                            minLength: 2,
                        }}
                        render={({ field }) => (
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="fullName"
                                label="Full Name"
                                error={Boolean(errors.fullName)}
                                helperText={
                                    errors.fullName
                                    ? errors.fullName.type === 'minLength'
                                        ? 'Full Name Length is more than 2 letter'
                                        : 'Full Name is required'
                                    : ''
                                }
                                {...field}
                            ></TextField>
                           )}
                        ></Controller>
                    </ListItem>

                    <ListItem >
                        <Controller
                        name="address"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: true,
                            minLength: 2,
                        }}
                        render={({ field }) => (
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="address"
                                label="Address"
                                error={Boolean(errors.address)}
                                helperText={
                                    errors.address
                                    ? errors.address.type === 'minLength'
                                        ? 'Address Length is more than 2 letter'
                                        : 'Address is required'
                                    : ''
                                }
                                {...field}
                            ></TextField>
                           )}
                        ></Controller>
                    </ListItem>

                    <ListItem >
                        <Controller
                        name="city"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: true,
                            minLength: 2,
                        }}
                        render={({ field }) => (
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="city"
                                label="City"
                                error={Boolean(errors.city)}
                                helperText={
                                    errors.city
                                    ? errors.city.type === 'minLength'
                                        ? 'City Length is more than 4 letter'
                                        : 'City is required'
                                    : ''
                                }
                                {...field}
                            ></TextField>
                           )}
                        ></Controller>
                    </ListItem>

                    <ListItem >
                        <Controller
                        name="postalCode"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: true,
                            minLength: 2,
                        }}
                        render={({ field }) => (
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="postalCode"
                                label="Postal Code"
                                error={Boolean(errors.postalCode)}
                                helperText={
                                    errors.postalCode
                                    ? errors.postalCode.type === 'minLength'
                                        ? 'Postal Code Length is more than 2 letter'
                                        : 'Postal Code is required'
                                    : ''
                                }
                                {...field}
                            ></TextField>
                           )}
                        ></Controller>
                    </ListItem>

                    <ListItem >
                        <Controller
                        name="country"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: true,
                            minLength: 2,
                        }}
                        render={({ field }) => (
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="country"
                                label="Country"
                                error={Boolean(errors.country)}
                                helperText={
                                    errors.country
                                    ? errors.country.type === 'minLength'
                                        ? 'Country Length is more than 2 letter'
                                        : 'Country is required'
                                    : ''
                                }
                                {...field}
                            ></TextField>
                           )}
                        ></Controller>
                    </ListItem>

                    <ListItem>
                        <Button variant="contained" type="submit" fullWidth color="primary">
                        Continue
                        </Button>
                    </ListItem>
                </List>
            </form>
        </Layout>
    );
}