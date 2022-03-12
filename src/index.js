import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getPerformance } from "firebase/performance";
import { Home } from "./components/home.js"
import { render } from "react-dom";

var firebaseConfig = {
    apiKey: "AIzaSyDIuS3_YpUjB2QEgY-rJpK6WOH9CRiwQPc",
    authDomain: "zarah-f9e57.firebaseapp.com",
    projectId: "zarah-f9e57",
    storageBucket: "zarah-f9e57.appspot.com",
    messagingSenderId: "983312132919",
    appId: "1:983312132919:web:eccc4a4b114ed7e00b88b2",
    measurementId: "G-VE7MLDXWBP"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const performance = getPerformance(app);

render(<Home />, document.getElementById("root"));