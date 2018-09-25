import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core';
import './App.css';
import { Todos } from './todos/Todos';

const theme = createMuiTheme({
	palette: {
		primary: purple,
		secondary: {
			main: '#f44336',
		},
	}
});

const styles = theme => ({
	root: {
		padding: theme.spacing.unit * 2
	}
});

class App extends Component {
	render() {
		const {classes} = this.props;

		return (
			<MuiThemeProvider theme={theme}>
				<div className={classes.root}>
					<Todos />
				</div>
			</MuiThemeProvider>
		);
	}
}

export default withStyles(styles)(App);
