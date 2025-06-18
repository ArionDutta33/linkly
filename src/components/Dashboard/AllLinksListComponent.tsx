import { useEffect, useState } from "react";

import { ListFilter } from "lucide-react";
import AllLinksCard from "./AllLinksCard";

import useGetAllLinks from "@/hooks/useGetAllLinks";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useAuth } from "@/provider/AuthProvider";
import type { LinkType } from "@/types";
const AllLinksListComponent = () => {
  const { allLinks, loading, error } = useGetAllLinks();
  const [links, setLinks] = useState<LinkType[]>([]);
  useEffect(() => {
    if (allLinks.length > 0) {
      setLinks(allLinks);
    }
  }, [allLinks]);
  const [searchTerm, setSeearchTerm] = useState("");
  const fileteredLinks = links.filter((item) => {
    const link = item.link
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());
    const link_title = item.link_title
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());
    const description = item.description
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());
    return link || link_title || description;
  });
  const { token } = useAuth();
  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/api/v1/link/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setLinks((prev) => prev.filter((item) => item.id !== parseInt(id)));
      toast.success("Link deleted");
    } catch (error) {
      //change this
      toast.error("Unable to delete the link");
      console.log(error);
    }
  };

  if (error) return <div>{error}</div>;
  if (loading) return <div>loading.....</div>;
  return (
    <>
      <div className=" ">
        <div className="flex items-center justify-between  py-2 px-2  ">
          <div className="text-base font-medium">Search for links</div>

          <input
            value={searchTerm}
            onChange={(e) => setSeearchTerm(e.target.value)}
            type="text"
            className="outline-none w-[40vw] ml-auto mr-10 text-sm p-2 border rounded-sm"
            placeholder="Search all"
          />

          <ListFilter size={22} />
        </div>
        {/* here; */}
        <div className="grid my-6 grid-cols-4 gap-4">
          {fileteredLinks.length > 0 ? (
            fileteredLinks.map((item) => (
              <AllLinksCard onDelete={handleDelete} item={item} key={item.id} />
            ))
          ) : (
            <>
              <div className="col-span-4 flex justify-center items-center   rounded-md p-6 text-gray-500 text-lg">
                No links found
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AllLinksListComponent;
