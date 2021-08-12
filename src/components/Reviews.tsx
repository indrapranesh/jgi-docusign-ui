import { Button, Table } from "antd";
import Modal from "antd/lib/modal/Modal";
import React from "react";
import { API_URL, BASE_URL } from "../constants/url.constants";
import { APIService } from "../helpers/ApiService";
import { EnvelopeData, EnvelopeFormData } from "./EnvelopeData";

interface ReviewProps {
    match: {
        params: any
    }
}

interface ReviewState {
    reviewId: number,
    status: Array<any>,
    allCompleted: boolean,
    modalOpen: boolean,
    formData: EnvelopeFormData,
}

class Reviews extends React.Component<ReviewProps, ReviewState> {

    constructor(props: any) {
        super(props);
        console.log(this.props);
        let reviewId = this.props.match.params.id;
        this.state = {
            reviewId: reviewId,
            status: [],
            allCompleted: false,
            modalOpen: false,
            formData: {} as EnvelopeFormData
        }
    }

    componentDidMount() {
        let envelopeStatus: Array<any> = [];
        APIService.get(BASE_URL, API_URL.GET_ENVEOPES(this.state.reviewId))
        .then((res) => {
            if(res.envelopes) {
                let allCompleted = true;
                (res.envelopes as Array<any>).forEach((envelope: any, index) => {
                    (res.envelopesStatus?.envelopes as Array<any>).forEach((status: any) => {
                        if(envelope.envelopeId === status.envelopeId) {
                            let envelopeDetails = {
                                name: envelope.stakeHolderName,
                                envelopeId: status.envelopeId,
                                status: status.status,
                                key: index
                            };
                            if(status.status !== 'completed') {
                                allCompleted = false;
                            }
                            envelopeStatus.push(envelopeDetails);
                        }
                    })
                });
                console.log(envelopeStatus)
                this.setState({
                    status: envelopeStatus,
                    allCompleted: allCompleted
                })
            }
        })
    }

    columns = [
        { title: 'StakeHolder Name', dataIndex: 'name', key: 'name' },
        { title: 'Envelope ID', dataIndex: 'envelopeId', key: 'envelopeId' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        { title: 'Data', key: 'operation', render: (_: any, record: any) => <a onClick={() => this.openData(record)}>View Data</a> },
    ];

    async openData(record) {
        let data = await APIService.get(BASE_URL, API_URL.GET_ENVELOPE_DATA(record.envelopeId));
        data['envelopeId'] = record.envelopeId
        this.setState({
            modalOpen: true,
            formData: data
        })
    }

    handleCancel = () => {
        this.setState({
            modalOpen: false
        })
    }

    render() {
        return(
            <>
               <Table columns={this.columns} dataSource={this.state.status} />
               <Modal
                    visible={this.state.modalOpen}
                    title="Envelope Data"
                    width={'50%'}
                    onCancel={this.handleCancel}
                    footer={null} >
                        <EnvelopeData props={this.state.formData} />
                </Modal>
            </>
        )
    }
}

export default Reviews;