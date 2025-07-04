import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { useAuth } from "@/provider/AuthProvider";
import { toast } from "sonner";
type Inputs = {
  username: string;
  password: string;
  email: string;
};

export default function SignUpComponent({
  setCurrentTab,
}: {
  setCurrentTab: (x: string) => void;
}) {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange",
  });
  const { loading, registeruser } = useAuth();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await registeruser(data.username, data.email, data.password);
      toast.success("Registration successfull. Kindly Login");
      setCurrentTab("signin");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <>
      <div className=" ">
        <form
          className="border border-[gray] p-10 rounded-xl "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-2">
            <Label>Username</Label>
            <Input
              className={
                errors.username
                  ? "border border-red-500"
                  : `border border-[#cccbcb]`
              }
              {...register("username", {
                maxLength: {
                  value: 40,
                  message: "Maximum 40 characters are allowed",
                },
                required: "User name is required",
              })}
            />
            {errors.username && (
              <div className="text-red-500 text-sm">
                {errors.username.message}
              </div>
            )}
          </div>
          <div className=" mt-4 space-y-2">
            <Label>Email</Label>
            <Input
              className={
                errors.username
                  ? "border border-red-500"
                  : `border border-[#cccbcb]`
              }
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <div className="text-red-500 text-sm">{errors.email.message}</div>
            )}
          </div>

          <div className="mt-4 space-y-2">
            <Label>Password </Label>
            <Input
              className={
                errors.password
                  ? "border border-red-500"
                  : `border border-[#cccbcb]`
              }
              type="password"
              autoCapitalize="false"
              autoCorrect="false"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message:
                    "Minimum length of the password must be 8 characters",
                },
              })}
            />
            {errors.password && (
              <div className="text-red-500 text-sm ">
                {errors.password.message}
              </div>
            )}
          </div>

          <Button disabled={loading} type="submit" className="my-4 w-full">
            {loading ? "Submitting" : "Submit"}
          </Button>
          <div className="text-xs text-center  ">
            Already have an account?
            <button
              type="button"
              className="text-blue-700 mx-1 cursor-pointer"
              onClick={() => {
                setCurrentTab("signin");
              }}
            >
              Sign In
            </button>
          </div>
          <div className="text-[gray] mt-1 text-xs text-center">
            Quick Sign Up to get started!
          </div>
        </form>
      </div>
    </>
  );
}
