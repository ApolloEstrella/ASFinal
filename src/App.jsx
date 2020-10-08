import React from "react";
import { makeStyles, createStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Menu, MenuItem, useMediaQuery } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import Login  from "../src/components/authentications/login";
import Register from "../src/components/authentications/register";
import ForgotPassword from "./components/authentications/forgot-password";
import { Route, Switch } from "react-router-dom";


const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

 
  const App = props => {
    const { history } = props;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

    const handleMenu = event => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClick = pageURL => {
      history.push(pageURL);
      setAnchorEl(null);
    };

    const handleButtonClick = pageURL => {
      history.push(pageURL);
    };

    const menuItems = [
      {
        key:0,
        menuTitle: "Login",
        pageURL: "/login",
      },
      {
        key:1,
        menuTitle: "Register",
        pageURL: "/register",
      } 
    ];

    return (
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <div className={classes.root}>
              <AppBar position="static">
                <Toolbar>
                  <Typography variant="h6" className={classes.title}>
                    THE DAILY PLANET
                  </Typography>
                  {isMobile ? (
                    <>
                      <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        onClick={handleMenu}
                      >
                        <MenuIcon />
                      </IconButton>
                      <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        open={open}
                        onClose={() => setAnchorEl(null)}
                      >
                        {menuItems.map((menuItem, index) => {
                          const { menuTitle, pageURL} = menuItem;
                          return (
                            <MenuItem key={index} onClick={() => handleMenuClick(pageURL)}>
                             {menuTitle}
                            </MenuItem>
                          );
                        })}
                      </Menu>
                    </>
                  ) : (
                    <>
                      <Button
                        color="inherit"
                        onClick={() => handleButtonClick("/login")}
                      >
                        Login
                      </Button>
                      <Button
                        color="inherit"
                        onClick={() => handleButtonClick("/register")}
                      >
                        Register
                      </Button>
                    </>
                  )}
                </Toolbar>
              </AppBar>
            </div>
          </Grid>
        </Grid>
        <Switch>
          <Route exact from="/login" render={(props) => <Login {...props} />} />           
          <Route exact path="/register" render={(props) => <Register {...props} />} />
          <Route exact path="/forgot-password" render={(props) => <ForgotPassword {...props} />} />
        </Switch>
      </div>
    );
  }

export default withRouter(App);