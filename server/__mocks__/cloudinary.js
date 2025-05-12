// __mocks__/cloudinary.js

// This object structure mimics the real cloudinary v2 object
const mockUploadStream = jest.fn((options, callback) => {
    // Simulate the stream object that upload_stream returns internally
    // The important part is that something calls the callback later
    const stream = {
      // Mock the 'end' event or simulate piping completion
      // In our test, we will manually call the callback
      on: jest.fn(),
      end: jest.fn(() => {
          // Simulate successful upload by default
          // In the test, we can override mockUploadStream.mock.calls[0][1] to control this
          // console.log("Mock stream end called");
          // Let's simulate success by calling the callback provided to upload_stream
          // This callback is the second argument passed to mockUploadStream
           if (mockUploadStream.mock.calls.length > 0) {
              const theCallback = mockUploadStream.mock.calls[mockUploadStream.mock.calls.length - 1][1];
              // Simulate success - call with (error=null, result)
              theCallback(null, {
                public_id: 'mock_public_id',
                secure_url: 'https://mock.cloudinary.url/mock_image.jpg',
              });
           }
      })
    };
  
    // Store the callback to potentially call it manually in tests
    // Or rely on the stream 'end' simulation above
    // console.log("Mock upload_stream called");
  
  
    // Return the mock stream object. The code under test will call .end() on this
    // or pipe data to it. We need to ensure the callback eventually gets called.
    // For simplicity in this mock, we'll trigger the callback when pipe is called on the streamifier mock.
    return stream; // Return a mock stream object
  });
  
  
  const uploader = {
    upload_stream: mockUploadStream,
    destroy: jest.fn((public_id, callback) => {
      // Simulate successful deletion
      if (callback) {
        callback(null, { result: 'ok' });
      }
      return Promise.resolve({ result: 'ok' });
    })
  };
  
  // Export in the v2 structure
  module.exports = {
    v2: {
      uploader: uploader,
      config: jest.fn(), // Mock config as well if needed
    },
    // Allow direct access if your import is just 'cloudinary'
    uploader: uploader,
    config: jest.fn(),
  };