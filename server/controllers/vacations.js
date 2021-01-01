const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

// @route     GET api/vacations
// @desc      Get all vacations
// @access    Public
router.get('/', async (req, res) => {
  try {
    // Mock vacations
    const vacations = [
      {
        description: 'Climb Mount Everest',
        destination: 'Nepal',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Everest_kalapatthar.jpg',
        price: 5000,
        followers: 17,
        startDate: new Date(2021, 0, 15),
        endDate: new Date(2021, 1, 22),
      },
      {
        description: "Relax on Thailand's beautiful beaches",
        destination: 'Thailand',
        imageUrl: 'https://www.fodors.com/wp-content/uploads/2019/02/thai-beaches-hero-.jpg',
        price: 2300,
        followers: 8,
        startDate: new Date(2021, 3, 13),
        endDate: new Date(2021, 3, 25),
      },
    ];

    console.log(vacations);
    res.json(vacations);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Server error.' });
  }
});

// @route     POST api/vacations
// @desc      Create a vacation
// @access    Private
router.post(
  '/',
  [
    check('description', 'Description must be 10-2000 characters long').isLength({ min: 10, max: 2000 }),
    check('destination', 'Destination is required').notEmpty(),
    check('imageUrl', 'Please enter a valid URL').isURL().optional({ checkFalsy: true }),
    check('price', 'Price is required').notEmpty().isInt(),
    check('startDate', 'Start date is required').notEmpty(),
    check('endDate', 'End date is required').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { description, destination, imageUrl, price, startDate, endDate } = req.body;
    try {
      const vacation = { description, destination, imageUrl, price, startDate, endDate, followers: 0 };
      console.log(vacation);
      res.json(vacation);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ msg: 'Server error.' });
    }
  }
);

module.exports = router;
