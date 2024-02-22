import React from "react";
import Alert from 'react-bootstrap/Alert';
const Error = ({variant, children}) => {
    return (
        <Alert key={variant} variant={variant}>
            {children}
        </Alert>
    )

}

Error.defaultProps = {
    variant: "info",
}

export default Error;