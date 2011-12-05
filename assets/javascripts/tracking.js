(function() {
  $("a#rss").on("click", function() {
    return mpq.track("Footer RSS Clicked");
  });
  $("a#github").on("click", function() {
    return mpq.track("Footer Github Clicked");
  });
  $("a#gplus").on("click", function() {
    return mpq.track("Footer G+ Clicked");
  });
  $("a#email").on("click", function() {
    return mpq.track("Footer Email Clicked");
  });
  mpq.track("Opened page");
}).call(this);
