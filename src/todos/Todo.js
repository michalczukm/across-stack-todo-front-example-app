import React, { Component, Fragment, createRef } from 'react';
import TextField from '@material-ui/core/TextField/TextField';
import { withStyles } from '@material-ui/core';
import { emptyItem } from './todo-item';

const styles = theme => ({
	item: {
		display: 'flex',
		'flex-direction': 'column'
	}
});

class Todo extends Component {
	titleInputRef = createRef();

	onEnterPressed = this.props.onEnterPressed;

	state = {
		item: this.props.item || emptyItem,
	};

	componentDidMount() {
		this.props.cleanFormRef && this.props.cleanFormRef(() => this.clearForm());
	}

	handleKeyPress(event) {
		if (event.key === 'Enter') {
			this.onEnterPressed(this.state.item);
		}
	}

	clearForm() {
		this.setState({item: this.props.item || emptyItem});
		this.titleInputRef.current.focus();
	}

	render() {
		const {classes} = this.props;

		return (
			<Fragment>
				<div className={classes.item}>
					<TextField
						label={'Title'}
						onKeyPress={(event) => this.handleKeyPress(event)}
						onChange={event => this.setState({
							item: {
								...this.state.item,
								title: event.target.value
							}
						})}
						value={this.state.item.title}
						inputRef={this.titleInputRef}
					/>
					<TextField
						label={'Content'}
						onKeyPress={(event) => this.handleKeyPress(event)}
						onChange={event => this.setState({
							item: {
								...this.state.item,
								content: event.target.value
							}
						})}
						value={this.state.item.content}
					/>
				</div>
			</Fragment>
		)
	}
}

export default withStyles(styles)(Todo);