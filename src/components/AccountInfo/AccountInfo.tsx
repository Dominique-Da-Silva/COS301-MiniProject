// AccountInfo.tsx
import React, { useEffect, useState } from "react";
import {
  fetchProfileDetails,
  fetchUserData,
  uploadProfile,
  updateProfileDetails,
  uploadImageAndGetURL,
  updateUsername,
} from "@services/index";
import { Button } from "@nextui-org/react";

const [accountInfo, setAccountInfo] = useState<any>(null);
const [userData, setUserData] = useState<any>(null);
const [editedUsername, setEditedUsername] = useState("");
const [userProfileImage, setUserProfileImage] = useState<string>("");
const [userProfileBanner, setUserProfileBanner] = useState<string>("");
const [editedName, setEditedName] = useState("");
const [editedBio, setEditedBio] = useState("");
const [editedLocation, setEditedLocation] = useState("");
const [editedWebsite, setEditedWebsite] = useState("");
const [editedImage, setEditedImage] = useState<File | null>(null);
const [editedImageURL, setEditedImageURL] = useState<string>("");
const [editedBanner, setEditedBanner] = useState<File | null>(null);
const [editedBannerURL, setEditedBannerURL] = useState<string>("");
const [editedGender, setEditedGender] = useState("");
const [editedBirthDate, setEditedBirthDate] = useState("");

