const fs = require('fs');
const path = require('path');

const categories = [
  { id: 'vehicles', name: 'Vehicles', icon: 'Car' },
  { id: 'electronics', name: 'Electronics', icon: 'Smartphone' },
  { id: 'furniture', name: 'Furniture', icon: 'Sofa' },
  { id: 'properties', name: 'Properties', icon: 'Home' },
  { id: 'services', name: 'Services', icon: 'Wrench' }
];

const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Pune'];

const subcategories = {
  vehicles: ['Cars', 'Motorcycles', 'Bicycles', 'Commercial Vehicles'],
  electronics: ['Mobile Phones', 'Laptops', 'TVs', 'Cameras', 'Accessories'],
  furniture: ['Sofas & Dining', 'Beds & Wardrobes', 'Home Decor', 'Office Furniture'],
  properties: ['Apartments for Rent', 'Houses for Sale', 'Commercial Space', 'Land'],
  services: ['Electronics Repair', 'Cleaning', 'Packers & Movers', 'Home Repair']
};

const images = {
  vehicles: [
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=500&q=80'
  ],
  electronics: [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=500&q=80'
  ],
  furniture: [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1550226891-ef816aed4a98?auto=format&fit=crop&w=500&q=80'
  ],
  properties: [
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=500&q=80'
  ],
  services: [
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=500&q=80'
  ]
};

const adjectives = ['Beautiful', 'Mint Condition', 'Brand New', 'Well Maintained', 'Premium', 'Affordable', 'Luxury', 'Classic'];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const listings = [];
let idCounter = 100;

categories.forEach(category => {
  for (let i = 0; i < 20; i++) {
    const city = cities[Math.random() * cities.length | 0];
    const subcat = subcategories[category.id][Math.random() * subcategories[category.id].length | 0];
    const adj = adjectives[Math.random() * adjectives.length | 0];
    const img = images[category.id][Math.random() * images[category.id].length | 0];
    
    let price = 0;
    if (category.id === 'vehicles') price = getRandomInt(50000, 1500000);
    if (category.id === 'electronics') price = getRandomInt(2000, 100000);
    if (category.id === 'furniture') price = getRandomInt(1000, 50000);
    if (category.id === 'properties') price = getRandomInt(5000, 50000000);
    if (category.id === 'services') price = getRandomInt(500, 5000);

    listings.push({
      id: idCounter.toString(),
      name: `${adj} ${subcat}`,
      detail: `This is a great listing for a ${adj.toLowerCase()} ${subcat.toLowerCase()} in ${city}. It comes with all the standard features you would expect. Contact for more details.`,
      category: category.id,
      subcategory: subcat,
      country: 'India',
      state: 'State',
      city: city,
      area: 'Central Area',
      price: price,
      sellerId: `user_${getRandomInt(1, 10)}`,
      createdAt: new Date(Date.now() - getRandomInt(0, 30) * 86400000).toISOString(),
      imageUrl: img
    });
    idCounter++;
  }
});

// shuffle listings
for (let i = listings.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [listings[i], listings[j]] = [listings[j], listings[i]];
}

const fileContent = `
export const initialCategories = ${JSON.stringify(categories, null, 2)};
export const initialCities = ${JSON.stringify(cities, null, 2)};
export const initialListings = ${JSON.stringify(listings, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, 'src/data/mockData.js'), fileContent);
console.log('Successfully generated mock data.');
