import React, { Component } from 'react'
import { Card } from 'antd';
import actuImage from '../images/actu.jpg'
const { Meta } = Card

export default class RealArticleCard extends Component {

  render() {

    return (
      <div className='centerBlock'>
        <Card 
          cover={
            <img
              alt="Pas d'image disponible"
              src={this.props.image != null ? this.props.image : actuImage}
            />
          }
        >
          <Meta
            title={this.props.title}
            description={this.props.content}
          />
          <p>Le lien de l'actualité est ici : <a href={this.props.lien} target="_blank">{this.props.lien}</a></p>
        </Card>
      </div>

    )
  }
}
