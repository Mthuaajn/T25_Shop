import React from "react";
import Alert from 'react-bootstrap/Alert';
const Message = ({variant, children}) => {
    return (
        <Alert key={variant} variant={variant}>
            {children}
        </Alert>
    )

}

Message.defaultProps = {
    variant: "info",
}

export default Message;