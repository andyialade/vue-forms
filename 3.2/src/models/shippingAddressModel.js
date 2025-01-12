import AddressModel from "./addressModel";
import { required } from '@vuelidate/validators';


export default class ShippingAddressModel extends AddressModel {
    fullName = "";
    company = "";

    get rules(){
        return Object.assign({
            fullName: { required },
            company: { }
        }, super.rules);
    }
}