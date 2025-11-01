const express = require("express");
const { userRegistration, getAllUsersData, deleteAUser, updateAUser, searchResults } = require("../controllers/user.controller");
const router = express.Router();
router.route('/insert').post(userRegistration)
router.route('/display').get(getAllUsersData)
router.route('/delete/:user_id').delete(deleteAUser)
router.route('/update/:user_id').patch(updateAUser)
router.route('/search/:value').get(searchResults)
module.exports = {router};