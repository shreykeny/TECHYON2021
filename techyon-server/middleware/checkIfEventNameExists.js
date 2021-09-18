const Events = require('../models/events');

exports.checkEventExists = async (req, res, next) => {
  Events.exists({ eventName: req.body.eventName }).then(function (result) {
    if (result) {
      next()
    } else {
      return res.status(400).json({
        error: 'Invalid EventName',
      });
    }
  });
};
