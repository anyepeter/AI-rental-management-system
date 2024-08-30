// @ts-nocheck
'use client'
import React, { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
// import { getAllSites } from '@/actions/actions'
// import { useDispatch, useSelector } from'react-redux'
// import { increment } from '../globalRedux/site/siteSlice'


export default function page() {
  
// const dispatch = useDispatch()
// const sites = useSelector((state) => state.site.sites)

// const user = useSelector((state) => state.site.user)
// console.log(user)

// useEffect(() => {
//   const fetchSites = async () => {
//     try {
//       const sitesData = await getAllSites()
//       dispatch(increment(sitesData))
//     } catch (error) {
//       console.error('Error fetching sites:', error)
//     }
//   }

//   fetchSites()
// }, [])


  return (
    <section className=' w-[100%] mt-[7.5rem] sm:mt-[5rem] sm:w-[90%]   md-[1000px]:w-[80%]  lg:max-w-[90%]  p-4   sm:p-8  float-right'>
      <div className='flex w-full flex-col gap-10'>
        <h3 className='text-2xl mt-6 lg:mt-2'>User Dashboard</h3>

        <div className='flex p-2 mt-4 flex-row justify-between items-center'>
          <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full'>
            <li className='bg-[#54E3B0] text-white w-full p-4 py-8'>
              <h3 className='md:text-sm'>Total Properties</h3>
              <p className='text-2xl md:text-3xl'>0</p>
            </li>
            <li className='bg-[#DB6AF1] text-white w-full p-4 py-8'>
              <h3 className='md:text-sm'>No Apartment</h3>
              <p className='text-2xl md:text-3xl'>0</p>
            </li>
            <li className='bg-[#F1C643] text-white w-full p-4 py-8'>
              <h3 className='md:text-sm'>No Studio</h3>
              <p className='text-2xl md:text-3xl'>5</p>
            </li>
            <li className='bg-[#EE6465] text-white w-full p-4 py-8'>
              <h3 className='md:text-sm'>No Room</h3>
              <p className='text-2xl md:text-3xl'>5</p>
            </li>
          </ul>
        </div>

        <h2 className=' mt-6 lg:mt-10'>Recent Comments</h2>

              <div className=''>
                <div className='overflow-x-scroll w-full'>
                  <table className='w-full min-w-[800px] border-collapse'>
                    <thead className='sticky top-0 bg-white'>
                      <tr>
                        <th className='border p-2 text-left'>User Name</th>
                        <th className='border p-2 text-left'>Property Name</th>
                        <th className='border p-2 text-left'>Description</th>
                        <th className='border p-2 text-left'>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Add your comment data here */}
                      <tr>
                        <td className='border p-2'>John Doe</td>
                        <td className='border p-2'>Sunset Hotel</td>
                        <td className='border p-2'>Great experience, would recommend!</td>
                        <td className='border p-2'>2023-06-15</td>
                      </tr>
                      {/* Add more rows as needed */}
                    </tbody>
                  </table>
                </div>
              </div>

      </div>
    </section>
  )
}
