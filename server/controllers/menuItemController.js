// controllers/menuItemController.js
const asyncHandler = require('express-async-handler');
const MenuItem = require('../models/MenuItem'); // Adjust path as necessary
const cloudinary = require('../config/cloudinaryConfig'); // Import configured Cloudinary
const streamifier = require('streamifier'); // To upload from buffer

// @desc    Fetch all menu items
// @route   GET /api/menu
// @access  Public
const getMenuItems = asyncHandler(async (req, res) => {
    // Optional: Add filtering by category, sorting, etc. later
    // Example: const { category } = req.query;
    // const filter = category ? { category } : {};
    const menuItems = await MenuItem.find({});
    res.json(menuItems);
});

// @desc    Fetch single menu item by ID
// @route   GET /api/menu/:id
// @access  Public
const getMenuItemById = asyncHandler(async (req, res) => {
    const menuItem = await MenuItem.findById(req.params.id);

    if (menuItem) {
        res.json(menuItem);
    } else {
        res.status(404);
        throw new Error('Menu item not found');
    }
});

// @desc    Create a menu item
// @route   POST /api/menu
// @access  Private/Admin
const createMenuItem = asyncHandler(async (req, res) => {
    const { name, description, price, category } = req.body;
  
    // Basic validation
    if (!name || !price || !category) {
      res.status(400);
      throw new Error('Please provide name, price, and category');
    }
  
    let imageUrl = '';
    let imagePublicId = '';
  
    // Check if a file was uploaded
    if (req.file) {
      console.log('File received:', req.file.originalname); // Log filename
  
      // Upload image buffer to Cloudinary
      const uploadPromise = new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'food_ordering_app/menu_items', // Optional: Organize uploads in Cloudinary folders
            // resource_type: 'image', // Optional: Default is image
          },
          (error, result) => {
            if (error) {
              console.error('Cloudinary Upload Error:', error);
              return reject(new Error('Image upload failed'));
            }
            if (!result) {
               console.error('Cloudinary Upload Error: No result received.');
               return reject(new Error('Image upload failed - no result'));
            }
            console.log('Cloudinary Upload Success:', result.public_id);
            resolve(result);
          }
        );
  
        // Pipe the buffer from multer's memory storage into the stream
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });
  
      try {
        const uploadResult = await uploadPromise;
        imageUrl = uploadResult.secure_url; // Get the secure HTTPS URL
        imagePublicId = uploadResult.public_id; // Get the public ID
      } catch (uploadError) {
          res.status(500); // Internal Server Error or Bad Gateway depending on error source
          throw uploadError; // Rethrow the error to be caught by the global error handler
      }
  
    } else {
      console.log('No image file provided for menu item.');
      // You might want to disallow creating items without images, or set a default
      // For now, we allow it, imageUrl will remain empty or you could set a default URL
      // res.status(400);
      // throw new Error('Menu item image is required');
    }
  
    // Create the new menu item in the database
    const menuItem = new MenuItem({
      name,
      description,
      price,
      category,
      imageUrl: imageUrl || undefined, // Store URL (or undefined if none)
      imagePublicId: imagePublicId || undefined, // Store public ID (or undefined if none)
    });
  
    const createdMenuItem = await menuItem.save();
    res.status(201).json(createdMenuItem);
  });
  







// asyncHandler(async (req, res) => {
//     const { name, description, price, imageUrl, category } = req.body;

//     if (!name || !price || !category) {
//         res.status(400);
//         throw new Error('Please provide name, price, and category for the menu item');
//     }

//     const menuItem = new MenuItem({
//         name,
//         description,
//         price,
//         imageUrl,
//         category,
//         // Optional: If you want to track which admin created it
//         // user: req.user._id
//     });

//     const createdMenuItem = await menuItem.save();
//     res.status(201).json(createdMenuItem);
// });

// @desc    Update a menu item
// @route   PUT /api/menu/:id
// @access  Private/Admin

