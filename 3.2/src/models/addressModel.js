import { required, minLength } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

export default class AddressModel {
    addressLine1 = "";
    addressLine2 = "";
    cityTown = "";
    stateProvince = "";
    postalCode = "";

    clear(){
        this.addressLine1 = "";
        this.addressLine2 = "";
        this.cityTown = "";
        this.stateProvince = "";
        this.postalCode = "";
    }

    setFrom(address){
        this.addressLine1 = address.addressLine1;
        this.addressLine2 = address.addressLine2;
        this.cityTown = address.cityTown;
        this.stateProvince = address.stateProvince;
        this.postalCode = address.postalCode;
    }

    get rules() {
        return {
            addressLine1: { required, minLength: minLength(5) },
            addressLine2: {  },
            cityTown: { required, minLength: minLength(2) },
            stateProvince: { required },
            postalCode: { required, minLength: minLength(5) }
        };
    }

    toModel() {
        return useVuelidate(this.rules, this)
    }
}