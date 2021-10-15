<template>
  <section>
    <div class="row">
      <div class="col-md-12">
        <div class="generic-wizard-heading">Select Your Course Group</div>
        <p class="generic-wizard-subheading">
          Click on the tabs below to select your desired group.
        </p>
      </div>
    </div>
    <div v-if="selectedClassGroup && courseGroups">
      <div
        :class="{
          highlight: selectedClassGroup.CourseGroupId == item.CourseGroupId,
        }"
        @click="updateSelectedCourseGroup(item)"
        class="board-box"
        v-for="(item, index) in courseGroupsList"
        :key="index"
      >
        <span
          :class="{
            highlightfa: selectedClassGroup.CourseGroupId == item.CourseGroupId,
          }"
        >
          <i class="fa fa-check-circle"></i>
        </span>
        <div class="course-icon">
          <!-- <img src="/assets/images/homepage/New-feature-2.svg"/> -->
          <img :src="item.Icon" />
          <!-- <em :class="item.IconKey"></em> -->
        </div>

        <div class="board-box-head">
          {{ item.Name }}
        </div>
      </div>
      <div>
        <button
          @click="UpdateNextWizard()"
          class="wizard-btn active-btn btn btn-next"
          :disabled="isNextButtonDisabled"
        >
          Next
        </button>
      </div>
    </div>

    <!-- <loader id=""></loader> -->
    <!-- <p>{{ selectedCourseInfo }}</p> -->
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  courseGroup as courseGroupStoreKeys,
  course as courseStoreKeys,
} from "../../../store/keys";

import breadcrumb from "../breadcrumb.vue";
export default {
  // Client-side only
  components: {
    breadcrumb,
  },

  mounted() {
    this.getCourseGroups();
    //this.updateSelectedCourseGroup(this.courseGroups[0]);
  },
  data() {
    return {
      isNextButtonDisabled: true,
      selectedClassGroup: null,
      courseGroupsList: [],
    };
  },
  destroyed() {
    //this.resetCourseGroups();
  },
  // Server-side only
  serverPrefetch() {},
  computed: {
    ...mapGetters(courseStoreKeys.namespace, courseStoreKeys.getters),
    ...mapGetters(courseGroupStoreKeys.namespace, courseGroupStoreKeys.getters),
  },
  methods: {
    ...mapActions(courseStoreKeys.namespace, courseStoreKeys.actions),
    ...mapActions(courseGroupStoreKeys.namespace, courseGroupStoreKeys.actions),
    getCourseGroups() {
      this.get_CourseGroups({
        data: {
          ProgramId: this.selectedProgram.id,
          BoardId: this.selectedBoard.id,
        },
        config: {
          loader: {
            show: true,
            //id :"courseGroupLoader"
          },
        },
      })
        .then((response) => {
          this.courseGroupsList = response.CourseGroups;

          this.updateSelectedCourseGroup(
            this.selectedCourseInfo.courseGroup.id === 0
              ? response.CourseGroups[0]
              : response.CourseGroups.find((courseGroup) => {
                  return (
                    courseGroup.CourseGroupId ===
                    this.selectedCourseInfo.courseGroup.id
                  );
                })
          );

          this.update_SelectedCourseGroup({
            data: {
              id: 0,
              name: "",
            },
          });
        })
        .catch((ex) => {
          this.$alertError(ex.message);
        });
    },
    // resetCourseGroups() {
    //   // this.reset_CourseGroups().then(response => {});
    // },
    updateSelectedCourseGroup(courseGroup) {
      this.selectedClassGroup = courseGroup;
      this.isNextButtonDisabled = false;
    },
    UpdateNextWizard() {
      this.update_SelectedCourseGroup({
        data: {
          id: this.selectedClassGroup.CourseGroupId,
          name: this.selectedClassGroup.Name,
        },
        config: {
          loader: {
            show: true,
          },
        },
      })
        .then((response) => {
          this.$emit("onUpdateWizard", "wizard-step4");
        })
        .catch((ex) => {
          this.$alertError(ex.message);
        });
    },
  },
};
</script>
