// @ts-nocheck
'use client'
import { getFirstUser, getUserById } from '@/actions/actions'
import SideBar from '@/components/sideUser'
import Nav from '@/components/userDashNav'
import React, { useEffect } from 'react'
import { addUser } from '../globalRedux/property/propertySlice'
import { useDispatch } from 'react-redux'
import { useUser } from '@clerk/nextjs'

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
const dispatch = useDispatch()

const { user } = useUser()

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const sitesData = await getUserById(user?.id)
        dispatch(addUser(sitesData))
      } catch (error) {
        console.error('Error fetching sites:', error)
      }
    }
  
    fetchSites()
  }, [user?.id, dispatch])
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
