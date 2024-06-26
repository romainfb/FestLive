'use client'
import Link from "next/link";
import {Input} from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import SearchIcon from '@/components/icons/SearchIcon'
import UserIcon from '@/components/icons/UserIcon'
import LogOutIcon from '@/components/icons/LogOutIcon'
import SettingsIcon from '@/components/icons/SettingsIcon'

export function Header() {
    return (
        <header
            className="sticky top-0 z-10 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 px-4 md:px-6 h-16 flex items-center">
            <Link href="#" className="flex items-center justify-center" prefetch={false}>
                <MountainIcon className="h-6 w-6"/>
                <span className="sr-only">Acme Inc</span>
            </Link>
            <nav className="mx-auto flex w-full gap-4 sm:gap-6">
                <div className="relative mx-auto">
                    <form className="relative">
                        <SearchIcon
                            className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400"/>
                        <Input
                            type="search"
                            placeholder="Search festivals..."
                            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"/>
                    </form>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <img
                                src="/placeholder.svg"
                                width="32"
                                height="32"
                                className="rounded-full"
                                alt="Avatar"/>
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem>
                            <UserIcon className="w-4 h-4 mr-2"/>
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <SettingsIcon className="w-4 h-4 mr-2"/>
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>
                            <LogOutIcon className="w-4 h-4 mr-2"/>
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </nav>
        </header>
    )
}


export function MountainIcon(props) {
    return (
        (<svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>)
    );
}


