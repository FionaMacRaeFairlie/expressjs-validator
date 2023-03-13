const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

/* GET users page. */
router.get('/', function (req, res) {
  res.send();
});
router.post('/', [
  check('name').not().isEmpty().withMessage('Name must not be blank'),
  check('classYear', 'Class Year should be a number').not().isEmpty(),
  check('weekday', 'Choose a weekday').optional(),
  check('email', 'Your email is not valid').not().isEmpty(),
  check('password', 'Your password must be at least 5 characters').not().isEmpty(),
  check('name').exists().isLength({min: 5}).trim().escape().withMessage('Name must have more than 5 characters'),
  check('confirmPassword', 'Passwords do not match').custom((value, {req}) => (value === req.body.password)),
],
function (req, res) {
  const errors = validationResult(req);
  console.log(req.body);
  if (!errors.isEmpty()) {
    return res.status(422).jsonp(errors.array());
  } else {
    res.send({});
  }
});

module.exports = router;
