
export default {
  filters: {
    alphaNumeric(value) {
      return value ? value.replace(/[^a-zA-Z0-9]/g, "") : '';
    }
  }
}
