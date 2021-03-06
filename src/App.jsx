import React from "react";
import "./App.css";
import AddButton from "./components/AddButton";
import { FormOutlined } from "@ant-design/icons/lib/icons";
import ArticleModal from "./components/ArticleModal";
import Fire from "./Fire";
import ArticleCard from "./components/ArticleCard";
import { Input, Modal, Spin } from 'antd'
import AddCommentModal from "./components/AddCommentModal";
import Dropdown from "react-bootstrap/Dropdown";
import Real from "./Real"
import RealArticleCard from "./components/RealArticleCard";
import * as Papa from 'papaparse'
import ModalDeleteArticle from "./components/ModalDeleteArticle";

export default class App extends React.Component {

  constructor() {
    super()
    this.state = {
      isArticleModalVisible       : false,
      isUpdateModalVisible        : false,
      isCommentModalVisible       : false,
      isModalDeleteConfirmVisible : false,
      orderByComment              : false,
      loading                     : true,
      recentToOld                 : true,
      articles          :[],
      articlesFilter    :[],
      realArticlesActu  :[],
      dataCSV           : [],
      currentArticle  : null,
      comments        : null,
      error           : null,
      newsMethod      : null,
      news          : '',
      filterArticle : ''
    }
  }

  componentDidMount() {
    const firebase = new Fire(error => {
      if (error) this.setState({ error: error })
      else {
        firebase.getArticles(articles => {
          this.setState({ articles: articles, loading: false })
          this.setState({ articlesFilter: articles })
        })
      }
    })
  }

  handleDelete = (articleToRemove) => {
    const article = this.state
   const firebase = new Fire(error => {
      if (error) {
        this.setState({ error: error })
      } else {
        firebase.deleteArticle(articleToRemove)
      }
    })
  }

  changeVisibilityForDeleteConfirmation = () => {
    this.setState({isModalDeleteConfirmVisible : !this.state.isModalDeleteConfirmVisible})
  }

  handleResetNewsClicked = () => {
    this.setState({ news: '' })
  }

  changeVisibility = () => {
    this.setState({
      isArticleModalVisible: this.state.isArticleModalVisible === true ? false : true
    })
  }

  openCommentModal(data) {
    this.setState({ comments: data })
    this.changeCommentModalVisibility()

  }

  changeCommentModalVisibility() {
    this.setState({ isCommentModalVisible: !this.state.isCommentModalVisible })
  }

  handleFilterChange = (e) => {
    if(e.target.value === "") this.setState({realArticlesActu: []})
    this.setState({ filterArticle: e.target.value })
    this.setState({ articles: this.state.articlesFilter.filter(article => (article.title.toLowerCase().includes(e.target.value.toLowerCase().trimStart()) || article.content.toLowerCase().includes(e.target.value.toLowerCase().trimStart()) )) })
  }

  handleSortArticlesByDate = () => {
    this.setState({ recentToOld: !this.state.recentToOld })
    let temp = this.state.articles
    if (this.state.recentToOld) {
      temp.sort(function (a, b) {
        return a.created_at - b.created_at;
      });
    } else {
      temp.sort(function (a, b) {
        return b.created_at - a.created_at;
      });
    }
    this.setState({ articles: temp })
  }

  handleSortArticlesByComments = () => {
    this.setState({orderByComment : !this.state.orderByComment})
    let temp = this.state.articles
    if (this.state.orderByComment) {
      temp.sort(function (a, b) {
        return a.comments.length - b.comments.length;
      });
    } else {
      temp.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
    }
    this.setState({ articles: temp })
  }

  handleWithSort = () => {
    let temp = this.state.articles
    temp.sort(function (a, b) {
      return b.created_at - a.created_at
    });
    this.setState({ articles: temp })
  }

  handleEnterPressedSearching(e){
    e.preventDefault()
    if(this.state.filterArticle.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase() == "hexagone".toLocaleLowerCase()) window.open("https://www.ecole-hexagone.com/fr/pedagogie?utm_term=hexagone%20ecole&utm_campaign=PV+-+Marque&utm_source=adwords&utm_medium=ppc&hsa_acc=6689439511&hsa_cam=16694119878&hsa_grp=135329087215&hsa_ad=590035270547&hsa_src=g&hsa_tgt=kwd-1644158600843&hsa_kw=hexagone%20ecole&hsa_mt=p&hsa_net=adwords&hsa_ver=3&gclid=CjwKCAjwxZqSBhAHEiwASr9n9IAHo4GTjwiu3AbS3I7ABqLB_uBXQCy9taXgzKs6w1QZ9FyfYVLNGxoCFkIQAvD_BwE", '_blank').focus();
    if(this.state.filterArticle.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase() == "reel".toLocaleLowerCase()) {
      const real = new Real()
      real.getRealArticles().then(res => {
        this.setState({realArticlesActu: res})
      })
    }
    if(this.state.filterArticle == "csv"){
      document.getElementById("loadcsv").click() 
    }
  }


  addArticlesFromCsv(articlesToAdd) {
    if(articlesToAdd.length > 0 ){
      articlesToAdd.map((article) =>{
        const firebase    =  new Fire(error => {
          if(error) this.setState({error: error})
          else firebase.addArticle(article)
        })
      })
    }else alert("Fichier incorrect")
    this.setState({loading: false})
    this.setState({filterArticle:''})
    this.setState({ articles: this.state.articlesFilter})
  }

