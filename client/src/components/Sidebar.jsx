import { Protect, useClerk, useUser } from "@clerk/clerk-react";
import {
  Eraser,
  FileText,
  Hash,
  House,
  Image,
  LogOut,
  Scissors,
  SquarePen,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/ai", label: "Dashboard", Icon: House },
  { to: "/ai/write-article", label: "Write Article", Icon: SquarePen },
  { to: "/ai/blog-titles", label: "Blog Titles", Icon: Hash },
  { to: "/ai/generate-images", label: "Generate Images", Icon: Image },
  { to: "/ai/remove-background", label: "Remove Background", Icon: Eraser },
  { to: "/ai/remove-object", label: "Remove Object", Icon: Scissors },
  { to: "/ai/review-resume", label: "Review Resume", Icon: FileText },
  { to: "/ai/community", label: "Community", Icon: Users },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
   <div
  className={`w-60 border-r bg-gray-800 border-slate-300 flex flex-col z-40 justify-between items-center max-sm:absolute top-[53px] min-h-full overflow-y-auto  ${sidebar ? "translate-x-0" : "max-sm:-translate-x-full"} transition-all duration-300 ease-in-out`}
>

      <div className="my-7 w-full">
        <img
          src={user?.imageUrl || "/default-avatar.png"}
          alt="User avatar"
          className="w-12 rounded-full mx-auto"
        />
        <h1 className="mt-1 text-center text-secondary mb-3">
          {user?.fullName}
        </h1>
        <div className="px-4">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/ai"}
              onClick={() => setSidebar(!sidebar)}
              className={({ isActive }) =>
                `px-3.5 py-2.5 flex items-center gap-3 rounded-lg transition-all duration-300
     ${
       isActive
         ? "bg-white/20 backdrop-blur-md border border-white/30 shadow-lg"
         : "hover:bg-white/10"
     }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? "text-white" : "text-secondary"
                    }`}
                  />
                  <span
                    className={
                      isActive ? "text-white font-medium" : "text-secondary"
                    }
                  >
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="w-full border-t border-slate-300 p-4 px-7 flex items-center justify-between">
        <div
          onClick={openUserProfile}
          className="flex gap-2 items-center cursor-pointer"
        >
          <img src={user.imageUrl} alt="" className="w-8 rounded-full " />
          <div>
            <h1 className="text-sm font-medium text-secondary">
              {user.fullName}
            </h1>
            <p className="text-xs text-secondary">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>
              Plan
            </p>
          </div>
        </div>

        <LogOut
          onClick={signOut}
          className="w-4.5 text-secondary hover:text-gray-400 transition cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Sidebar;
