import { Referral } from "../classes/referral"

class ReferralsServiceClass {
    public referrals: Referral[];

    constructor() {}

    async load() {
        if (this.referrals) {
            return this.referrals;
        } else {
            this.referrals = []
            this.referrals.push(new Referral("1","referral 1"));
            this.referrals.push(new Referral("2","referral 2"));
            return this.referrals;
        }
    }

    public getReferral(id) {
        let ar = this.referrals.filter(referral => referral.id == id)
        return ar[0]
    }


}

export const ReferralsService = new ReferralsServiceClass()