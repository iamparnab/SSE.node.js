window.onload = function () {
  const BASE_URL = "http://localhost:8080";

  function connect(path) {
    const event = new EventSource(BASE_URL + path);
    event.onopen = () => console.log("Opened");
    event.onmessage = function (ev) {
      const news = JSON.parse(ev.data);
      render("#data", news.done ? "No more updates available." : news.value);
      if (news.done) {
        event.close();
        markEnd();
      }
    };
  }

  function render(identifier, value) {
    const dataElem = document.querySelector(identifier);
    if (dataElem) {
      const div = document.createElement("div");
      div.innerText = value;
      dataElem.appendChild(div);
    }
  }

  function markEnd() {
    const lastNews = document.querySelector("#data>div:last-child");
    if (lastNews) {
      lastNews.setAttribute("data-end", "");
    }
  }
  connect("/giveUpdates");
};
