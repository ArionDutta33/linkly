import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import type { LinkType } from "@/types";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "@/lib/api";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/provider/AuthProvider";
type EditLinkProps = {
  item: LinkType;
  onUpdate: (updated: LinkType) => void;
};
type Inputs = {
  link: string;
  link_title: string;
  description: string;
};
const EditLink: React.FC<EditLinkProps> = ({ item, onUpdate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    try {
      const response = await api.put(`/api/v1/link/${item.id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Shape of response->", response.data);

      onUpdate(response.data);
      toast.success("Link edited");
      setIsEditOpen(false);
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

  const [isEditOpen, setIsEditOpen] = useState(false);
  return (
    <AlertDialog open={isEditOpen}>
      <AlertDialogTrigger asChild>
        <Button
          onClick={() => {
            setIsEditOpen(true);
          }}
          className="flex flex-1"
        >
          Edit
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className=" ">
        <AlertDialogTitle>Edit your links easily</AlertDialogTitle>

        <div className=" w-full border flex items-center justify-center">
          <div className=" w-full">
            <form
              className="border border-[gray] p-10 rounded-xl "
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="space-y-4">
                <Label>Link title</Label>
                <Input
                  defaultValue={item.link_title}
                  {...register("link_title", { required: true })}
                />
                {errors.link_title && (
                  <div className="text-red-500">This is a required field</div>
                )}
              </div>

              <div className="my-4 space-y-4">
                <Label>Paste the link </Label>
                <Input
                  defaultValue={item.link}
                  {...register("link", { required: true })}
                />
                {errors.link && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="space-y-4">
                <Label>Give a short description </Label>
                <Textarea
                  defaultValue={item.description}
                  {...register("description", { maxLength: 100 })}
                />
                {errors.description && (
                  <span className="text-red-500">Character limit exceeded</span>
                )}
              </div>

              <div className="space-x-5">
                <Button disabled={loading} className="my-4">
                  {loading ? "Editing..." : "Edit"}
                </Button>
                <Button
                  type="button"
                  variant={"destructive"}
                  onClick={() => {
                    setIsEditOpen(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditLink;
