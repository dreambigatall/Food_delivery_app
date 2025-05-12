// __mocks__/streamifier.js

// This needs to return an object that can be piped FROM
// and it needs to trigger the Cloudinary callback when piped TO
const mockStream = {
    // The pipe method is the crucial part here
    pipe: jest.fn((destinationStream) => {
        // Simulate the piping process ending and trigger the destination's logic.
        // In our case, the destination is the mock Cloudinary upload_stream's callback.
        // We access the callback stored by our mock cloudinary uploader.
        const cloudinary = require('cloudinary').v2; // Get the mocked cloudinary
        if (cloudinary.uploader.upload_stream.mock.calls.length > 0) {
             // Get the callback passed to the *last* call of upload_stream
             const cloudinaryCallback = cloudinary.uploader.upload_stream.mock.calls[cloudinary.uploader.upload_stream.mock.calls.length - 1][1];

             // Simulate successful upload: call Cloudinary callback with (error=null, result)
             // You might want to make this configurable in your test setup for error cases
             cloudinaryCallback(null, {
               public_id: 'mock_public_id_from_pipe',
               secure_url: 'https://mock.cloudinary.url/mock_image_pipe.jpg',
             });
        } else {
            console.error("Streamifier mock pipe: Could not find Cloudinary callback to trigger.");
        }

        // Return the destination stream for potential chaining (though not strictly needed here)
        return destinationStream;
    }),
    // Add other stream methods if your code uses them
    on: jest.fn(),
};

module.exports = {
  createReadStream: jest.fn(() => mockStream),
};