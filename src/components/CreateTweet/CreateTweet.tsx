import { Avatar, Button, Textarea, Tooltip } from "@nextui-org/react";
import { GrGallery } from "react-icons/gr";
import { MdOutlineGifBox } from "react-icons/md";
import { LiaPollHSolid } from "react-icons/lia";
import { FaRegFaceSmile } from "react-icons/fa6";
import { TbCalendarSearch } from "react-icons/tb";


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
    <div className="py-2 px-4">
      {/* Still need to figure out styling/alignmnet of Avatar and TextArea */}
      <div className="flex items-center space-x-1">
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
          className="p-2"
          style={{ width: "150px" }}
        />
      </div>
      <div className="flex justify-between items-center mt-2 mx-12 gap-1">
        <div className="flex gap-1">
          <Tooltip
            content="Media"
            placement="bottom"
            delay={500}
            motionProps={{
              variants: {
                exit: {
                  opacity: 0,
                  transition: {
                    duration: 0.1,
                    ease: "easeIn",
                  },
                },
                enter: {
                  opacity: 1,
                  transition: {
                    duration: 0.15,
                    ease: "easeOut",
                  },
                },
              },
            }}
          >
            <Button size='lg' isIconOnly onClick={handleGalleryClick} variant="light" className="text-cyan-400">
              <GrGallery/>
            </Button>
          </Tooltip>
          <Tooltip
            content="GIF"
            placement="bottom"
            delay={500}
            motionProps={{
              variants: {
                exit: {
                  opacity: 0,
                  transition: {
                    duration: 0.1,
                    ease: "easeIn",
                  },
                },
                enter: {
                  opacity: 1,
                  transition: {
                    duration: 0.15,
                    ease: "easeOut",
                  },
                },
              },
            }}
          >
            <Button size='lg' isIconOnly onClick={handleGIFClick} variant="light" className="text-cyan-400">
              <MdOutlineGifBox/>
            </Button>
          </Tooltip>
          <Tooltip
            content="Poll"
            placement="bottom"
            delay={500}
            motionProps={{
              variants: {
                exit: {
                  opacity: 0,
                  transition: {
                    duration: 0.1,
                    ease: "easeIn",
                  },
                },
                enter: {
                  opacity: 1,
                  transition: {
                    duration: 0.15,
                    ease: "easeOut",
                  },
                },
              },
            }}
          >
            <Button size='lg' isIconOnly onClick={handlePollsClick} variant="light" className="text-cyan-400">
              <LiaPollHSolid/>
            </Button>
          </Tooltip>
          <Tooltip
            content="Emoji"
            placement="bottom"
            delay={500}
            motionProps={{
              variants: {
                exit: {
                  opacity: 0,
                  transition: {
                    duration: 0.1,
                    ease: "easeIn",
                  },
                },
                enter: {
                  opacity: 1,
                  transition: {
                    duration: 0.15,
                    ease: "easeOut",
                  },
                },
              },
            }}
          >
            <Button size='lg' isIconOnly onClick={handleStickersClick} variant="light" className="text-cyan-400">
              <FaRegFaceSmile/>
            </Button>
          </Tooltip>
          <Tooltip
            content="Schedule"
            placement="bottom"
            delay={500}
            motionProps={{
              variants: {
                exit: {
                  opacity: 0,
                  transition: {
                    duration: 0.1,
                    ease: "easeIn",
                  },
                },
                enter: {
                  opacity: 1,
                  transition: {
                    duration: 0.15,
                    ease: "easeOut",
                  },
                },
              },
            }}
          >
            <Button size='lg' isIconOnly onClick={handleScheduleClick} variant="light" className="text-cyan-400">
              <TbCalendarSearch/>
            </Button>
          </Tooltip>
        </div>
        <div className="-mx-9">
          <Button
            radius="full"
            className="rounded-full bg-sky-500 text-white border-none font-bold"
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateTweet;
