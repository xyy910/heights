import React from 'react'
import { Table, Tooltip, Popover } from 'antd';
import _ from 'lodash';
import Operate from 'oprate';
require('./icon.js');
require('./icon.css');
require('./height-list.less');

class HeightList extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.getDefaultState();
    }

    getContent(record) {
        return (
            <Operate number={record.height}
                     onChange={this.onChange.bind(this)}
                     className="tooltip"/>
        );
    }

    onChange(val) {
        console.log(val);
    };

    getDefaultState() {
        return {
            dataSource: [{
                key: '1',
                name: '小肥羊',
                height: 59,
            }, {
                key: '2',
                name: '小棉袄',
                height: 58,
            }, {
                key: '3',
                name: '小肥月',
                height: 58,
            }, {
                key: '4',
                name: '刘大哥',
                height: 50,
            }, {
                key: '5',
                name: '豆果蛋',
                height: 80,
            }],
            columns: [{
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: '体重(kg)',
                dataIndex: 'height',
                key: 'height',
            }, {
                title: '夸奖',
                key: 'support',
                render: (text, record) => (
                    <span>
                        <Tooltip placement="left"
                                 className="tooltip"
                                 title="跑步">
                            <Popover content={this.getContent(record)}
                                     className="operate"
                                     trigger="click">
                            <a>
                                <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-paobu1"></use>
                            </svg>
                            </a>
                            </Popover>
                        </Tooltip>
                        <Tooltip placement="top"
                                 overlayClassName="tooltip"
                                 title="游泳">
                            <a>
                                <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-youyongquan-"></use>
                                </svg>
                            </a>
                        </Tooltip>
                        <Tooltip placement="top"
                                 overlayClassName="tooltip"
                                 title="跳舞">
                            <a>
                                <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-liebiaodaohang_guangchangwu"></use>
                                </svg>
                            </a>
                        </Tooltip>
                        <Tooltip placement="top"
                                 overlayClassName="tooltip"
                                 title="多喝水">
                            <a>
                                <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-_fuzhi-"></use>
                                </svg>
                            </a>
                        </Tooltip>
                        <Tooltip placement="top"
                                 overlayClassName="tooltip"
                                 title="早睡早起">
                            <a>
                                <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-qichuang"></use>
                                </svg>
                            </a>
                        </Tooltip>
                        <Tooltip placement="top"
                                 overlayClassName="tooltip"
                                 title="吃水果">
                                <a>
                                    <svg className="icon" aria-hidden="true">
                                    <use xlinkHref="#icon-shuiguo"></use>
                                    </svg>
                                </a>
                        </Tooltip>
                        <Tooltip placement="right"
                                 overlayClassName="tooltip"
                                 title="开心">
                            <a>
                                <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-kaixin"></use>
                                </svg>
                            </a>
                        </Tooltip>
                    </span>
                ),
            }, {
                title: '该打',
                key: 'critic',
                render: (text, record) => (
                    <span>
                        <Tooltip placement="left"
                                 overlayClassName="tooltip"
                                 title="吃零食">
                            <a>
                                <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-tang"></use>
                            </svg>
                        </a>
                        </Tooltip>
                        <Tooltip placement="top"
                                 overlayClassName="tooltip"
                                 title="冰淇淋">
                            <a>
                                <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-bingqilin"></use>
                            </svg>
                        </a>
                        </Tooltip>
                        <Tooltip placement="top"
                                 overlayClassName="tooltip"
                                 title="赖床">
                            <a>
                                <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-shuijue"></use>
                            </svg>
                        </a>
                        </Tooltip>
                        <Tooltip placement="top"
                                 overlayClassName="tooltip"
                                 title="蛋糕">
                            <a>
                                <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-cupcake"></use>
                            </svg>
                        </a>
                        </Tooltip>
                        <Tooltip placement="top"
                                 overlayClassName="tooltip"
                                 title="点心">
                            <a>
                                <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-dangao"></use>
                            </svg>
                        </a>
                        </Tooltip>
                        <Tooltip placement="right"
                                 overlayClassName="tooltip"
                                 title="不开心">
                            <a>
                                <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-ku"></use>
                                </svg>
                            </a>
                        </Tooltip>
                    </span>
                ),
            }]
        }
    }

    render() {
        return(
            <div className="height-list">
                <Table
                    pagination={false}
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                />
            </div>
        );
    }
}

module.exports = HeightList;