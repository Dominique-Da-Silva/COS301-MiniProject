import {Avatar,Button, Textarea} from "@nextui-org/react";

const CreateTweet = () => {
  return (
    <div className="tweet-input m-0 items-center py-2 px-4 border-b flex min-h-50">
      <div className="self-start">
        <Avatar
              // src={imageUrl} // profile image url to be replaced
              alt="User Avatar"
              className="user-avatar min-w-12 min-h-12"
              // style={{ minWidth: '48px', minHeight: '48px' }}
            />
      </div>
      {/* decide what variant is better suited later on  */}
      <Textarea variant="underlined" placeholder="What is happening?!" className="flex-1 border-none outline-none text-base p-2 m-0"></Textarea>
      <div className="flex content-between flex-col self-end">
        <Button radius="full" className="rounded-full bg-sky-500 text-white border-none font-bold">
          Tweet
        </Button>
      </div>

    </div>
  );
};



export default CreateTweet;
