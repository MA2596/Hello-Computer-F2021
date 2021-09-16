// to run a simple server, cd in your terminal to the folder these files are in and run:
// python -m SimpleHTTPServer 3000
// then go to http://localhost:3000 in your browser

const SpeechRecognition = webkitSpeechRecognition; //eslint-disable-line
// const giphyAPIKey = "JLYS22ZvlBFYtJn5oz6cjyXc3eivEVkh"; // sign up and create an app to get one: https://developers.giphy.com/


const getSpeech = () => {
	const recognition = new SpeechRecognition();
	recognition.lang = "en-US";
	recognition.start();

	recognition.onresult = (event) => {
		const speechResult = event.results[0][0].transcript;
		console.log(speechResult);
		
		//output
		document.querySelector("#speech-div").textContent = speechResult;
		getGif(speechResult);
	};

	recognition.onend = () => {
		console.log("it is over");
		recognition.stop();

		getSpeech();
	};

	recognition.onerror = (event) => {
		console.log("something went wrong: " + event.error);
	};
};

const getGif = (phrase) => {
	// same as:
	// let url = "http://api.giphy.com/v1/gifs/random?api_key=" + giphyAPIKey + "&tag=" + phrase;
	// more info: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
	
	const unsplashUrl =
	`https://api.unsplash.com/search/photos?client_id=ITgJtsIlqxEqthLfMOxIO8nj2tPXrNYIM0-Bh4luiQA&query=${phrase}`;//make the url similar format
	//api gives back data in form of JSON
	const url = `https://api.giphy.com/v1/gifs/random?api_key=JLYS22ZvlBFYtJn5oz6cjyXc3eivEVkh&tag=sad=${phrase}`;
//
	// more info: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
	fetch(unsplashUrl, { mode: "cors" })
	//what is cors?
		.then((response) => response.json())
		.then((result) => {
			//fetch vs async?

			// console.log(JSON.stringify(result));//what API comes back with
			let allImages = result.results[0];
			let imgUrl = allImages.urls.regular;
			
			document.querySelector("#the-gif").src = imgUrl;
			console.log(imgUrl);
			
			//what is this??
			//do console log of allImages/result.results[0]
			// console.log(allImages.urls.regular)
			// createImage(imgUrl);
			// let imgUrl = result.data.image_url;
			// let imgUrl = result.data.image_url;
			//data.images_results[0].original
		});
};

// const createImage = (source) => {
//     var nextImage = document.createElement('img');
//     nextImage.src = source;
//     document.body.appendChild(nextImage);
// }

document.querySelector("#my-button").onclick = () => {
	getSpeech();
};
