import {Component} from 'react'

export default class HGrid extends Component {
  propTypes: {
    height: React.PropTypes.number.isRequired,
    nbSteps: React.PropTypes.number.isRequired,
    startStep: React.PropTypes.number.isRequired,
    style: React.PropTypes.object,
    width: React.PropTypes.number.isRequired,
  }
  getDefaultProps() {
    return {
      defaultStyle: {
        shapeRendering: 'crispedges',
        stroke: '#e5e5e5',
      },
      startStep: 0,
    };
  }
  render() {
    var style = Lazy(this.props.style).defaults(this.props.defaultStyle).toObject();
    var stepHeight = this.props.height / this.props.nbSteps;
    var steps = Lazy.range(this.props.startStep, this.props.nbSteps + this.props.startStep).toArray();
    return (
      <g className="grid h-grid">
        {
          steps.map((stepNum, idx) => {
            var translateY = - stepNum * stepHeight;
            return (
              <g key={idx} transform={'translate(0, ' + translateY + ')'}>
                <line style={style} x2={this.props.width} />
              </g>
            );
          })
        }
      </g>
    );
  }
}
