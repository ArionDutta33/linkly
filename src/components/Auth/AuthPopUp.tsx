import { AlertDialog, AlertDialogContent } from "../ui/alert-dialog";

import SignInComponent from "../Dashboard/SignInComponent";
import SignUpComponent from "../Dashboard/SignUpComponent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { X } from "lucide-react";

const AuthPopUp = ({
  showAuthPopUp,
  setShowAuthPopUp,
  currentTab,
  setCurrentTab,
}: {
  currentTab: string;
  showAuthPopUp: boolean;
  setShowAuthPopUp: (x: boolean) => void;
  setCurrentTab: (x: string) => void;
}) => {
  return (
    <AlertDialog open={showAuthPopUp}>
      <AlertDialogContent>
        <Tabs
          defaultValue={currentTab}
          value={currentTab}
          onValueChange={setCurrentTab}
          className=" "
        >
          <div className=" ">
            <X
              className="ml-auto  cursor-pointer"
              onClick={() => {
                setShowAuthPopUp(false);
              }}
              size={22}
            />
          </div>
          <TabsList className="w-full">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <SignInComponent
              setShowAuthPopUp={setShowAuthPopUp}
              setCurrentTab={setCurrentTab}
            />
          </TabsContent>
          <TabsContent value="signup">
            <SignUpComponent setCurrentTab={setCurrentTab} />
          </TabsContent>
        </Tabs>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AuthPopUp;
