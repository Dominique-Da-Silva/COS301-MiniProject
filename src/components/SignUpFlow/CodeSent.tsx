import { useState } from 'react'

type Props = {
    send: (code: string) => void;
}

const CodeSent = (props: Props) => {
    const [code, setCode] = useState<string>("");

    function next(){ 
        //please validate that it is not empty
        props.send(code); 
    }
    
    return (
        <div>CodeSent</div>
    )
}

export default CodeSent