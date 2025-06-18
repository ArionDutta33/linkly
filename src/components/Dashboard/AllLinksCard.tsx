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

type AllLinksCardProps = {
  item: LinkType;
  onDelete: (x: string) => Promise<void>;
};
const AllLinksCard: React.FC<AllLinksCardProps> = ({ item, onDelete }) => {
  return (
    <Card className="w-[20vw] max-h-[20vw] ">
      <CardHeader>
        <CardTitle>{item.link_title}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border dark:bg-[#171717] p-1 px-2 gap-2 bg-[#d9d9d9] text-sm flex items-center">
          <Copy
            onClick={async () => {
              await navigator.clipboard.writeText(item.link);
            }}
            size={18}
          />
          <div className="truncate select-all">{item.link}</div>
        </div>
      </CardContent>
      <CardFooter className=" gap-4">
        {/* EDIT */}
        <EditLink item={item} />

        <DeleteLink itemId={item.id} onDelete={onDelete} />
      </CardFooter>
    </Card>
  );
};

export default AllLinksCard;
