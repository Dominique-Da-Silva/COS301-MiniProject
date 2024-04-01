import React, { useState } from "react";
import { Avatar, Button, Textarea, Tooltip } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from "@nextui-org/react";
import {
  GalleryIcon,
  GIFIcon,
  PollsIcon,
  ScheduleIcon,
  StickersIcon,
} from "@assets/index";

const CreateTweet = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(null || undefined);


  // const handleGalleryClick = (event: any) => {
  //   event.preventDefault();
  //   // Handle Gallery click
  //   console.log("Gallery clicked");
  // };

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    console.log(file);
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
        {selectedImage && (
          <div className="mt-4 mx-auto">
            <img src={URL.createObjectURL(selectedImage)} alt="Selected Image" className="max-w-full" />
          </div>
        )}
      </div>
      <div className="flex justify-between items-center mt-2 mx-12">
        <div className="flex">
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
            <Button isIconOnly onPress={onOpen} variant="light">{//onClick={handleGalleryClick}}
            }
              <img src={GalleryIcon} alt="Gallery" className="w-6 h-6" />
            </Button>
          </Tooltip>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose: any) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                  <ModalBody>
                    <p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Action
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
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
            <Button isIconOnly onClick={handleGIFClick} variant="light">
              <img src={GIFIcon} alt="GIF" className="w-6 h-5" />
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
            <Button isIconOnly onClick={handlePollsClick} variant="light">
              <img src={PollsIcon} alt="Polls" className="w-5 h-6" />
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
            <Button isIconOnly onClick={handleStickersClick} variant="light">
              <img src={StickersIcon} alt="Emoji" className="w-5 h-5" />
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
            <Button isIconOnly onClick={handleScheduleClick} variant="light">
              <img src={ScheduleIcon} alt="Schedule" className="w-5 h-5" />
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
