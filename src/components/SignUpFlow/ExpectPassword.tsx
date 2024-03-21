import {useState} from 'react';

type Props = {
    sendBack: (password: string) => void;
}

const ExpectPassword = (props: Props) => {

    const [password, setPassword] = useState<string>("");

    function next(){ 
        //please validate that it is not empty
        props.sendBack(password); 
    }
    
    return (
        <div>ExpectPassword</div>
    )
}

export default ExpectPassword