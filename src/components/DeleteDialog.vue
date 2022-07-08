<template>
  <!-- Modal -->
  <div
    class="modal fade"
    :id="id"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 :class="{ success: isSuccess, faild: !isSuccess }">
            {{ modalHeader }}
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div
          class="modal-body ms-5"
          :class="{ success: isSuccess, faild: !isSuccess }"
        >
          <slot name="modalBody" />
        </div>
        <div class="d-flex justify-content-end mt-2 p-3">
          <button type="button" class="btn close me-4" data-bs-dismiss="modal">
            Close
          </button>
          <button
            v-if="isOKRequired"
            @click="emitOkEvent()"
            data-bs-dismiss="modal"
            type="button"
            class="btn okBtn"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["id", "isSuccess", "isOKRequired", "modalHeader"],
  emits: {
    yes() {
      return true;
    },
  },
  methods: {
    emitOkEvent() {
      this.$emit("yes");
    },
  },
};
</script>
<style scoped>
.success {
  color: green;
}
.faild {
  color: red;
}
.close,
.okBtn {
  width: 6rem;
}
.close {
  border: 1px solid gray;
}
.okBtn {
  background-color: #ef9713;
  color: #fff;
}
.close:hover,
.okBtn:hover {
  background-color: #f81b0b;
}
</style>
