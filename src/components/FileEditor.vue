<template>
   <ckeditor :editor="editor" @ready="onReady" v-model="editorData" :config="editorConfig" @blur="onEditorBlur"></ckeditor>
   <span>{{mainContent}}</span>
</template>
<script>
import DocumentEditor from '@ckeditor/ckeditor5-build-decoupled-document';
class MyUploadAdapter {
    constructor( loader ) {
        // The file loader instance to use during the upload. It sounds scary but do not
        // worry — the loader will be passed into the adapter later on in this guide.
        this.loader = loader;
    }

    // Starts the upload process.
    upload() {
        return this.loader.file
            .then( file => new Promise( ( resolve, reject ) => {
                this._initRequest();
                this._initListeners( resolve, reject, file );
                this._sendRequest( file );
            } ) );
    }

    // Aborts the upload process.
    abort() {
        if ( this.xhr ) {
            this.xhr.abort();
        }
    }
     // Initializes the XMLHttpRequest object using the URL passed to the constructor.
    _initRequest() {
        const xhr = this.xhr = new XMLHttpRequest();

        // Note that your request may look different. It is up to you and your editor
        // integration to choose the right communication channel. This example uses
        // a POST request with JSON as a data structure but your configuration
        // could be different.
        xhr.open( 'POST', 'http://10.161.179.66:8000/api/content_image', true );
        // xhr.setRequestHeader('x-csrf-token','{{csrf-token()}}');
        xhr.responseType = 'json';
    }
     _initListeners( resolve, reject, file ) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = `Couldn't upload file: ${ file.name }.`;

        xhr.addEventListener( 'error', () => reject( genericErrorText ) );
        xhr.addEventListener( 'abort', () => reject() );
        xhr.addEventListener( 'load', () => {
            const response = xhr.response;

            // This example assumes the XHR server's "response" object will come with
            // an "error" which has its own "message" that can be passed to reject()
            // in the upload promise.
            //
            // Your integration may handle upload errors in a different way so make sure
            // it is done properly. The reject() function must be called when the upload fails.



            // =================================
    // if ( !response || response.error ) {
            //     return reject( response && response.error ? response.error.message : genericErrorText );
            // }  
                  // ===================================

            // If the upload is successful, resolve the upload promise with an object containing
            // at least the "default" URL, pointing to the image on the server.
            // This URL will be used to display the image in the content. Learn more in the
            // UploadAdapter#upload documentation.
            resolve( {
                default: response.url
            } );
        } );

        // Upload progress when it is supported. The file loader has the #uploadTotal and #uploaded
        // properties which are used e.g. to display the upload progress bar in the editor
        // user interface.
        if ( xhr.upload ) {
            xhr.upload.addEventListener( 'progress', evt => {
                if ( evt.lengthComputable ) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            } );
        }
    }
     _sendRequest( file ) {
        // Prepare the form data.
        const data = new FormData();

        data.append( 'upload', file );

        // Important note: This is the right place to implement security mechanisms
        // like authentication and CSRF protection. For instance, you can use
        // XMLHttpRequest.setRequestHeader() to set the request headers containing
        // the CSRF token generated earlier by your application.

        // Send the request.
        this.xhr.send( data );
    }
}
function MyCustomUploadAdapterPlugin( editor ) {
    editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
        // Configure the URL to the upload script in your back-end here!
        return new MyUploadAdapter( loader );
    };
}
export default {
  props:['content'],
  emits:{
    editorContent(){
      return true
    }
  },
    data() {
  return {
    editor: DocumentEditor,
    editorData:'<p>Clic here to write the content</>',
    editorConfig: {
        extraPlugins:[MyCustomUploadAdapterPlugin],
      toolbar: {
        items: [
          'heading',
          '|',
          'fontSize',
          'fontFamily',
          'bold',
          'italic',
          'underline',
          'fontColor',
          'fontBackgroundColor',
          '|',
          'strikethrough',
        //   'highlight',
        //   'removeFormat',
          '|',
          'alignment',
          '|',
          'numberedList',
          'bulletedList',
          '|',
          'indent',
          'outdent',
          '|',
          'todoList',
          'link',
          'blockQuote',
          'imageUpload',
          'insertTable',
          'mediaEmbed',
          '|',
          'undo',
          'redo'
        ]
      },
      language: 'cs',
      image: {
        toolbar: [
          'imageTextAlternative',
        //   'imageStyle:full',
          'imageStyle:side',
        //   'linkImage'
        ]
      },
      table: {
        contentToolbar: [
          'tableColumn',
          'tableRow',
          'mergeTableCells'
        ]
      },
      licenseKey: ''
    }
}
    },
    watch:{
      content(newValue){
        this.editorData = newValue
      }
    },
   methods: {
  onReady( editor )  {
    // Insert the toolbar before the editable area.
    editor.ui.getEditableElement().parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement()
    );
  },
  onEditorBlur(){
    this.$emit('editorContent',this.editorData)
  },
  }
}
</script>
<style scoped>
</style>