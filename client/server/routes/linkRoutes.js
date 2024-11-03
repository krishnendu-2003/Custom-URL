

// const express = require('express');
// const router = express.Router();
// const Link = require('../models/Link'); // Ensure this path is correct

// // Route to generate a new custom link
// router.post('/generate-link', async (req, res) => {
//   const { email, brand } = req.body;

//   // Generate a unique custom link
//   const customLink = `${brand.toLowerCase()}-${Date.now()}`;

//   try {
//     // Save the link to MongoDB
//     const newLink = new Link({
//       email,
//       brand,
//       customLink,
//       clickCount: 0, // Initialize click count at 0
//     });
    
//     await newLink.save();
//     res.json({ success: true, link: `http://switchsocial.com/${customLink}` }); // Return the full URL
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Failed to generate link' });
//   }
// });

// // Route to handle link clicks
// router.get('/click/:customLink', async (req, res) => {
//   const { customLink } = req.params;
  
//   try {
//     // Find the link by its custom identifier and increment the click count
//     const link = await Link.findOneAndUpdate(
//       { customLink },
//       { $inc: { clickCount: 1 } }, // Increment clickCount by 1
//       { new: true }
//     );

//     if (!link) {
//       return res.status(404).json({ success: false, message: 'Link not found' });
//     }

//     res.json({ success: true, clickCount: link.clickCount });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Error handling click' });
//   }
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const Link = require('../models/Link'); // Ensure this path is correct

const ngrokUrl = 'https://7513-2405-201-8018-60b9-b927-e114-bcaf-47b2.ngrok-free.app'; // Your Ngrok URL

// Route to generate a new custom link
router.post('/generate-link', async (req, res) => {
  const { email, brand } = req.body;

  // Generate a unique custom link with Ngrok URL
  const customLink = `${brand.toLowerCase()}-${Date.now()}`;

  try {
    // Save the link to MongoDB
    const newLink = new Link({
      email,
      brand,
      customLink,
      clickCount: 0, // Initialize click count at 0
    });
    
    await newLink.save();
    res.json({ success: true, link: `${ngrokUrl}/api/click/${customLink}` }); // Return the full URL with Ngrok
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to generate link' });
  }
});

// Route to handle link clicks
router.get('/click/:customLink', async (req, res) => {
  const { customLink } = req.params;
  
  try {
    // Find the link by its custom identifier and increment the click count
    const link = await Link.findOneAndUpdate(
      { customLink },
      { $inc: { clickCount: 1 } }, // Increment clickCount by 1
      { new: true }
    );

    if (!link) {
      return res.status(404).json({ success: false, message: 'Link not found' });
    }

    res.json({ success: true, clickCount: link.clickCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error handling click' });
  }
});

module.exports = router;