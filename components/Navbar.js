"use client"
import { toast } from "react-toastify";

const Navbar = () => {
  return (
    <nav className="text-black">
      <div className="md:mycontainer py-5 px-4 sm:px-16 flex items-center  justify-between ">
        <a className="logo font-bold text-2xl" href="/">
          SnipUrl
        </a>
        <div className="flex gap-4">
            <button onClick={() => toast("Feature yet to be implement.",{
              type: "error"
              
            })} className="font-semibold hover:text-gray-600">Login</button>
            <button onClick={() => toast("Feature yet to be implement.")}  className="bg-primary hover:bg-green-700 text-white  px-6 py-2 rounded-full">
                Get Started </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
