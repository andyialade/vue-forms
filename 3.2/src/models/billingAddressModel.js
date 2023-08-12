import AddressModel from "./addressModel";

export default class BillingAddressModel extends AddressModel {
    sameAsShipping = false;

    get rules(){
        return Object.assign({
            sameAsShipping: { },
        },  super.rules);
    }
}