"use client"
import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import { getAllCategories } from '@/actions/actions';
import { useRouter } from "next/navigation"; 
import { useDispatch, useSelector } from 'react-redux';
import { filterProperties } from '@/app/globalRedux/property/propertySlice';
import toast from 'react-hot-toast';

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
     address: '',
    minPrice: 10000,
    maxPrice: 500000
  });
  const [categories, setCategories] = useState([]);
const dispatch = useDispatch();
const router = useRouter(); 

  useEffect(() => {
    const fetchCategoriesAndSection = async () => {
      setCategories(await getAllCategories()); 

    };
    fetchCategoriesAndSection();
  }, []);


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

  const { properties } = useSelector((state: any) => state.property);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.category) {
      toast.error("Please select a category.")
      return; // Exit the function without proceeding
    }

    
    setIsLoading(true);

    setTimeout(() => {
    const results = properties?.filter(item => {
      return (
        (!formData.category || item.category.name.toLowerCase().includes(formData.category.toLowerCase())) &&
        (!formData.title || item.title.toLowerCase().includes(formData.title.toLowerCase())) &&
        (!formData.location || item.address.toLowerCase().includes(formData.location.toLowerCase())) &&
        (item.price >= formData.minPrice && item.price <= formData.maxPrice)
      );
    });

    dispatch(filterProperties(results));
  
    setIsLoading(false);

    router.push('/filter');
    
  }, 1000);
  };
  

  return (
    <div className='w-full flex justify-center bg-secondaryColor p-4'>
      <form
      onSubmit={handleSearch}
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
                <option value="">{('Select Category')}</option>
                {
                  categories.map((category: any) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))
                }
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
              placeholder={('Address')}
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
                placeholder={('property name')}
              />
            </div>
          </div>
        </div>
        <div className='w-full flex flex-col gap-4 md:flex-row'>
          <div className="w-full md:max-w-[400px]">
            <label htmlFor="price-range" className="sr-only">{('Price Range')}</label>
            <Nouislider
              id="price-range"
              range={{ min: 10000, max: 500000 }}
              start={[formData.minPrice, formData.maxPrice]}
              connect
              onChange={handlePriceChange}
              style={{ height: '20px',
                margin: '0px 10px 0px 10px',
                background: 'white',
                border: '1px solid #ccc',

               }}
            />
          
            <div className="flex justify-between mt-2">
              <span>Min: {formData.minPrice} cfa</span>
              <span>Max: {formData.maxPrice} cfa</span>
            </div>
          </div>
          <div className="w-full">
            <button
              disabled={isLoading}
              type="submit"
              className="w-full h-12 bg-[#16C788] flex justify-center items-center text-white font-bold py-2 px-4 rounded self-end"
            >
              {isLoading ? <Loader2 color="white" className='animate-spin' /> : ('Search')}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
