import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LazyLoad from 'react-lazy-load';

import { Button, Popover, PopoverContent, Modal, ModalBody, ModalFooter } from 'reactstrap';

import style from './ImpressButton.css';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class ImpressButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      impressed: this.props.impressed,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.toggleImpressed(e);
    this.setState({
      impressed: !this.state.impressed,
    });
  }

  render() {
    if (this.state.impressed) {
      return (
        <Button color="warning" onClick={this.handleClick}>
          <i className="fa fa-check" aria-hidden="true" /> Impressed
        </Button>
      );
    } else {
      return (
        <Button color="warning" onClick={this.handleClick}>
          Impress
        </Button>
      );
    }
  }
}

ImpressButton.propTypes = {
  impressed: PropTypes.bool.isRequired,
  toggleImpressed: PropTypes.func.isRequired,
};

export default ImpressButton;
