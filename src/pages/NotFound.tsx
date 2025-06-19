import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-red-500 mb-2">404</h1>
      <p className="text-lg text-gray-600 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Button onClick={() => navigate("/")}>Go to Home</Button>
    </div>
  );
};

export default NotFound;
