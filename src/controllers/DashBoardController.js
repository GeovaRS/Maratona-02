const Profile = require('../model/Profile');
const Job = require('../model/Job');
const JobUtils = require('../utils/JobUtils');

module.exports = {
 async index(req, res) {
  const profile = await Profile.get();
  const jobs = await Job.get();

  let statusCount = {
   progress: 0,
   done: 0,
   total: jobs.length
  };

  // Total de horas por dia de cada Job em Progresso
  let jobTotalHours = 0;

  const updatedJobs = jobs.map((job) => {
   const remaining = JobUtils.remainingDays(job);
   const status = remaining <= 0 ? "done" : "progress";

   // Incrementar a quantidade de status
   statusCount[status] += 1;

   // Total de horas por dia de cada Job em Progresso
   jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours;

   return {
    ...job,
    remaining,
    status,
    budget: JobUtils.calculateBudget(job, profile["value-hour"])
   };
  });

  // Qtd de horas que quero trabalhar dia (Profile)
  // Menos
  // Qtd de horas/dia de cada job em progress
  const freeHours = profile["hours-per-day"] - jobTotalHours;

  return res.render(`index`,
  {jobs: updatedJobs, profile, statusCount, freeHours});
 }
};
