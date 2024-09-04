'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React ,{ useState } from 'react';
import { GrDashboard } from 'react-icons/gr';
import { RxDropdownMenu } from 'react-icons/rx';
import { IoArrowRedoOutline } from "react-icons/io5";
import { GiHouse } from "react-icons/gi";
import { GiFamilyHouse } from "react-icons/gi";
import { PiHouseLine } from "react-icons/pi";

const SideBar = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { href: '/dashboard', icon: GrDashboard, label: 'Dashboard' },
    { href: '/dashboard/addProperty', icon: IoArrowRedoOutline, label: 'Submit Property' },
    { href: '/dashboard/apartment', icon: GiFamilyHouse, label: 'Apartment' },
    { href: '/dashboard/room', icon: PiHouseLine, label: 'Single room' },
    { href: '/dashboard/studio', icon: GiHouse, label: 'Studio' },
  ];

  const renderMenuItem = (item, isMobile = false) => (
    <li key={item.href} className='w-full flex'>
      <Link
        href={item.href}
        onClick={isMobile ? () => setToggleDropdown((prev) => !prev) : undefined}
        className={`w-full p-4 flex gap-4 items-center ${isMobile ? '' : 'justify-center md:justify-start'} ${
          pathname === item.href ? 'bg-[#21338e]' : ''
        }`}
      >
        {React.createElement(item.icon, { className: isMobile ? '' : 'text-[2rem] md:text-[1.6rem]' })}
        <span className={isMobile ? '' : 'hidden md:block'}>{item.label}</span>
      </Link>
    </li>
  );

  return (
    <div className="fixed top-20 bg-customBlack text-white w-full z-[10] sm:h-screen sm:w-[12%] md:w-[20%] pb-4">
      <div className='sm:hidden flex justify-between items-center pl-2 pr-2'>
        <p onClick={() => setToggleDropdown((prev) => !prev)}>Open Dashboard Navigation</p>
        <RxDropdownMenu onClick={() => setToggleDropdown((prev) => !prev)} />
      </div>

      {toggleDropdown && (
        <div className='flex gap-2 mt-8 flex-col w-full sm:hidden'>
          <h1 className='ml-4 text-white text-[20px]'>Overview</h1>
          <ul className='border-t-[1px] w-full border-gray-400 flex flex-col gap-1 pt-4 pb-4'>
            {menuItems.map((item) => renderMenuItem(item, true))}
          </ul>
        </div>
      )}

      <div className='sm:flex gap-2 mt-6 flex-col w-full hidden'>
        <h1 className='p-2 md:p-6 w-full text-white text-[19px]'>Overview</h1>
        <ul className='border-t-[1px] w-full text-white border-gray-400 flex flex-col gap-1 pt-4 pb-4'>
          {menuItems.map((item) => renderMenuItem(item))}
        </ul>
      </div>
    </div>
  )
}

export default SideBar
