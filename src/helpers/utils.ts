
import moment from "moment"


export function sayHello() {
  return Math.random() < 0.5 ? 'Hello' : 'Hola';
}

export function ageString (date : Date) {
  if (date) {
  
    var diff = moment().diff(moment(date),'days');
    var disp = "";
  
    if (diff < 0) {
        //this is a future date...
        return "";
    }
    if (diff < 14) {
        disp = diff + " days";
    } else if (diff < 32) {
        disp = Math.floor( diff/7) + " weeks";
    } else {
        disp = Math.floor( diff/365) + " years";
        //todo logic for better age
    }
    return disp;
  } else {
    return ""
  }


}