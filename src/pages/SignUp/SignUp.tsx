import { useEffect, useState} from "react";
import React from "react";
import { isUserLoggedIn, signUpNewUser } from "@services/index";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate hook
import {Button, Input, Card} from "@nextui-org/react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from '@nextui-org/react';
import { twitterLogo, chevron } from "@assets/index";

import { SuggestedFollow, ProfilePictureSet, ExpectPassword, CodeSent, CreateAnAccount, SetUsername } from "@components/index";

const SignUp = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [selectedMonth, setSelectedMonth] = useState("Month");
  const [selectedDay, setSelectedDay] = useState("Day");
  const [selectedYear, setSelectedYear] = useState("Year");
  // const { isOpen, onOpen, onOpenChange } = useDisclosure();

  //this is the new form that you shall use that will gradually be filled up as the user progresses through the flow
  const [user_data, setUserData] = useState({
    name: "",
    email: "",
    dob_month: "January",
    dob_day: "1",
    dob_year: "1904",
    code: "",//idk about this one so just don't use it for now
    password: "",
    username: ""
  });
  //snippet code of updating properties in this "userData" object
  //setUserData({ ...userData, password: "new value here" })
  const [flow_page, setFlowPage] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);

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
    await signUpNewUser(user_data);
  };

  useEffect(() => {
    // Create a new async function
    const checkUser = async () => {
      // Check if user is already logged in
      const result = await isUserLoggedIn();
      if (result) {
        navigate("/home");
      }
    };

    // Call the async function
    checkUser();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-white"> 
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
              placeholder="Email"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
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
          <Button radius="full" type="submit" className='bg-blue-500 hover:bg-blue-600 text-white'>Next</Button>
        </form>
      </Card>
    </div>
  );
};

export default SignUp;
