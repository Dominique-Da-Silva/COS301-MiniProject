import { render  } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Home from './HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


//===============MOCK FOR fetch USers=====================================================
const fetchUsers = async () => {
  return [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }];
};

const fetchUsersWithError = async () => {
  throw new Error('Failed to fetch users');
};

let users: any[] = [];
const setUsers = (data: any[]) => {
  users = data;
};

const fetchData = async () => {
  try {
    const usersData = await fetchUsers();
    setUsers(usersData as any[]);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

const fetchData2 = async () => {
  try {
    const usersData = await fetchUsersWithError();
    setUsers(usersData as any[]);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

//=========================MOCK for fetch tweets==============================================================
const mockFetchTweets = async () => {
  return [{ id: 1, text: 'Tweet 1' }, { id: 2, text: 'Tweet 2' }];
};
const mockFetchTweetsError = async () => {
  throw new Error('Failed to fetch tweets');
};

let tweets: any[] = [];
const setTweets = (data: any[]) => {
  tweets = data;
};

const fetchTweetData = async () => {
  try {
    const tweetData = await mockFetchTweets(); 
    setTweets(tweetData as any[]);
  } catch (error) {
    console.error('Error fetching tweets:', error);
  }
};

const fetchTweetData2 = async () => {
  try {
    const tweetData = await mockFetchTweetsError(); 
    setTweets(tweetData as any[]);
  } catch (error) {
    console.error('Error fetching tweets:', error);
  }
};
describe('HomePage component', () => {
  test("renders without crashing", () => {
    render(
      <Router>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
      </Router>);
  })

  test('fetchData updates users data correctly', async () => {
    await fetchData();
    expect(users).toEqual([{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }]);
  });

  test('fetchData handles error correctly', async () => {
    users = []
    await fetchData2();
    expect(users).toEqual([]);
  });

  test('fetchTweets updates users data correctly', async () => {
    await fetchTweetData();
    expect(tweets).toEqual([{ id: 1, text: 'Tweet 1' }, { id: 2, text: 'Tweet 2' }]);
  });

  test('fetchTweets handles error correctly', async () => {
    tweets = []
    await fetchTweetData2();
    expect(tweets).toEqual([]);
  });

});