import { Avatar, Button, Textarea, Tooltip} from "@nextui-org/react";
import { GalleryIcon, GIFIcon, PollsIcon, ScheduleIcon, StickersIcon } from '@assets/index';

const CreateTweet = () => {

  const handleGalleryClick = (event: any) => {
    event.preventDefault();
    // Handle Gallery click
  };
  
  const handleGIFClick = (event: any) => {
    event.preventDefault();
    // Handle GIF click
  };
  
  const handlePollsClick = (event: any) => {
    event.preventDefault();
    // Handle Polls click
  };
  
  const handleStickersClick = (event: any) => {
    event.preventDefault();
    // Handle Stickers click
  };
  
  const handleScheduleClick = (event: any) => {
    event.preventDefault();
    // Handle Schedule click
  };
  

  return (
    <div className="py-2 px-4 min-h-50 flex-col">
      {/* Still need to figure out styling/alignmnet of Avatar and TextArea */}
      <div className="items-start">
        <Avatar
          // src={imageUrl} // profile image url to be replaced
          alt="User Avatar"
          className="user-avatar min-w-12 min-h-12"
          // style={{ minWidth: '48px', minHeight: '48px' }}
        />
        {/* decide what variant is better suited later on  */}
        <Textarea 
          variant="underlined"
          placeholder="What is happening?!"
          className="flex-1 border-none outline-none text-base p-2 m-0 ml-2"
        />
      </div>
      <div className="flex mt-2 gap-1">
        <Tooltip content="Media" placement="bottom">
          <Button isIconOnly onClick={handleGalleryClick} variant="light">
            <img src={GalleryIcon} alt="Gallery" className="w-8 h-8" />
          </Button>
        </Tooltip>
        <Tooltip content="GIF" placement="bottom">
          <Button isIconOnly onClick={handleGIFClick} variant="light">
            <img src={GIFIcon} alt="GIF" className="w-8 h-7" />
          </Button>
        </Tooltip>
        <Tooltip content="Poll" placement="bottom">
          <Button isIconOnly onClick={handlePollsClick} variant="light">
            <img src={PollsIcon} alt="Polls" className="w-7 h-7" />
          </Button>
        </Tooltip>
        <Tooltip content="Emoji" placement="bottom">
          <Button isIconOnly onClick={handleStickersClick} variant="light">
            <img src={StickersIcon} alt="Emoji" className="w-7 h-7" />
          </Button>
        </Tooltip>
        <Tooltip content="Schedule" placement="bottom">
          <Button isIconOnly onClick={handleScheduleClick} variant="light">
            <img src={ScheduleIcon} alt="Schedule" className="w-6 h-6" />
          </Button>
        </Tooltip>
      </div>
      <div className="flex justify-end mt-2">
        <Button
          radius="full"
          className="rounded-full bg-sky-500 text-white border-none font-bold"
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default CreateTweet;
