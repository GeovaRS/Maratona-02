module.exports = {
 remainingDays(job) {
  // Cálculo de tempo restante
  const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();

  const createdDate = new Date(job.created_at);
  const dueDay = createdDate.getDate() + Number(remainingDays);
  const dueDate = createdDate.setDate(dueDay);
  const timeDiffInMs = dueDate - Date.now();

  // Transformar mili segundos em dias 86400000
  const dayInMs = 1000 * 60 * 60 * 24;

  // Bug Descoberto e Corrigido pelo Victão da Comunidade Discover (Discord)
  // const dayDiff = Math.floor(timeDiffInMs / dayInMs).toFixed();
  const dayDiff = Math.ceil(timeDiffInMs / dayInMs).toFixed();

  // Restam x dias
  return dayDiff;
 },

 calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}
