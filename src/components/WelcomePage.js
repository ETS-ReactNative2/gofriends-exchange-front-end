import React, {Component} from 'react';
import NavLink from './NavLink';
import {Tabs, Table} from 'antd';

import '../styles/welcome.css';

const TabPane = Tabs.TabPane;


class WelcomePage extends Component {
    render() {
        const columns = [
            {
                title: 'Pair',
                dataIndex: 'type',
                key: 'type',
                width: 150,
            },
            {
                title: `Coin`,
                dataIndex: 'price',
                key: 'price',
                width: 150,
            },
            {
                title: `Last price`,
                dataIndex: 'amount',
                key: 'amount',
                width: 150,
            },
            {
                title: `24 change`,
                dataIndex: 'Sum',
                key: 'Sum',
                width: 150,
            },
            {
                title: '24 high',
                dataIndex: 'completedAt',
                key: 'completedAt',
                width: 150,
            },
            {
                title: '24 Low',
                dataIndex: 'Low',
                key: 'Low',
                width: 150,
            },
            {
                title: '24 Volume',
                dataIndex: 'Volume',
                key: 'Volume',
                width: 150,
            },
        ];

        const mobileColumns = [
            {
                title: 'Pair',
                dataIndex: 'type',
                key: 'type',
                width: 150,
            },
            {
                title: `Last price`,
                dataIndex: 'amount',
                key: 'amount',
                width: 150,
            },
            {
                title: `24 change`,
                dataIndex: 'Sum',
                key: 'Sum',
                width: 150,
            }
        ];

        const dataSource = [
            {
                id: 1,
                type: 'ETH/BTC',
                price: 'Ethereum',
                amount: '0.028221 / $113.37',
                Sum: '0.32%',
                completedAt: '0.00000420',
                Low: 'Volume',
                Volume: 'qfdwef'

            }, {
                id: 2,
                type: 'ETH/BTC',
                price: 'Ethereum',
                amount: '0.028221 / $113.37',
                Sum: '0.32%',
                completedAt: '0.00000420',
                Low: 'Volume',
                Volume: 'qfdwef'

            }, {
                id: 3,
                type: 'ETH/BTC',
                price: 'Ethereum',
                amount: '0.028221 / $113.37',
                Sum: '0.32%',
                completedAt: '0.00000420',
                Low: 'Volume',
                Volume: 'qfdwef'

            }, {
                id: 4,
                type: 'ETH/BTC',
                price: 'Ethereum',
                amount: '0.028221 / $113.37',
                Sum: '0.32%',
                completedAt: '0.00000420',
                Low: 'Volume',
                Volume: 'qfdwef'

            }, {
                id: 5,
                type: 'ETH/BTC',
                price: 'Ethereum',
                amount: '0.028221 / $113.37',
                Sum: '0.32%',
                completedAt: '0.00000420',
                Low: 'Volume',
                Volume: 'qfdwef'

            }, {
                id: 6,
                type: 'ETH/BTC',
                price: 'Ethereum',
                amount: '0.028221 / $113.37',
                Sum: '0.32%',
                completedAt: '0.00000420',
                Low: 'Volume',
                Volume: 'qfdwef'

            }, {
                id: 7,
                type: 'ETH/BTC',
                price: 'Ethereum',
                amount: '0.028221 / $113.37',
                Sum: '0.32%',
                completedAt: '0.00000420',
                Low: 'Volume',
                Volume: 'qfdwef'

            },
        ];


        return (
            <div className='welcome-page'>
                <div className='title-block'>
                    <div className='h1'>Gofriends crypto exchange</div>

                    <div className='h3'>One of the most active exchanges in the world</div>

                    <NavLink to="/signup" className="go-to-login">Sign up</NavLink>
                </div>

                <div className='statistics-block'>
                    <Tabs defaultActiveKey="1" type="card">
                        <TabPane tab="BTC Markets" key="1">
                            <div className='table-stat'>
                                <Table
                                    columns={window.screen.width < '600' ? mobileColumns : columns}
                                    dataSource={dataSource}
                                    bordered={false}
                                    pagination={false}
                                    rowKey={record => record.id}
                                    scroll={{y: 500, x:300}}
                                    size="small"
                                    rowClassName="custom__tr"/>
                            </div>
                        </TabPane>

                        <TabPane tab="BCH Markets" key="2">
                            <div className='table-stat'>
                                <Table
                                    columns={window.screen.width < '600' ? mobileColumns : columns}
                                    dataSource={dataSource}
                                    bordered={false}
                                    pagination={false}
                                    rowKey={record => record.id}
                                    scroll={{y: 500, x:300}}
                                    size="small"
                                    rowClassName="custom__tr"/>

                            </div>
                        </TabPane>

                        <TabPane tab="USD Markets" key="3">
                            <div className='table-stat'>
                                <Table
                                    columns={window.screen.width < '600' ? mobileColumns : columns}
                                    dataSource={dataSource}
                                    bordered={false}
                                    pagination={false}
                                    rowKey={record => record.id}
                                    scroll={{y: 500, x:300}}
                                    size="small"
                                    rowClassName="custom__tr"/>

                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default WelcomePage;