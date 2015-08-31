import {Component} from 'relax-framework';
import React from 'react';
import MediumEditor from 'medium-editor';

export default class MediumEditorElement extends Component {
  getInitialState () {
    this.currentValue = this.props.value;
    return {
      value: this.props.value
    };
  }

  componentDidMount () {
    this.medium = new MediumEditor(React.findDOMNode(this), this.props.options);
    this.medium.subscribe('editableInput', this.onChange.bind(this));
  }

  componentWillReceiveProps (nextProps) {
    if (this.currentValue !== nextProps.value) {
      this.currentValue = nextProps.value;
      this.setState({
        value: nextProps.value
      });
    }
  }

  componentWillUnmount () {
    this.medium.destroy();
  }

  onChange () {
    let value = React.findDOMNode(this).innerHTML;
    this.currentValue = value;
    this.props.onChange(value);
  }

  render () {
    return (
      <this.props.tag
        className={this.props.className}
        contentEditable={true}
        dangerouslySetInnerHTML={{__html: this.state.value}}
      />
    );
  }
}

MediumEditorElement.propTypes = {
  tag: React.PropTypes.string,
  className: React.PropTypes.string,
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  options: React.PropTypes.obj
};

MediumEditorElement.defaultProps = {
  tag: 'div'
};
