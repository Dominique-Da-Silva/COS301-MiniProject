// mockData.ts
export const mockTweets = [
  {
    Tweet_Id: 1,
    User_Id: 1,
    Content:
      "Just landed in New York City for the weekend! Can not wait to explore the city. 🗽🌃",
    Img_Url:
      "https://people.com/thmb/2nqvmza52nj3JBwkZveNGIL9Erc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(689x399:691x401)/lebron-james-7f070c722a1143e295b46f67ff0005dc.jpg",
    Created_at: "2023-04-14T18:30:00.000Z",
  },
  {
    Tweet_Id: 2,
    User_Id: 2,
    Content: "Watching the game tonight! Who is your team? 🏀",
    Img_Url:
      "https://www.usmagazine.com/wp-content/uploads/2021/06/Joshua-Bassett-male-celebrities-proud-feminists.jpg?quality=40&strip=all",
    Created_at: "2023-04-14T20:15:00.000Z",
  },
  {
    Tweet_Id: 3,
    User_Id: 3,
    Content:
      "Tried the new vegan restaurant downtown, and it was amazing! Highly recommend their lentil burgers. 🌱🍔",
    Img_Url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4wONGRXJUYYK6Pg-Kgvb87Ml5eaEmX6Je0IdKZHDTAg&s",
    Created_at: "2023-04-13T14:20:00.000Z",
  },
  {
    Tweet_Id: 4,
    User_Id: 4,
    Content:
      'Just finished reading "The Great Gatsby" for the third time. Timeless classic! 📚',
    Img_Url:
      "https://static.toiimg.com/photo/msid-101699570,width-96,height-65.cms",
    Created_at: "2023-04-12T22:45:00.000Z",
  },
  {
    Tweet_Id: 5,
    User_Id: 5,
    Content: "Working on a new coding project this weekend. Wish me luck! 💻🤞",
    Img_Url: null,
    Created_at: "2023-04-15T10:00:00.000Z",
  },
  {
    Tweet_Id: 6,
    User_Id: 6,
    Content:
      "Spent the day hiking in the mountains. Nature is so beautiful! 🌲⛰️",
    Img_Url: "https://example.com/mountain-trail.jpg",
    Created_at: "2023-04-15T16:30:00.000Z",
  },
  {
    Tweet_Id: 7,
    User_Id: 7,
    Content: "Just adopted the cutest puppy! Say hello to Buddy. 🐶❤️",
    Img_Url: "https://example.com/puppy.jpg",
    Created_at: "2023-04-14T12:00:00.000Z",
  },
  {
    Tweet_Id: 8,
    User_Id: 8,
    Content:
      "Can not believe it is already Monday again. Someone bring me coffee, please! ☕️",
    Img_Url:
      "https://api.time.com/wp-content/uploads/2019/08/better-smartphone-photos.jpg",
    Created_at: "2023-04-17T08:15:00.000Z",
  },
  {
    Tweet_Id: 9,
    User_Id: 9,
    Content:
      "Just booked my summer vacation! Who is ready for some beach time? 🏖️🌴",
    Img_Url:
      "https://static.toiimg.com/photo/msid-101699570,width-96,height-65.cms",
    Created_at: "2023-04-16T19:30:00.000Z",
  },
  {
    Tweet_Id: 10,
    User_Id: 10,
    Content:
      "Trying out a new recipe for dinner tonight. Fingers crossed it turns out well! 👩‍🍳",
    Img_Url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4wONGRXJUYYK6Pg-Kgvb87Ml5eaEmX6Je0IdKZHDTAg&s",
    Created_at: "2023-04-15T17:00:00.000Z",
  },
];

