import React, {
    Component,
    Fragment
} from 'react';
import { withStyles, Typography } from '@material-ui/core';
import { Email, Web, SVG } from '@material-ui/icons';
import './Contact.css';
import contactService from './contact.service';
import TwitterIcon from './twitter.icon';

const TwitterLink = ({ username, ...props }) => (
    <a {...props} href={`https://twitter.com/${username}`} target="_blank" rel="noopener noreferrer">
        <TwitterIcon color="primary" />
        <Typography variant="body2" align="left">{username}</Typography>
    </a>
);

const styles = theme => ({
    contact: {
        display: 'flex',
        'flex-direction': 'row',
        'flex-wrap': 'wrap',
        'justify-content': 'space-around',
        'align-items': 'baseline'
    },
    contactItem: {
        display: 'flex',
        padding: theme.spacing.unit
    }
});

class Contact extends Component {
    state = {
        author: '',
        email: '',
        webpage: '',
        twitterName: ''
    };

    componentDidMount() {
        contactService.get()
            .then(contact => this.setState(contact));
    }

    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <Typography variant="caption" align="center">created by {this.state.author}</Typography>

                <div className={classes.contact}>
                    <a className={classes.contactItem} href={`mailto:${this.state.email}`}>
                        <Email />
                        <Typography variant="body2" align="left">{this.state.email}</Typography>
                    </a>
                    <a className={classes.contactItem} href={this.state.webpage} target="_blank" rel="noopener noreferrer">
                        <Web />
                        <Typography variant="body2" align="left">{this.state.webpage}</Typography>
                    </a>
                    <TwitterLink className={classes.contactItem} username={this.state.twitterName} />
                </div>
            </Fragment>
        );
    }
}

export default withStyles(styles)(Contact);