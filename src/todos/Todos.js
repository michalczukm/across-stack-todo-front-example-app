import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import List from '@material-ui/core/List/List';
import { Add } from '@material-ui/icons'
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import Input from '@material-ui/core/Input';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid/Grid';

import Todo from './Todo';
import { API_BASE_URI } from '../config';

const withEmptyListHandling = (list, iterator) => list && list.length
	? list.map(iterator)
	: (<Typography variant="body1">No items so far!</Typography>);


export class Todos extends Component {
	state = {
		content: '',
		todos: []
	};

	componentDidMount() {
		this.getTodos();
	}

	getTodos() {
		fetch(`${API_BASE_URI}/items`)
			.then(response => response.json())
			.then(todos => this.setState({ todos }));
	}

	addItem() {
		fetch(`${API_BASE_URI}/items`, {
			method: 'POST',
			body: JSON.stringify({
				content: this.state.content
			})
		})
			.then(response => {
				if (response.status !== 201) {

				} else {

				}

				this.setState({ content: '' });
				this.getTodos();
			});
	}

	deleteItem(id) {
		fetch(`${API_BASE_URI}/items/${id}`, {
			method: 'DELETE'
		})
			.then(() => {
				this.getTodos();
			})
			.catch((error) => alert('Ups!' + JSON.stringify(error)));
	}

	updateItem(id, content) {
		fetch(`${API_BASE_URI}/items/${id}`, {
			method: 'PUT',
			body: JSON.stringify({
				content
			})
		})
			.then(() => {
				this.getTodos();
			})
			.catch((error) => alert('Ups!' + JSON.stringify(error)));
	}

	renderAddItem() {
		return (
			<FormGroup style={{ 'flexDirection': 'row' }}>
				<FormControlLabel
					control={
						<Input
							onKeyPress={event => {
								if (event.key === 'Enter') {
									this.addItem();
								}
							}}
							onChange={event => this.setState({ content: event.currentTarget.value })}
							value={this.state.content}
						/>
					}
				/>
				<IconButton>
					<Add onClick={() => this.addItem()} />
				</IconButton>
			</FormGroup>
		)
	}

	renderList() {
		return (
			<List style={{ width: '100%' }}>
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
							(item, index) => (
								<Grid item xs={12} key={index}>
									<Todo item={item}
										onUpdate={(content) => this.updateItem(item.id, content)}
										onDelete={() => this.deleteItem(item.id)} />
								</Grid>)
						)
					}
				</Grid>
			</List>
		);
	}

	render() {
		return (
			<div>
				<Typography variant="display1" gutterBottom>List</Typography>
				{this.renderAddItem()}
				{this.renderList()}
			</div>
		);
	}
}

