
import { ArrowRight } from "lucide-react";
import {useClerk,UserButton,useUser} from '@clerk/clerk-react'
import Logo from "./Logo";


const Navbar = () => {
  const {user} =useUser()
  const {openSignIn} = useClerk()
  return (
    <div className="fixed w-full z-40 flex justify-between items-center py-3 px-2 md:px-4 sm:px-20 xl:px-20">
        <Logo/>

      {
        user?(
           <div className="flex gap-5 justify-center items-center">
            
             <p className=" text-gray-300 text-lg max-sm:hidden">
                  Hi, {user?.fullName}
              </p>
             <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-9 h-9",
                },
              }}
            />
             
           
           </div>
        ):(
         <button onClick={openSignIn} className="group relative flex  items-center justify-center gap-2 md:gap-3 overflow-hidden rounded-full bg-primary px-3 py-1 md:px-7 md:py-2 font-xs text-sm md:text-md text-neutral-200">
         Get Started <ArrowRight className="h-5 w-5 "/>
        <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
          <div className="relative h-full w-8 bg-white/20"></div>
        </div>
      </button>
        )
      }

    </div>
  );
};

export default Navbar;
