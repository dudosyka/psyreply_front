import ApiResolver from "@/api/ApiResolver";
import {CompanyDistribution} from "@/api/admin/distribution/CompanyDistribution";

export class BotModel extends ApiResolver {
    companyDistributionModel = new CompanyDistribution()
    constructor(
    ) {
        super('bot');
    }

    async isSet() {
        const res = await this.request('', 'GET', null);
        if (res.length) {
            return res[0];
        } else {
            return false;
        }
    }

    async create({ name, token }) {
        return await this.companyDistributionModel.createBot({name, token})
    }
}