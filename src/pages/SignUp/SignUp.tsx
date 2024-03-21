import { useEffect, useState} from "react";
import React from "react";
import { isUserLoggedIn, signUpNewUser } from "@services/index";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate hook
import {Button, Input, Card} from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from '@nextui-org/react';
import { twitterLogo } from "@assets/index";

import { SuggestedFollow, ProfilePictureSet, ExpectPassword, CodeSent, CreateAnAccount, SetUsername } from "@components/index";

const SignUp = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [selectedMonth, setSelectedMonth] = useState("Month");
  const [selectedDay, setSelectedDay] = useState("Day");
  const [selectedYear, setSelectedYear] = useState("Year");
  // const { isOpen, onOpen, onOpenChange } = useDisclosure();

  //this is the new form that you shall use that will gradually be filled up as the user progresses through the flow
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    dob_month: "",
    dob_day: "",
    dob_year: "",
    code: "",
    password: "",
    avatar: "",
    username: ""
  });
  //snippet code of updating properties in this "userData" object
  //setUserData({ ...userData, password: "new value here" })

  const navigate = useNavigate(); // Initialize useNavigate hook

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const status = await signUpNewUser(form.email, form.password);

    if (status === "error") {
      console.error("Error signing up");
    } else {
      navigate("/home"); // Redirect to home page if user is logged in
    }
  };

  useEffect(() => {
    // Create a new async function
    const checkUser = async () => {
      // Check if user is already logged in
      const result = await isUserLoggedIn();
      if (result) {
        navigate("/profile"); // Redirect to profile page if user is logged in
      }
    };

    // Call the async function
    checkUser();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen"> 
      <Card shadow="sm" className="w-[400px] p-10">
        <div className="text-center">
          <img src={twitterLogo} alt="logo" className="w-14 mx-auto mb-2" />
          <h2 className="text-xl font-bold mb-6">Create an account</h2>
        </div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 pt-2">
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input 
              variant="underlined"
              type="email"
              placeholder="Name"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"> 
            <Input variant="underlined"
              type="password"
              placeholder="Email/Phone number"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <div className="text-center flex justify-between">
            <div className="text-blue-500 hover:underline">Use email</div>
          </div>
          <div className=" mt-8">
            <div className="block text-black font-semibold">Date of birth</div>
          </div>
          <div className="flex gap-9">
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  variant="bordered"
                  className="capitalize"
                >
                  {selectedMonth}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Month"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedMonth}
                onSelectionChange={setSelectedMonth}
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
                  className="capitalize"
                >
                  {selectedDay}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Day"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedDay}
                onSelectionChange={setSelectedDay}
              >
                {dayItems}
              </DropdownMenu>
            </Dropdown>

            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  className="capitalize"
                >
                  {selectedYear}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Year"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedYear}
                onSelectionChange={setSelectedYear}
              >
                {yearItems}
              </DropdownMenu>
            </Dropdown>
          </div>
          <Button radius="full" type="submit" className='bg-blue-500 hover:bg-blue-600 text-white'>Next</Button>
        </form>
      </Card>
    </div>
  );
};

export default SignUp;