export const mockUsers = [
  {
    User_Id: 1,
    Name: "John Doe",
    Username: "johndoe",
  },
  {
    User_Id: 2,
    Name: "Jane Smith",
    Username: "janesmith",
  },
  {
    User_Id: 3,
    Name: "Bob Johnson",
    Username: "bobjohnson",
  },
  {
    User_Id: 4,
    Name: "Samantha Lee",
    Username: "samanthalee",
  },
  {
    User_Id: 5,
    Name: "Michael Brown",
    Username: "michaelbrown",
  },
  {
    User_Id: 6,
    Name: "Emily Davis",
    Username: "emilydavis",
  },
  {
    User_Id: 7,
    Name: "David Wilson",
    Username: "davidwilson",
  },
  {
    User_Id: 8,
    Name: "Sarah Thompson",
    Username: "sarahthompson",
  },
  {
    User_Id: 9,
    Name: "Christopher Taylor",
    Username: "christophertaylor",
  },
  {
    User_Id: 10,
    Name: "Ashley Anderson",
    Username: "ashleyanderson",
  },
];

export const mockUserProfile = {
  User_Id: 1,
  Name: "John Doe",
  Username: "johndoe",
  auth_id: "123456789",
  Created_at: "2022-01-01T00:00:00.000Z",
  followers: 2500,
  following: 1000,
};

export const mockProfileDetails = {
  Profile_Id: 1,
  User_Id: 1,
  Bio: "Software engineer with a passion for coding and problem-solving.",
  Img_Url:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShB7IwN9gr4q2Tn-1CRfbgANRN-8SWlYMMy9iq467T1A&s",
  Banner_Url:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS24nExiTCWQf_6D5XTuIMx3l_TyKWR4LUOh-fQzSQifg&s",
  Profile_Type: "Personal",
  Theme: false,
  Location: "San Francisco, CA",
  Website: "https://johndoe.com",
};

export const mockSavesCount = {
  1: 10,
  2: 5,
  3: 20,
  4: 55,
  5: 55,
  6: 6000,
  7: 55,
  8: 55,
  9: 55,
  10: 55,
};

export const mockCommentsCount = {
  1: 3,
  2: 8,
  3: 2,
  4: 55,
  5: 55,
  6: 55,
  7: 8000,
  8: 55,
  9: 55,
  10: 55,
};

export const mockRetweetsCount = {
  1: 15,
  2: 2,
  3: 8,
  4: 55,
  5: 55,
  6: 55,
  7: 7566,
  8: 55,
  9: 55,
  10: 55,
};

export const mockLikesCount = {
  1: 25,
  2: 12,
  3: 18,
  4: 55,
  5: 55,
  6: 7099,
  7: 55,
  8: 55,
  9: 55,
  10: 55,
};

export const mockTopics = [
  {
    name: "Man City Wins the Premier League",
    description: "Manchester City clinches the Premier League title with a win over Chelsea.",
    timePosted: "2023-04-15T12:00:00.000Z",
    avatarUrl: 'https://people.com/thmb/2nqvmza52nj3JBwkZveNGIL9Erc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(689x399:691x401)/lebron-james-7f070c722a1143e295b46f67ff0005dc.jpg',
  },
  {
    name: "Man City Wins the Premier League",
    description: "Manchester City clinches the Premier League title with a win over Chelsea.",
    timePosted: "2023-04-15T12:00:00.000Z",
    avatarUrl: 'https://people.com/thmb/2nqvmza52nj3JBwkZveNGIL9Erc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(689x399:691x401)/lebron-james-7f070c722a1143e295b46f67ff0005dc.jpg',
  },
  {
    name: "Man City Wins the Premier League",
    description: "Manchester City clinches the Premier League title with a win over Chelsea.",
    timePosted: "2023-04-15T12:00:00.000Z",
    avatarUrl: 'https://people.com/thmb/2nqvmza52nj3JBwkZveNGIL9Erc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(689x399:691x401)/lebron-james-7f070c722a1143e295b46f67ff0005dc.jpg',
  }
];

export const mockFollowSuggestions = [
  {
    user_id: "1",
    name: "PlayStation",
    username: "Playstation",
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/PlayStation_App_Icon.jpg/800px-PlayStation_App_Icon.jpg',
  },
  {
    user_id: "2",
    name: "Man City",
    username: "ManchesterCity",
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png',
  },
  {
    user_id: "3",
    name: "Elon",
    username: "ElonMusk",
    avatarUrl: 'https://play-lh.googleusercontent.com/A-Rnrh0J7iKmABskTonqFAANRLGTGUg_nuE4PEMYwJavL3nPt5uWsU2WO_DSgV_mOOM',
  }
];