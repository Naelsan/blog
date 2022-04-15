import React, { Component } from 'react'
import { EditOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import { Input } from 'antd'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
const { TextArea } = Input;


export default class Comment extends Component {

    constructor() {
        super()
        this.state = {
            currentlyUpdatingComment: false
        }
    }

    changeDOM() {
        this.setState({
            currentlyUpdatingComment: !this.state.currentlyUpdatingComment,
        })
    }

    saveComment() {
        this.setState({ currentlyUpdatingComment: !this.state.currentlyUpdatingComment })
        this.props.updateCurrentComment()
    }

    render() {
        return (
            <div className='container-comment'>
                <div className='container-comment-buttons left-comment'>
                {!this.state.currentlyUpdatingComment && <p>
                    {this.props.commentForP}
                </p>} 
                {this.state.currentlyUpdatingComment && <TextArea value={this.props.commentForT} onChange={this.props.handleChange}></TextArea>}
                </div>
                <div className='container-comment-buttons right-edit'>
                    {!this.state.currentlyUpdatingComment && [<Tooltip title={this.props.commentForT}><Avatar shape="square" size="small" icon={<UserOutlined />} /></Tooltip>,<EditOutlined key="edit" onClick={() => {this.changeDOM();this.props.onEdit()}} />, <DeleteOutlined key="delete" onClick={this.props.remove} />]}
                    {this.state.currentlyUpdatingComment && <CheckOutlined key="validate" onClick={() => this.saveComment()} />}
                </div>
            </div>
        )
    }
}
