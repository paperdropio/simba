import React from 'react'

interface TestCompProps {
    message: string,
    data?: string,
}


const TestComp = (props: TestCompProps) => {
    return (
        <div>
            {props.message}            
            {props.data}
        </div>
    )
};

export default TestComp;