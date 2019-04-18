import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { getGithub } from '../App'
import { connect } from 'react-redux'

class Github extends Component {
    state = {
        user: ''
    }

    componentDidMount() {
        console.log('props github', this.props)
        this.props.getGithub()
    }

    handleChange = (name) => (e) => {
        this.setState({ [name]: e.target.value });
    }

    renderGithub = () => {
        if (this.props.github) {
            return (
                <ul>
                    <br />
                    <img src={this.props.github.avatar_url} alt="avatar" width="200px" /><br /><br />
                    <strong> Username</strong> : {this.props.github.login}<br />
                    <strong>ID</strong> : {this.props.github.id}<br />
                    <strong>Name </strong>: {this.props.github.name}<br />
                    <strong> Website</strong> : {this.props.github.blog}<br />
                    <strong> Update</strong> : {this.props.github.updated_at}<br />

                </ul>
            )

        }
    }

    render() {
        return (
            <div style={{ margin: '20px' }}>
                <h2>Render Github</h2>

                {this.renderGithub()}

                <input value={this.state.user} name="user" onChange={this.handleChange('user')} placeholder="Username" /><br /><br />
                <button onClick={() => this.props.getGithub(this.state.user)}   >Search</button><br /><br /><br />

            </div>
        );
    }
}

const mapStateToProps = ({ github }) => {
    return { github }
}

const mapDispatchToProps = (dispatch) => {
    return  bindActionCreators({
        getGithub
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Github);