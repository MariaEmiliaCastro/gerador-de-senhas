const sliderEl = document.querySelector("#password-length");
const sliderValue = document.querySelector(".password-generator__length-text");

sliderEl.addEventListener("input", (event) => {
  const tempSliderValue = event.target.value;
  sliderValue.value = tempSliderValue;

  const progress = (tempSliderValue / sliderEl.max) * 100;
  sliderEl.style.background = `linear-gradient(to right, #fff ${progress}%, #2c1746 ${progress}%)`;
});

sliderValue.addEventListener("input", (event) => {
  const tempSliderValue = event.target.value;
  sliderEl.value = tempSliderValue;

  const progress = (tempSliderValue / sliderEl.max) * 100;

  sliderEl.style.background = `linear-gradient(to right, #fff ${progress}%, #2c1746 ${progress}%)`;
});
