import {BaseProvider} from "@/api/providers/base.provider";

export class UserProvider extends BaseProvider {
    constructor() {
        super('user');
    }
}