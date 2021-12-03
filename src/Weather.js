import React from "react";
import axios from "axios";
import Loader from "react-loader-spinner";

export default function Weather(props) {
  function handleResponse(response) {
    alert(
      `The Weather in ${response.data.name} is ${response.data.main.temp} °C`
    );
  }
  let apiKey = "8d3b4eb3bfd4da849a5a61c1e36fe700";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(handleResponse);
  return (
    <Loader
      type="Puff"
      color="#00BFFF"
      height={200}
      width={200}
      timeout={3000} //3 secs
    />
  );
}
