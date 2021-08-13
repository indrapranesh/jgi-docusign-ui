import React from "react";
import { API_URL, BASE_URL } from "../constants/url.constants";
import { APIService } from "../helpers/ApiService";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

export interface EnvelopeFormData {
    envelopeId: string,
    envelopeFormData: Array<any>
}

export interface EnvelopeDataProps {
    props: EnvelopeFormData
}


export class EnvelopeData extends React.Component<EnvelopeDataProps,{map: any, comments: any}> {

    constructor(props: EnvelopeDataProps) {
        super(props);
        this.state = {
            map: null,
            comments: null
        }
    }
    mapImage = new Image();

    async getMap() {
        let res: string = await APIService.get(BASE_URL, API_URL.GET_MAP_IMAGE(this.props.props.envelopeId))
        this.setState({
            map: `data:image/png;base64,${res}`
        })
    }

    async getComments() {
        let res: string = await APIService.get(BASE_URL, API_URL.GET_COMMENTS(this.props.props.envelopeId))
        this.setState({
            comments: `data:application/pdf;base64,${res}`
        })
    }

    componentDidMount() {
        this.getMap();
        this.getComments();
    }
    
    
    render() {
    
        return (
            <>
                
                <img id="map" src={this.state.map} alt='map range' />
                <Document file={this.state.comments} >
                    <Page pageNumber={1}></Page>
                </Document>
                <div className="pt-3">
                    <label className="font-semibold">Inputs: </label>
                    <p>{this.props.props.envelopeFormData[2]?.value}</p>
                </div>
            </>
        )
    }
}