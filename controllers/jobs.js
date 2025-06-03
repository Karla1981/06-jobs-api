const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

// get all jobs
const getAllJobs = async (req, res) => {
//we are only looking for the jobs associated with this* user
const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
res.status(StatusCodes.OK).json({jobs, count:jobs.length})
}
// get single job
const getJob = async (req, res) => {
    // user objec and user id - looking for 'id'
    // get sigle job by id
    const { user:{userId},params:{id:jobId}} = req

    const job = await Job.findOne({ _id:jobId, createdBy:userId })
    if(!job){
        throw new NotFoundError(`No job with that id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })

}
// create job - need uthorization token/bearer to create job for x user
const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}
// update job
const updateJob = async (req, res) => {
    //
    const { 
        body:{ company, position },
        user:{ userId },  
        params:{ id:jobId }} = req
        
    if(company===''|| position === ''){
        throw new BadRequestError('Company or Position fields cannot be empty')
    }
    const job = await Job.findByIdAndUpdate({_id:jobId, createdBy:userId},
        req.body, {new:true, runValidators:true })
    // throw error if job doesn't exist
    if(!job){
        throw new NotFoundError(`No job with that id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job })
}
// delete job
const deleteJob = async (req, res) => {
    const { user: { userId }, params: { id:jobId }} = req

    const job = await Job.findOneAndDelete({
        _id: jobId,
        createdBy:userId
    })

    if(!job){
        throw new NotFoundError(`No job with that id ${jobId}`)
    }
    res.status(StatusCodes.OK).send()
}

module.exports = {
    getAllJobs,
    getJob, 
    createJob,
    updateJob,
    deleteJob 
}