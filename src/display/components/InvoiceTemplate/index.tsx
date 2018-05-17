import React from 'react';
import BaseTemplate from './BaseTemplate';
import CarTemplate from './CarTemplate';
const Template = ({type,data,onClose}) => {
    if (type === 'VAT_SPECIAL_INVOICE_MOTORVEHICLE') {
        return (
            <CarTemplate data={data} onClose={onClose}/>
        );
    } else {
        return <BaseTemplate data={data} onClose={onClose}/>;
    }
    
};

export default Template;