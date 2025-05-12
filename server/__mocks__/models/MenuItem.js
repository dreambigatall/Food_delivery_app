// __mocks__/models/MenuItem.js (Example path)

// Mock the Mongoose model and its save method
const mockSave = jest.fn().mockResolvedValue({ // Simulate successful save
    _id: 'mock_menu_item_id',
    name: 'Mock Item',
    description: 'Mock Desc',
    price: 10.99,
    category: 'Mock Cat',
    imageUrl: 'https://mock.cloudinary.url/mock_image_pipe.jpg', // Reflect the saved URL
    imagePublicId: 'mock_public_id_from_pipe', // Reflect the saved public_id
    // include timestamps if your code expects them
    createdAt: new Date(),
    updatedAt: new Date(),
    toObject: function() { return this; } // Add if you use .toObject()
  });
  
  const MenuItem = jest.fn().mockImplementation((data) => ({
    ...data,
    save: mockSave,
  }));
  
  // Also mock static methods if you use them (like findById)
  MenuItem.findById = jest.fn();
  MenuItem.deleteOne = jest.fn(); // If testing delete
  
  // Make the mockSave accessible for assertions if needed outside the instance
  MenuItem.mockSave = mockSave;
  
  module.exports = MenuItem;