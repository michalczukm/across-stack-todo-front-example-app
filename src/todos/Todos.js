import React, { Component } from 'react';
import { Typography, withStyles } from '@material-ui/core';
import { Clear } from '@material-ui/icons'
import Grid from '@material-ui/core/Grid/Grid';
import './Todos.css';
import Todo from './Todo';
import { API_BASE_URI } from '../config';
import Paper from '@material-ui/core/Paper/Paper';
import IconButton from '@material-ui/core/IconButton/IconButton';

const withEmptyListHandling = (list, iterator) => list && list.length
	? list.map(iterator)
	: (<Typography align="center" variant="subheading">No items so far!</Typography>);

const styles = theme => ({
	addItem: {
		display: 'flex',
		'flex-direction': 'column'
	},
	listItem: {
		padding: theme.spacing.unit * 2
	},
	deleteButton: {
		display: 'flex',
		'justify-content': 'center'
	}
});

class Todos extends Component {
	cleanFormRef;
	state = {
		todos: []
	};

	componentDidMount() {
		this.getTodos();
	}

	getTodos() {
		fetch(`${API_BASE_URI}/items`)
			.then(response => response.json())
			.then(todos => this.setState({todos}));
	}

	isItemValid = (item) => item.title && item.content;

	addItem(item) {
		fetch(`${API_BASE_URI}/items`, {
			method: 'POST',
			body: JSON.stringify(item),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => {
				if (response.status !== 201) {

				} else {

				}

				this.resetNewItem();
				this.getTodos();
			});
	}

	resetNewItem = () => this.cleanFormRef && this.cleanFormRef();

	deleteItem(id) {
		fetch(`${API_BASE_URI}/items/${id}`, {
			method: 'DELETE'
		})
			.then(() => {
				this.getTodos();
			})
			.catch((error) => alert('Ups!' + JSON.stringify(error)));
	}

	updateItem(id, item) {
		fetch(`${API_BASE_URI}/items/${id}`, {
			method: 'PUT',
			body: JSON.stringify(item)
		})
			.then(() => {
				this.getTodos();
			})
			.catch((error) => alert('Ups!' + JSON.stringify(error)));
	}

	renderAddItem() {
		const {classes} = this.props;

		return (
			<div className={classes.addItem}>
				<Todo cleanFormRef={(cleanFormRef) => this.cleanFormRef = cleanFormRef}
					  onEnterPressed={(newItem) => this.addItem(newItem)}/>
			</div>
		)
	}

	renderList() {
		const {classes} = this.props;

		return (
			<Grid
				container
				direction="column"
				justify="flex-start"
				spacing={16}
				alignItems="stretch"
			>
				{
					withEmptyListHandling(
						this.state.todos,
						(item) => (
							<Grid item xs={12} key={item.id}>
								<Paper className={classes.listItem}>
									<Grid container
										  direction="row"
										  alignItems="center"
										  alignContent="center"
										  justify="center">
										<Grid item xs={11}>
											<Todo item={item}
												  onEnterPressed={(item) => this.updateItem(item.id, item)}/>
										</Grid>
										<Grid item xs={1} className={classes.deleteButton}>
											<IconButton variant="raised" color="secondary"
														onClick={() => this.deleteItem(item.id)}>
												<Clear fontSize="large"/>
											</IconButton>
										</Grid>
									</Grid>
								</Paper>
							</Grid>)
					)
				}
			</Grid>
		);
	}

	render() {
		return (
			<Grid
				container
				direction="row"
				justify="center"
				spacing={32}
				alignItems="center"
				alignContent="center">
				<Grid item xs={12} md={10}>
					{this.renderAddItem()}
				</Grid>
				<Grid item xs={12} md={10}>
					<Typography variant="display1" align="center" gutterBottom>Our items</Typography>
				</Grid>
				<Grid item xs={12} md={9}>
					{this.renderList()}
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(Todos);