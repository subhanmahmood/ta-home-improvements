class FinanceObject {
    constructor(jobs){
        this.jobs = jobs;
        this.financeJobs = []
        this.sortJobs()
    }  
    getFinanceJobs(){
        return this.financeJobs;
    }
    calculateTotal(array, prop, n){
        n |= 0;
		if(n === array.length){
			return 0;
		} else {
			return array[n][prop] + this.calculateTotal(array, prop, n + 1);
		}
    }
    addFinanceJob(financeJobs, job){
        const date = job.date_added.split('-');
        const year = date[0];
        const month = date[1];
        const day = date[2]
        const years = Object.keys(financeJobs);
        if(years.indexOf(year) !== -1){
            const months = Object.keys(financeJobs[year])
            if(months.indexOf(month) !== -1){
                financeJobs[year][month].push(job)
                return financeJobs
            }else{
                financeJobs[year][month] = []
                this.addFinanceJob(financeJobs, job)
                return financeJobs
            }
        } else {
            financeJobs[year] = {}
            this.addFinanceJob(financeJobs, job)
            return financeJobs
        }
    }
    sortJobs(){
        let updatedJobs = this.jobs
        for(let j = 0; j < updatedJobs.length; j++){
            for(let i = 0; i < updatedJobs.length; i++){
                if(i < updatedJobs.length - 1){
                    const currentJob = updatedJobs[i];                    
                    const nextJob = updatedJobs[i + 1];
                    if(currentJob.date_added > nextJob.date_added){
                        updatedJobs[i] = nextJob;
                        updatedJobs[i + 1] = currentJob;
                    }
                }
            }
        }
        this.jobs = updatedJobs
        this.sortJobsIntoMonths()
    }
    sortJobsIntoMonths(){
        const jobs = this.jobs;
        let financeJobs = [];
        jobs.forEach((job) => {
            this.addFinanceJob(financeJobs, job)
        })
        this.financeJobs = financeJobs;
    }
}

export default FinanceObject