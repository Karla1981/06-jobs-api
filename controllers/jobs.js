const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

// get all jobs
const getAllJobs = async (req, res) => {
    res.send('get all jobs')
}
// get single job
const getJob = async (req, res) => {
    res.send('get single job')
}
// create job
const createJob = async (req, res) => {
    try {

        req.body.createdBy = req.user.userId
        const job = await Job.create(req.body)
        res.status(StatusCodes.CREATED).json({ job })

    } catch (error) {
        
        res.send(error)
    }
}
// update job
const updateJob = async (req, res) => {
    res.send('update job')
}
// delete job
const deleteJob = async (req, res) => {
    res.send('delete job')
}

module.exports = {
    getAllJobs,
    getJob, 
    createJob,
    updateJob,
    deleteJob 
}