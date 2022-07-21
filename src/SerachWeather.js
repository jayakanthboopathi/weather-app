import React, { useEffect, useState } from "react";

const Searchweather = () => {
    const [search, setSearch]=useState("London");
    const [data, setData]=useState([]);
    const [input, setInput]=useState("");
    let CompoundMounted=true;

    useEffect(()=>{
        const fetchWeather=async () => {
            const response=await fetch( `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=12f225ed3a9f6adc6c1162b7b7308ffd`);
            if(CompoundMounted){
                setData(await response.json());
                console.log(data);
            }
            return() =>{
                CompoundMounted =false;
            }
        }
       fetchWeather();
    },[search]);

    let emoji=null;
    if(typeof data.main !="undefined"){
        if(data.weather[0].main ==="clouds"){
            emoji="fa-cloud"
        }else if(data.weather[0].main ==="Thunderstorm"){
            emoji="fa-bolt"
        }else if(data.weather[0].main ==="Drizzle"){
            emoji="fa-cloud-rain"
    }else if(data.weather[0].main ==="rain"){
        emoji="fa-cloud-shower-heavy"
    }else if(data.weather[0].main ==="snow"){
        emoji="fa-snow-flake"
    }else{
        emoji="fa-smog"

    }
}else{
        return(
        <div>...loading</div>
        )
    }
    

    let temp=(data.main.temp -273.15).toFixed(2);
    let temp_min=(data.main.temp_min -273.15).toFixed(2);
    let temp_max=(data.main.temp_max -273.15).toFixed(2);

    //date
    let d=new Date()
    let date=d.getDate();
    let year=d.getFullYear();
    let month=d.toLocaleString("default",{month:'long'});
    let day=d.toLocaleString("default",{weekday:'long'});


    //time
    let time=d.toLocaleString([],{
        hour:'2-digit',
        minute:'2-digit',
        second:'2-digit'
    });

    const handlesubmit=(event) =>{
        event.preventDefault();
        setSearch(input);
    }

    return (
        <div>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div class="col-md-4">
                        <div class="card text-bg-dark text-center border-0">
                            <img src={`https://images.unsplash.com/photo-1658302290771-e18350e6f2c4?${data.weather[0].main}ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80}`} class="card-img" alt="..." />
                            <div class="card-img-overlay">
                                <form onSubmit={handlesubmit}>
                                    <div class="input-group mb-4 w-75 mx-auto">
                                        <input type="search" class="form-control" placeholder="Search city" aria-label="Search city" aria-describedby="basic-addon2"
                                        name="search"
                                        value={input}
                                        onChange={(e)=>setInput(e.target.value)}
                                        required
                                        />
                                            <button type="submit" class="input-group-text" id="basic-addon2">
                                                <i className="fas fa-search"></i>
                                            </button>
                                    </div>
                                </form>
                                <div className="bg-dark bg-opacity-50 py-3">
                                <h2 class="card-title">{data.name}</h2>
                                <p class="card-text lead">{day},{month} {date},{year}
                                <br />
                                {time}
                                </p>
                               <hr />
                               <i className={`fas ${emoji}  fa-4x`}></i>
                               <h1 className="fw-bolder mb-5">{temp}&deg;C</h1>
                               <p className="lead fw-bolder mb-0">{data.weather[0].main}</p>
                               <p className="lead">{temp_min}&deg;c |{temp_max} &deg;C</p>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
    }
    

export default Searchweather;