const AccountInfo: React.FC = () => {
  useEffect(() => {
    const fetchData = async () => {
      const userDataX = await fetchUserData();
      const profileDetails = await fetchProfileDetails(userDataX.User_Id);
      setAccountInfo(profileDetails);
      console.log(profileDetails);
    };
    fetchData();

    const profilfeDetails = async () => {
      try {
        setAccountInfo(userData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    profilfeDetails();
  }, [userData]);

  const getTimeDisplay = (timestamp: string) => {
    const currentTime = new Date();
    const parsedTimestamp = new Date(timestamp);

    const timeDiff = currentTime.getTime() - parsedTimestamp.getTime(); // Get time difference in milliseconds
    const minutesDiff = Math.floor(timeDiff / 60000); // Convert milliseconds to minutes

    let timeDisplay;
    if (minutesDiff < 60) {
      timeDisplay = `${minutesDiff}m`;
    } else {
      const hoursDiff = Math.floor(minutesDiff / 60); // Convert minutes to hours
      if (hoursDiff < 24) timeDisplay = `${hoursDiff}h`;
      else {
        const month = parsedTimestamp.toLocaleString("en-us", {
          month: "short",
        });
        const day = parsedTimestamp.getDate();
        timeDisplay = `${month} ${day}`;
      }
    }

    return timeDisplay;
  };

  const handleSaveClick = async () => {
    update_Username(editedUsername);
    uploadImageAndGetURL(editedImage as File, "profile_images");
    uploadImageAndGetURL(editedBanner as File, "profile_banners");
    updateUserData({
      Banner_Url: editedBanner?.toString() ?? undefined,
      Bio: editedBio,
      Img_Url: editedImage?.toString() ?? undefined,
      Profile_Type: userData.Profile_Type,
      Theme: userData.Theme,
      Location: editedLocation,
      Website: editedWebsite,
    });
  };

  const update_Username = async (editedUsername: string) => {
    const result = await updateUsername(editedUsername);
    console.log(result);
  };

  const getProfileImage = async (): Promise<string> => {
    const result = await fetchProfileDetails(userData.User_Id);
    console.log(result);
    return result.Img_Url;
  };

  function capureImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files === null) return;

    const selectedFile = e.target.files[0];
    setEditedImage(selectedFile);

    const reader = new FileReader();
    reader.onload = () => {
      setEditedImageURL(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  }

  function captureBanner(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files === null) return;

    const selectedFile = e.target.files[0];
    setEditedBanner(selectedFile);

    const reader = new FileReader();
    reader.onload = () => {
      setEditedBannerURL(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  }

  const updateUserData = async (userData: {
    Banner_Url?: string;
    Bio?: string;
    Img_Url?: string;
    Location?: string;
    Profile_Type?: string;
    Theme?: boolean;
    Website?: string;
  }) => {
    const result = await updateProfileDetails(userData);
    console.log(result);
  };

  return (
    <div className="bg-white text-gray-800">
      <div className="p-4 border-b border-gray-300">
        <h4 className="text-gray-600 font-semibold">Account information</h4>
      </div>
      <div className="p-4">
        <div className="hover:bg-gray-100 p-2 rounded-md">
          <p className="font-semibold">Banner</p>
          <div className="flex justify-center items-center">
            <div className="w-full h-36 overflow-hidden border border-gray flex justify-center items-center">
              {editedBannerURL ? (
                <img
                  src={editedBannerURL}
                  alt="uploaded-avatar"
                  className="w-full h-full object cover"
                />
              ) : (
                <img
                  src={userProfileBanner}
                  alt="banner"
                  className="w-full h-full object cover"
                />
              )}
            </div>
          </div>
        </div>
        <div className="hover:bg-gray-100 p-2 rounded-md">
          <p className="font-semibold">Profile Image</p>
          <div className="flex justify-center items-center">
            <div className="w-full h-36 overflow-hidden border border-gray flex justify-center items-center">
              {editedImageURL ? (
                <img
                  src={editedImageURL}
                  alt="uploaded-avatar"
                  className="w-full h-full object cover"
                />
              ) : (
                <img
                  src={userProfileImage}
                  alt="banner"
                  className="w-full h-full object cover"
                />
              )}
            </div>
          </div>
        </div>
        <div className="hover:bg-gray-100 p-2 rounded-md">
          <p className="font-semibold">Username</p>
          <p className="text-gray-500">{userData.Name}</p>
        </div>
        <div className="h-1" />
        <div className="hover:bg-gray-100 p-2 rounded-md">
          <p className="font-semibold">Surname</p>
          <p className="text-gray-500">{userData.Surname}</p>
        </div>
        <div className="h-1" />
        <div className="hover:bg-gray-100 p-2 rounded-md">
          <p className="font-semibold">Username</p>
          <p className="text-gray-500">{userData.Username}</p>
        </div>
        <div className="h-1" />
        <div className="hover:bg-gray-100 p-2 rounded-md">
          <p className="font-semibold">Email</p>
          <p className="text-gray-500">{userData.Email}</p>
        </div>
        <div className="h-1" />
        <div className="hover:bg-gray-100 p-2 rounded-md">
          <p className="font-semibold">Account creation</p>
          <p className="text-gray-500">{getTimeDisplay(userData.Created_at)}</p>
        </div>
        <div className="h-1" />
        <div className="hover:bg-gray-100 p-2 rounded-md">
          <p className="font-semibold">Country</p>
          <p className="text-gray-500">{accountInfo.Location}</p>
        </div>
        <div className="h-1" />
        <div className="hover:bg-gray-100 p-2 rounded-md">
          <p className="font-semibold">Languages</p>
          <p className="text-gray-500">English</p>
        </div>
        <div className="h-1" />
        <div className="hover:bg-gray-100 p-2 rounded-md">
          <p className="font-semibold">Gender</p>
          <p className="text-gray-500">{accountInfo.Gender}</p>
        </div>
        <div className="h-1" />
        <div className="hover:bg-gray-100 p-2 rounded-md">
          <p className="font-semibold">Birth date</p>
          <p className="text-gray-500">{userData.Data_Of_Birth}</p>
          <p className="text-gray-500">
            Add your date of birth to your profile.
          </p>
        </div>
        <div className="h-1" />
        <div className="hover:bg-gray-100 p-2 rounded-md">
          <p className="font-semibold">Age</p>
          <p className="text-gray-500">20</p>
        </div>
        {/* <div className="h-1" />
        <div className="hover:bg-gray-100 p-2 rounded-md">
          <p className="font-semibold">Automation</p>
          <p className="text-gray-500">Manage your automated account.</p>
        </div> */}
      </div>
      <Button />
    </div>
  );
};

export default AccountInfo;
