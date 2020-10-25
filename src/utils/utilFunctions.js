/*
  Takes string convertable to js Date object
  and returns unix time of it
*/

export const unixDateFromString = date => {
  return Math.round(new Date(date).getTime() / 1000)
}
