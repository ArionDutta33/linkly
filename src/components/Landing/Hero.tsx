import { useTheme } from "../theme/theme-provider";
import lightImage from "../../assets/images/lightimage.png";
import darkImage from "../../assets/images/darkimage.png";
import LinklyInfo from "../Loader/InfoComponent";

const Hero = () => {
  const { theme } = useTheme();

  return (
    <section className="mt-12 px-4 sm:px-6 lg:px-12 flex flex-col items-center gap-6 text-center">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-2xl md:max-w-3xl lg:max-w-4xl">
        Capture Every Link That Inspires, Informs, or{" "}
        <span className="bg-green-700 dark:bg-green-800 px-2 rounded text-white">
          Matters to You.
        </span>
      </h1>

      {/* Description */}
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-md sm:max-w-lg md:max-w-2xl tracking-tight">
        The web is full of great content—but finding it again later? That’s the
        hard part. With just one click, you can save anything from anywhere.
        Your saved links stay safe, searchable, and beautifully organized—ready
        whenever you are.
      </p>

      {/* Hero Image */}
      <div className="my-6 w-full max-w-5xl overflow-hidden rounded-xl shadow-lg">
        <img
          src={theme === "dark" ? lightImage : darkImage}
          alt="Linkly Illustration"
          className="w-full h-auto"
        />
      </div>

      {/* Additional Info Section */}
      <div className="w-full">
        <LinklyInfo />
      </div>
    </section>
  );
};

export default Hero;
