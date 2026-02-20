"use client";

import { useBank } from "@/hooks/useBank";
import SearchInput from "@/components/ui/SearchInput";
import BurguerMenuIconComponent from "@/components/icons/BurguerMenuIconComponent";
import NotificationIconComponent from "@/components/icons/NotificationIconComponent";

export default function Navbar() {
    const { user } = useBank();

    return (
        <header className="fixed top-0 left-72 right-0 h-20 bg-background border-b border-gray-100 flex items-center justify-between px-8 z-20">
            <button className="transition-opacity hover:opacity-80">
                <BurguerMenuIconComponent width={24} height={24} />
            </button>

            <div className="flex items-center gap-6">
                <button className="relative transition-opacity hover:opacity-80">
                    <NotificationIconComponent width={24} height={24} />
                </button>

                <SearchInput />

                <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 shadow-sm cursor-pointer opacity-100">
                        {user?.profile_photo ? (
                            <img
                                src={user.profile_photo}
                                alt={user.full_name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-500 font-bold">
                                {user?.full_name?.charAt(0) || "U"}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}