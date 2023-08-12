import cardValidator from "card-validator"

export const creditCardNo = {
    $validator: val => {
        if(typeof value === 'undefined' || value === null || value === ''){
            return true
        }

        //Just Validates the format, not if its a live card
        return cardValidator.number(value).isValid
    },
    $message: "Not a valid credit card number"
}