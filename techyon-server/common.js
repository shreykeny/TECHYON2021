const Event =require("./models/events")
const Members =require("./models/members")
const Teams = require("./models/teams")

exports.mapNamesFromReqObj = (obj)=> {
    var names
    for (var key in obj) {
        var val = obj[key];
        if (typeof val === 'object' || typeof val === "string") {
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
exports.checkEventTypeIsIntra =async (eventName) =>  {
        const event = await Event.findOne({
          "eventName": eventName
      })
      if(event.college === "Intra")
        return true
      else 
        return false
      }
exports.getInterCollegeMetrics= async function(department){
  const colleges=['PCCE', 'DBCE', 'NIT', 'GEC', 'RIT', 'CHOWGULE']
  let collegeDetails=[]
 for(var i=0;i<colleges.length;i++){
     collegeDetails.push({
      teams:  await Teams.countDocuments({ "college": colleges[i],"department":department }),
      totalRegisteredMembers: await Members.countDocuments({"college": colleges[i],department}),
      totalSoloMembers: await Members.countDocuments({ "college": colleges[i], "position": "Solo",department }),
      eventsHosted: await Event.countDocuments({ "hostedBy":department }),
      teamEvents: await Event.countDocuments({ "eventType": "Team","hostedBy":department,"college": "Inter" }),
      soloEvents: await Event.countDocuments({ "eventType":"Solo","hostedBy":department, "college": "Inter"})
    })
  }
  
  const collegeInfo=colleges.map(function(college,index){
    var obj = new Object();
    obj[college] = collegeDetails[index]
    return JSON.parse(JSON.stringify(obj)) 
  })
  return collegeInfo
}

exports.getIntraCollegeMetrics= async (department)=>{
  const yearsNum=[1, 2, 3, 4]
  const years=yearsNum.map(year=>{
    return year === 1 ?"FirstYear": year === 2? "SecondYear": year === 3? "ThirdYear": "FourthYear"
  })
  let yearDetails=[]
  for(var i=0;i<years.length;i++){
    yearDetails.push({
      teams:  await Teams.countDocuments({ "year": yearsNum[i], department }),
      totalRegisteredMembers: await Members.countDocuments({ "year": yearsNum[i], department }),
      totalSoloMembers: await Members.countDocuments({ "year": yearsNum[i], department, "position": "Solo" }),
      teamEvents: await Event.countDocuments({"eventType": "Team","hostedBy":department,"college": "Intra"  }),
      soloEvents: await Event.countDocuments({ "eventType":"Solo","hostedBy":department, "college": "Intra"})
    })
    console.log(yearDetails[i])
  }
  const collegeInfo =years.map((year,index)=>{
    var obj = new Object();
    obj[year] = yearDetails[index]
    return JSON.parse(JSON.stringify(obj)) 
  })
  
  return collegeInfo
}