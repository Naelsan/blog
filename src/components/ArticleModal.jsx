import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import ArticleForm from './ArticleForm';
import Fire from "../Fire";
import ArticleUpdateForm from "../components/ArticleUpdateForm"
import AddCommentModal from './AddCommentModal';

export default class ArticleModal extends Component {

  constructor(){
    super()
    this.state = {
      title   : '',
      content : '',
      author  : '',
      image   : '',
    }
  }

  checkValidityOfArticle(article){
    return article.title.trim().length === 0 || article.content.trim().length === 0 || article.author.trim().length === 0 || article.image.trim().length === 0
  }

  handleArticle = () =>{
    const article = this.props.news === '' ? this.state : this.props.news
    const firebase    =  new Fire(error => {
      if(error) this.setState({error: error})
      else{
        article.created_at = new Date()
        if(this.props.method === "create"){
          article.comments = []
          if(this.checkValidityOfArticle(article)) {
            alert("Veuillez remplir tous les champs")
            return
          }
          else firebase.addArticle(article)
        }else {
          article.title   = this.state.title   === '' ? this.props.news.title   : this.state.title
          article.content = this.state.content === '' ? this.props.news.content : this.state.content
          article.author  = this.state.author  === '' ? this.props.news.author  : this.state.author 
          article.image   = this.state.image   === '' ? this.props.news.image   : this.state.image
          firebase.updateArticle(article)
        }
        this.setState({title  :''})
        this.setState({content:''})
        this.setState({author :''})
        this.setState({image  :''})
        this.props.onClose()
      }
    })
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = () => {
    alert(`Title : ${this.state.title} \r\nContent : ${this.state.content}`)
    this.props.onClose()
  }

  render() {
    return (
        <Modal 
          title={this.props.title} 
          visible={this.props.visibility} 
          onCancel={this.props.onClose}
          footer={[
            <Button 
              key="enter" 
              onClick={this.handleArticle}
            >
              {this.props.method === "create" ? 'Créer' : 'Modifier'}
            </Button>
          ]}
        >
          { this.props.method === "create"
            ? (<ArticleForm {...this.state} handleChange={this.handleChange} />) 
            : (<ArticleUpdateForm 
              title={this.state.title       === '' ? this.props.news.title    : this.state.title} 
              content={this.state.content   === '' ? this.props.news.content  : this.state.content}
              author={this.state.author     === '' ? this.props.news.author   : this.state.author}
              image={this.state.image       === '' ? this.props.news.image    : this.state.image}
              handleChange={this.handleChange}
            />)
          }
        </Modal>
    );
  }
}
