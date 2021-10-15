<template>
  <section class="cart-view">
    <div class="container">
      <div class="head">Course Selected : {{ this.totalRecordInCart }}</div>
      <div class="white-box">
        <div
          class="content-block"
          v-for="(product, index) in cart"
          :key="index"
        >
          <div class="subhead">{{ product.CourseName }}</div>
          <div class="course-amount">
            <span class="amount">{{ product.AmountDisplay }}</span>
            <span class="remove" @click="openConfirmationModal(product.SOSId)">
              <span class="far fa-backspace"></span>
            </span>
          </div>
        </div>
        <no-record-template
          v-if="this.totalRecordInCart == 0"
          message="Your cart is empty. Keep shopping to find a course!"
          showAvatar="false"
        ></no-record-template>
        <div class="total">
          <span class="amount">{{ toCurrency(this.totalAmount) }}</span>
          <span class="subhead">TOTAL</span>
        </div>
        <div class="check-out">
          <button
            class="btn cart-btn"
            :disabled="this.totalRecordInCart == 0"
            @click="checkout()"
          >
            <span>Checkout</span>
          </button>
        </div>
      </div>
    </div>

    <b-modal
      centered
      text
      id="confirmRemoveModal"
      title=""
      hide-footer
      hide-header
    >
      <div class="text-center">
        <p class="modal-head-success">
          Are you sure, you want to remove this course?
        </p>
        <div class="button-bar-confirm">
          <button
            class="btn cart-btn"
            @click="$bvModal.hide('confirmRemoveModal')"
          >
            Cancel
          </button>
          <button class="btn trial-btn" @click="removeFromCart()">
            Remove
          </button>
        </div>
      </div>
    </b-modal>
  </section>
</template>
<script>
import { appConstants } from "../../common/constants";
import { mapGetters, mapActions } from "vuex";
import {
  cart as cartStoreKeys,
  checkout as checkoutStoreKeys,
} from "../../store/keys";
export default {
  metaInfo() {
    return {
      title: "Cart | KIPS LMS",
      titleTemplate: "",
      htmlAttrs: {
        lang: "en",
        amp: true,
      },
    };
  },
  asyncData({ store, route }) {
    //return the Promise from the action
  },
  mounted() {},
  data() {
    return {
      selectedSOSId: null,
    };
  },
  computed: {
    ...mapGetters(cartStoreKeys.namespace, cartStoreKeys.getters),
    ...mapGetters(checkoutStoreKeys.namespace, checkoutStoreKeys.getters),
  },
  methods: {
    ...mapActions(cartStoreKeys.namespace, cartStoreKeys.actions),
    ...mapActions(checkoutStoreKeys.namespace, checkoutStoreKeys.actions),
    openConfirmationModal(sosId) {
      this.selectedSOSId = sosId;
      this.$bvModal.show("confirmRemoveModal");
    },
    removeFromCart() {
      this.remove_FromCart({
        data: this.selectedSOSId,
        config: {
          loader: {
            show: false,
          },
        },
      })
        .then((response) => {
          this.selectedSOSId = null;
          this.$bvModal.hide("confirmRemoveModal");
          this.checkout_cart();
        })
        .catch((ex) => {
          this.$alertError(ex.message);
        });
    },
    checkout() {
      this.checkout_cart().then((response) => {
        //  this.$router.push({ name: "signUp" });
        window.location.href = `${process.env.VUE_APP_PORTAL_URL}/invoice/checkOut`;
      });
    },
  },
};
</script>
