import {Avatar} from "@nextui-org/react";
import {Button} from "@nextui-org/react";


const CreateTweet = () => {
  return (
    <div className="tweet-input m-0 items-center py-2 px-4 border-b flex">
      <Avatar
          // src={imageUrl} // profile image url to be replaced
          alt="User Avatar"
          className="user-avatar min-w-12 min-h-12"
          // style={{ minWidth: '48px', minHeight: '48px' }}
        />
      <input type="text" placeholder="What is happening?!" className="flex-1 w-1 border-none outline-none text-base p-2 m-0"></input>
      <Button radius="full" className="rounded-full bg-sky-500 text-white border-none font-bold">
        Post
      </Button>
    </div>
  );
};

export default CreateTweet;
