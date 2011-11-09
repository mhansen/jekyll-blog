$("a#rss").on "click", -> mpq.track("Footer RSS Clicked")
$("a#github").on "click", -> mpq.track("Footer Github Clicked")
$("a#gplus").on "click", -> mpq.track("Footer G+ Clicked")
$("a#email").on "click", -> mpq.track("Footer Email Clicked")
mpq.track "Opened page"
