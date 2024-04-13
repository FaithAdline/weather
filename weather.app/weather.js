const { Tkinter } = require('tkinter-js');

const root = Tkinter.Tk();
root.title("Weather App");

// Style
root.configure({ bg: "#87CEEB" });
root.geometry("300x200");

// Widgets
const city_label = Tkinter.Label(root, { text: "Enter City:", bg: "#87CEEB" });
city_label.pack();

const city_entry = Tkinter.Entry(root);
city_entry.pack();

const units_label = Tkinter.Label(root, { text: "Select Units:", bg: "#87CEEB" });
units_label.pack();

const units_var = new Tkinter.StringVar();
units_var.set("metric"); // default to Celsius
const units_menu = Tkinter.OptionMenu(root, units_var, "metric", "imperial");
units_menu.pack();

const get_weather_button = Tkinter.Button(root, { text: "Get Weather", bg: "#ADD8E6" });
get_weather_button.on("click", get_weather);
get_weather_button.pack();

const result_label = Tkinter.Label(root, { text: "", bg: "#87CEEB" });
result_label.pack();

root.mainloop();

function get_weather() {
    const city = city_entry.get();
    const units = units_var.get();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2c4fa57719c00cac191d09f7421187a1&units=${units}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                alert("Error: City not found!");
            } else {
                const temperature = data.main.temp;
                const humidity = data.main.humidity;
                const wind_speed = data.wind.speed;

                let temperature_unit, wind_unit;
                if (units === "imperial") {
                    temperature_unit = "Fahrenheit";
                    wind_unit = "miles/hour";
                } else {
                    temperature_unit = "Celsius";
                    wind_unit = "meter/sec";
                }

                result_label.config({ text: `Temperature: ${temperature}°${temperature_unit}\nHumidity: ${humidity}%\nWind Speed: ${wind_speed} ${wind_unit}` });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
}
