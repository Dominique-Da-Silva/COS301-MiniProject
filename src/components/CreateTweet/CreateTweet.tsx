import "./CreateTweet.css";

const CreateTweet = () => {
  return (
    <div className="tweet-input">
    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="User Avatar"></img>
    <input type="text" placeholder="What's happening?"></input>
    <button>Tweet</button>
  </div>
  );
};

export default CreateTweet;
