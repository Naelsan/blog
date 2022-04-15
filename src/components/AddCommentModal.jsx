import { Modal, Button, Input } from 'antd'
import React, { Component } from 'react'
import Comment from './Comment';
import Fire from "../Fire";
import TextArea from 'antd/lib/input/TextArea';


export default class AddCommentModal extends Component {
  constructor() {
    super()
    this.state = {
      addingComment   : false,
      isCommentEditing: false,
      currentComment  : '',
      newCommentValue : '',
      author          : ''
    }
  }

  updateComment(comment, author, index) {
    this.props.data.comments[index] = ({"author": author, "comment":comment, date:new Date()})
    this.firebaseCallUpdate(this.props.data)
  } 

  onEditingChange = () =>{
    this.setState({isCommentEditing: !this.state.isCommentEditing})
  }

  firebaseCallUpdate(article) {
    const firebase = new Fire(error => {
      if (error) this.setState({ error: error })
      else {
        firebase.updateArticle(article)
        this.setState({ currentComment: '' })
      }
    })
  }

  removeCommentToArticle(index) {
    let commentBeforeRemoving = this.props.data.comments
    commentBeforeRemoving.splice(index, 1)
    this.props.data.comments = commentBeforeRemoving
    this.firebaseCallUpdate(this.props.data)
  }

  handleChange = (e) => {
    this.setState({ currentComment: e.target.value })
  }

  handleAddComment = () => {
    if (this.state.addingComment && this.state.newCommentValue.trim() != '' && this.state.author.trim() != '') {
      let temp = this.props.data.comments
      temp.push({"comment":this.state.newCommentValue, "author":this.state.author, "date":new Date()})
      this.props.data.comments = temp
      this.firebaseCallUpdate(this.props.data)
      this.setState({newCommentValue: ''})
    }
    this.setState({
      addingComment: !this.state.addingComment
    })
  }

  handleNewCommentChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    let comments = this.props.data.comments
    let title = this.props.data.title

    return (
      <Modal
        visible={this.props.visibility}
        onCancel={this.props.onClose}
        onOk={this.props.onClose}
        footer={[
          <Button disabled={this.state.isCommentEditing} key="add" onClick={this.handleAddComment}>
            Ajouter un nouveau commentaire
          </Button>,
        ]}>
        <p>L'article "{title}" à reçu {comments.length} {comments.length >= 2 ? 'commentaires' : 'commentaire'}</p>
        <div className='scrollable-list' style={ this.state.addingComment ? {height: '100px'} : {height: '200px'}}>
        {comments.map((comment, index) => (
            <Comment
              commentForP={comment.comment}
              commentForT={this.state.currentComment == '' ? comment.comment : this.state.currentComment}
              author={comment.author}
              date={comment.date}
              handleChange={this.handleChange}
              onEdit={this.onEditingChange}
              updateCurrentComment={() => this.updateComment((this.state.currentComment == '' ? comment.comment : this.state.currentComment), comment.author, index)}
              remove={() => this.removeCommentToArticle(index)} />
          ))}
        </div>
        {this.state.addingComment && ["Commentaire : ", <TextArea name="newCommentValue" value={this.state.newCommentValue} onChange={this.handleNewCommentChange}></TextArea>]}
        {this.state.addingComment && ["Auteur : ", <Input name="author" value={this.state.author} onChange={this.handleNewCommentChange}></Input>]}

      </Modal>
    )
  }
}