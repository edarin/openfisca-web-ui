import {Component} from 'react'

export default class EditForm extends Component {
  propTypes: {
    onClose: React.PropTypes.func.isRequired,
    title: React.PropTypes.string.isRequired,
  }
  render() {
    return (
      <form onSubmit={event => { event.preventDefault(); this.props.onClose(); }} role="form">
        <button className="close" title={this.getIntlMessage('close')} type="submit">
          <span aria-hidden="true">×</span>
          <span className="sr-only">{this.getIntlMessage('close')}</span>
        </button>
        <h2 className='text-center' style={{margin: 0}}>{this.props.title}</h2>
        <hr/>
        {this.props.children}
        <button className="btn btn-primary" type="submit">{this.getIntlMessage('close')}</button>
      </form>
    );
  }
}
