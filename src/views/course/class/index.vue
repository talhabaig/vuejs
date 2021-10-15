<template>
  <section class="course-wizard wizard-background">
    <div class="container">
      <breadcrumb
        v-on:onUpdateWizard="updateWizard"
        :model="selectedCourseInfo"
      ></breadcrumb>
      <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-8">
          <div class="wizard-navigation">
            <!-- <button
            class="btn wizard-btn"
            v-bind:class="activeTabClass('wizard-step1')"
          >
            Step 1
          </button> -->
            <button
              class="wizard-btn"
              v-bind:class="activeTabClass('wizard-step2')"
            >
              Step 2
            </button>
            <button
              class="wizard-btn"
              v-bind:class="activeTabClass('wizard-step3')"
            >
              Step 3
            </button>
            <button
              class="wizard-btn"
              v-bind:class="activeTabClass('wizard-step4')"
            >
              Step 4
            </button>
          </div>
        </div>
        <div class="col-md-2"></div>
      </div>
      <div class="row">
        <div class="col-md-12 selection-btn-container">
          <!-- <keep-alive> -->
          <component
            v-bind:is="currentWizard"
            v-on:onUpdateWizard="updateWizard"
          ></component>
          <!-- </keep-alive> -->
        </div>
      </div>
    </div>
    <!-- <p>{{ selectedCourseInfo }}</p> -->
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { course as courseStoreKeys } from "../../../store/keys";
// import { headerType as headerTypeStoreKeys } from "../../store/keys";
import breadcrumb from "../breadcrumb.vue";
export default {
  metaInfo() {
    return {
      title: `${this.selectedCourseInfo.program.name} | KIPS LMS`,
      titleTemplate: "",
      htmlAttrs: {
        lang: "en",
        amp: true,
      },
    };
  },
  components: {
    breadcrumb,
    //"wizard-step1": () => import("./wizard-step1"),
    "wizard-step2": () => import("./wizard-step2"),
    "wizard-step3": () => import("./wizard-step3"),
    "wizard-step4": () => import("./wizard-step4"),
  },
  data() {
    return {
      programName: "",
    };
  },
  asyncData({ store, route }) {
    return Promise.resolve();
  },
  watch: {
    $route(to, from) {
      //alert(to + "load" + from);
      //this.page = window.location.hash.split("#/")[1];

      this.updateWizard("wizard-step2");
    },
  },
  mounted() {
    this.updateWizard("wizard-step2");
  },
  beforeDestroy() {
    this.reset_SelectedCourseInfo();
  },
  computed: {
    ...mapGetters(courseStoreKeys.namespace, courseStoreKeys.getters),
  },
  methods: {
    ...mapActions(courseStoreKeys.namespace, courseStoreKeys.actions),
    activeTabClass(activeTabComponent) {
      return activeTabComponent === this.currentWizard
        ? "active-btn btn"
        : "btn";
    },
    updateWizard(wizard) {
      this.update_CurrentWizard({
        data: wizard,
      }).then((response) => {});
    },
  },
};
</script>

<style>
</style>
