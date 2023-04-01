import React from "react";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/ckeditor";

function MyEditor({handleChange, ...props}) {
    function uploadAdapter(loader) {
        const body = new FormData();


        return new Promise((resolve, reject) => {
            loader.file.then((file) => {
                body.append("image", file);
                axios.post(`${API_URL}`, {body: body}, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then((res) => {
                        console.log(res);
                        resolve({
                            default: res.data.filePath
                        });
                    })
                    .then((res) => {
                        console.log(res);
                        resolve({

                            default: `${API_URL}/${res.filename}`
                        });
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        });


    }

    function uploadPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return uploadAdapter(loader);
        };
    }

    return (
        <div>
            <CKEditor
                activeClass="editor"

                config={{
                    extraPlugins: [uploadPlugin]
                }}
                editor={ClassicEditor}
                onReady={(editor) => {
                }}
                onBlur={(event, editor) => {
                }}
                onFocus={(event, editor) => {
                }}
                onChange={(event, editor) => {
                    handleChange(editor.getData());
                }}
                {...props}
            />
        </div>
    );
}

export default MyEditor;