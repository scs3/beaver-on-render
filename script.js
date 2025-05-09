const dataUrl = "/api/beaver";

fetch(dataUrl)
  .then(response => response.text())
  .then(html => {
    const lines = html.split("\n");
    const dataLines = lines.filter(line => /^\d{2}[A-Z]{3}\d{4}/.test(line.trim()));

    const rows = dataLines.map(line => {
      const parts = line.trim().split(/\s+/);
      return {
        date: parts[0],
        time: parts[1],
        elevation: parts[2],
        tailwater: parts[3],
        generation: parts[4],
        turbine: parts[5],
        spillway: parts[6],
        total: parts[7]
      };
    });

    const latest = rows[0];
    document.getElementById("tailwater-card").textContent = `${latest.tailwater} ft`;
    document.getElementById("elevation-card").textContent = `${latest.elevation} ft`;
    document.getElementById("generation-card").textContent = `${latest.generation} MWh`;
    document.getElementById("release-card").textContent = `${latest.total} cfs`;

    const labels = rows.map(r => r.time);
    const tailwaterData = rows.map(r => parseFloat(r.tailwater));
    const turbineData = rows.map(r => parseFloat(r.turbine));
    const spillwayData = rows.map(r => parseFloat(r.spillway));

    new Chart(document.getElementById("tailwaterChart"), {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Tailwater (ft)',
            data: tailwaterData,
            borderColor: 'green',
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: '' }
        },
        scales: {
          x: {
            ticks: {
              callback: function(val, index) {
                return this.getLabelForValue(val);
              }
            }
          }
        }
      }
    });

    new Chart(document.getElementById("releaseChart"), {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Turbine',
            data: turbineData,
            backgroundColor: 'purple',
            stack: 'release'
          },
          {
            label: 'Spillway',
            data: spillwayData,
            backgroundColor: 'orange',
            stack: 'release'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: '' }
        },
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true
          }
        }
      }
    });
  })
  .catch(error => {
    console.error("Error loading data:", error);
  });
