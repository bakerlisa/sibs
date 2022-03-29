import React, {useState} from 'react';
import axios from 'axios';

function ImageUploader() {
    const [file, setFile] = useState()
    const [img,setImg] = useState("")
    const [imageError,setImageError] = useState("")

    function handleChange(event) {
        setFile(event.target.files[0])

        }

        function handleSubmit(event) {
            event.preventDefault()
            const url = 'http://localhost:8000/api/uploadFile';
            const formData = new FormData();
            formData.append('file', file);
            formData.append('fileName', file.name);
            
            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            };
        axios.post(url, formData, config).then((response) => {
            console.log(response.data);
        });
    }

return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="image">Image:</label>
        <input type="file" name="image" onChange={handleChange} />
        {
            imageError.length > 0 ? "" : <span>{imageError}</span> 
        }
        <button type="submit">Upload</button>
    </form>
    );
}

export default ImageUploader;