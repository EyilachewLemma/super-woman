<template>
    <div>
       <input class="image-input p-0 m-0" type="file" name="imageInpute" id="imageInpute" ref="imageHolder" accept="image/.*" multiple @change="fileHandler($event)">
        <div class="px-3 mb-1">{{title}} Images</div>
    <div class="imageContainer p-2 text-center " :class="{active:isActive}" @dragenter.prevent="activatClass()" @dragleave="activatClass()" @dragover.prevent="" @drop.prevent="fileHandler($event)">
        <label for="imageInpute">
            <div class="fs-2 uploadIcon"><i class="fas fa-upload"></i></div>
            <p>Drag and drop Images here or</p>
            <div class="btn btnSelect m-2"> Select Images</div>
             <div v-if="imageFiles?.length" class="m-2 text-black">{{imageFiles?.length+' Images Choosen'}}</div>
        </label>
        </div>
</div>
<!-- image preview -->
 <div v-if="imageFiles?.length" class="ms-5 mt-3"><strong>Selected Image Preview</strong></div>
  <div class="w-100 d-flex mb-3 mt-2 imagePreview">
        <div v-for="(image, key) in imageFiles" :key="key" class="m-2 image-box">
        <img :ref="'image'" class="img-fluid" :alt="image.name" :src="image.src" />
        <button type="button" class="removebtn fs-4 px-1" @click="removeImage(image, key)"><i class="fas fa-times"></i></button>
      </div>
    </div>
</template>
<script>
export default {
  props:['title'],
  emits:{
    selectedImages(){
      return true
    }
  },
    data() {
        return {
            imageFiles:[],
            isActive: false,
        }
    },
     methods: {
          fileHandler(e) {
      this.isActive = false;
      let selectedFiles =
        e.target.files || e.dataTransfer.files || this.$refs.imageHolder.files;
      for (let i = 0; i < selectedFiles?.length; i++) {
        this.imageFiles.push(selectedFiles[i]);
      }
      this.applyImage();
      this.$emit('selectedImages',this.imageFiles)
    },
    removeImage(image, index) {
      this.imageFiles.splice(index, 1);
      this.applyImage();
      this.$emit('selectedImages',this.imageFiles)
        },
    applyImage() {
      for (let i = 0; i < this.imageFiles.length; i++) {
        let reader = new FileReader();
        reader.onload = () => {
          this.$refs.image[i].src = reader.result;
        };
        reader.readAsDataURL(this.imageFiles[i]);
      }
    },
    activatClass() {
      this.isActive = !this.isActive;
    },
     },
}
</script>
<style scoped>
.image-input{
  visibility: hidden;
}
.imageContainer {
  height: auto;
  background: transparent;
  border: 2px dashed gray;
  border-radius: 1rem;
}
label {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.btnSelect {
  border: 1px solid gray;
   background-color: #e7773a;
  color: #fff;
}
.btnSelect:hover {
  background-color: #af190f;
  color: #fff;
}
.imageContainer:hover {
  border-color: #eb9713;
}
.uploadIcon:hover {
  color: #eb9713;
}
.active {
  background-color: #eb9713;;
  color: #fff;
  border-color: #eb9713;
}
.imagePreview {
  overflow-x: auto;
}
.image-box {
  width: 18%;
  height: 20vh;
  position: relative;
  overflow: hidden;
}
.removebtn {
  position: absolute;
  top: 2%;
  right: 3%;
  border: 2px solid rgb(246, 246, 249);
  border-radius: 50%;
  display: none;
}
.removebtn:hover {
  color: #e7453a;;
}

.image-box img {
  width: 100%;
  height: 100%;
  transition: all 1s;
}
.image-box img:hover {
  transform: scale(1.2);
}
.image-box:hover .removebtn {
  display: block;
}
</style>