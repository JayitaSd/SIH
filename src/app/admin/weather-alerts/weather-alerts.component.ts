import { Component } from '@angular/core';

@Component({
  selector: 'app-weather-alerts',
  templateUrl: './weather-alerts.component.html',
  styleUrls: ['./weather-alerts.component.css']
})
export class WeatherAlertsComponent {
 API_KEY = "29af75e3d2c4ad17fc10824bada6d84c";

     async getWeather():Promise<any> {
      let city = document.getElementById("district") as HTMLSelectElement;
      let cityValue,langValue;
      if(city){cityValue=city.value};
      const lang = document.getElementById("lang") as HTMLSelectElement;
      if(lang)langValue=lang.value;
      let forecast=document.getElementById("forecast")
      if(forecast)forecast.innerHTML = "<p>Loading...</p>";

      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityValue}&appid=${this.API_KEY}&units=metric`);
        const data = await res.json();
        if (!data.list && forecast) return forecast.innerHTML = "<p>Error: "+data.message+"</p>";

        const dailyData:any = {};
        data.list.forEach((item:any) => {
          const date = item.dt_txt.split(" ")[0];
          if (!dailyData[date]) dailyData[date] = { temps: [], humidities: [], pressures: [], winds: [], descriptions: [] };
          dailyData[date].temps.push(item.main.temp);
          dailyData[date].humidities.push(item.main.humidity);
          dailyData[date].pressures.push(item.main.pressure);
          dailyData[date].winds.push(item.wind.speed);
          dailyData[date].descriptions.push(item.weather[0].description);
        });

        let table = `<h3>5-Day Daily Forecast for ${cityValue}</h3>
          <table class="forecast-table">
            <tr>
              <th style="margin:10px">Date</th>
              <th style="margin:10px">Description</th>
              <th style="margin:10px">Avg Temp (°C)</th>
              <th style="margin:10px">Avg Humidity (%)</th>
              <th style="margin:10px">Avg Pressure (hPa)</th>
              <th style="margin:10px">Avg Wind (m/s)</th>
              <th style="margin:10px">Alert</th>
            </tr>`;

        for (const date of Object.keys(dailyData).slice(0,5)) {
          const d = dailyData[date];
          const avg = (arr:any) => (arr.reduce((a:any,b:any)=>a+b,0)/arr.length).toFixed(1);
          const desc =this. mostFrequent(d.descriptions);

          const summary = { description: desc, wind: avg(d.winds), temp: avg(d.temps), pressure: avg(d.pressures) };
          const alertMsg = this.checkExtremeWeather(summary);

          if (alertMsg) {
            // Send alert to backend with selected language
            fetch("http://localhost:3000/send-sms", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ alertMsg, cityValue, date, lang })
            }).then(res=>res.json()).then(data=>console.log("SMS sent:", data)).catch(err=>console.error(err));
          }

          table += `<tr>
            <td style="margin:10px">${date}</td>
            <td style="margin:10px">${desc}</td>
            <td style="margin:10px">${avg(d.temps)}</td>
            <td style="margin:10px">${avg(d.humidities)}</td>
            <td style="margin:10px">${avg(d.pressures)}</td>
            <td style="margin:10px">${avg(d.winds)}</td>
            <td style="margin:10px">${alertMsg ? alertMsg : "✅ Safe"}</td>
          </tr>`;
        }

        table += "</table>";
        if(forecast)forecast.innerHTML = table;

      } catch (err) {
        if(forecast)forecast.innerHTML = "Error fetching data: " + err;
      }
    }

     mostFrequent(arr:any):any {
      return arr.sort((a:any,b:any)=>arr.filter((v:any)=>v===a).length - arr.filter((v:any)=>v===b).length).pop();
    }

     checkExtremeWeather(d:any) {
      const desc = d.description.toLowerCase();
      if (desc.includes("heavy rain") || desc.includes("thunderstorm") || desc.includes("moderate rain")) return "⚠️ Rain Alert";
      if (d.wind > 7) return "🌪️ High Wind Alert";
      if (d.temp > 35) return "🔥 Heatwave Alert";
      if (d.pressure < 1002) return "🌧️ Low Pressure Alert";
      return null;
    }

    // Default load
    ngOnInit(){this.getWeather();}
    
}
