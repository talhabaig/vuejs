<template>
  <section class="">
    <div class="white-box-mini">
      <div class="content-block">
        <div class="content-row">
          <span class="head">{{ model.SOSName }}</span>
        </div>
        <p>
          {{ model.ShortDescription }}
        </p>
        <div class="detail-link" @click="gotoDetail(model)">View Details</div>
      </div>

      <div class="payment-plans" v-if="model.PaymentPlans">
        <div class="row">
          <div
            class="col-md-12"
            v-for="(plan, index) in model.PaymentPlans"
            :key="index"
          >
            <div class="price-block" @click="setSelectedPaymentPlan(plan)">
              <div class="">
                <div class="float-left">
                  <span
                    :class="{
                      highlightfa:
                        //selectedPaymentPlan.SOSPaymentPlanId ==plan.SOSPaymentPlanId,
                        plan.IsSelectedPlan == true,
                    }"
                  >
                    <i class="fa fa-circle"></i>
                  </span>
                  <span class="price-title">{{ plan.Title }}</span>
                </div>
                <div class="float-right">
                  <span v-if="plan.PriceStrikethrough != null" class="strike">
                    {{ plan.PriceStrikethroughDisplay }}</span
                  >
                  <span class="display-price">{{ plan.PriceDisplay }} </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="cart-btns text-center" v-if="model.PaymentPlans">
        <template v-if="!this.isCourseExist(model.SOSId)">
          <button @click="AddToTrial(model, true)" class="btn trial-btn">
            Trial
          </button>
          <button @click="addToCart(model)" class="btn cart-btn">
            Add To Cart
          </button>
        </template>

        <template v-else>
          <button class="btn cart-btn" @click="goToCart()">
            <i class="fa fa-check-circle"></i>
            Go To Cart
          </button>
          <!-- <button disabled class="btn trial-btn">
            Enroll
          </button> -->
        </template>
      </div>
    </div>
    <!-- {{selectedCourseInfo}} -->
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { CartModel } from "../../models/app/cartModel";
import { appConstants } from "../../common/constants";
import {
  courseDetail as courseDetailStoreKeys,
  course as courseStoreKeys,
  classCourses as classCoursesStoreKeys,
  checkout as checkoutStoreKeys,
  cart as cartStoreKeys,
} from "../../store/keys";

export default {
  props: {
    model: null,
    programCategoryId: null,
  },
  data() {
    return {
      isTrial: false,
      selectedPaymentOption: appConstants.enums.PaymentOption.PaymentPlan,
      // selectedPaymentPlan: {
      //   SOSPaymentPlanId: 0,
      // },
    };
  },
  mounted() {
    // console.log("mounted" + this.model.SOSName);
    // if (this.model.PaymentPlans) {
    //   this.setSelectedPaymentPlan(this.model.PaymentPlans[0]);
    // }
  },
  updated() {
    // console.log("updated" + this.model.SOSName);
    // if (this.model.PaymentPlans ) {//&& this.selectedPaymentPlan.SOSPaymentPlanId === 0
    //   this.setSelectedPaymentPlan(this.model.PaymentPlans[0]);
    // }
  },
  computed: {
    ...mapGetters(
      courseDetailStoreKeys.namespace,
      courseDetailStoreKeys.getters
    ),
    ...mapGetters(courseStoreKeys.namespace, courseStoreKeys.getters),
    ...mapGetters(cartStoreKeys.namespace, cartStoreKeys.getters),
    ...mapGetters(
      classCoursesStoreKeys.namespace,
      classCoursesStoreKeys.getters
    ),
  },

  methods: {
    ...mapActions(
      courseDetailStoreKeys.namespace,
      courseDetailStoreKeys.actions
    ),
    ...mapActions(courseStoreKeys.namespace, courseStoreKeys.actions),
    ...mapActions(cartStoreKeys.namespace, cartStoreKeys.actions),
    ...mapActions(checkoutStoreKeys.namespace, checkoutStoreKeys.actions),
    ...mapActions(
      classCoursesStoreKeys.namespace,
      classCoursesStoreKeys.actions
    ),

    addToCart(model) {
      let selectedCoursePlan = this.selectedCoursePlan(
        model.SOSId,
        model.CourseGroupId
      );
      
      let cartModel = new CartModel();
      cartModel.ProgramCategoryId = this.selectedProgramCategory.id;
      cartModel.CourseGroupCategoryId = this.selectedSOSCategory.id;
      cartModel.ProgramId = this.selectedProgram.id;
      cartModel.BoardId = this.selectedBoard.id;

      cartModel.InstituteId = model.InstituteId;
      cartModel.CourseGroupId = model.CourseGroupId;
      cartModel.SOSId = model.SOSId;
      cartModel.CourseName = model.SOSName;

      cartModel.PaymentOption = this.selectedPaymentOption;
      cartModel.SOSPaymentPlanId = selectedCoursePlan.SOSPaymentPlanId;

      if (
        this.selectedPaymentOption ===
        appConstants.enums.PaymentOption.PaymentPlan
      ) {
        cartModel.Amount = selectedCoursePlan.Price;
        cartModel.AmountDisplay = selectedCoursePlan.PriceDisplay;

        cartModel.AmountStrikethroughDisplay =
          selectedCoursePlan.PriceStrikethroughDisplay;
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
          if (!this.isTrial) {
            this.$bvModal.show("confirmCartModal");
          }
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
    AddToTrial(model, isTrial) {
      this.isTrial = isTrial;
      this.selectedPaymentOption = appConstants.enums.PaymentOption.Trial;
      this.addToCart(model);
    },
    goToCart() {
      this.$router.push({ name: "cart" });
    },
    setSelectedPaymentPlan(plan) {
      // if (
      //   this.selectedPaymentOption ===
      //   appConstants.enums.PaymentOption.PaymentPlan
      // ) {

      this.update_SelectedCoursePlan({
        data: {
          selectedCourse: this.model,
          selectedSOSPaymentPlanId: plan.SOSPaymentPlanId,
          ProgramCategoryId: appConstants.enums.programCategory.Exam,
        },
      }).catch((ex) => {
        this.$alertError(ex.message);
      });
      //}
    },
    gotoDetail(model) {
      if (this.programCategoryId == appConstants.enums.programCategory.Class) {
        this.$router.push(
          "/class/detail/" +
            this.RemoveSpecialChars(model.SOSName) +
            "/" +
            this.RemoveSpecialChars(this.selectedCourseInfo.board.name) +
            "/" +
            this.RemoveSpecialChars(this.selectedCourseInfo.courseGroup.name) +
            "?s=" +
            model.SOSId +
            "&b=" +
            this.selectedCourseInfo.board.id +
            "&g=" +
            this.selectedCourseInfo.courseGroup.id
        );
      } else {
        this.RouteTo(
          "/exam/detail/" +
            this.RemoveSpecialChars(model.SOSName) +
            "?s=" +
            model.SOSId +
            "&g=" +
            model.CourseGroupId
        );
      }
    },
  },
};
</script>

<style></style>
