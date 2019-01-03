import React, {Component} from 'react';

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import axios from "axios/index";
import {EMAIL_SETTINGS} from "../../constants/APIURLS";

// import Link from '@ckeditor/ckeditor5-link/src/link';

class EmailEditor extends Component {
    state = {
        emailTemplate: {}
    };

    async componentDidMount() {
        const res = await axios.get(`${EMAIL_SETTINGS}/${this.props.match.params.type}`);

        this.setState({
            emailTemplate: res.data
        })
    }

    handleSaveTemplate = async (body) => {
        console.log(body);
        await axios.put(`${EMAIL_SETTINGS}/${this.props.match.params.type}`, {
            body
        });

        this.props.history.push(`/admin/settings`)
    }

    render() {
        const {emailTemplate} = this.state;
        let emailBody = '';
        return (
            <div className='news-editor-page'>
                <div className='new-title'>
                    <div className='title'>
                        {emailTemplate.subject}
                    </div>
                    <button className='admin-btn green-btn' onClick={() => this.handleSaveTemplate(emailBody)}>
                        Save
                    </button>
                </div>

                <button onClick={() => CKEditor.instances[0].insertText('422442242442')}>ttttttt
                </button>
                <button onClick={() => CKEditor.instances.IDofEditor.insertText('some text here')}>222222
                </button>

                <CKEditor
                    editor={ClassicEditor}
                    config={{
                        toolbar: ['Heading', '|', 'Bold', 'Italic', 'Alignment', 'Link', 'BlockQuote', 'Undo', 'Redo'],
                        // removePlugins: ['Image', 'ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload']
                    }}
                    data={emailTemplate.body}
                    // onInit={editor => {
                    //     // You can store the "editor" and use when it is needed.
                    //     console.log('Editor is ready to use!', editor);
                    // }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        emailBody = data;
                        console.log({event, editor, data});
                    }}
                    // onBlur={editor => {
                    //     console.log('Blur.', editor);
                    // }}
                    // onFocus={editor => {
                    //     console.log('Focus.', editor);
                    // }}
                />

            </div>
        )
    }
}

export default EmailEditor;