import { Button } from "antd";
import React from "react";
import { API_URL, BASE_URL } from "../constants/url.constants";
import { APIService } from "../helpers/ApiService";

export class Dashboard extends React.Component {

    sendEnvelope() {
        APIService.post(`${BASE_URL}`,`${API_URL.SEND_ENVELOPE}`, {
            version: '1.0.0',
            email: 'indrapraneshp@gmail.com',
            name: 'Indra Pranesh'
        })
    }

    render() {
        return (
            <div>
                <Button type="primary" shape="round" size="large" onClick={this.sendEnvelope}>
                    Send Envelope
                </Button>
            </div>
        )
    }
}