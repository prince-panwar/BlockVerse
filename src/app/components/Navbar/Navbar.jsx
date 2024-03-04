// Nav.jsx
"use client"
import React,{useState, useEffect} from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";
import { SearchIcon } from "./SearchIcon.jsx";
import ThemeSwitcher from "../ThemeSwitcherButton.jsx";

export default function Nav() {
  const[searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    function handleEnter(event) {
      if (event.key === 'Enter') {
        // Perform the search operation here
        console.log(`Searching for ${searchTerm}`);
        const url = 'https://api.themoviedb.org/3/find/external_id?external_source=&language=${searchTerm}';
        const options = {method: 'GET', headers: {accept: 'application/json'}};
        
        fetch(url, options).then(res => res.json()).then(json => console.log(json))
        .catch(err => console.error('error:' + err));
      }
    }

    window.addEventListener('keydown', handleEnter);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('keydown', handleEnter);
    };
  }, [searchTerm]);
  return (
    <div className="absolute top-0 left-0 w-full z-10  ">
      <Navbar isBlurred="false" className="bg-transparent" > 
        <NavbarContent justify="start">
          <NavbarBrand className="mr-4">
            <AcmeLogo />
            <p className="hidden sm:block font-bold text-inherit">BlockVerse</p>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-3">
            <NavbarItem isActive>
              <Link href="#" aria-current="page" color="secondary">
                Home
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="#" color="foreground">
                Trending
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="#">
                Genres
              </Link>
            </NavbarItem>
          </NavbarContent>
        </NavbarContent>

        <NavbarContent as="div" className="items-center" justify="end">
          <Input
            classNames={{
              base: "max-w-full m:max-w-[20rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal text-default-200 bg-default-200/20 dark:bg-default-500/20",
              
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <ThemeSwitcher />
        </NavbarContent>
      </Navbar>
    </div>
  );
}
