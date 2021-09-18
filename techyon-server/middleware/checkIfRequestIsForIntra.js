const Events = require('../models/events');

exports.checkIntra=async (req, res, next)=> {
    
  Events.findOne({ "eventName": req.body.eventName }).then(function (result) {
      
    if ( result.campus ==="Intra" && req.body.college !="PCCE") {
        return res.status(400).json({
            error: 'This is an Intra Event. Registrations from your college are denied',
          });
    } else {
      next()
    }
  });
};