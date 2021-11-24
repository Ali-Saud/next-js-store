import Layout from '../components/Layout';
import { Typography, List, ListItem, TextField, Button, Link } from '@material-ui/core';
import useStyles from '../utils/styles';
import NextLink from 'next/link';

export default function Register () {
    const classes = useStyles();
    return (
        <Layout title="Register">
            <form className= {classes.form}>
                <Typography component="h1" variant="h1">
                    Register
                </Typography>
                <List>

                    <ListItem >
                        <TextField variant="outlined" fullWidth id="name" label="Name" inputProps={{type: 'name'}}></TextField>
                    </ListItem>

                    <ListItem >
                        <TextField variant="outlined" fullWidth id="email" label="Email" inputProps={{type: 'email'}}></TextField>
                    </ListItem>

                    <ListItem >
                        <TextField variant="outlined" fullWidth id="password" label="Password" inputProps={{type: 'password'}}></TextField>
                    </ListItem>

                    <ListItem >
                        <TextField variant="outlined" fullWidth id="confirm-password" label="Confirm Password" inputProps={{type: 'password'}}></TextField>
                    </ListItem>

                    <ListItem>
                        <Button variant="contained" type="submit" fullWidth color="primary">
                            Register
                        </Button>
                    </ListItem>

                </List>
            </form>
        </Layout>
    );
}
