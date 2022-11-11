// creating the api key and url from openweathermap
const personalKey = '440fd1bad2aa75310547a2f59b79aaba';
const apiKey = `${personalKey}&units=imperial`

// creating the event of clicking on generate button
document.querySelector("#generate").addEventListener("click", generateRequests)

/* Global Variables */
// generating requests function
function generateRequests() {
    let zipcode = document.querySelector("#zip").value;
    let feelings = document.querySelector("#feelings").value
    let url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${apiKey}&units=imperial`;
    // Create a new date instance dynamically with JS
    const d = new Date();
    let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();
    getWeatherData(url)
        .then(function(data) {
            console.log(data)
            if (data.message == "city not found") {
                document.querySelector("#date").innerHTML = `City not found!, pleas enter correct zipcode`;
                document.querySelector("#temp").innerHTML = ``;
                document.querySelector("#content").innerHTML = ``;
                document.querySelector("#entryHolder").style.filter = "opacity(1)";
                return `city not found`
            }
            postData('/addData', { date: newDate, temp: data.main.temp, content: feelings })
            console.log({ date: newDate, temp: data.main.temp, content: feelings })
            updateData('/all')
                .then(function(data) {
                    console.log(data)
                    document.querySelector("#date").innerHTML = `Date: ${data.date}`;
                    document.querySelector("#temp").innerHTML = `the temprature is ${data.temp}°C`;
                    if (data.content == "") {
                        document.querySelector("#content").innerHTML = `Please enter your feeling!`;
                    } else {
                        document.querySelector("#content").innerHTML = `You feel ${data.content}`;
                    }
                    document.querySelector("#entryHolder").style.filter = "opacity(1)";
                })
        })
}

// async function to make GET request to get data from OWM
const getWeatherData = async(url) => {
    const req = await fetch(url)
    try {
        const data = await req.json();
        return data;
    } catch (error) {
        console.log("error", error)
    }
}

// async function to make POST request to send the data from the OWM api to the endpoint server.
const postData = async(url, data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}

// async function to get data from all data in the endpoint and update it in the DOM
const updateData = async(url) => {
    const req = await fetch(url)
    try {
        const data = await req.json();
        return data
    } catch (error) {
        console.log("error", error)
    }
}