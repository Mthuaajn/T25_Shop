import React from "react";
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
    return (
        <div className="flex flex-row justify-center">
            <Spinner animation="border" variant="primary" >
            <span className="visually sr-only">Loading...</span>
            </Spinner>
        </div>
    )
}

export default Loading;