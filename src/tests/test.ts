import axios from "axios";

axios
    .get("http://127.0.0.1:3000/test1")
    .then(r => console.log("First request DONE"))
    .catch(e => console.log(e));

axios
    .get("http://127.0.0.1:3000/test2")
    .then(r => console.log("Second request DONE"))
    .catch(e => console.log(e));
