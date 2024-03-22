import { useState } from "react";
import { uploadProfile } from "@services/index";

interface Props {
    next: () => void;
}

const ProfilePictureSet = (props: Props) => {
    const [avatar, setAvatar] = useState<File | null>(null);

    function captureImage(e: React.ChangeEvent<HTMLInputElement>) {
        if(e.target.files === null)return;
        setAvatar(e.target.files[0]);
    }

    async function next(){ 
        if(avatar === null) return;
        const result = await uploadProfile(avatar);
        if(result === "error") return;
        props.next();
    }

    return (
        <div>ProfilePictureSet</div>
    )
}

export default ProfilePictureSet