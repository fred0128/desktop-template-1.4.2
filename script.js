document.addEventListener("DOMContentLoaded", function() {
    const batteryBars = document.querySelector("#battery-bars");

    navigator.getBattery().then(function(battery) {
        updateBatteryBars(battery);

        battery.addEventListener('chargingchange', function() {
            updateBatteryBars(battery);
        });

        battery.addEventListener('levelchange', function() {
            updateBatteryBars(battery);
        });
    });

    function updateBatteryBars(battery) {
        const level = battery.level * 100;

        let numOfBars = Math.floor(level / 10);
        if (numOfBars === 0) numOfBars = 1;
        if (numOfBars > 10) numOfBars = 10;

        let barsHTML = "";

        const percentageText = `<span>${Math.round(level)}</span><span class="battery-percentage-item">%</span>`;

        if (level < 10) {
            barsHTML += '<div class="battery-bar blink"></div>';
        } else {
            for (let i = 0; i < numOfBars; i++) {
                barsHTML += '<div class="battery-bar"></div>';
            }
        }

        batteryBars.innerHTML = barsHTML;
    }

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes blink {
            0% { opacity: 1; }
            50% { opacity: 0; }
            100% { opacity: 1; }
        }
        .blink {
            animation: blink 1s infinite;
        }
        .battery-percentage {
            font-size: 32px;
        }
    `;
    document.head.appendChild(style);
});








document.addEventListener("DOMContentLoaded", function() {
    const batteryBars = document.querySelector("#battery-bars");
    const batteryLevel = document.getElementById("battery-level");
    const chargingStatus = document.getElementById("charging-status");
    const chargingTime = document.getElementById("charging-time");

    navigator.getBattery().then(function(battery) {
        updateBatteryIndicator(battery);
        battery.addEventListener('chargingchange', function() {
            updateBatteryIndicator(battery);
        });
        battery.addEventListener('levelchange', function() {
            updateBatteryIndicator(battery);
        });
    });

    function updateBatteryIndicator(battery) {
        const level = battery.level * 100;
        batteryLevel.textContent = Math.round(level) + '%';

        let numOfBars = Math.floor(level / 10);
        if (numOfBars === 0) numOfBars = 1;
        if (numOfBars > 10) numOfBars = 10;

        let barsHTML = "";
        if (level < 15) {
            barsHTML += '<div class="battery-bar blink"></div>';
        } else {
            for (let i = 0; i < numOfBars; i++) {
                barsHTML += '<div class="battery-bar"></div>';
            }
        }
        batteryBars.innerHTML = barsHTML;

        if (battery.charging) {
            chargingStatus.textContent = "charging";
            chargingTime.textContent = "Estimated time: " + formatTime(battery.chargingTime);
        } else {
            chargingStatus.textContent = "Not Charging";
            chargingTime.textContent = "";
        }
    }

    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0');
    }

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes blink{0%{opacity:1;}50%{opacity:0;}100%{opacity:1;}}
        .blink{animation:blink 1s infinite;}
        #battery-indicator{display:flex;flex-direction:column;font-size:14px;}
        #battery-level{font-weight:bold;margin-right:5px;}
        #charging-status{margin-right:5px;}
    `;
    document.head.appendChild(style);
});

function updateClock() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    hours = (hours < 10 ? "0" : "") + hours;
    minutes = (minutes < 10 ? "0" : "") + minutes;
    seconds = (seconds < 10 ? "0" : "") + seconds;

    document.getElementById('clock').innerHTML = hours + ":" + minutes + ":" + seconds;

    setTimeout(updateClock, 1000);
}

window.onload = function() {
    updateClock();
};

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.search-box');
    const searchInput = document.getElementById('search');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const inputValue = searchInput.value.trim();

        if (inputValue === "" || inputValue === " ") {
            return;
        }

        const url = 'https://www.google.com/search?q=' + encodeURIComponent(inputValue);

        window.location.href = url;
    });
});