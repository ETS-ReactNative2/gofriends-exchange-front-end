import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Table, Tooltip} from 'antd';
import {getUserInfo} from "../utils";
import {USERINFO} from "./../constants/APIURLS.js"
import {save_user_info} from "../actions/UserActions";
import WithdrawPanel from "./WithdrawLogic"
import '../App.css';

// import 'antd/lib/tooltip/style/css';
// import 'antd/lib/popconfirm/style/css';

class Balances extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        const {user: {token}} = this.props; //read from redux state
        const isAuthorised = (token !== "") && (token !== null); // ? true : false
        // this.setState({isAuthorised, token});
        if (isAuthorised) {
            const userInfo = await getUserInfo({rout: USERINFO, token});
            const {body} = userInfo;
            this.props.save_user_info(body);
        }
    }

    render() {
        const user = this.props.user;
        // console.log("Balances. User = ", this.props);
        const {balances = []} = user;

        const dataSource = balances.map(item => (
            {
                key: item.currency.name + "" + item.amount,
                name: item.currency.name,
                code: item.currency.code,
                amount: item.amount,
                address: item.address,
                action: ""
            }
        ));

        const columns = [{
            title: 'Coins',
            dataIndex: 'name',
            key: 'name',
            width: 150,
        }, {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            width: 150,
            // }, {
            //     title: 'Deposit address',
            //     dataIndex: 'address',
            //     key: 'address',
        },

            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                width: 200,
                render: (text, record) => (
                    <div>
                        <Tooltip
                            title={
                                <div>
                                    <h3>Deposit {record.name}</h3>
                                    <div className="line"></div>

                                    <div className="tooltip-block">
                                        <div className="qrImg"></div>
                                        <h4>Internal address for deposit {record.name}</h4>
                                    </div>

                                    <p>{record.address}</p>
                                </div>
                            }
                            trigger="click"
                            placement="topRight"
                        >

                        <span>
                          <a href="" className="act-btn">Deposit {record.code}</a>
                        </span>
                        </Tooltip>
                        <WithdrawPanel record={record}/>

                    </div>
                )
            }];
        return (
            <div className="wrap">
                <div className="card-container, currencysPairs" style={{width: "auto", margin: "auto"}}>
                    <div className="card-container-head">
                        <h1 style={{margin: "2rem"}}>BALANCE</h1>
                        <Table
                            rowKey={record => record.name}
                            dataSource={dataSource}
                            columns={columns}
                            pagination={false}
                            rowClassName="custom__tr"
                        />
                    </div>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = dispatch => ({
    save_user_info: (info) => dispatch(save_user_info(info)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Balances)
