import { Modal, Button } from 'antd'
import React, { Component } from 'react'
import Comment from './Comment';
import Fire from "../Fire";
import TextArea from 'antd/lib/input/TextArea';


export default class AddCommentModal extends Component {
    constructor(){
        super()
        this.state = {
          currentComment : '',
          addingComment: false,
          newCommentValue: ''
        }
    }

    updateComment(comment, index){
      this.props.data.comments[index] = comment
      this.firebaseCallUpdate(this.props.data)
    }

    firebaseCallUpdate(article){
      const firebase    =  new Fire(error => {
        if(error) this.setState({error: error})
        else{
          firebase.updateArticle(article)
          this.setState({currentComment: ''})
        }
      })
    }

    removeCommetToArticle(index){
      let commentBeforeRemoving = this.props.data.comments
      commentBeforeRemoving.splice(index,1)
      this.props.data.comments = commentBeforeRemoving
      this.firebaseCallUpdate(this.props.data)
    }

    handleChange = (e) => {
      this.setState({currentComment: e.target.value})
    } 

    handleAddComment = ()=> {
      if(this.state.addingComment && this.state.newCommentValue != ''){
        let temp = this.props.data.comments
        temp.push(this.state.newCommentValue)
        this.firebaseCallUpdate(temp)
      }
      this.setState({
        addingComment : !this.state.addingComment
      })
    }

    handleNewCommentChange = (e) =>{
      this.setState({newCommentValue : e.target.value})
    }

  render() {
      let comments  = this.props.data.comments
      let title     = this.props.data.title 

    return (
        <Modal 
            visible={this.props.visibility} 
            onCancel={this.props.onClose}
            onOk={this.props.onClose}
            footer={[
              <Button key="add" onClick={this.handleAddComment}>
                Ajouter un nouveau commentaire
              </Button>,
              <Button key="submit" type="primary" onClick={this.props.onClose}>
                OK
              </Button>,
            ]}>
                <p>L'article "{title}" à reçu {comments.length} {comments.length >= 2 ? 'commentaires' : 'commentaire'}</p>
               {!this.state.addingComment && (comments.map((comment,index) => (
                 <Comment 
                    commentForP={comment}
                    commentForT={this.state.currentComment == '' ? comment : this.state.currentComment} 
                    handleChange={this.handleChange} 
                    updateCurrentComment={() =>this.updateComment((this.state.currentComment == '' ? comment : this.state.currentComment), index)} 
                    remove ={()=> this.removeCommetToArticle(index)}/>
               )))}
               {this.state.addingComment && <TextArea value={this.state.newCommentValue} onChange={this.handleNewCommentChange}></TextArea>}
        </Modal>
    )
  }
}