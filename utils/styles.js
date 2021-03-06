import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    navbar: { 
        backgroundColor: '#203040',
        '& a': {
            color: '#FFFFFF',
            marginLeft: 10,
        },
    },
    brand: {
        fontWeight: 'bold',
        fontSize: '1.5rem',
    },
    grow: {
        flexGrow:1
    },
    main: {
        minHeight: '80vh',
    },
    footer: {
        textAlign: 'center',
        marginTop: '20px',
        backgroundColor: '#203040',
        color: '#ffffff',
        height: '30px',
        justifyContent: 'center',
        alignItems: 'center'
    },
    section: {
        marginTop: '10px',
        marginBottom: '10px',
    },
    form : {
        width: '100%',
        maxWidth: 800,
        margin: '0 auto',
    },
    navbarButton: {
        color: '#ffffff',
        textTransform: 'initial',
    },
    transparentBackground : {
        backgroundColor: 'transparent',
    },
    error: {
        color: '#f04040'
    }
    
});

export default useStyles;