  render() {
    return (
      
      <div className="App">
        <section className="navbar-searching">
          <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
            <div className="container-header">
            <a class="navbar-brand navbar-left">Bienvenue sur BLOG</a>
            <div class="navbar-collapse space-between" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <Dropdown>
                  <Dropdown.Toggle>
                    Trier les articles
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item value="1" onClick={this.handleSortArticlesByDate}>{this.state.recentToOld ? 'Du plus ancien au plus r??cent' : "Du r??cent au plus ancien"}</Dropdown.Item>
                    <Dropdown.Item value="2" onClick={this.handleSortArticlesByComments}>{this.state.orderByComment ? 'Nombre de commetaires le moins ??lev??' : 'Nombre de commentaires le plus ??lev??'}</Dropdown.Item>
                    <Dropdown.Item value="3" onClick={this.handleWithSort}>Sans tri</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </ul>
              <form class="form-inline my-2 my-lg-0 navbar-center">
                <Input id="searching_value" placeholder="Rechercher" value={this.state.filterArticle} onChange={this.handleFilterChange} onPressEnter={(e) => this.handleEnterPressedSearching(e)}/>
              </form>
              <AddButton
                text='R??diger un article'
                size='large'
                shape='round'
                icon={<FormOutlined />}
                click={() => {
                  this.handleResetNewsClicked()
                  this.setState({ newsMethod: 'create' })
                  this.changeVisibility()
                }}
              />
            </div>
            </div>
          </nav>
        </section>

        <header className="App-header">
          <div className="container">
            <div className="row justify-content-center">
              {this.state.loading && <Spin />}
              {this.state.error != null && <p className="red-text">{this.state.error}</p>}
              { this.state.articlesFilter.length > 0 &&
              (this.state.articles.map((data, index) => (
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mt-2 mb-2">
                  <ArticleCard
                    title={data.title}
                    content={data.content}
                    date={data.created_at.seconds}
                    image={data.image}
                    onDelete={() => {
                      this.changeVisibilityForDeleteConfirmation()
                      this.setState({currentArticle: data })
                      }
                    }
                    handleUpdateNews={() => {
                      this.setState({ newsMethod: 'update' })
                      this.changeVisibility()
                      this.setState({ news: data })
                    }}
                    handleShow={() => {
                      this.setState({newsMethod: 'view'})
                      this.changeVisibility()
                      this.setState({news:data})
                    }}
                    handleComment={() => this.openCommentModal(data)}
                  />
                </div>
              )))
              } {this.state.articlesFilter.length <= 0 && <h1 style={{color:'white'}}>Aucune actualit?? pour le moment</h1>}
              {this.state.articles.length >=0 && this.state.filterArticle.trim() != '' && this.state.realArticlesActu.lenght <= 0 && <h1 style={{color:'white'}}>Aucune actualit?? pour cette recherche</h1>}
            </div>
          </div>

          <input id="loadcsv" type="file" name="" hidden="true" accept=".csv" onChange={(e)=> {
            this.setState({loading: true})
            Papa.parse(document.getElementById('loadcsv').files[0], {
              download : true, 
              header: true,
              skipEmptyLines: true,
              complete: (res) => {
                const tempTabArticle = []
                res.data.map((data, index) =>{
                  const article = {}
                  article.title = data.title
                  article.content = data.content
                  article.author = data.author
                  article.comments = []
                  article.image = data.image
                  article.created_at = new Date(data.created_at)
                  if( data.title      != '' && data.title       != undefined &&
                      data.content    != '' && data.content     != undefined && 
                      data.author     != '' && data.author      != undefined &&
                      data.image      != '' && data.image       != undefined &&
                      data.created_at != '' && data.created_at  != undefined){
                        tempTabArticle.push(article)
                  }
                })
                this.addArticlesFromCsv(tempTabArticle)
              }
            })
          }}/>

          <ArticleModal
            visibility={this.state.isArticleModalVisible}
            onClose={() => this.changeVisibility()}
            title={this.state.newsMethod}
            method={this.state.newsMethod}
            news={this.state.news} 
          />

          {this.state.currentArticle != null && <ModalDeleteArticle
            article={this.state.currentArticle}
            visibility={this.state.isModalDeleteConfirmVisible}
            onClose={() => this.changeVisibilityForDeleteConfirmation()}
            onOk={() => {
              this.changeVisibilityForDeleteConfirmation()
              this.handleDelete(this.state.currentArticle)
              }
            }
          />}


          {this.state.realArticlesActu.length > 0 && 
            <div className="container">
              <div className="row">
                {this.state.realArticlesActu.map((data, index) =>(
                  <div className="col-sm-4 mt-2 mb-2">
                    <RealArticleCard
                    title={data.title}
                    content={data.description}
                    image={data.image}
                    date={data.published_at}
                    lien={data.url}
                  />
                  </div>
                ))}
              </div>
            </div>
          }

          {this.state.isCommentModalVisible && <AddCommentModal
            data={this.state.comments}
            visibility={this.state.isCommentModalVisible}
            onClose={() => this.changeCommentModalVisibility()} />}
        </header>
      </div>
    );
  }
}