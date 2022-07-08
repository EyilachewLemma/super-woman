<template> 
  <ckeditor
    :editor="editor"
    @ready="onReady"
    v-model="editorData"
    :config="editorConfig"
    @blur="onEditorBlur"
  ></ckeditor>
</template>
<script>
import DocumentEditor from "@ckeditor/ckeditor5-build-decoupled-document";
class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          this._initRequest();
          this._initListeners(resolve, reject, file);
          this._sendRequest(file);
        })
    );
  }

  // Aborts the upload process.
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }
  // Initializes the XMLHttpRequest object using the URL passed to the constructor.
  _initRequest() {
    const xhr = (this.xhr = new XMLHttpRequest());

    xhr.open(
      "POST",
      "https://admin.super-women.merahitechnologies.com/api/content_image",
      true
    );
    // xhr.setRequestHeader('x-csrf-token','{{csrf-token()}}');
    xhr.responseType = "json";
  }
  _initListeners(resolve, reject, file) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = `Couldn't upload file: ${file.name}.`;

    xhr.addEventListener("error", () => reject(genericErrorText));
    xhr.addEventListener("abort", () => reject());
    xhr.addEventListener("load", () => {
      const response = xhr.response;

      resolve({
        default: response.url,
      });
    });

    if (xhr.upload) {
      xhr.upload.addEventListener("progress", (evt) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }
  _sendRequest(file) {
    // Prepare the form data.
    const data = new FormData();

    data.append("upload", file);

    // Send the request.
    this.xhr.send(data);
  }
}
function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    // Configure the URL to the upload script in your back-end here!
    return new MyUploadAdapter(loader);
  };
}
export default {
  props: ["content"],
  emits: {
    editorContent() {
      return true;
    },
  },
  data() {
    return {
      editor: DocumentEditor,
      editorData: "<p>Click here to write the content</>",
      editorConfig: {
        extraPlugins: [
          MyCustomUploadAdapterPlugin,
          // ImageResizeEditing,
          // ImageResizeHandles,
        ],
        toolbar: {
          items: [
            "heading",
            "|",
            "fontSize",
            "fontFamily",
            "bold",
            "italic",
            "underline",
            "fontColor",
            "fontBackgroundColor",
            "|",
            "strikethrough",
            //   'highlight',
            //   'removeFormat',
            "|",
            "alignment",
            "|",
            "numberedList",
            "bulletedList",
            "|",
            "indent",
            "outdent",
            "|",
            "todoList",
            "link",
            "blockQuote",
            "imageUpload",
            "insertTable",
            "mediaEmbed",
            "|",
            "undo",
            "redo",
          ],
        },
        language: "cs",
        image: {
          toolbar: [
            "imageTextAlternative",
            "imageStyle:full",
            "imageStyle:side",
            //"linkImage",
          ],
        },
        table: {
          contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
        },
        licenseKey: "",
      },
    };
  },
  watch: {
    content(newValue) {
      this.editorData = newValue;
    },
  },
  methods: {
    onReady(editor) {
      // Insert the toolbar before the editable area.
      editor.ui
        .getEditableElement()
        .parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
        );
    },
    onEditorBlur() {
      this.$emit("editorContent", this.editorData);
    },
  },
};
</script>
<style scoped></style>
