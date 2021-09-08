const router =require('express').Router()
const {renderLogin, renderDashboard} = require("../Controllers/public")

router.get("/dashboard", renderDashboard)
router.get("/login", renderLogin)

module.exports =router