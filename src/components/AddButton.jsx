import React from 'react'
import { Button } from 'antd';


export default class AddButton extends React.Component{

    render() {
        return (
            <Button icon={this.props.icon} size={this.props.size} shape={this.props.shape} type="primary" onClick={this.props.click}> {this.props.text} </Button>
        );
    }
} 
