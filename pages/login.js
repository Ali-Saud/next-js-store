import Layout from '../components/Layout';
import { Typography, List, ListItem, TextField, Button, Link } from '@material-ui/core';
import useStyles from '../utils/styles';
import NextLink from 'next/link';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useForm, Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';



export default function Login () {
    const { handleSubmit, control, formState: { errors }} = useForm();

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const router = useRouter();
    const { redirect } = router.query;
    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;
    
    useEffect( ()=> {
        if(userInfo) {
            router.push('/');
        }
    }, []);

    // no need to State after using react-hook-form:
    //const [ email, setEmail ] = useState('');
    //const [ password, setPassword ] = useState('');

    
    const classes = useStyles();

    const submitHandler = async ({ email, password}) => {
        closeSnackbar();
        try {
            const { data } = await axios.post('/api/users/login', { email, password });
        
            dispatch({ type: 'USER_LOGIN', payload: data});

            Cookies.set('userInfo', data);
            router.push(redirect || '/');
        
            } catch(err) {
                enqueueSnackbar(err.response.data ? err.response.data.message : err.message,{variant: 'error'});
            }
        };
    return (
        <Layout title="Login">
            <form onSubmit = {handleSubmit(submitHandler)} className= {classes.form}>
                <Typography component="h1" variant="h1">
                    Login
                </Typography>
                <List>
                    <ListItem >
                        <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: true,
                            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                        }}
                        render={({ field }) => (
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="email"
                                label="Email"
                                inputProps={{ type: 'email' }}
                                error={Boolean(errors.email)}
                                helperText={
                                    errors.email
                                    ? errors.email.type === 'pattern'
                                        ? 'Email is not valid'
                                        : 'Email is required'
                                    : ''
                                }
                                {...field}
                            ></TextField>
                           )}
                        ></Controller>
                    </ListItem>

                    <ListItem >
                        <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{
                            required: true,
                            minLength: 6,
                        }}
                        render={({ field }) => (
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="password"
                                label="Password"
                                inputProps={{ type: 'password' }}
                                error={Boolean(errors.password)}
                                helperText={
                                    errors.password
                                    ? errors.password.type === 'minLength'
                                        ? 'Password length should be more than 6'
                                        : 'Password is required'
                                    : ''
                                }
                                {...field}
                            ></TextField>
                            )}
                        ></Controller>
                    </ListItem>

                    <ListItem>
                        <Button variant="contained" type="submit" fullWidth color="primary">
                            Login
                        </Button>
                    </ListItem>

                    <ListItem>
                        Not Registerd? &nbsp;
                        <NextLink href={`/register?redirect=${redirect || '/'}`} passHref>
                            <Link>
                                Register
                            </Link>
                        </NextLink>
                    </ListItem>

                </List>
            </form>
        </Layout>
    );
}
