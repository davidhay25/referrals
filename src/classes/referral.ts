
import { ageString } from "../helpers/utils"

export class Patient {
    id: string;
    name : string;
    DOB : string;
    gender : string;
    display : string;

    constructor (id : string, name : string, gender?: string, DOB? : string) {
        this.id = id;
        this.name = name;
        this.display = name ;
        if (gender) {
            this.display += ",   " + gender[0].toUpperCase() + gender.substr(1);
        }
        if (DOB) {
            this.display += ",   " + DOB;
            //let date = new Date(DOB);
            //console.log(DOB,ageString( new Date(DOB) ))
            this.display += "   (" + ageString( new Date(DOB)) + ")";

            //this.display += "   " + date.toISOString();
        }
    }
}

export class Annotation {
    text : string;

    constructor (text:string) {
        this.text = text;
    }
}


export class Referral {
    display: string;
    id : string;
    patientName : string;
    patient: Patient;
    note: Annotation[];

    constructor (id:string,display: string) {
        this.id = id;
        this.display = display;
        this.patient = new Patient("0","")
        this.note = []
        //console.log(this.patient)
    }
}

export class Service {
    name : string;
    id : string;

    constructor (id:string, name:string ) {
        this.name = name;
        this.id = id;
    }

}