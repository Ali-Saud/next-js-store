import Layout from './../../components/Layout';
import Image from 'next/image';
import NextLink from 'next/link';
import { Link, Grid, List, ListItem, Typography, Card, Button } from '@material-ui/core';
import useStyles from '../../utils/styles';
import Product from '../../models/Product';
import db from '../../utils/db';
import axios from 'axios';
import { useContext } from 'react';
import { Store }from '../../utils/Store';
import {useRouter} from 'next/router';

//import {useRouter} from 'next/router';
//import data from '../../utils/data';



export default function ProductScreen(props) {
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const { product } = props;
    const classes = useStyles();
    // these are before mongoDB connection:
    // also comment db and useRouter in imports
    // const router = useRouter();
    // const {slug} = router.query;
    // const product = data.products.find(a=> a.slug === slug);
    if(!product) {
        return <div>Product Not Found</div>
    }

    const addToCartHandler = async () => {

        const existItem = state.cart.cartItems.find(x=> x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;

        const { data } = await axios.get(`/api/products/${product._id}`);
        
        if(data.countInStock < quantity) {
            window.alert('Sorry, Product is out of stock');
            return;
        }
        
        dispatch({type: 'CART_ADD_ITEM', payload: {...product, quantity }});
        router.push('/cart');
    };

    return (
    <Layout title={product.name} description ={product.discription}>
        <div className={classes.section}>
            <NextLink href="/" passHref>
                <Link>
                    <Typography>
                        Back to Products
                    </Typography>
                </Link>
            </NextLink>
        </div>
        <Grid container spacing={1}>
            <Grid items md={6} xs={12}>
                <Image src={product.image} alt={product.name} width={640} height={640} layout="responsive"></Image>
            </Grid>
            <Grid item md={3} sm={6} xs={12}>
                <List>
                    <ListItem>
                        <Typography component="h1" variant="h1">
                            {product.name}
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Category: {product.category}
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Brand: {product.brand}
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>    
                            Rating: {product.rating} stars ({product.numRevies} reviews)
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            Description:<br />{product.description}
                        </Typography>
                    </ListItem>
                </List>
            </Grid>
            <Grid item md={3} xs={12}>
                <Card>
                    <List>
                        <ListItem>
                            <Grid container >
                                <Grid item xs={6}>
                                    <Typography>
                                       Price 
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>
                                       ${product.price} 
                                    </Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem>
                            <Grid container >
                                <Grid item xs={6}>
                                    <Typography>
                                       Status 
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography>
                                       {product.countInStock > 0 ? 'In Stock' : 'Unavailable'} 
                                    </Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem>
                            <Button 
                            fullWidth variant="contained"
                            color="primary"
                            onClick={addToCartHandler}>
                                Add to Cart
                            </Button>
                        </ListItem>
                    </List>
                </Card>
            </Grid>
        </Grid>
    </Layout>
    );
      
}


export async function getServerSideProps(context) {
    const { params } = context;
    const { slug } = params;
  await db.connect();
  const product = await Product.findOne({slug}).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product)
    },
  }
}