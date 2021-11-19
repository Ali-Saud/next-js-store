import Head from 'next/head';
import NextLink from 'next/link';
import { AppBar, Toolbar, Typography, Container, Link} from '@material-ui/core';
import useStyles from '../utils/styles';


const Layout = ({children}) => {
    const classes = useStyles();
    return (
      <div>
        <Head>
          <title>Next Amazona</title>
        </Head>
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography className={classes.brand}>amazona</Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}></div>
            <NextLink href="/cart" passHref>
              <Link>Cart</Link>  
            </NextLink>
            <NextLink href="/login" passHref>
              <Link>Login</Link>  
            </NextLink>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          <Typography>All Rights Reserved; 2021</Typography>
        </footer>
      </div>
    );
}

export default Layout;
