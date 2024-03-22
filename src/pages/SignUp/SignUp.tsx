import { useEffect, useState} from "react";
import React from "react";
import { isUserLoggedIn, signUpNewUser } from "@services/index";
import { useNavigate} from "react-router-dom"; // Import useNavigate hook
import {Button, Input, Card} from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from '@nextui-org/react';
import { twitterLogo, chevron } from "@assets/index";

import { SuggestedFollow, ProfilePictureSet, ExpectPassword, CodeSent, CreateAnAccount, SetUsername } from "@components/index";
import { createDateObject } from '@utils/index';


//The Name, Email and Date Capture
const Flow1 = ({formData, setFormData, setFlowPage}: any) => {


  const [selectedMonth, setSelectedMonth] = useState("Month");
  const [selectedDay, setSelectedDay] = useState("Day");
  const [selectedYear, setSelectedYear] = useState("Year");



  const handleNextPressed = () => {

    // setFormData({...formData, birthdate: new Date(selectedYear ,selectedMonth, selectedDay) })
    console.table(formData);

    setFlowPage(2);
  }
  
  const yearItems = [];
  for (let year = 1904; year <= 2024; year++) {
    yearItems.push(<DropdownItem key={year.toString()}>{year.toString()}</DropdownItem>);
  }

  const dayItems = [];
  for (let day = 1; day <= 31; day++) {
    dayItems.push(<DropdownItem key={day.toString().padStart(2, '0')}>{day.toString().padStart(2, '0')}</DropdownItem>);
  }

  const monthItems = [
    { key: "January", label: "January" },
    { key: "February", label: "February" },
    { key: "March", label: "March" },
    { key: "April", label: "April" },
    { key: "May", label: "May" },
    { key: "June", label: "June" },
    { key: "July", label: "July" },
    { key: "August", label: "August" },
    { key: "September", label: "September" },
    { key: "October", label: "October" },
    { key: "November", label: "November" },
    { key: "December", label: "December" },
  ];

  return (
    <Card shadow="sm" className="w-[400px] p-10">
        <div className="text-center">
          <img src={twitterLogo} alt="logo" className="w-14 mx-auto mb-2" />
          <h2 className="text-xl font-bold mb-6">Create an account</h2>
        </div>
        <form className="w-full flex flex-col gap-4 pt-2">
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input 
              variant="underlined"
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"> 
            <Input variant="underlined"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className=" mt-8">
            <div className="block text-black font-semibold">Date of birth</div>
          </div>
          <div className="flex gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  variant="bordered"
                  className="capitalize border border-gray-300"
                  style={{ borderRadius: '5px', minWidth: '120px'}}
                >
                  <span>{selectedMonth}</span> 
                  <img src={chevron} alt="chevron" className="w-4 h-4 ml-8" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Month"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedMonth}
                onSelectionChange={setSelectedMonth}
                className="max-h-40 overflow-y-auto"
              >
                {monthItems.map(month => (
                <DropdownItem key={month.key}>{month.label}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  className="capitalize border border-gray-300"
                  style={{ borderRadius: '5px', minWidth: '70px'}}
                >
                  <span>{selectedDay}</span>
                  <img src={chevron} alt="chevron" className="w-4 h-4 ml-2" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Day"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedDay}
                onSelectionChange={setSelectedDay}
                className="max-h-40 overflow-y-auto"
              >
                {dayItems}
              </DropdownMenu>
            </Dropdown>

            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  className="capitalize border border-gray-300"
                  style={{ borderRadius: '5px', minWidth: '110px'}}
                >
                  <span>{selectedYear}</span>
                  <img src={chevron} alt="chevron" className="w-4 h-4 ml-9" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Year"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedYear}
                onSelectionChange={setSelectedYear}
                className="max-h-40 overflow-y-auto"
              >
                {yearItems}
              </DropdownMenu>
            </Dropdown>
          </div>
          <Button onPress={handleNextPressed} radius="full" type="submit" className='bg-blue-500 hover:bg-blue-600 text-white'>Next</Button>
        </form>
      </Card>
  )
}


//the create password flow
const Flow2 = ({formData, setFormData, setFlowPage}:any) => {

  const handleNextPressed = () => {
    //todo: create supabase user here
    // supabase.auth.s

    setFlowPage(3);
  }

  return (
    <Card shadow="sm" className="w-[400px] p-10">
        <div className="text-center">
          <img src={twitterLogo} alt="logo" className="w-14 mx-auto mb-2" />
          <h2 className="text-xl font-bold mb-6">You'll need a password</h2>
        </div>
        <form className="w-full flex flex-col gap-10 pt-2">
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input 
              variant="underlined"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div >
          <p className="text-xs text-center mt-12">
            <span>
              By singing up you agree to the{' '}
              <a href="https://twitter.com/en/tos" className="text-blue-500 hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="https://twitter.com/en/privacy" className="text-blue-500 hover:underline">
                Privacy Policy
              </a>
              , including{' '}
              <a href="https://help.twitter.com/en/rules-and-policies/x-cookies" className="text-blue-500 hover:underline">
                Cookie Use
              </a>
            </span>
          </p>
          <Button onPress={handleNextPressed} radius="full" type="submit" className='bg-blue-500 hover:bg-blue-600 text-white'>Next</Button>
        </form>
      </Card>
  )
}

const SignUp = () => {
  //this is the new form that you shall use that will gradually be filled up as the user progresses through the flow
  //avatar should be uploaded straight to supabase bucket
  const [formData, setFormData] = useState({ 
    name: "",
    email: "", 
    password: "",
    username: "",
    birthdate: new Date(),
    
  });
  
  // const { isOpen, onOpen, onOpenChange } = useDisclosure();

  
  //snippet code of updating properties in this "userData" object
  //setUserData({ ...userData, password: "new value here" })
  const [flowPage, setFlowPage] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);

  const navigate = useNavigate(); // Initialize useNavigate hook


  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   const status = await signUpNewUser(form.email, form.password);

  //   if (status === "error") {
  //     console.error("Error signing up");
  //   } else {
  //     navigate("/home"); // Redirect to home page if user is logged in
  //   }
  // };

  // useEffect(() => {
  //   // Create a new async function
  //   const checkUser = async () => {
  //     // Check if user is already logged in
  //     const result = await isUserLoggedIn();
  //     if (result) {
  //       navigate("/profile"); // Redirect to profile page if user is logged in
  //     }
  //   };

  //   // Call the async function
  //   checkUser();
  // }, [navigate]);


  const DisplayPage = () => {
    if (flowPage === 1){
      return <Flow1 formData={formData} setFormData={setFormData} setFlowPage={setFlowPage}></Flow1>;
    }else if (flowPage === 2){
      return <Flow2 formData={formData} setFormData={setFormData} setFlowPage={setFlowPage}></Flow2>;
    } else if (flowPage === 3){
      return <div>Flow 3</div>
    }else if (flowPage === 4){
      return <div>Flow 4</div>
    }else if (flowPage === 5){
      return <div>Flow 5</div>
    }
  }


  return (
    <div className="flex items-center justify-center h-screen bg-white"> 
      {DisplayPage()}
    </div>
  );
};

export default SignUp;
