import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Typography, Box, Grid, Container, List, ListItem, ListItemText} from "@mui/material";
import styles from "./Header.module.css";
import {appActions} from "../../utils/redux/appSlice";
import {CiSun, CiDark} from "react-icons/ci";

const Header = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.app.theme);
  const switchHandler = () => {
    if (theme === "light") dispatch(appActions.themeToggler(true));
    else {
      dispatch(appActions.themeToggler(false));
    }
  };
  return (
    <React.Fragment>
      <Box className={`${styles.headContainer} ${theme}`}>
        <Container>
          <Grid container className={styles.alignCenter}>
            <Grid item xs={12} md={5}>
              <Box className={styles.headDesc}>
                <Typography variant="h3">Theme Switcher</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} className={`${styles.commonFlex} ${styles.justifyCenter}`}>
              <List>
                <ListItem>
                  <ListItemText>
                    {theme === "dark" ? (
                      <Box className={styles.iconBox} onClick={switchHandler}>
                        <CiSun />
                      </Box>
                    ) : (
                      <Box className={styles.iconBox} onClick={switchHandler}>
                        <CiDark />
                      </Box>
                    )}
                  </ListItemText>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </React.Fragment>
  );
};

export default Header;
