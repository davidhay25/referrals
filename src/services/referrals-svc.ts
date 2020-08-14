import { Referral, Patient } from "../classes/referral"

class ReferralsServiceClass {
    public referrals: Referral[];

    constructor() {}

    //It's actually a proxy to the FHIR server. Currently SSL support, but could implement other stuff like authentication...
    private server : string = "https://survey.clinfhir.com/proxy/"

    async load() {
        if (this.referrals) {
            return this.referrals;
        } else {

            //using clcinfhir to proxy https requests

            let url = this.server + "Task?code=http://clinfhir.com/cs/taskType|referral&_include=Task:subject"

            //let url = "https://survey.clinfhir.com/proxy/Task?code=http://clinfhir.com/cs/taskType|referral&_include=Task:subject"
            //let url = "http://home.clinfhir.com:8054/baseR4/Task?code=http://clinfhir.com/cs/taskType|referral&_include=Task:subject"
           
            //console.log('about to make request')
            let response = await fetch(url)
            //console.log('after make request')

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
//console.log(hashPatient)
                //now process the tasks
                bundle.entry.map((entry) => {
                    let resource = entry.resource
                    if (resource.resourceType == 'Task') {
                        let referral = new Referral(resource.id,resource.description)

                        //console.log(resource.for)
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
           
            return this.referrals;
        }
    }


    //The referral has been accepted. Change the status of the task using a patch operation
    async accept(id : string,priority : string) {
       
        //create a patch document (actually an array)
        let patch = [{op:'replace',path:'/status',value:'accepted'}]
        patch.push({op:'add',path:'/priority',value:priority})
        //console.log(patch)
        //and send it to the server
         let url = this.server + "Task/" + id;
         //console.log(url,patch)

         let config = {'method':'PATCH'};
         config['headers'] = {'content-type':'application/fhir+json'}
         config['body'] = JSON.stringify(patch)

         let response = await fetch(url,config)

        //if successful, remove from the list of referrals

        this.referrals = this.referrals.filter(item => item.id !== id)


        console.log(this.referrals)
        //raise an event 
        window.dispatchEvent(new Event("update"));

         let outcome = await response.json()
         console.log(outcome)
         return {outcome:outcome,ok:response.ok};

    }

    public getReferral(id) {
        let ar = this.referrals.filter(referral => referral.id == id)
        return ar[0]
    }
}

export const ReferralsService = new ReferralsServiceClass()