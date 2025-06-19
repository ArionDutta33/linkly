import { useState } from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "../theme/mode-toogle";
import { Button } from "../ui/button";

import { useAuth } from "@/provider/AuthProvider";
import AuthPopUp from "../Auth/AuthPopUp";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link2, LogOutIcon, Mail, Menu, User2, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";

const Navbar = () => {
  const [currentTab, setCurrentTab] = useState("signin");
  const { isAuthenticated, user, logout } = useAuth();
  const [showAuthPopUp, setShowAuthPopUp] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex justify-between items-center p-4 px-6 md:px-12 border-b border-gray-200 dark:border-gray-700  text-gray-800 dark:text-white">
      {/* Logo */}
      <Link to={"/"} className="text-2xl font-bold">
        linkly.io
      </Link>

      {/* Mobile menu toggle */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="focus:outline-none"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-12 text-sm font-medium">
        <Link className="hover:border-b-2 hover:border-green-500" to={"/"}>
          Home
        </Link>
        <Link
          className="hover:border-b-2 hover:border-green-500"
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
        <Link className="hover:border-b-2 hover:border-green-500" to={"/"}>
          About
        </Link>
      </div>

      {/* Desktop Auth Controls */}
      <div className="hidden md:flex items-center space-x-6">
        <ModeToggle />
        {isAuthenticated ? (
          <>
            <Popover>
              <PopoverTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="bg-white dark:bg-[#09090b] text-gray-800 dark:text-white shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-4">
                  <User2 size={20} />
                  <div className="text-sm">{user?.username}</div>
                </div>
                <Separator className="my-2" />
                <div className="flex items-center space-x-4">
                  <Mail size={20} />
                  <div className="text-sm">{user?.email}</div>
                </div>
                <Separator className="my-2" />
                <div className="flex items-center space-x-4">
                  <Link2 size={20} />
                  <Link
                    to={"/dashboard/home"}
                    className="text-sm hover:underline"
                  >
                    Dashboard
                  </Link>
                </div>
              </PopoverContent>
            </Popover>
            <Button className="cursor-pointer" onClick={logout}>
              <LogOutIcon className="mr-2" />
              Logout
            </Button>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-black border-t border-gray-200 dark:border-gray-700 z-50 flex flex-col gap-4 p-4 md:hidden text-gray-800 dark:text-white">
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          <Link
            to="/dashboard/home"
            onClick={(e) => {
              if (!isAuthenticated) {
                e.preventDefault();
                setShowAuthPopUp(true);
              }
              setMobileMenuOpen(false);
            }}
          >
            Dashboard
          </Link>
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>
            About
          </Link>

          <ModeToggle />

          {isAuthenticated ? (
            <>
              <div className="flex flex-col gap-1 text-sm">
                <span>{user?.username}</span>
                <span>{user?.email}</span>
              </div>
              <Button onClick={logout} className="mt-2">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  setCurrentTab("signin");
                  setShowAuthPopUp(true);
                  setMobileMenuOpen(false);
                }}
              >
                Sign In
              </Button>
              <Button
                onClick={() => {
                  setCurrentTab("signup");
                  setShowAuthPopUp(true);
                  setMobileMenuOpen(false);
                }}
                variant="secondary"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      )}

      {/* Auth Modal */}
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
