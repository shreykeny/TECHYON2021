
exports.checkDuplicateTeamName = (req, res, next, tname) => {
    Event.find(tname).exec((err, cate) =>{
        if(err){
            return res.status(400).json({
                error: "Teamname Exists"
            });
        }
        req.Event = cate;
        next();
    });
};