import Link from "next/link";
import { BiMoon } from "react-icons/bi";
import { IoSunny } from "react-icons/io5";

function Header({
  toggleMode,
  darkMode,
}: {
  toggleMode: () => void;
  darkMode: boolean;
}) {
  return (
    <div className='bg-white dark:bg-gray-700 dark:text-white dark:shadow-lg px-10 h-[70px] flex items-center justify-between shadow-lg'>
      <Link href='/' className='font-bold text-2xl'>
        Where in the world?
      </Link>
      <div
        className='flex items-center gap-1 cursor-pointer'
        onClick={toggleMode}>
        {darkMode ? <BiMoon /> : <IoSunny />}
        <p> {darkMode ? "Dark" : "Light"} Mode</p>
      </div>
    </div>
  );
}

export default Header;
