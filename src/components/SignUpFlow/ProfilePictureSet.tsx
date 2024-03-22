import { useState } from "react";

type Props = {
    getAvatar: (img: File | null) => void;
}

const ProfilePictureSet = (props: Props) => {
    const [avatar, setAvatar] = useState<File | null>(null);

    function captureImage(e: React.ChangeEvent<HTMLInputElement>) {
        if(e.target.files === null)return;
        setAvatar(e.target.files[0]);
    }

    function next(){ props.getAvatar(avatar); }

    return (
        <div>ProfilePictureSet</div>
    )
}

export default ProfilePictureSet