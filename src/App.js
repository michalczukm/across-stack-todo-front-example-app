import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core';
import './App.css';
import Todos from './todos/Todos';
import { Videocam } from '@material-ui/icons'
import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';

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
	},
	icon: {
		marginRight: theme.spacing.unit * 2,
	},
});

class App extends Component {
	render() {
		const {classes} = this.props;

		return (
			<MuiThemeProvider theme={theme}>
				{/*<CssBaseline />*/}
				<AppBar position="sticky">
					<Toolbar>
						<Videocam className={classes.icon}/>
						<Typography variant="title" color="inherit" noWrap>
							Across stack: TODO list
						</Typography>
					</Toolbar>
				</AppBar>
				<div className={classes.root}>
					<Todos/>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default withStyles(styles)(App);
