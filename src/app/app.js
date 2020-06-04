import { Box, CssBaseline } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import Routes from './routes';
import { ThemeProvider } from '@material-ui/core/styles';
import { styled } from '@material-ui/core/styles';
import themes from './themes';
import { toggleTheme } from './store';
import { useMediaQuery } from '@material-ui/core';

const AppWrapper = styled(Box)({
  height: '100vh',
  minWidth: '320px',
});

const App = ({ theme }) => {
  const dispatch = useDispatch();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {
    if (prefersDarkMode && theme === 'light') {
      dispatch(toggleTheme());
    } else if (!prefersDarkMode && theme === 'dark') {
      dispatch(toggleTheme());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersDarkMode]);

  return (
    <ThemeProvider theme={themes[theme]}>
      <CssBaseline />
      <AppWrapper>
        <Routes />
      </AppWrapper>
    </ThemeProvider>
  );
};

App.propTypes = {
  theme: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    theme: state.app.theme,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
