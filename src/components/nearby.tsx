import { useState } from 'react';

const NearbyPlaces = ({ placesData }: any) => {
  const [activeCategory, setActiveCategory] = useState<string>('Hospital');

  const categories = Object.keys(placesData);

  return (
    <div className="p-4 mt-5">
      <h2 className="font-comfortaa text-xl mb-12">Nearby Places</h2>
      
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
            {placesData[activeCategory].map((place: any, index: number) => (
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
