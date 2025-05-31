import React from 'react';
import { RestaurantList } from '~/components/restaurant-list';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <RestaurantList />
    </div>
  );
};

export default HomePage;
