import { Button, Input, Textarea } from "@nextui-org/react";
import { IoMdArrowBack } from "react-icons/io";
// import { supabase } from "@config/supabase";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { fetchUserData } from "@services/index";
import { fetchProfileDetails } from "@services/index";
import { updateProfileDetails, insertProfileDetails } from "@services/index";

const EditProfile: React.FC = () => {
  // const [userProfile, setUserProfile] = useState<any>(null);
  // const [isEditing, setIsEditing] = useState(false);
  const [profileDetails, setProfileDetails] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [editedProfile, setEditedProfile] = useState(profileDetails);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataX = await fetchUserData();
        console.log(userDataX);
        setUserData(userDataX);
      } catch (error) {
          console.error("Error fetching data: ", error);
      }
    } 
    fetchData();
    console.log(userData);
    const profileSub = async () => {
      try {
        const profileTemp = await fetchProfileDetails(userData.User_Id);
        console.log(profileTemp);
        setProfileDetails(profileTemp);
      } catch (error) {
          console.error("Error fetching data: ", error);
      }
    } 
    profileSub();
    setEditedProfile(profileDetails);
  }
  ,[profileDetails])
  // const [editedUsername, setEditedUsername] = useState("");
  // const [editedName, setEditedName] = useState("");
  // const [editedBio, setEditedBio] = useState("");
  // const [editedLocation, setEditedLocation] = useState("");
  // const [editedWebsite, setEditedWebsite] = useState("");
  // const [editedImage, setEditedImage] = useState<File | null>(null);
  // const [editedBanner, setEditedBanner] = useState<File | null>(null);
  // const handleSaveClick = async () => {
  //   console.log(editedImage);
  //   console.log(editedBanner);
  //   try {
  //     // Update name in User table
  //     await supabase
  //       .from("User")
  //       .update({ Name: editedName })
  //       .eq("auth_id", userProfile?.auth_id)
  //       .single();

  //     // Update bio in Profile table
  //     await supabase
  //       .from("Profile")
  //       .update({
  //         Bio: editedBio,
  //         Location: editedLocation,
  //         Website: editedWebsite,
  //       })
  //       .eq("User_Id", userProfile?.User_Id)
  //       .single();

  //     if (editedImage) {
  //       const { data: imageData, error: imageError } = await supabase.storage
  //         .from(`media`)
  //         .upload(`profile_images/${editedImage.name}`, editedImage, {
  //           cacheControl: "3600",
  //           upsert: false,
  //         });
  //       if (imageError) {
  //         console.log(imageData);
  //         throw new Error(`Error uploading image: ${imageError.message}`);
  //       }

  //       console.log("Image uploaded successfully:", imageData.path);
  //       if (imageData) {
  //         console.log("Image data:", imageData);

  //         const { data: publicURL } = await supabase.storage
  //           .from("media")
  //           .getPublicUrl(imageData?.path);
  //         // Insert image reference into database table
  //         console.log("Public URL:", publicURL);

  //         const { data: imageInsertData, error: insertError } = await supabase
  //           .from("Profile")
  //           .update({ Img_Url: publicURL.publicUrl })
  //           .eq("User_Id", userProfile.User_Id)
  //           .single();

  //         if (insertError) {
  //           throw insertError;
  //         }

  //         console.log(
  //           "Image reference inserted into database:",
  //           imageInsertData
  //         );
  //       }
  //     }

  //     if (editedBanner) {
  //       const { data: bannerData, error: bannerError } = await supabase.storage
  //         .from("media")
  //         .upload(`banner_images/${editedBanner.name}`, editedBanner, {
  //           cacheControl: "3600",
  //           upsert: false,
  //         });
  //       if (bannerError) {
  //         throw new Error(`Error uploading banner: ${bannerError.message}`);
  //       }

  //       console.log("Banner uploaded successfully:", bannerData.path);

  //       if (bannerData) {
  //         console.log("Banner data:", bannerData);

  //         const { data: bannerURL } = await supabase.storage
  //           .from("media")
  //           .getPublicUrl(bannerData.path);
  //         // Insert image reference into database table
  //         console.log("Banner URL:", bannerURL);

  //         // Insert image reference into database table
  //         const { data: bannerInsertData, error: bannerInsertError } =
  //           await supabase
  //             .from("Profile")
  //             .update({
  //               Banner_Url: bannerURL?.publicUrl,
  //               Bio: editedBio,
  //               Img_Url: editedImage ? editedImage.toString() : "",
  //               Profile_Id: userProfile?.Profile_Id,
  //               Profile_Type: userProfile?.Profile_Type,
  //               Theme: userProfile?.Theme,
  //               User_Id: userProfile?.User_Id,
  //             })
  //             .eq("User_Id", userProfile?.User_Id)
  //             .single();

  //         if (bannerInsertError) {
  //           throw bannerInsertError;
  //         }

  //         console.log(
  //           "Banner reference inserted into database:",
  //           bannerInsertData
  //         );
  //       }
  //     }

  //     // Refresh profile details after updating
  //     const { data: updatedProfileData, error: profileError } = await supabase
  //       .from("Profile")
  //       .select()
  //       .eq("User_Id", userProfile.User_Id)
  //       .single();
  //     if (profileError) {
  //       throw profileError;
  //     }
  //     setProfileDetails(updatedProfileData);

  //     const { data: updatedUserData, error: updatedUserError } = await supabase
  //       .from("User")
  //       .select()
  //       .eq("auth_id", userProfile?.auth_id)
  //       .single();
  //     if (updatedUserError) {
  //       throw updatedUserError;
  //     }
  //     setUserProfile(updatedUserData);

  //     // Close the edit window and reset states
  //     setIsEditing(false);
  //     setEditedName("");
  //     setEditedBio("");
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       if (error.message.includes("media")) {
  //         console.error("Error uploading image:", error.message);
  //       } else if (error.message.includes("images")) {
  //         console.error("Error uploading banner:", error.message);
  //       } else if (error.message.includes("Profile")) {
  //         console.error("Error updating profile:", error.message);
  //       } else if (error.message.includes("User")) {
  //         console.error("Error updating user:", error.message);
  //       } else {
  //         console.error("Unknown error:", error.message);
  //       }
  //     }
  //   }
  // };

  // const handleCancelClick = () => {
  //   // Reset Editing state to close the edit window
  //   setIsEditing(false);
  // };
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-4">
        <NavLink to={"/profile"}>
        <IoMdArrowBack className="text-2xl mr-2"  />
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
          //  onChange={(e) => setEditedName(e.target.value)}
          onChange={(e) => setEditedProfile({...editedProfile, Name: e.target.value})}

          className="mb-4"
        />
        <label htmlFor="username" className="block mb-2 font-semibold">
          Username
        </label>
        <Input
          id="username"
          placeholder={userData.Username ? userData.Username : "Enter your Username"}
          // onChange={(e) => setEditedName(e.target.value)}
          onChange={(e) => setEditedProfile({...editedProfile, Username: e.target.value})}

          className="mb-4"
        />
        <label htmlFor="bio" className="block mb-2 font-semibold">
          Bio
        </label>
        <Textarea
          id="bio"
          placeholder={profileDetails.Bio ? profileDetails.Bio : "Enter your bio"}
          className="mb-4"
          // onChange={(e) => setEditedBio(e.target.value)}
          onChange={(e) => setEditedProfile({...editedProfile, Bio: e.target.value})}
        />
        <label htmlFor="location" className="block mb-2 font semibold">
          Location
        </label>
        <Textarea
          id="location"
          placeholder={profileDetails.Location ? profileDetails.Location : "Enter your location"}
          className="mb-4"
          //  onChange={(e) => setEditedLocation(e.target.value)}
          onChange={(e) => setEditedProfile({...editedProfile, Location: e.target.value})}

        />
        <label htmlFor="website" className="block mb-2 font-semibold">
          Website
        </label>
        <Textarea
          id="website"
          placeholder={profileDetails.Website? profileDetails.Website : "Enter your website"}
          className="mb-4"
        //  onChange={(e) => setEditedWebsite(e.target.value)}
        />
        <Button size="lg" className="w-full" onClick={() => updateProfileDetails(editedProfile)}>
          Save
        </Button>
      </div>
    </div>
  );
};
export default EditProfile;