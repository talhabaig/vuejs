<template>
  <section class="online-course-details">
    <div class="container">
          <div class="row">
      <div class="col-md-12">
          <div class="generic-wizard-heading">
             Select Your Course
         </div>
         <p class="generic-wizard-subheading">
           Click on the tabs below to select your respective plan.<br>
Don’t worry you are just a few clicks away.
         </p>
              
      </div>
    </div>
      <div class="row">
        <div
          class="col-md-6"
          v-for="(course, index) in courseList"
          :key="index"
        >
          <courseTemplate
            :model="course"
            :programCategoryId="programCategoryId"
          />
        </div>
      </div>
    </div>
    <div>
      <div v-if="courseList" class="row">
        <!-- <b-button
          @click="updateSelectedSOS(course)"
          class="btn selection-btn"
          v-for="(course, index) in courseList"
          :key="index"
          >{{ course.SOSName }}</b-button
        >
        <b-button
          @click="UpdateNextWizard()"
          class="wizard-btn active-btn btn"
          :disabled="isNextButtonDisabled"
          >Next
        </b-button> -->
        <loader id="classCoursesLoader"></loader>
      </div>
      <no-record-template
        v-if="showRecordsNotFound && courseList.length == 0"
      ></no-record-template>

      <div class="load-more">
        <a
          v-if="canCoursesLoadMore"
          id="btnLoadMore"
          @click="loadMore"
          href="javascript:void(0)"
          class
        >
          <i class="far fa-chevron-down"></i>
          <div class="loadmore-separator"></div>
        </a>
      </div>
    </div>
    <cartConfirmationModal />
  </section>
</template>
<script>
import { appConstants } from "../../../common/constants";
import { mapGetters, mapActions } from "vuex";
import {
  classCourses as classCoursesStoreKeys,
  course as courseStoreKeys,
} from "../../../store/keys";
import courseTemplate from "../courseTemplate.vue";
import breadcrumb from "../breadcrumb.vue";
import cartConfirmationModal from "../cartConfirmationModal.vue";
export default {
  components: {
    courseTemplate,
    breadcrumb,
    cartConfirmationModal,
  },
  mounted() {
    //this.resetClassCourses();
    this.getClassCourses();
  },
  computed: {
    ...mapGetters(courseStoreKeys.namespace, courseStoreKeys.getters),
    ...mapGetters(
      classCoursesStoreKeys.namespace,
      classCoursesStoreKeys.getters
    ),
  },
  data: function () {
    return {
      coursePaging: {
        pageNumber: 1,
        pageSize: 2,
      },
      showRecordsNotFound: false,
      programCategoryId: appConstants.enums.programCategory.Class,
    };
  },
  beforeDestroy() {},
  destroyed() {
    //this.resetClassCourses();
  },
  methods: {
    ...mapActions(courseStoreKeys.namespace, courseStoreKeys.actions),
    ...mapActions(
      classCoursesStoreKeys.namespace,
      classCoursesStoreKeys.actions
    ),
    getClassCourses(pagingMode) {
      this.get_ClassCourses({
        data: {
          ProgramId: this.selectedProgram.id,
          BoardId: this.selectedBoard.id,
          CourseGroupId: this.selectedCourseGroup.id,
          ProgramCategoryId: appConstants.enums.programCategory.Class,
          PageNumber: this.coursePaging.pageNumber,
          PageSize: this.coursePaging.pageSize,
        },
        config: {
          loader: {
            show: true,
            id: "classCoursesLoader",
          },
        },
        pagingMode: pagingMode,
      })
        .then((response) => {
          this.showRecordsNotFound = true;
          this.coursePaging.pageNumber = response.PageNumber;
        })
        .catch((ex) => {
          this.$alertError(ex.message);
        });
    },
    resetClassCourses() {
      this.reset_ClassCourses().then((response) => {
        this.getClassCourses();
      });
    },
    updateSelectedSOS(course) {
      this.update_SelectedSOS({
        data: { id: course.SOSId, name: course.SOSName },
        config: {
          loader: {
            show: false,
          },
        },
      })
        .then((response) => {
          // this.$router.push(
          //   "/class/detail/9th-25/punjab/engineering?s=" +
          //     this.selectedCourseInfo.sos.id +
          //     "&b=" +
          //     this.selectedCourseInfo.board.id +
          //     "&g=" +
          //     this.selectedCourseInfo.courseGroup.id
          // );
        })
        .catch((ex) => {
          this.$alertError(ex.message);
        });
    },
    loadMore() {
      this.coursePaging.pageNumber++;
      this.getClassCourses(appConstants.enums.pagingMode.loadMore);
    },
    UpdateNextWizard() {
      this.$router.push(
        "/class/detail/" +
          this.RemoveSpecialChars(this.selectedCourseInfo.sos.name) +
          "/" +
          this.RemoveSpecialChars(this.selectedCourseInfo.board.name) +
          "/" +
          this.RemoveSpecialChars(this.selectedCourseInfo.courseGroup.name) +
          "?s=" +
          this.selectedCourseInfo.sos.id +
          "&b=" +
          this.selectedCourseInfo.board.id +
          "&g=" +
          this.selectedCourseInfo.courseGroup.id
      );
    },
  },
};
</script>
<style scoped>
.loadmore-separator {
  background: #ccc;
  height: 1px;
  width: 70%;
  margin-top: -17px;
  margin: -17px auto 0 auto;
}

.load-more {
  text-align: center;
  cursor: pointer;
}

.load-more i {
  background: #fff;
  padding: 9px 10px;
  border-radius: 50%;
  font-size: 17px;
  box-shadow: 0 0 10px 0px #d8d8d8;
}
</style>
