const timer = document.querySelector(".timer");
const allSelects = document.querySelectorAll("select");
const selectHour = document.querySelector("#hour");
const selectMinute = document.querySelector("#minute");
const selectAmPm = document.querySelector("#ampm");
const button = document.querySelector("button");

const alarm = () => {
  const renderNumber = (init, number, local) => {
    for (let i = init; i < number; i++) {
      if (i < 10) {
        local.innerHTML += `<option value="0${i}">0${i}</option>`;
      } else {
        local.innerHTML += `<option value="${i}">${i}</option>`;
      }
    }
  };
  renderNumber(1, 13, selectHour);
  renderNumber(0, 60, selectMinute);
  let active = false;
  button.addEventListener("click", () => {
    active = !active;

    if (!active) {
      button.innerHTML = "Ativar";
      allSelects.forEach((select) => {
        select.disabled = false;
      });
    
    }
  });
  setInterval(() => {
    const now = new Date();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    const amPm = now.getHours() >= 12 ? "PM" : "AM";
    const hour12 = now.getHours() % 12;
    const minuteString = minute < 10 ? `0${minute}` : minute;
    const hourString = hour12 < 10 ? `0${hour12}` : hour12;
    const secondString = second < 10 ? `0${second}` : second;
    const time = `${hourString}:${minuteString}:${secondString} ${amPm}`;
    timer.innerText = time;
    if (active) {
      verifyTime(hourString, minuteString, amPm, secondString);
    }
  }, 1000);

  const verifyTime = (hour, minute, ampm, secondString) => {
    if (selectHour.value != "hora" && selectMinute.value != "minute") {
      if (active) {
        button.innerHTML = "Stop";
        allSelects.forEach((select) => {
          select.disabled = true;
        });
      }

      if (
        hour == selectHour.value &&
        minute == selectMinute.value &&
        ampm == selectAmPm.value &&
        secondString == 00
      ) {
        alert("Alarm");
        active = false;
        button.innerHTML = "Ativar";
        allSelects.forEach((select) => {
          select.disabled = false;
        });

      }
    } else {
      console.log("faltam dados");
    }
  };
};

alarm();
