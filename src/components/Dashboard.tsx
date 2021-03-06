import React from "react";
import { API_URL, BASE_URL } from "../constants/url.constants";
import { APIService } from "../helpers/ApiService";
import './Dashboard.scss';

export class Dashboard extends React.Component<{},{version: string}> {

    constructor(props: any) {
        super(props);
        this.state ={
            version: ''
        }
    }

    componentDidMount() {
        this.loadMap();
    }

    async loadMap() {
        let map = await APIService.get(BASE_URL, API_URL.GET_MAP);
        if(map.latestVersion) {
            this.setState({
                version: map.latestVersion
            })
        }
    }

    iframe = () => {
        const iframe = '<iframe width="500" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" title="JGI 0.0.1" src="//praneshh.maps.arcgis.com/apps/Embed/index.html?webmap=11a6534065b249729bb67202a21d94a0&extent=-13.9651,-20.3634,46.5916,18.3773&zoom=true&previewImage=false&scale=true&disable_scroll=false&theme=light"></iframe>'
        return {
          __html: iframe
        }
    };
    
    render() {
        
        
        return (
            <div className="h-full">
                <div className="flex justify-between mb-5">
                    <p className="font-bold text-2xl">Eastern Chimpanzee Range Map - Version: {this.state.version} </p>
                </div>
                <div className="embed-container" dangerouslySetInnerHTML={ this.iframe() }>
                </div>
            </div>
        )
    }
}