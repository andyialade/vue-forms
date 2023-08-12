<template>
    <div class="border rounded p-2">
      <slot></slot>
      <div class="form-group">
            <label for="address1">Address Line 1</label>
            <input id="address1" type="text" v-model="address.addressLine1.$model" :disabled="isDisabled" class="form-control" placeholder="Address Line 1"/>
            <ValidationMessage :model="address.addressLine1" />
          </div>
          <div class="form-group">
            <label for="address2">Address Line 2</label>
            <input id="address2" type="text" v-model="address.addressLine2.$model" :disabled="isDisabled" class="form-control" placeholder="Address Line 2"/>
            <ValidationMessage :model="address.addressLine2" />
          </div>
          <div class="row">
            <div class="form-group col-6">
              <label for="city">City</label>
              <input id="city" type="text" v-model="address.cityTown.$model" :disabled="isDisabled" class="form-control" placeholder="e.g New York"/>
              <ValidationMessage :model="address.cityTown" />
            </div>
            <div class="form-group col-3">
              <label for="stateProvince">State</label>
             <select id="stateProvince" v-model="address.stateProvince.$model" :disabled="isDisabled" class="form-control">
              <option v-for="state in states" :key="state.abbreviation" :value="state.abbreviation">{{ stateFormat(state) }}</option>
             </select>
             <ValidationMessage :model="address.stateProvince" />
            </div>
            <div class="form-group col-3">
              <label for="postalCode">Postal Code</label>
              <input id="postalCode" v-model="address.postalCode.$model" :disabled="isDisabled" type="text" class="form-control" placeholder="e.g. 10101"/>
              <ValidationMessage :model="address.postalCode" />
            </div>
      </div>
    </div>
</template>

<script>
import states from '@/lookup/states'
import formatters from '@/formatters'
import ValidationMessage from '@/components/ValidationMessage.vue';

export default {
    props: {
        address: {
            type: Object
        },
        isDisabled: {
          type: Boolean
        }
    },
    components: {
      ValidationMessage
    },
    setup(props){
        // const rules = {
        //   address1: { required, minLength: minLength(5) },
        //   address2: {  },
        //   city: { required, minLength: minLength(2) },
        //   state: { required },
        //   zipCode: { required, minLength: minLength(5) }
        // }

        //const model = useVuelidate(rules, props.address);
        //const model = address.toModel();

        return {
            states,
            ...formatters
        }
    }
}
</script>

<style>

</style>