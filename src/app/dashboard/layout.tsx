import SideBar from '@/components/sideUser'
import Nav from '@/components/userDashNav'
import React from 'react'

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className=" flex justify-center min-h-screen w-full">
       
      <div  className="w-full ">
      <Nav />
        {children}
    <SideBar />
      </div>
      
    </section>
  )
}
