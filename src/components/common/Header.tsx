import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles, Theme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { Button, CircularProgress } from '@material-ui/core';
import { useFormik } from 'formik';
import { GitHub } from '@material-ui/icons';

interface IHeader {
    onSearchSubmit: (searchText: string) => void
    isLoading: boolean
}

const Header: React.FC<IHeader> = ({onSearchSubmit, isLoading}) => {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      search: '',
    },
    onSubmit: (values) => onSearchSubmit(values.search),
  });

  return (
    <>
      <AppBar>
        <Toolbar className={classes.toolbar}>
          <div className={classes.titleWrapper}>
            <GitHub />
            <Typography className={classes.title} variant="h6" noWrap>
              {process.env.REACT_APP_NAME}
            </Typography>
          </div>

          <form className={classes.formSubmit} onSubmit={formik.handleSubmit}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              name="search"
              value={formik.values.search}
              onChange={formik.handleChange}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <Button className={classes.buttonSubmit} color="secondary" variant="contained" type="submit">
            { isLoading ? 
              <CircularProgress className={classes.spinner} color="primary" size={'1.5rem'} thickness={5}/> 
              : 
              "Search" 
            }
          </Button>
          </form>
        </Toolbar>
      </AppBar>
      <div className={classes.headerOffset} />
      </>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    titleWrapper: {
      display: "flex",
      alignItems: "center",
      flexGrow: 1,
      marginTop: theme.spacing(1),
     
       [theme.breakpoints.up('sm')]: {
        marginTop: 0,
      },
    },
    title: {
      marginLeft: theme.spacing(1),  
      display: 'flex',
      
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '16ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
    buttonSubmit: {
        marginLeft: theme.spacing(1),
      },
    formSubmit: {
       display: "flex",
       margin: theme.spacing(1,0,2,0),
       [theme.breakpoints.up('sm')]: {
        marginTop: 0,
        marginBottom: 0,
      },
    },
    toolbar: {
      flexDirection: "column",
      [theme.breakpoints.up('sm')]: {
        flexDirection: "row",
      },
    },
    spinner: {
     paddingLeft: theme.spacing(1.995),
     paddingRight: theme.spacing(1.995)
    },
    headerOffset: {
      ...theme.mixins.toolbar,
  },
  }));

  export default Header;
