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

  const customStyles1 = {
    
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.75)'
        },
        content: {
          position: 'absolute',
          top: '40px',
          left: '40px',
          right: '40px',
          bottom: '40px',
          border: '1px solid #ccc',
          background: '#fff',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '4px',
          outline: 'none',
          padding: '20px'
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
          classNames={{
            modal: customStyles1,
          }}
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