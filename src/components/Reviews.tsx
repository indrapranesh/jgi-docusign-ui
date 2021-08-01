import { Button, Table, Tooltip } from "antd";
import React from "react";
import { API_URL, BASE_URL } from "../constants/url.constants";
import { APIService } from "../helpers/ApiService";

interface ReviewProps {
    match: {
        params: any
    }
}

interface ReviewState {
    reviewId: number,
    status: Array<any>,
    allCompleted: boolean
}

class Reviews extends React.Component<ReviewProps, ReviewState> {

    constructor(props: any) {
        super(props);
        console.log(this.props);
        let reviewId = this.props.match.params.id;
        this.state = {
            reviewId: reviewId,
            status: [],
            allCompleted: false
        }
    }

    componentDidMount() {
        let envelopeStatus: Array<any> = [];
        APIService.get(BASE_URL, API_URL.GET_ENVEOPES(this.state.reviewId))
        .then((res) => {
            if(res.envelopes) {
                let allCompleted = false;
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
        { title: 'Status', dataIndex: 'status', key: 'status' }
    ];

    createNewReview() {

    }

    render() {
        return(
            <>
                <div className="pb-3 flex justify-end">
                    <Tooltip title={this.state.allCompleted ? '' : 'Envelopes Pending'}>
                        <Button type="primary" shape="round" size="large" 
                            onClick={this.createNewReview} 
                            disabled={!this.state.allCompleted}>
                                Create Next Review
                        </Button>
                    </Tooltip>
                </div>
               <Table columns={this.columns} dataSource={this.state.status} />
            </>
        )
    }
}

export default Reviews;