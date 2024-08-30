import React from 'react';

const PropertyList: React.FC = () => {
  const properties = [
    {
      id: 1,
      image: '/property-image.jpg', // Replace with actual image path
      title: 'Apolo Family Apartment',
      location: 'Avenue South Burlington, Los Angeles',
      price: '$212,000',
      type: 'Fixed Amount',
      addedDate: '10 Jan, 2021',
      views: 34,
      comments: 5,
    },
    {
      id: 2,
      image: '/property-image.jpg', // Replace with actual image path
      title: 'Apolo Family Apartment',
      location: 'Avenue South Burlington, Los Angeles',
      price: '$212,000',
      type: 'Fixed Amount',
      addedDate: '10 Jan, 2021',
      views: 34,
      comments: 5,
    },
    // Add more properties here
  ];

  return (
    <section className=' w-[100%] mt-[7.5rem] sm:mt-[5rem]   md-[1000px]:w-[80%]  lg:max-w-[90%]  p-4   sm:p-8  float-right'>
         <h3 className='text-2xl mt-6 lg:mt-2'>Apartments</h3>
    <div className="w-full mx-auto px-4 py-6 bg-gray-100">
      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[1000px] bg-white rounded-lg shadow-md">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="py-4 px-6 text-gray-700">Properties</th>
              <th className="py-4 px-6 text-gray-700">Added Date</th>
              <th className="py-4 px-6 text-gray-700">Comments</th>
              <th className="py-4 px-6 text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.id} className="border-b">
                <td className="py-4 px-6 flex items-center">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-28 h-20 object-cover rounded-md mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {property.title}
                    </h3>
                    <p className="text-sm text-gray-500">{property.location}</p>
                    <p className="text-green-500 text-sm">
                      {property.price} / {property.type}
                    </p>
                  </div>
                </td>
                <td className="py-4 px-6 text-gray-600">{property.addedDate}</td>
                <td className="py-4 px-6 text-gray-600">{property.comments} Comments</td>
                <td className="py-4 px-6">
                  <div className="flex space-x-2">
                    <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </section>
  );
};

export default PropertyList;
