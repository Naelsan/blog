import React, { Component } from 'react'
import { Card, Avatar, Tooltip } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined, BookOutlined } from '@ant-design/icons';

const { Meta } = Card

export default class ArticleCard extends Component {

  render() {

    const dateTime  = new Date(this.props.date *1000)
    return (
      <div className='centerBlock'>
        <Card
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
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
            /* avatar={
              <Tooltip placement="topLeft" title="Prompt Text">
                <Avatar src="https://joeschmoe.io/api/v1/random" />
              </Tooltip>
            } */
            title={this.props.title}
            description={this.props.content}
          />
          <p>Le {dateTime.toLocaleDateString()} 
            à {dateTime.getHours()}:
            {dateTime.getMinutes()}:
            {dateTime.getSeconds().toString().length == 1 ? `0${dateTime.getSeconds()}` :dateTime.getSeconds() }
          </p>
        </Card>
      </div>

    )
  }
}
