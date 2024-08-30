"use client"
import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

interface FormData {
  category: string;
  title: string;
  location: string;
  region: string;
  minPrice: number;
  maxPrice: number;
}

interface Service {
  category: string;
  title: string;
  [key: string]: any;
}

interface Category {
  id: string;
  category: string;
}

const SearchForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    category: '',
    title: '',
    location: '',
    region: '',
    minPrice: 0,
    maxPrice: 100
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handlePriceChange = (values: string[]) => {
    setFormData({
      ...formData,
      minPrice: parseInt(values[0]),
      maxPrice: parseInt(values[1])
    });
  };

  return (
    <div className='w-full flex justify-center bg-secondaryColor p-4'>
      <form
        className="w-full flex flex-col max-w-4xl justify-center gap-4"
      >
        <div className='w-full flex flex-col md:flex-row gap-4'>
          <div className='flex gap-4 w-full'>
            <div className="md:w-[300px] w-full">
              <label htmlFor="category" className="sr-only">
                {('Category')}
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full h-12 pl-4 pr-4 py-2 leading-tight text-gray-700 border rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline"
              >
                <option value="">{('AllCategory')}</option>
              </select>
            </div>
            <div className="w-full md:max-w-[400px]">
            <label htmlFor="location" className="sr-only">{('Location')}</label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full h-12 pl-4 pr-4 py-2 leading-tight text-gray-700 border rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline"
              placeholder={('Quarter')}
            />
          </div>
          </div>
          <div className='w-full'>
            <div className="w-full">
              <label htmlFor="title" className="sr-only">
                {('Title')}
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full h-12 pl-4 pr-4 py-2 leading-tight text-gray-700 border rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline"
                placeholder={('TitleForm')}
              />
            </div>
          </div>
        </div>
        <div className='w-full flex flex-col gap-4 md:flex-row'>
          <div className="w-full md:max-w-[400px]">
            <label htmlFor="price-range" className="sr-only">{('Price Range')}</label>
            <Nouislider
              id="price-range"
              range={{ min: 0, max: 1000 }}
              start={[formData.minPrice, formData.maxPrice]}
              connect
              onChange={handlePriceChange}
              style={{ height: '20px',
                margin: '0px 10px 0px 10px',
                background: 'red',
                border: '1px solid #ccc',

               }}
            />
          
            <div className="flex justify-between mt-2">
              <span>Min: ${formData.minPrice}</span>
              <span>Max: ${formData.maxPrice}</span>
            </div>
          </div>
          <div className="w-full">
            <button
              disabled={isLoading}
              type="submit"
              className="w-full h-12 bg-[#16C788] flex justify-center items-center text-white font-bold py-2 px-4 rounded self-end"
            >
              {isLoading ? <Loader2 color="white" className='animate-spin' /> : ('formSearch')}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
