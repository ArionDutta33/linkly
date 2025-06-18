import { api } from "@/lib/api";
import { useAuth } from "@/provider/AuthProvider";
import type { LinkType } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

const useGetAllLinks = () => {
  const [allLinks, setAllLinks] = useState<LinkType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { token } = useAuth();
  useEffect(() => {
    if (!token) return; // Wait until token is available
    const fetchAllLinks = async () => {
      setLoading(true);
      try {
        const response = await api.get("/api/v1/link", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setAllLinks(response.data);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error);
          setError(error.message ?? "Something went wrong");
        } else if (axios.isAxiosError(error)) {
          console.log(error);
          setError(error.message ?? "Something went wrong");
        } else {
          console.log(error);
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchAllLinks();
  }, [token]);
  return { allLinks, loading, error };
};

export default useGetAllLinks;
