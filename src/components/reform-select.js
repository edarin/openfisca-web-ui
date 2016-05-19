import classNames from 'classNames'
import {Component} from 'react'

export default class ReformSelect extends Component {
  propTypes: {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    disableDifference: React.PropTypes.bool,
    onKeyChange: React.PropTypes.func.isRequired,
    onModeChange: React.PropTypes.func.isRequired,
    reforms: React.PropTypes.object.isRequired,
    selectedKey: React.PropTypes.string,
    selectedMode: React.PropTypes.string.isRequired,
    style: React.PropTypes.object,
  }
  render() {
    return (
      <div className={this.props.className} style={this.props.style}>
        <select
          className='form-control'
          disabled={this.props.disabled}
          onChange={(event) => this.props.onKeyChange(event.target.value || null)}
          title={this.getIntlMessage('reform')}
          value={this.props.selectedKey}
        >
          <option value=''>{this.getIntlMessage('noReform')}</option>
          {
            Lazy(this.props.reforms).map((reformName, reformKey) => (
              <option key={reformKey} value={reformKey}>{reformName}</option>
            )).toArray()
          }
        </select>
        {
          this.props.selectedKey && (
            <div className="btn-group" role="group" style={{marginLeft: 10}}>
              <button
                className={classNames({
                  active: this.props.selectedMode === 'without',
                  btn: true,
                  'btn-default': true,
                })}
                disabled={this.props.disabled || ! this.props.selectedKey}
                onClick={(event) => this.props.onModeChange('without')}
                type="button"
              >
                {this.getIntlMessage('without')}
              </button>
              <button
                className={classNames({
                  active: this.props.selectedMode === 'with',
                  btn: true,
                  'btn-default': true,
                })}
                disabled={this.props.disabled || ! this.props.selectedKey}
                onClick={(event) => this.props.onModeChange('with')}
                type="button"
              >
                {this.getIntlMessage('with')}
              </button>
              {
                ! this.props.disableDifference && (
                  <button
                    className={classNames({
                      active: this.props.selectedMode === 'difference',
                      btn: true,
                      'btn-default': true,
                    })}
                    disabled={this.props.disabled || ! this.props.selectedKey}
                    onClick={(event) => this.props.onModeChange('difference')}
                    type="button"
                  >
                    {this.getIntlMessage('difference')}
                  </button>
                )
              }
            </div>
          )
        }
      </div>
    );
  }
}
