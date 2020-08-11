
export class Patient {
    id: string;
    name : string;
    DOB : string;
    gender : string;

    constructor (id : string, name : string) {
        this.id = id;
        this.name = name;
    }
}

export class Referral {
    display: string;
    id : string;
    patientName : string;
    patient: Patient;

    constructor (id:string,display: string) {
        this.id = id;
        this.display = display;
        this.patient = new Patient("0","Loading...")
        console.log(this.patient)
    }
}