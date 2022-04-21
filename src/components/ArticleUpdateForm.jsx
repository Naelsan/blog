import React, { Component } from 'react'
import { Input } from 'antd'
const { TextArea } = Input;

export default class ArticleUpdateForm extends Component {
  render() {
    const isArtcileDisplay = (this.props.blockFields === "Affichage de l'article")
    return (
      <>
        <label htmlFor='title'>Title</label>
        <Input placeholder='Title' disabled={isArtcileDisplay} type='text' name='title' id='title' value={this.props.title} onChange={this.props.handleChange}></Input>
        <label htmlFor='content'>Content</label>
        <TextArea placeholder='Content' disabled={isArtcileDisplay} type='text' name='content' id='content' value={this.props.content} onChange={this.props.handleChange} />
        <label htmlFor='author'>Author</label>
        <Input placeholder='Author' disabled={isArtcileDisplay} type='text' name='author' id='author' value={this.props.author} onChange={this.props.handleChange} />
        <label htmlFor='image'>Image url</label>
        <Input placeholder='image' disabled={isArtcileDisplay} type='text' name='image' id='image' value={this.props.image} onChange={this.props.handleChange} />
      </>
    )
  }
}
