import { useState } from 'react'

type Props = {
    send: (form: {
        name: string,
        email: string,
        dob_month: string,
        dob_day: string,
        dob_year: string,
    }) => void;
}

const CreateAnAccount = (props: Props) => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        dob_month: "",
        dob_day: "",
        dob_year: "",
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