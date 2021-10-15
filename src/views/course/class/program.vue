<template>
  <section class="course-wizard wizard-background">
    <div class="container">
      <div class="text-center">
        <div class="row">
          <div class="col-md-12">
                     <div class="generic-wizard-heading">
             Select Your Class
         </div>
                          <p class="generic-wizard-subheading">
             Click on the tabs below to select your respective class.
             <br/>
Don’t worry you are just a few clicks away.


         </p>
          </div>
        </div>
        <div v-if="selectedClass && classes">
          <div
            :class="{ highlight: selectedClass.ProgramId == item.ProgramId }"
            @click="setSelectedClass(item)"
            class="board-box"
            v-for="(item, index) in classes"
            :key="index"
          >
            <span
              :class="{
                highlightfa: selectedClass.ProgramId == item.ProgramId,
              }"
            >
              <i class="fa fa-check-circle"></i>
            </span>
        <div class="course-icon">
         <img src="/assets/images/homepage/New-feature-2.svg"/>
        
        </div>
            <div class="board-box-head">
              {{ item.Name }}
            </div>
          </div>
          <div class="text-center">
            <button
              @click="UpdateNextWizard()"
              class="wizard-btn active-btn btn btn-next"
              :disabled="isNextButtonDisabled"
            >
              Next
            </button>
          </div>
        </div>

        <!-- <p>{{ selectedClass }}</p> -->
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  classes as classesStoreKeys,
  course as courseStoreKeys,
} from "../../../store/keys";
//import classesStoreModule from "../../../store/modules/course/class";
import { appConstants } from "../../../common/constants";
export default {
  // Client-side only
  metaInfo: {
    title: "Class | KIPS LMS",
    titleTemplate: "",
    htmlAttrs: {
      lang: "en",
      amp: true,
    },
  },
  mounted() {
    this.getClasses();
    // if (this.classes[0]) {
    //   this.updateSelectedClass(this.classes[0]);
    // }
  },
  created() {
    // console.log("I am created", this.classes);
    // this.updateSelectedClass(this.classes[0]);
  },

  data() {
    return {
      //selectedProgramId: 0,
      isNextButtonDisabled: false,
      selectedClass: null,
    };
  },
  asyncData({ store, route }) {},
  computed: {
    ...mapGetters(classesStoreKeys.namespace, classesStoreKeys.getters),
    ...mapGetters(courseStoreKeys.namespace, courseStoreKeys.getters),
  },
  // Server-side only
  serverPrefetch() {},
  methods: {
    ...mapActions(classesStoreKeys.namespace, classesStoreKeys.actions),
    ...mapActions(courseStoreKeys.namespace, courseStoreKeys.actions),
    getClasses() {
      return this.get_Classes({
        config: {
          loader: {
            show: true,
          },
        },
      })
        .then((response) => {
          if (this.classes.length > 0) {
            this.selectedClass = this.classes[0];
          }
        })
        .catch((ex) => {
          this.$alertError(ex.message);
        });
    },
    updateSelectedClass(program) {
      //this.selectedProgramId = program.ProgramId;
      this.update_SelectedClass({
        data: {
          program: { id: program.ProgramId, name: program.Name },
          programCategory: {
            Id: appConstants.enums.programCategory.Class,
            name: "",
          },
        },
        config: {
          loader: {
            show: false,
          },
        },
      })
        .then((response) => {
          this.isNextButtonDisabled = false;
          // this.$emit("onUpdateWizard", "wizard-step1");
          this.RouteTo(
            "/class/" +
              this.RemoveSpecialChars(this.selectedCourseInfo.program.name) +
              "-" +
              this.selectedCourseInfo.program.id
          );
        })
        .catch((ex) => {
          this.$alertError(ex.message);
        });
    },

    setSelectedClass(program) {
      this.selectedClass = program;
    },

    UpdateNextWizard() {
      this.updateSelectedClass(this.selectedClass);
    },
  },
};
</script>
