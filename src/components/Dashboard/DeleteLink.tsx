import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

const DeleteLink = ({
  onDelete,
  itemId,
}: {
  onDelete: (x: string) => Promise<void>;
  itemId: number;
}) => {
  const [loading, setLoading] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  return (
    <AlertDialog open={isDeleteOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant={"destructive"}
          onClick={() => {
            setIsDeleteOpen(true);
          }}
          className="flex flex-1 cursor-pointer"
        >
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your link
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            onClick={() => {
              setIsDeleteOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            className=""
            onClick={() => {
              setLoading(true);
              onDelete(itemId.toString());
              setIsDeleteOpen(false);
              setLoading(false);
            }}
          >
            {loading ? "Deleting...." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteLink;
