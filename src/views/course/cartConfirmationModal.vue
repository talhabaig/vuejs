<template>
<b-modal no-close-on-backdrop
 centered text id="confirmCartModal" title="" hide-header hide-footer>
<div class="text-center mtb30">
<div class='modal-head modal-head-success'>Successfully Added!</div>
<div class="button-bar-confirm">
    <button
    class="btn trial-btn"
    @click="$bvModal.hide('confirmCartModal')"
    >
    Continue Shopping 
    </button>
    <button
    @click="goToCart()"
    class="btn cart-btn"          
    >
    Go To Cart
    </button>
</div>
</div>
</b-modal>
</template>

<script>
export default {
  methods: {
    goToCart() {
      this.$router.push({ name: "cart" });
    }
  }
};
</script>

