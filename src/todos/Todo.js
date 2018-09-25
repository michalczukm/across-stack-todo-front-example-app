import React, { Component, Fragment } from 'react';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar/Avatar';
import { Delete, Face, SaveOutlined, Edit, CancelOutlined } from '@material-ui/icons'
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { Input } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper/Paper';

export default class Todo extends Component {
	state = {
		content: '',
		mode: 'read'
	};

	actions = {};
	shouldShowActions = false;

	componentDidMount() {
		this.setState({ content: this.props.item.content });

		const { onUpdate, onDelete } = this.props;

		this.actions = {
			onUpdate, onDelete
		};

		this.shouldShowActions = !!onUpdate && !!onDelete;
	}

	exitEditMode = () => this.setState({ mode: 'read' });
	enterEditMode = () => this.setState({ mode: 'edit' });

	listAction() {
		if(!this.shouldShowActions) {
			return (<Fragment></Fragment>);
		}

		return (
			<Fragment>
				{
					this.state.mode === 'read'
						? <div>
							<IconButton aria-label="Edit">
								<Edit onClick={() => this.enterEditMode()} />
							</IconButton>
							<IconButton aria-label="Delete">
								<Delete color="error" onClick={() => this.actions.onDelete()} />
							</IconButton>
						</div>
						: <div>
							<IconButton aria-label="Cancel">
								<CancelOutlined onClick={() => this.exitEditMode()} />
							</IconButton>
							<IconButton aria-label="Save">
								<SaveOutlined color="primary" onClick={() => this.exitEditMode() || this.actions.onUpdate(this.state.content)} />
							</IconButton>
						</div>
				}
			</Fragment>
		)
	}

	render() {
		return (
			<div>
				<Paper>
					<ListItem>
						<ListItemAvatar>
							<Avatar>
								<Face />
							</Avatar>
						</ListItemAvatar>
						<ListItemText>
							<FormGroup>
								<FormControlLabel
									control={
										<Input
											disabled={this.state.mode === 'read'}
											onChange={event => this.setState({ content: event.currentTarget.value })}
											value={this.state.content}
										/>
									}
								/>
							</FormGroup>
						</ListItemText>
						<ListItemSecondaryAction>
							{this.listAction()}
						</ListItemSecondaryAction>
					</ListItem>
				</Paper>
			</div>
		)
	}
}