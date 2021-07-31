import React from "react";

interface ReviewProps {
    match: {
        params: string
    }
}

interface ReviewState {
    reviewId: number
}

class Reviews extends React.Component<ReviewProps, ReviewState> {

    constructor(props: any) {
        super(props);
        let reviewId = (JSON.parse(this.props.match.params)).param1;
        this.state = {
            reviewId: reviewId
        }
    }

    render() {
        return(
            <>
                <p>hello</p>
            </>
        )
    }
}

export default Reviews;