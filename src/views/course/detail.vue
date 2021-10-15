<template>
  <section v-if="courseDetail" class="course-wizard online-course-details">
    <!-- <div class="course-head">
      <div class="container">
        
      </div>
    </div> -->
    <div class="page-header">
      <div class="container">
        <div class="row">
          <div class="col-md-7">
            <p class="course-heading-caption" v-if="routeParams.board">
              {{ routeParams.board.replace("-", " ") }} -
              {{ routeParams.group }}
            </p>
            <h3>{{ courseDetail.DisplayName }}</h3>
            <p class="course-subhead">
              {{ courseDetail.ShortDescription }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="white-box sticky-side-box">
        <!-- <div class="mb12" v-html="courseDetail.Description"></div> -->
        <div class="sticky-side-box-margin">
          <div
            class="payment-plans"
            v-if="courseDetail.PaymentPlans.length > 0"
          >
            <div class="row">
              <div
                v-for="(plan, index) in courseDetail.PaymentPlans"
                :key="index"
                class="col-md-12"
              >
                <div
                  :class="{
                    highlight:
                      //selectedPaymentPlan.SOSPaymentPlanId == plan.SOSPaymentPlanId,
                      plan.IsSelectedPlan == true,
                  }"
                  class="price-block"
                  :ref="'Price_' + plan.SOSPaymentPlanId"
                  @click="setSelectedPaymentPlan(plan)"
                >
                  <div class="">
                    <div class="float-left">
                      <span
                        :class="{
                          highlightfa:
                            //selectedPaymentPlan.SOSPaymentPlanId == plan.SOSPaymentPlanId,
                            plan.IsSelectedPlan == true,
                        }"
                      >
                        <i class="fa fa-circle"></i>
                      </span>
                      <span class="price-title">{{ plan.Title }}</span>
                    </div>
                    <div class="float-right">
                      <span
                        v-if="plan.PriceStrikethrough != null"
                        class="strike"
                      >
                        {{ plan.PriceStrikethroughDisplay }}</span
                      >
                      <span class="display-price"
                        >{{ plan.PriceDisplay }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cart-btns" v-if="courseDetail.PaymentPlans.length > 0">
            <div v-if="!this.isCourseExist($route.query.s)">
              <button @click="AddToTrial(true)" class="btn trial-btn">
                Trial
              </button>
              <button @click="addToCart()" class="btn cart-btn">
                Add To Cart
              </button>
            </div>

            <button v-else class="btn cart-btn" @click="goToCart()">
              <i class="fa fa-check-circle"></i>
              Go To Cart
            </button>
          </div>
          <div v-if="courseDetail.Summary != undefined" class="course-includes">
            <div class="title">This Course Includes:</div>
            <div class="subtitle">
              <i class="fal fa-play-circle"></i>
              {{ courseDetail.Summary.VideoCount }} Videos
            </div>
            <div class="subtitle">
              <i class="fal fa-file-signature"></i>
              {{ courseDetail.Summary.TestCount }} Quizzes
            </div>
            <div class="subtitle">
              <i class="fal fa-book-open"></i>
              {{ courseDetail.Summary.ReadingCount }} Readings
            </div>
            <div class="subtitle">
              <i class="fal fa-copy"></i>
              {{ courseDetail.Summary.AssignmentCount }} Assignments
            </div>
          </div>
        </div>
      </div>
    </div>

    <section class="details-section">
      <div class="container">
        <div class="row">
          <div class="col-md-7">
            <div class="details-info">
              <h6 class="details-info-head">About this course</h6>
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                sed diam voluptua. At vero eos et accusam et justo duo dolores
                et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua. At vero eos et accusam et justo duo dolores et ea
                rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur.
              </p>

              <h6 class="details-info-head">What you’ll learn</h6>
              <ul class="online-course-info list-style-type-check list-col-2">
                <li>Lorem ipsum dolor sit amet, consetetur sadipscing</li>
                <li>Lorem ipsum dolor sit amet, consetetur sadipscing</li>
                <li>Lorem ipsum dolor sit amet, consetetur sadipscing</li>
                <li>Lorem ipsum dolor sit amet, consetetur sadipscing</li>
                <li>Centralized notificatid much more</li>
                <li>Centralized notificatid much more</li>
                <li>Centralized notificatid much more lorum text</li>
                <li>Centralized notificatid much more more lorum text</li>
                <li>Centralized notificatid much more</li>
              </ul>

              <h6 class="details-info-head">Schedule</h6>
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                sed diam voluptua. At vero eos et accusam et justo duo dolores
                et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua. At vero eos et accusam et justo duo dolores et ea
                rebum. Stet clita kasd gubergren, no sea takimata sanctus est
                Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                consetetur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <cartConfirmationModal />
  </section>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { CartModel } from "../../models/app/cartModel";
import { appConstants } from "../../common/constants";
import {
  courseDetail as courseDetailStoreKeys,
  course as courseStoreKeys,
  checkout as checkoutStoreKeys,
  cart as cartStoreKeys,
} from "../../store/keys";
import cartConfirmationModal from "./cartConfirmationModal.vue";

export default {
  components: {
    cartConfirmationModal,
  },
  metaInfo() {
    return {
      title: `${this.title} | KIPS LMS`,
      titleTemplate: "",
      htmlAttrs: {
        lang: "en",
        amp: true,
      },
    };
  },
  // props: {
  //   sosId: Number,
  // },
  watch: {
    $route(to, from) {
      if (process.env.VUE_ENV === "client") {
        this.getCourseDetail();
      }
    },
  },
  data() {
    return {
      title: "",
      isTrial: false,
      selectedPaymentOption: appConstants.enums.PaymentOption.PaymentPlan,
      routeParams: null,
      // selectedPaymentPlan: {
      //   SOSPaymentPlanId: 0,
      // },
    };
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  serverPrefetch() {
    return this.getCourseDetail();
  },
  created() {
    this.routeParams = this.$route.params;
  },
  beforeDestroy() {
    //this.reset_CourseDetail();
  },
  mounted() {
    this.getCourseDetail();
  },
  computed: {
    ...mapGetters(
      courseDetailStoreKeys.namespace,
      courseDetailStoreKeys.getters
    ),
    ...mapGetters(courseStoreKeys.namespace, courseStoreKeys.getters),
    ...mapGetters(cartStoreKeys.namespace, cartStoreKeys.getters),
  },
  methods: {
    ...mapActions(
      courseDetailStoreKeys.namespace,
      courseDetailStoreKeys.actions
    ),
    ...mapActions(courseStoreKeys.namespace, courseStoreKeys.actions),
    ...mapActions(cartStoreKeys.namespace, cartStoreKeys.actions),
    ...mapActions(checkoutStoreKeys.namespace, checkoutStoreKeys.actions),
    addToCart() {
      debugger

      if (!this.isTrial) {
        this.$bvModal.show("confirmCartModal");
      }
      
      let cartModel = new CartModel();
      
      cartModel.ProgramCategoryId = this.selectedProgramCategory.id;
      cartModel.CourseGroupCategoryId = this.selectedSOSCategory.id;
      cartModel.ProgramId = this.selectedProgram.id;
      cartModel.BoardId = this.selectedBoard.id;

      cartModel.CourseGroupId = this.selectedCourseGroup.id;
      cartModel.SOSId = this.selectedCourseSOS.id;
      cartModel.CourseName = this.selectedCourseSOS.name;
      cartModel.PaymentOption = this.selectedPaymentOption;
      cartModel.SOSPaymentPlanId = this.selectedPlan.SOSPaymentPlanId;
      cartModel.InstituteId = this.courseDetail.InstituteId;

      if (
        this.selectedPaymentOption ===
        appConstants.enums.PaymentOption.PaymentPlan
      ) {
        cartModel.Amount = this.selectedPlan.Price;
        cartModel.AmountDisplay = this.selectedPlan.PriceDisplay;

        cartModel.AmountStrikethroughDisplay = this.selectedPlan.PriceStrikethroughDisplay;
      } else if (
        this.selectedPaymentOption === appConstants.enums.PaymentOption.Trial
      ) {
        cartModel.Amount = 0.0;
        cartModel.AmountDisplay = this.toCurrency(0); //"Rs 0.00";
        cartModel.AmountStrikethroughDisplay = this.toCurrency(0); //"Rs 0.00";
      }

      this.add_ToCart({
        data: cartModel,
        config: {
          loader: {
            show: true,
          },
        },
      })
        .then((response) => {
          if (
            this.selectedPaymentOption ===
            appConstants.enums.PaymentOption.Trial
          ) {
            this.checkoutTrial();
          }
          //this.reset_SelectedCourseInfo();
        })
        .catch((ex) => {
          this.$alertError(ex);
        });
    },
    checkoutTrial() {
      this.checkout_cart().then((response) => {
        // this.$router.push({ name: "signUp" });
         window.location.href = `${process.env.VUE_APP_PORTAL_URL}/invoice/checkOut`;
      });
    },
    AddToTrial(isTrial) {
      this.isTrial = isTrial;
      this.selectedPaymentOption = appConstants.enums.PaymentOption.Trial;
      this.addToCart();
    },
    goToCart() {
      this.$router.push({ name: "cart" });
    },
    setSelectedPaymentPlan(plan) {
      // if (
      //   this.selectedPaymentOption ===
      //   appConstants.enums.PaymentOption.PaymentPlan
      // ) {

      this.update_SelectedPlan({
        data: {
          selectedSOSPaymentPlanId: plan.SOSPaymentPlanId,
        },
      }).catch((ex) => {
        this.$alertError(ex.message);
      });
      //}
    },
    getCourseDetail() {
      return this.get_CourseDetail({
        data: {
          SOSId: this.$route.query.s,
          CourseGroupId: this.$route.query.g,
        },
        config: {
          loader: {
            show: true,
          },
        },
      })
        .then((response) => {
          this.title = this.courseDetail.Name;
        })
        .catch((ex) => {
          if (ex.status == 404) {
            this.$router.push({ name: "landingPageNotFound" });
          }
          // this.$alertError(ex.message);
        });
    },
  },
};
</script>
