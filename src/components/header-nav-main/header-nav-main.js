import {
  AppBar,
  Checkbox,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormControlLabel,
  FormGroup,
  Grid,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';

const checkboxData = [
  {
    id: 'sites',
    label: 'Websites',
    checked: true,
  },
  {
    id: 'apps',
    label: 'Apps',
    checked: true,
  },
  {
    id: 'banners',
    label: 'Banners',
    checked: true,
  },
];

const useStyles = makeStyles((theme) => {
  return {
    menuButton: {
      marginRight: theme.spacing(2),
    },
    brand: {
      display: 'flex',
      alignItems: 'center',
      '& a': {
        color: 'white',
        textDecoration: 'none',
        padding: '8px',
        borderRadius: '4px',
        '&:hover': {
          backgroundColor: 'rgba(255,255,255, 0.1)',
        },
      },
    },
    navExpandPanel: {
      backgroundColor: 'unset',
      boxShadow: 'unset',
      width: '100%',
      color: 'white',
    },
    gridToggle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      maxHeight: '80px',
    },
    gridCheckboxesOpen: {
      display: 'flex',
      alignItems: 'center',
      flexGrow: 4,
      justifyContent: 'center',
    },
    expansionPanelSummaryContent: {
      margin: '0 !important',
    },
    expansionPanelSummaryRoot: { minHeight: '80px !important' },
    gridRoot: { minHeight: '80px' },
  };
});

const HeaderNavMain = ({ themeToggleButton }) => {
  const classes = useStyles();

  const handleCheckboxChange = (e) => {
    console.log('handleCheckboxChange:', e.target.id);
  };

  const checkboxes = checkboxData.map((cb, i) => {
    return (
      <FormControlLabel
        key={'cb' + i}
        label={cb.label}
        control={
          <Checkbox
            color="default"
            id={cb.id}
            checked={cb.checked}
            onChange={handleCheckboxChange}
          />
        }
      />
    );
  });

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => {
    return (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };
  };

  const brand = (
    <Link to="/about">
      <Typography variant="h5" component="span">
        BRAND
      </Typography>
    </Link>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justify="space-between" className={classes.gridRoot}>
          <Hidden smUp>
            <Grid item xs={10}>
              <ExpansionPanel
                square
                expanded={expanded === 'panel1'}
                onChange={handleChange('panel1')}
                className={classes.navExpandPanel}
              >
                <ExpansionPanelSummary
                  classes={{
                    root: classes.expansionPanelSummaryRoot,
                    content: classes.expansionPanelSummaryContent,
                  }}
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Grid item>
                    <IconButton
                      edge="start"
                      className={classes.menuButton}
                      color="inherit"
                      aria-label="menu"
                    >
                      <MenuIcon fontSize="large" />
                    </IconButton>
                  </Grid>
                  <Grid
                    item
                    xs
                    container
                    justify="center"
                    className={classes.brand}
                  >
                    {brand}
                  </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Grid item xs={12}>
                    <FormGroup>{checkboxes}</FormGroup>
                  </Grid>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Grid>
          </Hidden>

          <Hidden xsDown>
            <Grid item sm className={classes.brand}>
              {brand}
            </Grid>
            <Grid item sm className={classes.gridCheckboxesOpen}>
              <FormGroup row>{checkboxes}</FormGroup>
            </Grid>
          </Hidden>

          <Grid
            item
            xs={2}
            sm
            container
            justify="flex-start"
            className={classes.gridToggle}
          >
            {themeToggleButton}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderNavMain;