export const common = {
  methods: {
    HasArabicCharacters(text) {
      var regex = new RegExp("[\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufc3f]|[\ufe70-\ufefc]");
      return regex.test(text);
    },
    scrollToElement(elmId) {
      if (document.getElementById(elmId)) {
        document.getElementById(elmId).scrollIntoView()
      }
      // switch (elmId) {
      //   case 'sectionPrograms':
      //   window.scrollTo(0, 787);
      //     break;
      //   case 'sectionTestimonial':
      //   window.scrollTo(0, 4200);
      //     break;
      //   case 'sectionFaq':
      //   window.scrollTo(0, 3328);
      //     break;
      //   case 'sectionDownloadApp':
      //   window.scrollTo(0, 5092);
      //     break;
      // }
      // var element = document.getElementById(elmId);
      // if (element) {
      //   var top = element.offsetTop;
      //   window.scrollTo(0, top);
      // }
    },
    detectBrowserInformation() {
      // console.log(this.$browserDetect)
      // console.log("IE :" + this.$browserDetect.isIE)
      // console.log("Chrome:" + this.$browserDetect.isChrome)
      // console.log("Opera :" + this.$browserDetect.isOpera)
      // console.log("Safari :" + this.$browserDetect.isSafari)
      // console.log("Edge :" + this.$browserDetect.isEdge)
      // console.log("Firefox :" + this.$browserDetect.isFirefox)

      //additional information
      // console.log("Browser Name :" + this.$browserDetect.meta.name)
      // console.log("Browser Version :" + this.$browserDetect.meta.version)
      // console.log("IE :" + this.$browserDetect.meta.ua)
      return this.$browserDetect;
    },
    getOS() {
      var userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        os = null;

      if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'Mac OS';
      } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'iOS';
      } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows';
      } else if (/Android/.test(userAgent)) {
        os = 'Android';
      } else if (!os && /Linux/.test(platform)) {
        os = 'Linux';
      }

      return os;
    },
    RemoveSpecialChars(text) {
      return text.replace(/-/g, " ").replace(/\s+/g, " ").replace(/(?!\w|\s)./g, '').replace(/^(\s*)([\W\w]*)(\b\s*$)/g, '$2').replace(/\s+/g, "-").toLowerCase()
    },
    RouteTo(path) {
      if (this.$route.fullPath !== path) {
        this.$router.push(path);
      }
    },
    toCurrency(amount, currencySymbol = 'Rs', cultureInfCode = 'ur-PK') {
      var amountDisplay = new Intl.NumberFormat(cultureInfCode, { style: 'currency', currency: 'PKR' }).format(amount);
      return amountDisplay.replace('PKR', currencySymbol);
    }
  }
}
