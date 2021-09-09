const Teams = require("../models/teams")
const Events = require("../models/events")
const Members = require("../models/members")

exports.getTeams = (req, res) => {
    Teams.find().exec((err,team)=> {
        if(err){
            return res.status(400).json({
                error: "cannot get teams"
            });
        }
        res.json({team})
    })
};
exports.getEvents = (req, res) => {
    Events.find().exec((err,event)=> {
        if(err){
            return res.status(400).json({
                error: "cannot get events"
            });
        }
        res.json({event})
    })
};
exports.getMembers = (req, res) => {
    res.json("hello")
};
exports.getAllTeamsForEvent = (req, res) => {
    res.json("hello")
};
exports.getAllMembersForEvent = (req, res) => {
    res.json("hello")
};