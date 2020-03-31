var today = new Date();
var starCountCallDate = new Date(
  parseInt(localStorage.getItem("starCountCallDate"), 10)
);

if (
  Date.parse(today) >
    starCountCallDate.setDate(starCountCallDate.getDate() + 7) ||
  localStorage.getItem("starCountCallDate") == null
) {
  updateStarCount();
} else {
  useLocalStorageStarCount();
}

function updateStarCount() {
  console.log("update");
  $.getJSON("https://d3cczln3fy2wkt.cloudfront.net/star-count", function (
    data
  ) {
    localStorage.setItem("starCountCallDate", Date.parse(today));
    localStorage.setItem("starCountData", JSON.stringify(data));

    updateStarsOnPage(data);
    reloadFilterScript();
  });
}

function useLocalStorageStarCount() {
  console.log("old");
  data = JSON.parse(localStorage.getItem("starCountData"));

  updateStarsOnPage(data);
}

function updateStarsOnPage(data) {
  for (var i = 0; i < data.length; i++) {
    $("[data-id='" + data[i].id + "'] .github-stars-count").html(data[i].stars);
  }
}

function reloadFilterScript() {
  var filterScript = $("#filter-script")[0];
  $("#filter-script")[0].remove();
  $(filterScript).appendTo("head");
}
