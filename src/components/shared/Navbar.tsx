import { useState } from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "../theme/mode-toogle";
import { Button } from "../ui/button";

import { useAuth } from "@/provider/AuthProvider";
import AuthPopUp from "../Auth/AuthPopUp";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link2, LogOutIcon, Mail, User2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";

const Navbar = () => {
  const [currentTab, setCurrentTab] = useState("signin");
  const { isAuthenticated, user, logout } = useAuth(); //is this the right place
  const [showAuthPopUp, setShowAuthPopUp] = useState(false);

  return (
    <div className="flex justify-between p-4 px-12">
      <Link to={"/"} className="text-2xl font-bold">
        linkly.io
      </Link>
      <div className="text-sm space-x-18 font-medium ">
        <Link
          className="transition-all delay-75 hover:border-b-2 hover:border-green-500 "
          to={"/"}
        >
          Home
        </Link>
        <Link
          className="transition-all delay-75 hover:border-b-2 hover:border-green-500 "
          to={"/dashboard/home"}
          onClick={(e) => {
            if (!isAuthenticated) {
              e.preventDefault();
              setShowAuthPopUp(true);
            }
          }}
        >
          Dashboard
        </Link>

        <Link
          className="transition-all delay-75 hover:border-b-2 hover:border-green-500 "
          to={"/"}
        >
          About
        </Link>
      </div>
      {isAuthenticated ? (
        <div className=" flex space-x-7 ">
          <ModeToggle />

          <Popover>
            <PopoverTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="">
              <div className="flex items-center space-x-4">
                <User2 size={20} />
                <div className="text-white text-sm">{user?.username}</div>
              </div>
              <Separator className="my-2" />
              <div className="flex items-center space-x-4">
                <Mail size={20} />
                <div className="text-white text-sm">{user?.email}</div>
              </div>
              <Separator className="my-2" />
              <div className="flex items-center space-x-4">
                <Link2 size={20} />
                <Link to={"/dashboard/home"} className="text-white text-sm">
                  Dashboard
                </Link>
              </div>
            </PopoverContent>
          </Popover>
          <Button className="cursor-pointer" onClick={logout}>
            <LogOutIcon />
            <div>Logout</div>
          </Button>
        </div>
      ) : (
        <>
          <div className="flex items-center  gap-12">
            <ModeToggle />
            <div className="flex gap-4">
              <Button
                className="cursor-pointer"
                onClick={() => {
                  setCurrentTab("signin");
                  setShowAuthPopUp(true);
                }}
              >
                Sign In
              </Button>
              <Button
                onClick={() => {
                  setCurrentTab("signup");
                  setShowAuthPopUp(true);
                }}
                variant={"secondary"}
                className="cursor-pointer"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </>
      )}
      <AuthPopUp
        showAuthPopUp={showAuthPopUp}
        setShowAuthPopUp={setShowAuthPopUp}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
    </div>
  );
};

export default Navbar;
