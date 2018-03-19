import React from 'react'
import { Table, Tooltip, Popover, Button, Icon } from 'antd';
import PropTypes from 'prop-types';
import Operate from 'oprate';
import $ from 'jquery';
import _ from 'lodash';
require('./icon.js');
require('./icon.css');
require('./height-list.less');

let defaultProps = {
    list: []
};

class HeightList extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.getDefaultState();
    }

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        let self = this;
        $.ajax({
            url: '/faires/api/faires',
            type: 'get',
            success(data){
                self.setState({
                    dataSource: self.sort(data.data)
                });
            }
        });
    }

    getContent(record, field) {
        return (
            <Operate number={record[field]}
                     onChange={this.onChange.bind(this, record, field)}
                     className="tooltip"/>
        );
    }

    getContentHaHa() {
        return (
            <span>她最肥</span>
        );
    }

    sort(list) {
        return _.reverse(_.sortBy(list, 'weight'));
    }

    onChange(record, field, val) {
        let self = this;
        let params = {
            name: record.name,
            value: val,
            field: field
        };
        $.ajax({
            url: '/faires/api/faires',
            type: 'put',
            data: params,
            success(data){
                let datasource2 = [...self.state.dataSource];
                let index = _.findIndex(datasource2, function (item) {
                    return item.name == record.name;
                });
                datasource2[index] = data.data;
                self.setState({
                    dataSource: datasource2
                });
            }
        });
    };

    getDefaultState() {
        return {
            dataSource: this.props.list,
            columns: [{
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => (record.name == this.state.dataSource[0]['name'] ?
                        (<Popover content={this.getContentHaHa()}
                                  placement="left"
                                  trigger="click">
                            {record.name}</Popover>
                            ): record.name),
            }, {
                title: '体重(kg)',
                dataIndex: 'weight',
                key: 'weight',
            }, {
                title: '夸奖',
                key: 'support',
                render: (text, record) => (
                    <span>
                        <Tooltip placement="left"
                                 className="tooltip"
                                 title="跑步">
                            <Popover content={this.getContent(record, 'run')}
                                     className="operate"
                                     trigger="click">
                            <a>
                                <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-paobu1"></use>
                            </svg>
                            </a>
                            </Popover>
                        </Tooltip>
                        <Tooltip placement="bottom"
                                 overlayClassName="tooltip"
                                 title="游泳">
                            <Popover content={this.getContent(record, 'swim')}
                                     className="operate"
                                     trigger="click">
                            <a>
                                <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-youyongquan-"></use>
                                </svg>
                            </a>
                            </Popover>
                        </Tooltip>
                        <Tooltip placement="bottom"
                                 overlayClassName="tooltip"
                                 title="跳舞">
                            <Popover content={this.getContent(record, 'dance')}
                                     className="operate"
                                     trigger="click">
                            <a>
                                <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-liebiaodaohang_guangchangwu"></use>
                                </svg>
                            </a>
                            </Popover>
                        </Tooltip>
                        <Tooltip placement="bottom"
                                 overlayClassName="tooltip"
                                 title="多喝水">
                            <Popover content={this.getContent(record, 'water')}
                                     className="operate"
                                     trigger="click">
                            <a>
                                <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-_fuzhi-"></use>
                                </svg>
                            </a>
                            </Popover>
                        </Tooltip>
                        <Tooltip placement="bottom"
                                 overlayClassName="tooltip"
                                 title="早睡早起">
                            <Popover content={this.getContent(record, 'getup')}
                                     className="operate"
                                     trigger="click">
                            <a>
                                <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-qichuang"></use>
                                </svg>
                            </a>
                            </Popover>
                        </Tooltip>
                        <Tooltip placement="bottom"
                                 overlayClassName="tooltip"
                                 title="吃水果">
                            <Popover content={this.getContent(record, 'fruit')}
                                     className="operate"
                                     trigger="click">
                                <a>
                                    <svg className="icon" aria-hidden="true">
                                    <use xlinkHref="#icon-shuiguo"></use>
                                    </svg>
                                </a>
                            </Popover>
                        </Tooltip>
                        <Tooltip placement="right"
                                 overlayClassName="tooltip"
                                 title="开心">
                            <Popover content={this.getContent(record, 'happy')}
                                     className="operate"
                                     trigger="click">
                            <a>
                                <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-kaixin"></use>
                                </svg>
                            </a>
                            </Popover>
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
                            <Popover content={this.getContent(record, 'candy')}
                                     className="operate"
                                     trigger="click">
                            <a>
                                <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-tang"></use>
                            </svg>
                            </a>
                            </Popover>
                        </Tooltip>
                        <Tooltip placement="bottom"
                                 overlayClassName="tooltip"
                                 title="冰淇淋">
                            <Popover content={this.getContent(record, 'icecream')}
                                     className="operate"
                                     trigger="click">
                            <a>
                                <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-bingqilin"></use>
                            </svg>
                        </a>
                            </Popover>
                        </Tooltip>
                        <Tooltip placement="bottom"
                                 overlayClassName="tooltip"
                                 title="赖床">
                            <Popover content={this.getContent(record, 'sleep')}
                                     className="operate"
                                     trigger="click">
                            <a>
                                <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-shuijue"></use>
                            </svg>
                            </a>
                            </Popover>
                        </Tooltip>
                        <Tooltip placement="bottom"
                                 overlayClassName="tooltip"
                                 title="蛋糕">
                            <Popover content={this.getContent(record, 'cake')}
                                     className="operate"
                                     trigger="click">
                            <a>
                                <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-cupcake"></use>
                            </svg>
                            </a>
                            </Popover>
                        </Tooltip>
                        <Tooltip placement="bottom"
                                 overlayClassName="tooltip"
                                 title="点心">
                            <Popover content={this.getContent(record, 'cookie')}
                                     className="operate"
                                     trigger="click">
                            <a>
                                <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-dangao"></use>
                            </svg>
                            </a>
                            </Popover>
                        </Tooltip>
                        <Tooltip placement="right"
                                 overlayClassName="tooltip"
                                 title="不开心">
                            <Popover content={this.getContent(record, 'sad')}
                                     className="operate"
                                     trigger="click">
                            <a>
                                <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-ku"></use>
                                </svg>
                            </a>
                            </Popover>
                        </Tooltip>
                    </span>
                ),
            }]
        }
    }

    render() {
        let locale = {
            emptyText: '正在加载中',
        };;
        return(
            <div className="height-list">
                <Table
                    pagination={false}
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                    rowKey={record => record.id+record.name}
                    locale={locale}
                />
                <Button type="primary" onClick={this.refresh.bind(this)}>
                    <Icon type="reload" />
                    刷新</Button>
            </div>
        );
    }
}

HeightList.propTypes = {
    list : PropTypes.array
};

HeightList.defaultProps = defaultProps;

module.exports = HeightList;