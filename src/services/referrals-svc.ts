import { Referral, Patient } from "../classes/referral"

class ReferralsServiceClass {
    public referrals: Referral[];

    constructor() {}

    async load() {
        if (this.referrals) {
            return this.referrals;
        } else {

            let url = "http://home.clinfhir.com:8054/baseR4/Task?code=http://clinfhir.com/cs/taskType|referral&_include=Task:subject"
            //url += "&_include=Task:for"
            console.log('about to make request')
            let response = await fetch(url)
            console.log('after make request')
            let bundle = await response.json()

            this.referrals = [];
            if (bundle.entry) {

                //pull out all the patients so we can associate them with the task
                let hashPatient = {}
                bundle.entry.map((entry) => {
                    let resource = entry.resource
                    if (resource.resourceType == 'Patient') {
                        let patient = new Patient(resource.id, resource.name[0].text)
                        hashPatient['Patient/' + resource.id] = patient
                    }
                })
console.log(hashPatient)
                //now process the tasks
                bundle.entry.map((entry) => {
                    let resource = entry.resource
                    if (resource.resourceType == 'Task') {
                        let referral = new Referral(resource.id,resource.description)
                        console.log(resource.for)
                        let patient = hashPatient[resource.for.reference]
                        if (patient) {
                            referral.patient = hashPatient[resource.for.reference]
                            //referral.patientName = patient.name[0].text;    //in reality need to work out the patient
                        } else {
                            //unknown patient - should never happen
                            referral.patient = new Patient("0","Unknown patient")
                        }
                        
                        this.referrals.push(referral);
                    }
                   
                })
            }
           

            //console.log('---',bundle)



/*

            this.referrals = []
            this.referrals.push(new Referral("1","referral 1"));
            this.referrals.push(new Referral("2","referral 2"));
*/

            return this.referrals;


        }
    }

    public getReferral(id) {
        let ar = this.referrals.filter(referral => referral.id == id)
        return ar[0]
    }


}

export const ReferralsService = new ReferralsServiceClass()