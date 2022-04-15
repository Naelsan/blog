import React, { Component } from 'react'
import { Card, Avatar, Tooltip } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined, BookOutlined } from '@ant-design/icons';
import errorImage from '../images/actu.jpg'

const { Meta } = Card

export default class ArticleCard extends Component {

  render() {
    let valideImage = true
    if(this.props.image != undefined){
      if(this.props.image.substring(0,4) !== "http")
        valideImage = false
    }
    if(this.props.image == undefined || this.props.image === "") valideImage = false
    const dateTime  = new Date(this.props.date *1000)
    return (
      <div className='centerBlock'>
        <Card
          cover={
            <img
              alt="example"
              src={valideImage ? this.props.image : errorImage}
            />
          }
          actions={[
            <EyeOutlined key="show" />,
            <EditOutlined key="edit" onClick={this.props.handleUpdateNews} />,
            <BookOutlined key="comment" onClick={this.props.handleComment} />,
            <DeleteOutlined key="delete" onClick={this.props.onDelete} />
          ]}
        >
          <Meta
            title={this.props.title}
            description={this.props.content}
          /><br/>
          <p>Le {dateTime.toLocaleDateString()} à {dateTime.getHours()}:
            {dateTime.getMinutes()}:
            {dateTime.getSeconds().toString().length == 1 ? `0${dateTime.getSeconds()}` :dateTime.getSeconds() }
          </p>
        </Card>
      </div>

    )
  }
}
