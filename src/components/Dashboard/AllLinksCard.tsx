import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Copy } from "lucide-react";
import { type LinkType } from "@/types";

import EditLink from "./EditLink";
import DeleteLink from "./DeleteLink";
import { toast } from "sonner";

type AllLinksCardProps = {
  item: LinkType;
  onDelete: (x: string) => Promise<void>;
  onUpdate: (updated: LinkType) => void;
};

const AllLinksCard: React.FC<AllLinksCardProps> = ({
  item,
  onDelete,
  onUpdate,
}) => {
  return (
    <Card className="w-full max-w-sm mx-auto h-80 sm:h-96 flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="leading-6 text-sm sm:text-base line-clamp-2">
          {item.link_title}
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm line-clamp-3">
          {item.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-end pb-3">
        <div className="border dark:bg-[#171717] p-2 px-3 gap-2 bg-[#d9d9d9] text-xs sm:text-sm flex items-center rounded-md">
          <Copy
            onClick={async () => {
              await navigator.clipboard.writeText(item.link);
              toast.success("Link copied");
            }}
            size={16}
            className="cursor-pointer hover:text-blue-600 transition-colors flex-shrink-0"
          />
          <div className="truncate select-all min-w-0 flex-1">{item.link}</div>
        </div>
      </CardContent>
      <CardFooter className="pt-3 gap-3 sm:gap-4">
        <EditLink item={item} onUpdate={onUpdate} />
        <DeleteLink itemId={item.id} onDelete={onDelete} />
      </CardFooter>
    </Card>
  );
};

export default AllLinksCard;
