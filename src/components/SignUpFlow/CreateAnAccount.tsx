import { useState } from 'react';
import { createDateObject } from '@utils/index';

type Props = {
    send: (form: {
        name: string,
        email: string,
        dob: Date
    }) => void;
}

const CreateAnAccount = (props: Props) => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        dob: new Date()
    });

    function next(){
        //please validate that it is not empty
        props.send(form);
    }

    return (
        <div>CreateAnAccount</div>
    )
}

export default CreateAnAccount