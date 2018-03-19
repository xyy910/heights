import { Icon, Button } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';
require("./operate.less");

let defaultProps = {
    number: 0,
    placement: 'top',
    onChange: function () {}
};
class Operate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            number: props.number
        }
    }

    minus() {
        let number = this.state.number;
        number--;
        this.setState({
            number
        });
        this.props.onChange(number);
    }

    plus() {
        let number = this.state.number;
        number++;
        this.setState({
            number
        });
        this.props.onChange(number);
    }

    render() {
        return (
            <div className="operate">
                <a onClick={this.minus.bind(this)}>
                    <Icon type="minus-square-o"/>
                </a>
                    <label>
                        {+this.state.number}
                    </label>
                <a>
                    <Icon type="plus-square-o"  onClick={this.plus.bind(this)}/>
                </a>
            </div>
        );
    }
}


Operate.defaultProps = defaultProps;

export default Operate;