import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { UilTemperature, UilTear, UilWind } from "@iconscout/react-unicons";

function SearchWeather() {
  const [search, setSearch] = useState("Varanasi");
  const [data, setData] = useState();
  const [input, setInput] = useState("");
  const getApiData = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=Your API ID`
    ).then((response) => response.json());
    console.log(response);
    console.log(response.timezone);
    setData(response);
  };

  useEffect(() => {
    getApiData();
  }, [search]);
  // const emoji = null;
  let hpa = 0.0009869233;

  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString("default", { month: "long" });
  let day = d.toLocaleString("default", { weekday: "long" });

  let time = d.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  // var utcOffsetSeconds = data.timezone;
  // function getIANATimezone(utcOffsetSeconds) {
  //   const utcOffsetHours = Math.abs(utcOffsetSeconds / 3600);
  //   const sign = utcOffsetSeconds < 0 ? "+" : "-";
  //   return `Etc/GMT${sign}${utcOffsetHours}`;
  // }

  // function formatLocalTime(utcOffsetSeconds) {
  //   const timeZone = getIANATimezone(utcOffsetSeconds);
  //   return new Date().toLocaleTimeString("en-US", { timeZone });
  // }
  // var time = formatLocalTime(utcOffsetSeconds);
  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch(input);
  };
  return (
    <div>
      {data && (
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-4">
              <div class="card text-white text-center border-0">
                <img
                  src="https://source.unsplash.com/600x900/?clouds"
                  class="card-img"
                  alt="..."
                />
                <div class="card-img-overlay">
                  <form onSubmit={handleSubmit} autocomplete="false">
                    <div class="input-group mb-4 w-75 mx-auto">
                      <input
                        type="search"
                        class="form-control"
                        placeholder="Search City "
                        aria-label="Search City"
                        aria-describedby="basic-addon2"
                        name="search"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        required
                      />
                      <button
                        type="submit"
                        class="input-group-text"
                        id="basic-addon2"
                      >
                        <i className="fas fa-search"></i>
                      </button>
                    </div>
                  </form>
                  <div className="bg-dark bg-opacity-50 py-3">
                    <h2 class="card-title">{data.name}</h2>
                    <p class="card-text lead mb-5">
                      {day}, {month} {date}, {year}
                      <br />
                      {time}
                    </p>
                    <p class="card-text">
                      <hr />

                      <img
                        className=" mb-3 "
                        src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                      />

                      <h1 className="fw-bolder mb-3">
                        {data.main.temp.toFixed()}&deg;C
                      </h1>
                      <p className="lead fw-bolder mb- 30">
                        {data.weather[0].main}
                      </p>
                      <div>
                        <UilTemperature size={18} className="mr-4" /> Real fell
                        :
                        <span className="lead">
                          {" "}
                          {data.main.feels_like.toFixed()} &deg;C
                        </span>
                      </div>
                      {/* <div>
                        <UilTear size={15} className="mr-4" /> Pressure :
                        <span className="lead">
                          {" "}
                          {(data.main.pressure * hpa).toFixed()} atm
                        </span>
                      </div> */}
                      <div>
                        <UilTear size={15} className="mr-4 " /> Humidity :
                        <span className="lead"> {data.main.humidity} %</span>
                      </div>
                      <div>
                        <UilWind size={18} className="mr-4" /> Wind :
                        <span className="lead"> {data.wind.speed} m/s</span>
                      </div>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchWeather;
