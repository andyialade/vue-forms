<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import PaymentView from '@/views/PaymentView.vue'
import Error from "./components/Error.vue";
import { ref } from 'vue'
import state from "@/state";

export default{
  setup() {
    //const errorMessage = ref("");

    // function reportError(message){
    //   errorMessage.value = message
    // }

    return {
      errorMessage : state.errorMessage,
      //reportError
    }
  },
  components: {
    Header,
    Footer,
    PaymentView,
    Error
  }
}
</script>
<template>
  <Header />
  <div class="container bg-slate-300 mx-auto p-2">
    <Error :message="errorMessage" />
    <PaymentView />
    <!-- <PaymentView @onError="reportError" /> -->
  </div>
  <Footer />
</template>
