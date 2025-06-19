import { useEffect, useState } from "react";
import { ListFilter } from "lucide-react";
import AllLinksCard from "./AllLinksCard";
import useGetAllLinks from "@/hooks/useGetAllLinks";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useAuth } from "@/provider/AuthProvider";
import type { LinkType } from "@/types";
import CustomLoader from "../Loader/CustomLoader";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const AllLinksListComponent = () => {
  const { allLinks, loading, error } = useGetAllLinks();
  const [links, setLinks] = useState<LinkType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (allLinks.length > 0) {
      setLinks(allLinks);
    }
  }, [allLinks]);

  const handleUpdate = (updatedLink: LinkType) => {
    setLinks((prev) =>
      prev.map((link) => (link.id === updatedLink.id ? updatedLink : link))
    );
  };

  const filteredLinks = links.filter((item) => {
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
      toast.error("Unable to delete the link");
      console.log(error);
    }
  };
  if (error)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center flex flex-col gap-8 text-red-500 text-sm sm:text-base px-4">
          Something went wrong. Please try again later.
          <Button
            onClick={() => {
              navigate("/");
            }}
          >
            Go to home
          </Button>
        </div>
      </div>
    );

  if (loading)
    return (
      <div className="fixed left-64 top-0 right-0 bottom-0 flex items-center justify-center z-50 overflow-hidden">
        <CustomLoader loading={loading} />
      </div>
    );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-medium">
          Search for links
        </h2>
        <div className="w-full sm:w-auto">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            className="w-full sm:w-64 md:w-80 outline-none text-sm p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Search all links..."
          />
        </div>
      </div>

      {/* Links Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 py-6">
        {filteredLinks.length > 0 ? (
          filteredLinks.map((item) => (
            <AllLinksCard
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              item={item}
              key={item.id}
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 px-6">
            <div className="text-gray-500 text-center">
              <ListFilter className="mx-auto mb-4 h-12 w-12 text-gray-400" />
              <p className="text-lg font-medium mb-2">No links found</p>
              <p className="text-sm text-gray-400">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "Add some links to get started"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllLinksListComponent;
