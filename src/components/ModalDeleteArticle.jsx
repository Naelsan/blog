import React, { Component } from 'react'
import { Modal, Button } from 'antd';

export default class ModalDeleteArticle extends Component {
  render() {
    return (
      <Modal   
        visible={this.props.visibility}    
        onCancel={this.props.onClose}
        footer={[
            <Button type='primary' danger key="delete" onClick={this.props.onOk}>
                Supprimer l'article
            </Button>,
        ]}>
          <p>Vous allez supprimer l'article {this.props.article.title}</p><br/>
          <p>Êtes-vous sûr de vouloir faire ça ?</p>

      </Modal>
    )
  }
}
