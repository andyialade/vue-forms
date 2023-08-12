import useVuelidate from "@vuelidate/core";
import { required } from '@vuelidate/validators';
import { creditCardNo } from '@/validators'

export default class CreditCardModel {
    number = "";
    nameOnCard = "";
    expirationMonth = 1;
    expirationYear = 2023;
    ccv = "";

    get rules () {
        return {
            number: { required, creditCardNo },
            nameOnCard: { required },
            expirationMonth: { required },
            expirationYear: { required },
            ccv: { required }
        }
    }

    toModel() {
        return useVuelidate(this.rules, this)
    }
}