import { useState } from 'react'

type Props = {
    send: (username: string) => void;
}

const SetUsername = (props: Props) => {

    const [username, setUsername] = useState("");

    function next(){
        //check if username is empty before sending back data
        props.send(username);
    }

    return (
        <div>SetUsername</div>
    )
}

export default SetUsername