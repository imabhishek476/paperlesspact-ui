export function formatDate(dateString) {
    const monthNames = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    const date = new Date(dateString);
    console.log(date,dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear().toString();
    return `${day} ${month} ${year}`;
  }
  export function formattedTime(timeString) {
    if (!timeString) {
      return "No time added";
    }
    var today = new Date(timeString);
    var hours = today.getHours();
    var minute = today.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours === 0 || hours === 12 ? 12 : hours % 12;
    const formattedMinutes = minute.toString().padStart(2,"0");
    // const timePart = timeString.split(":")[1];
    // const [hours, minutes,x] = timePart.split(":").map(Number);
    // const period = hours >= 12 ? "PM" : "AM";
    // const formattedHours = hours === 0 || hours === 12 ? 12 : hours % 12;
    // const formattedMinutes = x.toString().padStart(2,"0");
    return `${formattedHours}:${formattedMinutes} ${period}`;
  }

  export const getDayHelper = (dateString) =>{
    if(!dateString){
      return null;
    }
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}`;
} 