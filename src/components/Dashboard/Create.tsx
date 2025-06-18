import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
type Inputs = {
  link: string;
  link_title: string;
  description: string;
};

export default function Create() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();
  const { token } = useAuth();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    try {
      const response = await api.post("/api/v1/link", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Link added");
      navigation("/dashboard/home");
      console.log(response.data);
      console.log("response->", response);
    } catch (error) {
      //change this
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(watch("link")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <>
      <div className="  flex items-center justify-center">
        <div className="w-[40vw] mt-22">
          <form
            className="border border-[gray] p-10 rounded-xl "
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-4">
              <Label>Link title</Label>
              {/* register your input into the hook by invoking the "register" function */}
              <Input {...register("link_title", { required: true })} />
              {errors.link_title && (
                <div className="text-red-500">This is a required field</div>
              )}
            </div>

            {/* include validation with required or other standard HTML validation rules */}
            <div className="my-4 space-y-4">
              <Label>Paste the link </Label>
              <Input {...register("link", { required: true })} />
              {/* errors will return when field validation fails  */}
              {errors.link && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="space-y-4">
              <Label>Give a short description </Label>
              <Textarea {...register("description", { maxLength: 100 })} />
              {/* errors will return when field validation fails  */}
              {errors.description && (
                <span className="text-red-500">Character limit exceeded</span>
              )}
            </div>

            <Button disabled={loading} className="my-4">
              {loading ? "Submitting" : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
