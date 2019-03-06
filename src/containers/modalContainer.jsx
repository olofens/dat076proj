import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { showModal, hideModal } from "../actions/index.js"
//import ModalComponent from '../components/modalComponent.jsx';
//import Modal from 'react-modal';
//import Modal from 'react-bootstrap/Modal'
import Modal from 'react-responsive-modal';
import Basic1 from '../components/basic.jsx'
//import "../components/basic1helper.css"





const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };




class ModalContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    

    render() {
        return (
        
            <Modal
          open={this.props.modalIsOpen}
          onClose={this.props.hideModal}
          center
          focusTrapped
          style={customStyles}
        >
          <Basic1/>
        </Modal>
            
        );
    }
}

function mapStateToProps(state) {
    return {
        modalIsOpen: state.modalIsOpen
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ showModal: showModal,
                                hideModal: hideModal }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(ModalContainer);