const updateMenuItem = asyncHandler(async (req, res) => {
    const { name, description, price, category } = req.body;
    const menuItemId = req.params.id;

    const menuItem = await MenuItem.findById(menuItemId);

    if (!menuItem) {
        res.status(404);
        throw new Error('Menu item not found');
    }

    let newImageUrl = menuItem.imageUrl;
    let newImagePublicId = menuItem.imagePublicId;

    // Check if a new file is being uploaded
    if (req.file) {
        console.log('New file received for update:', req.file.originalname);

        // --- Upload the new image ---
        const uploadPromise = new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'food_ordering_app/menu_items' },
            (error, result) => {
              if (error) return reject(new Error('New image upload failed'));
              if (!result) return reject(new Error('New image upload failed - no result'));
              resolve(result);
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
        });

        try {
          const uploadResult = await uploadPromise;
          newImageUrl = uploadResult.secure_url;
          newImagePublicId = uploadResult.public_id;

          // --- Delete the OLD image from Cloudinary if it exists ---
          if (menuItem.imagePublicId) {
            console.log('Attempting to delete old image:', menuItem.imagePublicId);
            // Use destroy method with the old public_id
            cloudinary.uploader.destroy(menuItem.imagePublicId, (error, result) => {
                if (error) {
                    console.error('Failed to delete old image from Cloudinary:', error);
                    // Log error but don't necessarily block the update
                } else {
                    console.log('Old image deleted from Cloudinary:', result);
                }
            });
          }
        } catch (uploadError) {
            res.status(500);
            throw uploadError;
        }
    }

    // Update fields
    menuItem.name = name || menuItem.name;
    menuItem.description = description !== undefined ? description : menuItem.description; // Allow empty description
    menuItem.price = price || menuItem.price;
    menuItem.category = category || menuItem.category;
    menuItem.imageUrl = newImageUrl;
    menuItem.imagePublicId = newImagePublicId;

    const updatedMenuItem = await menuItem.save();
    res.json(updatedMenuItem);
});

// const updateMenuItem = asyncHandler(async (req, res) => {
//     const { name, description, price, imageUrl, category } = req.body;

//     const menuItem = await MenuItem.findById(req.params.id);

//     if (menuItem) {
//         menuItem.name = name || menuItem.name;
//         menuItem.description = description !== undefined ? description : menuItem.description; // Allow clearing description
//         menuItem.price = price || menuItem.price;
//         menuItem.imageUrl = imageUrl !== undefined ? imageUrl : menuItem.imageUrl; // Allow clearing image URL
//         menuItem.category = category || menuItem.category;

//         const updatedMenuItem = await menuItem.save();
//         res.json(updatedMenuItem);
//     } else {
//         res.status(404);
//         throw new Error('Menu item not found');
//     }
// });

// @desc    Delete a menu item
// @route   DELETE /api/menu/:id
// @access  Private/Admin
// const deleteMenuItem = asyncHandler(async (req, res) => {
//     const menuItem = await MenuItem.findById(req.params.id);

//     if (menuItem) {
//         await menuItem.deleteOne(); // Use deleteOne() or remove() depending on Mongoose version
//         res.json({ message: 'Menu item removed' });
//     } else {
//         res.status(404);
//         throw new Error('Menu item not found');
//     }
// });
const deleteMenuItem = asyncHandler(async (req, res) => {
    const menuItemId = req.params.id;
    const menuItem = await MenuItem.findById(menuItemId);
  
    if (!menuItem) {
      res.status(404);
      throw new Error('Menu item not found');
    }
  
    // --- Delete the image from Cloudinary if it exists ---
    if (menuItem.imagePublicId) {
        console.log('Attempting to delete image:', menuItem.imagePublicId);
        try {
            const deletionResult = await cloudinary.uploader.destroy(menuItem.imagePublicId);
            console.log('Cloudinary image deletion result:', deletionResult);
            if (deletionResult.result !== 'ok' && deletionResult.result !== 'not found') {
               // Log if deletion wasn't successful but maybe don't block DB deletion
               console.warn(`Cloudinary deletion result was not 'ok' for ${menuItem.imagePublicId}: ${deletionResult.result}`);
            }
        } catch (error) {
            console.error('Error deleting image from Cloudinary:', error);
            // Decide if you want to stop the process if Cloudinary deletion fails
            // For robustness, you might still want to delete from DB and log the Cloudinary error
        }
    }
  
    // --- Delete the menu item from the database ---
    await menuItem.deleteOne(); // Use deleteOne() or remove() on the instance
  
    res.json({ message: 'Menu item removed successfully' });
  });
  

module.exports = {
    getMenuItems,
    getMenuItemById,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
};