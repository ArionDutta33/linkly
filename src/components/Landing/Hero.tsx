import { useTheme } from "../theme/theme-provider";
import lightImage from "../../assets/images/lightimage.png";
import darkImage from "../../assets/images/darkimage.png";
import LinklyInfo from "../Loader/InfoComponent";
const Hero = () => {
  const { theme } = useTheme();
  console.log(theme);
  return (
    <div className="  mt-12 gap-4 flex flex-col items-center">
      <div className="text-4xl font-bold leading-12  w-[40vw] text-center">
        Capture Every Link That Inspires, Informs, or{" "}
        <span className="bg-green-800 px-2">Matters to You.</span>
      </div>
      <p className="w-[40vw] text-center tracking-tight text-[gray] text-sm">
        The web is full of great content—but finding it again later? That’s the
        hard part. With just one click, you can save anything from anywhere.
        Your saved links stay safe, searchable, and beautifully organized—ready
        whenever you are.
      </p>
      <div className="my-6 w-[60vw] h-[60vh] overflow-hidden rounded-xl">
        <img
          className="w-full h-full"
          src={theme === "dark" ? lightImage : darkImage}
          alt=""
        />
      </div>
      <div>
        <LinklyInfo />
      </div>
    </div>
  );
};

export default Hero;
