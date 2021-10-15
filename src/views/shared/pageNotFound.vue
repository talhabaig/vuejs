<template>
  <div class="container">
    <div class="page-not-found">
      <div>
        <i class="fal fa-frown"></i>
        <div class="pg-404">404</div>
        <div class="page-not-found-fade-text">Page not found</div>
        <div class="page-not-found-text">
          The page you are looking for doesn't exist or an other error occured.
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: "Page Not Found | KIPS LMS",
  },
};
</script>
<style>
.page-not-found {
  text-align: center;
  color: #62737d;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  /* height: 100vh; */
  background: #fff;
  box-shadow: 0 0 20px #ccc;
  margin-top: 8em;
  padding: 6em 0;
  margin-bottom: 8em;
}
.page-not-found i {
  font-size: 140px;
}
.page-not-found .pg-404 {
  font-size: 51px;
  padding-top: 15px;
  padding-bottom: 15px;
}
.page-not-found-text {
  font-size: 18px;
}
.page-not-found-fade-text {
  font-size: 30px;
  color: #ccc;
  padding-bottom: 25px;
}
</style>
