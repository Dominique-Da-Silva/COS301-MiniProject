import { Button, Input, Textarea } from "@nextui-org/react";
import { IoMdArrowBack } from "react-icons/io";
// import { supabase } from "@config/supabase";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { fetchUserData } from "@services/profileServices/getAuthUser";
import { fetchProfileDetails } from "@services/profileServices/getProfile";
import { updateProfileDetails } from "@services/profileServices/updateProfileDetails";
import { updateUsername } from "@services/profileServices/updateUsername";

const EditProfile: React.FC = () => {
  // const [userProfile, setUserProfile] = useState<any>(null);
  // const [isEditing, setIsEditing] = useState(false);
  const [profileDetails, setProfileDetails] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //console.log("here");
        const userDataX = await fetchUserData();
        //console.log(userDataX);
        setUserData(userDataX);
        const profileTemp = await fetchProfileDetails(userDataX.User_Id);
        console.log(profileTemp);
        setProfileDetails(profileTemp);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();

    const setPD = async () => {
      try {
        setProfileDetails(userData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    // //console.log(userData);
    // const profileSub = async () => {
    //   try {

    //   } catch (error) {
    //       console.error("Error fetching data: ", error);
    //   }
    // }
    // profileSub();
    setPD();
  }, [userData]);
  const [editedUsername, setEditedUsername] = useState("");
  const [editedName, setEditedName] = useState("");
  const [editedBio, setEditedBio] = useState("");
  const [editedLocation, setEditedLocation] = useState("");
  const [editedWebsite, setEditedWebsite] = useState("");
  const [editedImage, setEditedImage] = useState<File | null>(null);
  const [editedBanner, setEditedBanner] = useState<File | null>(null);
  // const handleCancelClick = () => {
  //   // Reset Editing state to close the edit window
  //   setIsEditing(false);
  // };

  const update_Username = async (editedUsername: string) => {
    const result = await updateUsername(editedUsername);
    console.log(result);
  };
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
  const handleSaveClick = async () => {
    // Save the new data
    //console.log("Save Clicked");
    //console.log(editedUsername);
    //console.log(editedName);
    //console.log(editedBio);
    //console.log(editedLocation);
    //console.log(editedWebsite);
    //console.log(editedImage);
    //console.log(editedBanner);
    //console.log(userData.User_Id);
    //console.log(userData);
    update_Username(editedUsername);
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

  if (!userData) {
    return <p>Loading</p>;
  } else {
    if (!profileDetails) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container mx-auto py-8">
          <div className="flex items-center mb-4">
            <NavLink to={"/profile"}>
              <IoMdArrowBack className="text-2xl mr-2" />
            </NavLink>
            <h2 className="text-2xl font-bold">Edit Profile</h2>
          </div>
          <div className="bg-white p-4 shadow rounded-md">
            <label htmlFor="name" className="block mb-2 font-semibold">
              Name
            </label>
            <Input
              id="name"
              placeholder={userData.Name ? userData.Name : "Enter your name"}
              onChange={(e) => setEditedName(e.target.value)}
              className="mb-4"
            />
            <label htmlFor="username" className="block mb-2 font-semibold">
              Username
            </label>
            <Input
              id="username"
              placeholder={
                userData.Username ? userData.Username : "Enter your Username"
              }
              onChange={(e) => setEditedUsername(e.target.value)}
              className="mb-4"
            />
            <label htmlFor="bio" className="block mb-2 font-semibold">
              Bio
            </label>
            <Textarea
              id="bio"
              placeholder={
                profileDetails.Bio ? profileDetails.Bio : "Enter your bio"
              }
              className="mb-4"
              onChange={(e) => setEditedBio(e.target.value)}
            />
            <label htmlFor="location" className="block mb-2 font semibold">
              Location
            </label>
            <Textarea
              id="location"
              placeholder={
                profileDetails.Location
                  ? profileDetails.Location
                  : "Enter your location"
              }
              className="mb-4"
              onChange={(e) => setEditedLocation(e.target.value)}
            />
            <label htmlFor="website" className="block mb-2 font-semibold">
              Website
            </label>
            <Textarea
              id="website"
              placeholder={
                profileDetails.Website
                  ? profileDetails.Website
                  : "Enter your website"
              }
              className="mb-4"
              onChange={(e) => setEditedWebsite(e.target.value)}
            />
            <Button size="lg" className="w-full" onClick={handleSaveClick}>
              Save
            </Button>
          </div>
        </div>
      );
    }
  }
};
export default EditProfile;
