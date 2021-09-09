exports.mapNamesFromReqObj = (obj)=> {
    var names
    for (var key in obj) {
        var val = obj[key];
        if (typeof val === 'object') {
          if (key === 'name') names = val;
        }
      }
    return names
    }

exports.getEventByName =async (eventName) =>  {
        const event = await Event.findOne({
          "eventName": eventName
      })
      return event._id
      }
      
exports.checkEventTypeIsSolo =async (eventName) =>  {
        const event = await Event.findOne({
          "eventName": eventName
      })
      if(event.eventType === "Solo")
        return true
      else 
        return false
      }