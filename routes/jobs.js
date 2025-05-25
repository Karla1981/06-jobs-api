const express = require('express')
const router = express.Router()

// Import all functions from jobs.js controllers
const {
    getAllJobs, 
    getJob, 
    createJob, 
    updateJob, 
    deleteJob} = require('../controllers/jobs')

// set up routes for these functions
router.route('/').post(createJob).get(getAllJobs)
router.route('/:id').get(getJob).delete(deleteJob).patch(updateJob)

module.exports = router