<template>
    <h2>Payment</h2>
    <form novalidate @submit.prevent="onSave">
      <div class="row">
        <div class="col-6">
          <strong>Shipping Information</strong>
          <AddressView :address="model.shipping">
            <div class="form-group">
              <label for="name">Name</label>
              <input id="name" type="text" v-model="model.shipping.fullName.$model" class="form-control" placeholder="Your Name"/>
            </div>
            <div class="form-group">
              <label for="company">Company Name</label>
              <input id="company" type="text" v-model="model.shipping.company.$model" class="form-control" placeholder="Company Name"/>
            </div>
          </AddressView>
          <div class="form-group">
            <input type="submit" :disabled="model.creditCard.$invalid" value="Next" class="btn btn-success"/>
          </div>
        </div>
        <div class="col-6">
          <strong>Billing Information</strong>
          <AddressView :address="model.billing" :isDisabled="model.billing.sameAsShipping">
            <div class="form-check"> 
              <input type="checkbox" id="sameAsShipping" class="form-check-input" v-model="model.billing.sameAsShipping.$model" />
              <label for="sameAsShipping" class="form-check-label">Same As Shipping ?</label>
            </div>
          </AddressView>     
          <div>
            <strong>Payment Details</strong> 
            <div class="form-group">
              <label for="ccNumber">Credit Card No</label>
              <input id="ccNumber" type="text" v-model="model.creditCard.number.$model"  class="form-control" placeholder="1122-1111"/>
              <ValidationMessage :model="model.creditCard.number" />
            </div>
            <div class="form-group">
              <label for="ccName">Name On Card</label>
              <input id="ccName" type="text" v-model="model.creditCard.nameOnCard.$model"  class="form-control" placeholder="Mr IO Smith"/>
              <ValidationMessage :model="model.creditCard.nameOnCard" />
            </div>
            <div class="row"> 
              <div class="form-group col-4"> 
                <label for="expirationMonth">Expiration Month</label>
                <select id="expirationMonth" v-model="model.creditCard.expirationMonth.$model" class="form-control">
                  <option v-for="month in months" :key="month.number" :value="month.number">{{ month.name }}</option>
                </select>
                <ValidationMessage :model="model.creditCard.expirationMonth" />
              </div>
              <div class="form-group col-4"> 
                <label for="expirationYear">Expiration Year</label>
                <select id="expirationYear" v-model="model.creditCard.expirationYear.$model" class="form-control">
                  <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                </select>
                <ValidationMessage :model="model.creditCard.expirationYear" />
              </div>
              <div class="form-group col-4"> 
                <label for="cvv">CVV Code</label>
                <input id="cvv" type="text" v-model="model.creditCard.ccv.$model"  class="form-control" placeholder="345"/>
                <ValidationMessage :model="model.creditCard.ccv" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    <div>
      <pre>{{ payment }}</pre>
    </div>
</template>

<script>
import { computed, watch, reactive } from 'vue'
import months from '@/lookup/months'
import state from "@/state";
import AddressView from './AddressView.vue'
import ValidationMessage from '@/components/ValidationMessage.vue';


export default {
    components: {
        AddressView,
        ValidationMessage
    },
    emits: [ 'onError' ],
    setup(props, { emit }){
    // const payment = ref({
    //   shipping: {
    //     fullName: 'Ibukun Alade',
    //     zipCode: 123456
    //   },
    //   billing: {
    //     sameAsShipping: false
    //   },
    //   creditCard:{
    //   }
    // });

    const payment = reactive(state)

    async function onSave(){
      //emit("onError", "We cant save yet, we don't have an API");
      if(await creditCardModel.value.$validate()){
        state.errorMessage.value = "We cant save yet, we don't have an API";
      }
    }

    const postalCode = computed({
      get: () => payment.zipCode,
      set: (val) => {
        if(val && typeof val === 'string'){
          if(val.length <=5 || val.indexOf('-') > -1){
            payment.zipCode = val;
          }
          else{
            payment.zipCode =  `${val.substring(0,5)}-${val.substring(5)}`;
          }
        }
      }
    })

    const years = Array.from({length: 10}, (_, i) => i + 2020);

    // const rules = {
    //   number: { required, creditCardNo },
    //   nameOnCard: { required },
    //   expirationMonth: { required },
    //   expirationYear: { required },
    //   ccv: { required }
    // }

    //const creditCardModel = state.creditCard.toModel();

    const model = state.toModel();

    // watch(
    //   //What to watch
    //   () => payment.billing.sameAsShipping,
    //   //What to do
    //   () => {
    //     if(payment.billing.sameAsShipping){
    //       payment.clear();
    //       // payment.value.billing.address1 = '';
    //       // payment.value.billing.address2 = '';
    //       // payment.value.billing.city = '';
    //       // payment.value.billing.state = '';
    //       // payment.value.billing.zipCode = '';
    //     }
    //   }
    // );

    watch ([payment.billing, payment.shipping],
      () => {
        if(payment.billing){
          if(payment.billing.sameAsShipping){
            payment.billing.setFrom(payment.shipping);
          }
        }
        //payment.billing.clear();
      }
    )

    return {
      payment,
      model,
      months,
      years,
      onSave,
      postalCode,
    };
  },
}
</script>