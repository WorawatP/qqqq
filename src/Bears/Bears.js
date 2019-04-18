import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import { getBears, createBears, deleteBears, editBear } from '../App';

class Bears extends Component {
    state = {
        user: '',
        id: null,
        name: null,
        weight: null,
        bearEdit: {
            id: null,
            name: null,
            weight: null
        }
    }

    componentDidMount() {
        console.log('props github', this.props)
        this.props.getBears()
    }

    cloneObject = (src) => {
        let target = {};
        for (let prop in src) {
          if (src.hasOwnProperty(prop)) {
            target[prop] = src[prop];
          }
        }
        return target;
      }

    handleChange = (name) => (e) => {
        this.setState({ [name]: e.target.value });
    }

    handleEditBearChange = (name) => (e) => {
        let { bearEdit } = this.state;
        let editedBear = {
            [name]: e.target.value
        };

        bearEdit = Object.assign(bearEdit, editedBear)
        this.setState({ editedBear });
    }

    handleEditBearClick = (bear) => () => {
        this.setState({ bearEdit: bear});
    }

    handleCreateBearsSuccess = () => {
        alert('สำเร็จ');
        this.props.getBears();
    }

    handleDeleteBearSuccess = () => {
        alert('ลบ - สำเร็จ');
        this.props.getBears();
    }

    handleEditBearSuccess = () => {
        alert('แก้ไข - สำเร็จ');
        this.props.getBears();
    }

    handleCreateBears = (event) => {
        event.preventDefault();
        const { id, name, weight} = this.state;
        const bear = { id, name, weight};
        this.props.createBears(bear, this.handleCreateBearsSuccess);
    }

    handleEditBears = (event) => {
        event.preventDefault();
        const { id, name, weight} = this.state.bearEdit;
        const bear = { id, name, weight};
        this.props.editBear(bear.id, bear, this.handleEditBearSuccess);
    }

    handleDeleteBear = (bearId) => () => {
        this.props.deleteBears(bearId, this.handleDeleteBearSuccess);
    }


    renderFormCreateBears = () => {
        return (
            <form onSubmit={this.handleCreateBears}>
                <h3>Create Bears</h3>
                name:<br />
                <input type="text" name="name" value={this.state.name} onChange={this.handleChange('name')} /> <br/>
                weight:<br />
                <input type="text" name="weight" value={this.state.weight} onChange={this.handleChange('weight')} /> <br/>
                <button type="submit">create</button>
            </form>
        );
    }

    renderFormEditBear = () => {
        return (
            <form onSubmit={this.handleEditBears}>
                <h3>Edit Bears</h3> <br />
                { (this.state.bearEdit.id) ? `ID: ${this.state.bearEdit.id}` : ''} <br/>
                name:<br />
                <input type="text" name="name" value={this.state.bearEdit.name} onChange={this.handleEditBearChange('name')} /> <br/>
                weight:<br />
                <input type="text" name="weight" value={this.state.bearEdit.weight} onChange={this.handleEditBearChange('weight')} /> <br/>
                <button type="submit">Edit</button>
            </form>
        );
    }

    renderBearsHeadTable = () => {
        return (
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Weight</th>
                <th>action</th>
            </tr>
        );
    }

    renderBears = () => {
        const { bears } = this.props;
        return bears.map((bear, index) => {
            if(bear !== null)
            return (
                <tr key={index}>
                    <td>{bear.id}</td>
                    <td>{bear.name}</td>
                    <td>{bear.weight}</td>
                    <td>
                        <span onClick={this.handleEditBearClick(this.cloneObject(bear))} style={{ cursor: 'pointer', color: 'orange'}}>แก้ไข</span> - 
                        <span onClick={this.handleDeleteBear(bear.id)} style={{ cursor: 'pointer', color: 'red'}}>ลบ</span>
                    </td>
                </tr>
            );
        })
    }

    render() {
        return (
            <div style={{ margin: '20px' }}>
              <h2>Bears</h2>
              <table>
                {this.renderBearsHeadTable()}
                {this.renderBears()}
              </table>
              {this.renderFormCreateBears()} <br />
              {this.renderFormEditBear()}
            </div>
        );
    }
}

const mapStateToProps = ({ bears }) => {
    return { bears }
}

const mapDispatchToProps = (dispatch) => {
    return  bindActionCreators({
        getBears,
        createBears,
        deleteBears,
        editBear
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Bears);