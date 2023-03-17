import axios from "axios";
import { useRef, useState } from "react"
import { youtube_parser } from "./utils";

function App() {

    const inputUrlRef = useRef();
    const [urlResult, setUrlResult] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(inputUrlRef.current.value);

        const youtubeId = youtube_parser(inputUrlRef.current.value);

        const options = {
            method: 'GET',
            url: 'https://youtube-mp36.p.rapidapi.com/dl',
            params: {id: youtubeId},
            headers: {
              'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
              'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
            }
        };
        
        axios.request(options).then(function (response) {
            console.log(response.data);
            setUrlResult(response.data.link);
        }).catch(function (error) {
            console.error(error);
        });

        inputUrlRef.current.value = '';
    }

    return (
        <div className="app">
            <span className="logo">youtube2mp3</span>
            <section className="content">
                <h1 className="content_title">Youtube to Mp3 Converter</h1>
                <p className="content_description">
                    Transform youtube video into mp3 in just a few clicks
                </p>

                <form onSubmit={handleSubmit} className="form">
                    <input ref={inputUrlRef} type="text" className="form_input" placeholder="Enter a youtube video link..."/>
                    <button type="submit" className="form_button">Search</button>
                </form>

                {
                    urlResult ? <a href={urlResult} target="_blank" rel="noreferer" className="download_btn">Download MP3</a> : ''
                }
                
            </section>
        </div>
    )
}

export default App
