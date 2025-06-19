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
import axios from "axios";
type Inputs = {
  link: string;
  link_title: string;
  description: string;
};

export default function Create() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();
  const { token } = useAuth();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    try {
      await api.post("/api/v1/link", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Link added");
      navigation("/dashboard/home");
    } catch (error) {
      let errorMsg = "Something went wrong";
      if (axios.isAxiosError(error)) {
        errorMsg = error.response?.data?.details || "Something went wrong";
      } else if (error instanceof Error) {
        errorMsg = error.message || "Something went wrong";
      }
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="  flex items-center justify-center">
        <div className="w-[40vw] mt-22">
          <form
            className="border border-[gray] p-10 rounded-xl "
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-4">
              <Label>Link title</Label>
              <Input
                {...register("link_title", { max: 100, required: true })}
              />
              {errors.link_title && (
                <div className="text-red-500">This is a required field</div>
              )}
            </div>

            <div className="my-4 space-y-4">
              <Label>Paste the link </Label>
              <Input {...register("link", { required: true })} />
              {errors.link && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="space-y-4">
              <Label>Give a short description </Label>
              <Textarea {...register("description", { maxLength: 150 })} />
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
