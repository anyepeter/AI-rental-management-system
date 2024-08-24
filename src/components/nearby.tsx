import { useState } from 'react';

interface Place {
  name: string;
  distance: string;
  type: string;
}

const placesData: { [key: string]: Place[] } = {
  Hospital: [
    { name: 'Massachusetts General Hospital', distance: '23.7 km', type: 'Medical College' },
    { name: 'Langone Medical Center', distance: '13.2 km', type: 'Hart Hospital' },
    { name: 'Mount Sinai Hospital', distance: '58.0 km', type: 'Eye Hospital' },
  ],
  Shopping: [
    { name: 'Mall of America', distance: '5.7 km', type: 'Shopping Mall' },
    { name: 'Westfield Center', distance: '3.5 km', type: 'Shopping Center' },
    { name: 'The Grove', distance: '9.1 km', type: 'Shopping Complex' },
  ],
  School: [
    { name: 'Harvard University', distance: '12.3 km', type: 'University' },
    { name: 'MIT', distance: '15.8 km', type: 'Technical Institute' },
    { name: 'Stanford School', distance: '48.0 km', type: 'High School' },
  ],
  Restaurant: [
    { name: 'Le Bernardin', distance: '6.3 km', type: 'Fine Dining' },
    { name: 'Joe\'s Diner', distance: '8.7 km', type: 'Casual Dining' },
    { name: 'Spago', distance: '12.0 km', type: 'Gourmet Restaurant' },
  ],
};

const NearbyPlaces = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Hospital');

  const categories = Object.keys(placesData);

  return (
    <div className="p-4 mt-5">
      <h2 className="font-comfortaa text-2xl mb-12">Nearby Places</h2>
      
      {/* Category Buttons */}
      <div className="flex flex-wrap bg-secondaryColor mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-4 text-sm ${
              activeCategory === category ? 'bg-primaryColor text-white' : 'bg-gray-200 text-customGrey'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Display Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Distance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {placesData[activeCategory].map((place, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {place.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {place.distance}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {place.type}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NearbyPlaces;
