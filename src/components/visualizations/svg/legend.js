import {Component} from 'react'

export default class Legend extends Component {
  propTypes: {
    children: React.PropTypes.string.isRequired,
    circleMarginRight: React.PropTypes.number.isRequired,
    color: React.PropTypes.string.isRequired,
    fontSize: React.PropTypes.number.isRequired,
    radius: React.PropTypes.number.isRequired,
  }
  getDefaultProps() {
    return {
      circleMarginRight: 5,
      color: 'rgb(31, 119, 180)',
      fontSize: 12,
      radius: 5,
    };
  }
  render() {
    return (
      <g>
        <circle
          r={this.props.radius}
          cx={this.props.radius}
          cy={this.props.radius}
          style={{fill: this.props.color, fillOpacity: 1}}
        />
        <text
          x={(this.props.radius * 2) + this.props.circleMarginRight}
          y={this.props.radius * 2}
          style={{fontSize: this.props.fontSize, textAnchor: 'begin'}}>
          {this.props.children}
        </text>
      </g>
    );
  }
}
