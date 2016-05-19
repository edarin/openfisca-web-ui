import classNames from 'classNames'
import {Component} from 'react'

var polyfills = require('../../polyfills');

export default class BaremeSettings extends Component {
  propTypes: {
    columns: React.PropTypes.object.isRequired,
    defaultProps: React.PropTypes.object.isRequired,
    displayBisectrix: React.PropTypes.bool,
    displaySettings: React.PropTypes.bool,
    onSettingsChange: React.PropTypes.func.isRequired,
    xAxisVariableCode: React.PropTypes.string.isRequired,
    xMaxValue: React.PropTypes.number.isRequired,
    xMinValue: React.PropTypes.number.isRequired,
  }
  getInitialState() {
    // Use internal state to handle strict;r typing on keyboard.
    return {
      xMaxValue: this.props.xMaxValue,
      xMinValue: this.props.xMinValue,
    };
  }
  handleDisplaySettingsClick(event) {
    event.preventDefault();
    this.props.onSettingsChange({displaySettings: ! this.props.displaySettings});
  }
  handleMaxValueChange() {
    var newXMaxValue = polyfills.valueAsNumber(this.refs.xMaxValue.getDOMNode());
    this.setState({xMaxValue: newXMaxValue});
  }
  handleMinValueChange() {
    var newXMinValue = polyfills.valueAsNumber(this.refs.xMinValue.getDOMNode());
    this.setState({xMinValue: newXMinValue});
  }
  handleReset(event) {
    event.preventDefault();
    this.setState({
      xMaxValue: this.props.defaultProps.xMaxValue,
      xMinValue: this.props.defaultProps.xMinValue,
    }, () => {
      this.props.onSettingsChange({
        displayBisectrix: this.props.defaultProps.displayBisectrix,
        xAxisVariableCode: this.props.defaultProps.xAxisVariableCode,
        xMaxValue: this.props.defaultProps.xMaxValue,
        xMinValue: this.props.defaultProps.xMinValue,
      }, true);
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    var newXMaxValue = this.state.xMaxValue;
    var newXMinValue = this.state.xMinValue;
    this.props.onSettingsChange({xMaxValue: newXMaxValue, xMinValue: newXMinValue}, true);
  }
  handleVariableCodeChange() {
    this.props.onSettingsChange({xAxisVariableCode: event.target.value}, true);
  }
  render() {
    var isMaxValueLessThanMinValue = this.state.xMaxValue !== null && this.state.xMinValue !== null &&
      this.state.xMaxValue < this.state.xMinValue;
    return this.props.displaySettings ? (
      <form className="form-horizontal" onReset={this.handleReset} onSubmit={this.handleSubmit} role="form">
        <a href='#' onClick={this.handleDisplaySettingsClick}>{this.getIntlMessage('hideSettings')}</a>
        <div className='form-group form-group-sm'>
          <label className="col-xs-6 control-label" htmlFor="x-axis-variable-code">
            {this.getIntlMessage('variable')}
          </label>
          <div className='col-xs-6'>
            <select
              className='form-control'
              id='x-axis-variable-code'
              onChange={this.handleVariableCodeChange}
              value={this.props.xAxisVariableCode}>
              <option value='salaire_de_base'>{this.props.columns.salaire_de_base.label}</option>
            </select>
          </div>
        </div>
        <div className={classNames({
          'form-group': true,
          'form-group-sm': true,
          'has-error': isMaxValueLessThanMinValue,
        })}>
          <label className="col-xs-6 control-label" htmlFor="x-axis-min-value">
            {this.getIntlMessage('minimumLabel')}
          </label>
          <div className='col-xs-6'>
            <input
              className='form-control'
              min={0}
              onChange={this.handleMinValueChange}
              placeholder={this.props.defaultProps.xMinValue}
              ref='xMinValue'
              type='number'
              value={this.state.xMinValue}
              />
          </div>
        </div>
        <div className={classNames({
          'form-group': true,
          'form-group-sm': true,
          'has-error': isMaxValueLessThanMinValue,
        })}>
          <label className="col-xs-6 control-label" htmlFor="x-axis-max-value">
            {this.getIntlMessage('maximumLabel')}
          </label>
          <div className='col-xs-6'>
            <input
              className='form-control'
              id='x-axis-max-value'
              min={0}
              onChange={this.handleMaxValueChange}
              placeholder={this.props.defaultProps.xMaxValue}
              ref='xMaxValue'
              type='number'
              value={this.state.xMaxValue}
              />
            {
              isMaxValueLessThanMinValue && (
                <p className='help-block'>
                  {this.getIntlMessage('minimumValueLessThanMaximumValueExplanation')}
                </p>
              )
            }
          </div>
        </div>
        <div className="form-group form-group-sm">
          <div className='col-xs-offset-6 col-xs-6'>
            <div className='checkbox'>
              <label>
                <input
                  checked={this.props.displayBisectrix}
                  onChange={event => this.props.onSettingsChange({displayBisectrix: event.target.checked})}
                  type='checkbox'
                />
                {this.getIntlMessage('displayBisectrix')}
              </label>
            </div>
          </div>
        </div>
        <div className="form-group form-group-sm" style={{marginBottom: 0}}>
          <div className="col-xs-offset-6 col-xs-6">
            <button
              className='btn btn-default btn-sm'
              disabled={
                (this.state.xMaxValue === this.props.xMaxValue && this.state.xMinValue === this.props.xMinValue) || (
                  this.state.xMaxValue < this.state.xMinValue
                )
              }
              style={{marginRight: 10}}
              type='submit'>
              {this.getIntlMessage('apply')}
            </button>
            <button className='btn btn-default btn-sm' type='reset'>
              {this.getIntlMessage('reset')}
            </button>
          </div>
        </div>
      </form>
    ) : (
      <a href='#' onClick={this.handleDisplaySettingsClick}>{this.getIntlMessage('showSettings')}</a>
    );
  }
}
