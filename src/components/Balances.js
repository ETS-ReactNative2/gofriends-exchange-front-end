import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Table, Tooltip} from 'antd';
import QRCode from 'qrcode-react';
import {getUserInfo} from "../utils";
import {USERINFO} from "./../constants/APIURLS.js"
import {save_user_info} from "../actions/UserActions";
import WithdrawPanel from "./WithdrawLogic";
import Modal from 'react-modal';

import BTC from '../img/coins/BTC.png';
import BTG from '../img/coins/BTG_gold.png';
import BCH from '../img/coins/BTG.png';
import ETH from '../img/coins/ETH.png';
import LTC from '../img/coins/LTC.png';
import ZEC from '../img/coins/ZEC.png';

import '../styles/balances.css';
import '../App.css';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0'
    }
};

Modal.setAppElement('#root');

class Balances extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            selectCoin: {}
        };
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

    openModal = (coin, type) => {
        this.setState({
            modalIsOpen: true,
            selectCoin: {
                ...coin,
                type
            }
        })
    }

    closeModal = () => {
        this.setState({modalIsOpen: false})
    }

    render() {
        const coinsLogo = {
            BTC, BCH, BTG, ETH, LTC, ZEC
        };

        const user = this.props.user;
        // console.log("Balances. User = ", this.props);
        const {balances = []} = user;
        console.log(this.state.selectCoin)
        const {name, address, type} = this.state.selectCoin;

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

        const columns = [
            {
                title: 'Coin',
                key: 'nameCoin',
                width: 150,
                render: (text, record) => (
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <img style={{width: '13px', height: '13px', margin: '1px 10px 0 0'}}
                             src={coinsLogo[record.code]} alt=""/>
                        <h4>{record.code}</h4>
                    </div>
                )
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: 150,
            },
            {
                title: 'Total balance',
                dataIndex: 'amount',
                key: 'amount',
                width: 150,
            },

            {
                title: '',
                dataIndex: 'action',
                key: 'action',
                width: 250,
                render: (text, record) => (
                    <div className='balance-action-block'>
                        <div onClick={() => this.openModal(record, 'deposit')} className="act-btn">
                            Deposit
                        </div>


                        <div onClick={() => this.openModal(record, 'withdrawal')} className="act-btn">
                            Withdrawal
                        </div>




                        {/*<div className="act-btn">Trade</div>*/}
                    </div>
                )
            }];
        return (
            <div className="balances-page">
                <div>
                    <h3>Balances</h3>
                </div>

                <div className='table'>
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        pagination={false}
                        bordered={false}
                        rowKey={record => record.id}
                        size="small"
                    />
                </div>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <div className="modal-window">
                        <div className="close-modal-btn" onClick={this.closeModal}>
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </div>
                        <div className="modal-title">
                            {(type === 'deposit' ? 'Deposit' : 'Withdraw')} {name}
                        </div>

                        {type === 'deposit' ?
                            <div className='deposit'>
                                <div className="qrCode">
                                    {address ?
                                        <QRCode
                                            value={address}
                                        /> : ''}
                                </div>

                                <div className='qr-description'>
                                    Internal address for deposit {name}
                                </div>

                                <div className='address-description'>
                                    ADA Deposit Address
                                </div>

                                <div className="address">
                                    {address}
                                </div>
                            </div>
                            :
                            <div className='withdraw'>
                                <WithdrawPanel record={this.state.selectCoin} close={this.closeModal}/>
                            </div>
                        }
                    </div>
                </Modal>
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
