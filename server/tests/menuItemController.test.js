// tests/menuItemController.test.js
// Import the function to test
const { createMenuItem } = require('../controllers/menuItemController'); // Adjust path

// Import mocks (Jest automatically uses the __mocks__ versions)
const MenuItem = require('../models/MenuItem');
const cloudinary = require('cloudinary').v2; // Use v2 if your code does
const streamifier = require('streamifier');

// Mock express-async-handler if you use it
jest.mock('express-async-handler', () => fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next));

// --- Test Suite ---
describe('Menu Item Controller - addMenuItem', () => {

  let mockReq, mockRes, mockNext;

  // Reset mocks and setup basic req/res before each test
  beforeEach(() => {
    jest.clearAllMocks(); // Clear call counts and implementations

    mockReq = {
      body: {
        name: 'Test Burger',
        description: 'A tasty test burger',
        price: 9.99,
        category: 'Burgers',
      },
      // Mock file object like Multer would provide (with a buffer)
      file: {
        originalname: 'test-burger.jpg',
        mimetype: 'image/jpeg',
        buffer: Buffer.from('fake image data'), // Use Buffer.from
        size: 12345,
      },
      user: { _id: 'mockAdminUserId', role: 'admin' } // Mock authenticated admin user if needed by controller
    };

    mockRes = {
      status: jest.fn().mockReturnThis(), // Chainable status
      json: jest.fn(), // Mock json response
      send: jest.fn(), // Mock send if used
    };

    mockNext = jest.fn(); // Mock next function for error handling
  });

  // --- Test Case 1: Successful upload and creation ---
  test('should upload image to Cloudinary and save menu item on success', async () => {
    // Arrange: Mocks are set up in beforeEach and __mocks__
    // Act: Call the controller function
    await createMenuItem(mockReq, mockRes, mockNext);

    // Assert
    // 1. Check if Cloudinary upload_stream was called
    expect(cloudinary.uploader.upload_stream).toHaveBeenCalledTimes(1);
    // Optionally check the options passed (like folder)
    expect(cloudinary.uploader.upload_stream).toHaveBeenCalledWith(
        expect.objectContaining({ folder: 'food_ordering_app/menu_items' }), // Check folder option
        expect.any(Function) // Check that a callback was provided
    );

    // 2. Check if streamifier was used with the correct buffer
    expect(streamifier.createReadStream).toHaveBeenCalledTimes(1);
    expect(streamifier.createReadStream).toHaveBeenCalledWith(mockReq.file.buffer);

    // 3. Check if the stream's pipe method was called (linking streamifier to cloudinary)
    // Access the mock stream returned by createReadStream
    const mockReadStream = streamifier.createReadStream.mock.results[0].value;
    expect(mockReadStream.pipe).toHaveBeenCalledTimes(1);
    // Check if it was piped to the stream returned by cloudinary.uploader.upload_stream
    const mockUploadStreamInstance = cloudinary.uploader.upload_stream.mock.results[0].value;
    expect(mockReadStream.pipe).toHaveBeenCalledWith(mockUploadStreamInstance);


    // 4. Check if MenuItem constructor was called with correct data (including Cloudinary result)
    expect(MenuItem).toHaveBeenCalledTimes(1);
    expect(MenuItem).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Test Burger',
      price: 9.99,
      category: 'Burgers',
      // Check that the URL and ID from the *mocked* Cloudinary response are included
      imageUrl: 'https://mock.cloudinary.url/mock_image_pipe.jpg',
      imagePublicId: 'mock_public_id_from_pipe',
    }));

    // 5. Check if the save method was called on the MenuItem instance
    expect(MenuItem.mockSave).toHaveBeenCalledTimes(1); // Access static mockSave

    // 6. Check the response
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledTimes(1);
    // Check if the response contains the expected fields from the mocked save result
    expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
      _id: 'mock_menu_item_id',
      name: 'Mock Item', // Data comes from mockSave's resolved value
      imageUrl: 'https://mock.cloudinary.url/mock_image_pipe.jpg',
      imagePublicId: 'mock_public_id_from_pipe',
    }));

    // 7. Ensure next() was not called (no errors)
    expect(mockNext).not.toHaveBeenCalled();
  });

  // --- Test Case 2: Cloudinary upload fails ---
  test('should handle Cloudinary upload error', async () => {
     // Arrange: Override the streamifier mock's pipe implementation for this test
     const mockError = new Error('Cloudinary Test Error');
     const mockReadStreamWithError = {
       pipe: jest.fn((destinationStream) => {
         // Find the Cloudinary callback and call it with an error
         const cloudinaryCallback = cloudinary.uploader.upload_stream.mock.calls[0][1];
         cloudinaryCallback(mockError, null); // Simulate error
         return destinationStream;
       }),
       on: jest.fn(),
     };
     streamifier.createReadStream.mockReturnValue(mockReadStreamWithError); // Make createReadStream return this error-simulating stream

     // Act
     await createMenuItem(mockReq, mockRes, mockNext);

     // Assert
     // 1. Check Cloudinary/Streamifier interaction still happened
     expect(cloudinary.uploader.upload_stream).toHaveBeenCalledTimes(1);
     expect(streamifier.createReadStream).toHaveBeenCalledTimes(1);
     expect(mockReadStreamWithError.pipe).toHaveBeenCalledTimes(1);


     // 2. Check that MenuItem was NOT constructed or saved
     expect(MenuItem).not.toHaveBeenCalled();
     expect(MenuItem.mockSave).not.toHaveBeenCalled();

     // 3. Check that the error was passed to the error handler (via next or direct response)
     // If using asyncHandler, it should call next(error)
     expect(mockNext).toHaveBeenCalledTimes(1);
     expect(mockNext).toHaveBeenCalledWith(expect.any(Error)); // Check if an Error object was passed
     expect(mockNext).toHaveBeenCalledWith(expect.objectContaining({ message: 'Image upload failed' })); // Or match the specific error message thrown in your controller

     // 4. Check that no success response was sent
     expect(mockRes.status).not.toHaveBeenCalled(); // Or check if status(500) was called depending on controller logic
     expect(mockRes.json).not.toHaveBeenCalled();
  });


  // --- Test Case 3: No file uploaded ---
  test('should create menu item without image if no file is provided', async () => {
    // Arrange: Remove the file from the mock request
    mockReq.file = undefined;

    // Act
    await createMenuItem(mockReq, mockRes, mockNext);

    // Assert
    // 1. Check Cloudinary/Streamifier were NOT called
    expect(cloudinary.uploader.upload_stream).not.toHaveBeenCalled();
    expect(streamifier.createReadStream).not.toHaveBeenCalled();

    // 2. Check MenuItem constructor was called without image details
    expect(MenuItem).toHaveBeenCalledTimes(1);
    expect(MenuItem).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Test Burger',
      price: 9.99,
      category: 'Burgers',
      imageUrl: undefined, // Explicitly check for undefined
      imagePublicId: undefined,
    }));

    // 3. Check save was called
    expect(MenuItem.mockSave).toHaveBeenCalledTimes(1);

    // 4. Check success response
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledTimes(1);
    // Response likely won't contain imageUrl/imagePublicId if they were undefined on save
    expect(mockRes.json).toHaveBeenCalledWith(expect.not.objectContaining({
        imageUrl: expect.anything(),
        imagePublicId: expect.anything(),
     }));

    // 5. Ensure next() was not called
    expect(mockNext).not.toHaveBeenCalled();
  });

  // Add more tests: e.g., missing required body fields (though validation middleware might catch this earlier)

});