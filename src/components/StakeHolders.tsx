import React from "react";

export class StakeHolders extends React.Component<{}, {}> {

    constructor(props: {}) {
        super(props);
        this.state = {
            groups: []
        }
    }

    async getUsers() {
        console.log('hello')
        // let groups = await APIService.get(DOCUSIGN_URL, DOCUSIGN_PATHS.LIST_GROUPS);
        // console.log(groups);
        // this.setState({
        //     groups: groups
        // })
    }

    componentDidMount() {
        this.getUsers();
    }

    render() {
        return(
            <>
            </>
        )
    }
}