import React from "react";
import { API_URL, BASE_URL } from "../constants/url.constants";
import { APIService } from "../helpers/ApiService";

export interface EnvelopeFormData {
    envelopeId: string,
    envelopeFormData: Array<any>,
    comments: any
}

export interface EnvelopeDataProps {
    props: EnvelopeFormData
}


export class EnvelopeData extends React.Component<EnvelopeDataProps,{map: any}> {

    constructor(props: EnvelopeDataProps) {
        super(props);
        this.state = {
            map: null
        }
    }
    mapImage = new Image();

    async getMap() {
        let blob = await APIService.get(BASE_URL, API_URL.GET_MAP_IMAGE(this.props.props.envelopeId));
        blob = new Blob([blob], {type: 'image/png'})
        this.mapImage.src  = URL.createObjectURL(blob);
        console.log(this.mapImage);
        this.setState({
            map: this.mapImage
        })
    }

    renderMap = () => {
        console.log(this.mapImage);
        return {
            __html : `${this.state.map}`
        }
    }

    componentDidMount() {
        this.getMap();
    }

    componentWillUnmount() {
        URL.revokeObjectURL(this.mapImage.src);
    }
    
    render() {
    
        return (
            <>
                <div dangerouslySetInnerHTML={this.renderMap()} />


                <div>
                    <label>Comments: </label>
                    <p>{this.props.props.comments}</p>
                </div>
                <div>
                    <label>Inputs: </label>
                    <p>{this.props.props.envelopeFormData[1]?.value}</p>
                </div>
            </>
        )
    }
}