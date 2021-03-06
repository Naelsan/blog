import React, { Component } from 'react'
import { Input } from 'antd'
const { TextArea } = Input;

export default class ArticleForm extends Component {

  render() {
    return (
      <>
        <label htmlFor='title'>Title</label>
        <Input placeholder='Title' type='text' name='title' id='title' value={this.props.title} onChange={this.props.handleChange}></Input>
        <label htmlFor='content'>Content</label>
        <TextArea placeholder='Content' type='text' name='content' id='content' value={this.props.content} onChange={this.props.handleChange} />
        <label htmlFor='author'>Author</label>
        <Input placeholder='Author' type='text' name='author' id='author' value={this.props.author} onChange={this.props.handleChange} />
        <label htmlFor='image'>Image url</label>
        <Input placeholder='image' type='text' name='image' id='image' value={this.props.image} onChange={this.props.handleChange} />
      </>
    )
  }
}
