<template>
  <div class="landingpage-body" v-show="displayUI">
    <div
      @click="gotToTop"
      class="btn-goto-top"
      v-bind:class="{ showGoToTopBtn: scrolled }"
    >
      <i class="fas fa-angle-up" aria-hidden="true"></i>
    </div>

    <app-header :scrolled="scrolled"></app-header>
    <div class="landing-page-content">
      <transition-page>
        <router-view />
      </transition-page>
      <chatModal></chatModal>
    </div>
    <div class="landing-page-footer">
      <!-- <app-footer></app-footer> -->
    </div>
  </div>
</template>
<script>
import TransitionPage from "../../transitions/TransitionPage.vue";
import Header from "./appHeader.vue";
import Footer from "./appFooter.vue";
import chatModal from "../../components/chatModal";

export default {
  components: {
    appHeader: Header,
    appFooter: Footer,
    TransitionPage,
    chatModal,
  },

  data() {
    return {
      scrolled: false,
      displayUI: true,
    };
  },

  mounted() {
    this.displayUI = true;
    window.addEventListener("scroll", this.handleScroll);
  },

  methods: {
    handleScroll() {
      this.scrolled = window.scrollY > 0;
    },
    gotToTop() {
      window.scrollTo(0,0);
      window.location.hash = '';
    },
  },
  watch: {
    "$route.query"() {
      //alert(this.$route.hash)
      if (this.$route.hash) {
        var elm = this.$route.hash.slice(1);
       this.scrollToElement(elm);
      }
    },
  },
  created() {
    this.displayUI = true;
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
