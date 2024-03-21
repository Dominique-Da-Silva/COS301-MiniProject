import { useState } from "react";

type Props = {
    getAvatar: (img: any) => void;
}

const ProfilePictureSet = (props: Props) => {
    const [avatar, setAvatar] = useState<string>("");

    function captureImage(e: React.ChangeEvent<HTMLInputElement>) {
        if(e.target.files === null)return;
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            if(e.target?.result) {
                setAvatar(e.target.result as string);
            }
        }
        reader.readAsDataURL(file);
    }

    function next(){ props.getAvatar(avatar); }

    return (
        <div>ProfilePictureSet</div>
    )
}

export default ProfilePictureSet