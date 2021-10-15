<template>
  <section class="course-wizard online-course-details exams-grid">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="generic-wizard-heading">Select Your Exam</div>
          <p class="generic-wizard-subheading">
            Click on the tabs below to select your respective Exam.
            <br />
            Don’t worry you are just a few clicks away.
          </p>
        </div>
      </div>

      <div class="exam-tabs">
        <span
          :class="{
            highlightHead:
              selectedCourseGroupCategory.Id ==
              sosCategory.CourseGroupCategoryId,
          }"
          class="exam-tabs-head"
          v-for="(sosCategory, index) in sosCategories"
          :key="index"
          @click="updateSelectedsosCategory(sosCategory)"
        >
          {{ sosCategory.CourseGroupCategoryName }}
        </span>
      </div>
      <!-- <div class="text-center">
        <div
          :class="{
            highlight:
              selectedCourseGroupCategory.Id ==
              sosCategory.CourseGroupCategoryId,
          }"
          class="board-box mt50"
          v-for="(sosCategory, index) in sosCategories"
          :key="index"
          @click="updateSelectedsosCategory(sosCategory)"
        >
          <span
            :class="{
              highlightfa:
                selectedCourseGroupCategory.Id ==
                sosCategory.CourseGroupCategoryId,
            }"
          >
            <i class="fa fa-check-circle"></i>
          </span>
          <div class="class-box-head">
            {{ sosCategory.CourseGroupCategoryName }}
          </div>
        </div>
      </div> -->
      <div class="row">
        <div
          class="col-md-6"
          v-for="(courseListItem, index) in courseList"
          :key="index"
        >
          <courseTemplate :model="courseListItem" />
        </div>
      </div>
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

    <loader id="menuExamLoader"></loader>
    <cartConfirmationModal />
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  exam as examStoreKeys,
  course as courseStoreKeys,
  classCourses as classCoursesStoreKeys,
} from "../../../store/keys";
import courseTemplate from "../courseTemplate.vue";
import { appConstants } from "../../../common/constants";
import cartConfirmationModal from "../cartConfirmationModal.vue";

export default {
  props: ["CategoryName"],
  // Client-side only
  metaInfo() {
    return {
      title: `${this.selectedCourseGroupCategory.Name}  | KIPS LMS`,
      titleTemplate: "",
      htmlAttrs: {
        lang: "en",
        amp: true,
      },
    };
  },
  components: {
    courseTemplate,
    cartConfirmationModal,
  },
  mounted() {
    let routeParams = this.$route.params;
    this.getExams(routeParams.category);
  },
  data() {
    return {
      selectedCourseGroupCategory: {
        Id: 0,
        Name: "",
      },
      coursePaging: {
        pageNumber: 1,
        pageSize: 6,
        showRecordsNotFound: false,
      },
    };
  },
  asyncData({ store, route }) {},
  computed: {
    ...mapGetters(examStoreKeys.namespace, examStoreKeys.getters),
    ...mapGetters(courseStoreKeys.namespace, courseStoreKeys.getters),
    ...mapGetters(
      classCoursesStoreKeys.namespace,
      classCoursesStoreKeys.getters
    ),
  },
  // Server-side only
  async serverPrefetch() {
    //return this.getExams();
  },
  methods: {
    ...mapActions(examStoreKeys.namespace, examStoreKeys.actions),
    ...mapActions(courseStoreKeys.namespace, courseStoreKeys.actions),
    ...mapActions(
      classCoursesStoreKeys.namespace,
      classCoursesStoreKeys.actions
    ),
    getExams(item) {
      return this.get_Exams({
        config: {
          loader: {
            show: true,
            // id: "menuExamLoader"
          },
        },
      })
        .then((response) => {
          if (this.sosCategories.length > 0) {
            var category = this.sosCategories.find(
              (c) => c.CourseGroupCategoryName.toLowerCase() == item
            );
            this.updateSelectedsosCategory(category || this.sosCategories[0]);
          }
        })
        .catch((ex) => {
          this.$alertError(ex.message);
        });
    },
    loadMore() {
      this.coursePaging.pageNumber++;
      this.getClassCourses(appConstants.enums.pagingMode.loadMore);
    },
    updateSelectedsosCategory(sosCategory) {
      this.selectedCourseGroupCategory.Id = sosCategory.CourseGroupCategoryId;
      this.selectedCourseGroupCategory.Name =
        sosCategory.CourseGroupCategoryName;
      this.coursePaging.pageNumber = 1;
      //this.resetClassCourses();
      this.getClassCourses();
    },
    // resetClassCourses() {
    //   this.reset_ClassCourses().then((response) => {
    //     this.coursePaging.pageNumber = 1;
    //     this.getClassCourses();
    //   });
    // },
    getClassCourses(pagingMode) {
      this.get_ClassCourses({
        data: {
          CourseGroupCategoryId: this.selectedCourseGroupCategory.Id,
          ProgramCategoryId: appConstants.enums.programCategory.Exam,
          PageNumber: this.coursePaging.pageNumber,
          PageSize: this.coursePaging.pageSize,
        },
        config: {
          loader: {
            show: true,
            //id: "classCoursesLoader",
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