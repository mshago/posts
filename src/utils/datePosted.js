export const datePosted = (dateN, dateP) => {
  const difference = (dateN.getTime() - dateP.getTime())/1000 //sec

  if(difference<60){
    return Math.abs(Math.floor(difference))+'s'
  }
  if((difference/60)<60){
    const min = Math.floor(difference/60)
    return min+'m'
  }
  if((difference/60/60)<24){
    const hours = Math.floor(difference/60/60)
    return hours+'h'
  }
  const days = Math.floor(difference/60/60/24)
  return days+'d'
}