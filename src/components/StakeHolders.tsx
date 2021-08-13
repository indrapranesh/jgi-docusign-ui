import { Button, Table } from "antd";
import Modal from "antd/lib/modal/Modal";
import React from "react";
import { API_URL, BASE_URL } from "../constants/url.constants";
import { APIService } from "../helpers/ApiService";
import AddStakeHolder from "./AddStakeholder";

interface StakeHoldersState {
    users: Array<any>,
    userModal: boolean
}

export class StakeHolders extends React.Component<{}, StakeHoldersState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            users: [],
            userModal: false
        }
        this.handleCancel = this.handleCancel.bind(this)
    }

    columns = [
        { title: 'StakeHolder Name', dataIndex: 'userName', key: 'userName' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Status', dataIndex: 'userStatus', key: 'userStatus' }
    ];

    async getUsers() {
        console.log('hello')
        let users = await APIService.get(BASE_URL, API_URL.GET_USERS);
        users?.users?.forEach((user, index) => {
            user.key = index
        })
        this.setState({
            users: users?.users
        })
    }

    createNewUser() {
        console.log('create new')
        this.setState({
            userModal: true
        })
    }

    componentDidMount() {
        this.getUsers();
    }

    handleCancel() {
        this.getUsers();
        this.setState({
            userModal: false
        })
      };

    render() {
        return(
            <>
                <div className="pb-3 flex justify-end">
                    <Button type="primary" shape="round" size="large" 
                        onClick={() => this.createNewUser()} >
                            Add a Stakeholder
                    </Button>
                </div>
                <Table columns={this.columns} dataSource={this.state.users} />
                <Modal
                    width={'30%'}
                    visible={this.state.userModal}
                    footer={null}
                    onCancel={() => this.handleCancel()}
                >
                    <AddStakeHolder closeModal={this.handleCancel} />
                </Modal>
            </>
        )
    }
}