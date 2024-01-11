import React from 'react';

const Heading = ({ title }: { title: string }) => {
    return (
        <h3 className='font-bold text-2xl mb-5 w-full text-center'>{title}</h3>
    );
};

export default Heading;
