function renderContent(p) {
	switch(p) {
		case "background":
			$("#content").load("background.ejs");
			$("#content").css("background", $("#background").css("background"));
			break;
		case "portfolio":
			$("#content").load("portfolio.ejs");
			$("#content").css("background", $("#portfolio").css("background"));
			break;
		case "personal":
			$("#content").load("personal.ejs");
			$("#content").css("background", $("#personal").css("background"));
			break;
	}	
}
$(document).ready(function() {
	console.log("jquery loaded");
	renderContent("portfolio");
	
	$(".content").mouseover(function(event) {
		switch(event.target.id) {
			case "background":
				$("#backgroundh2").css("text-decoration", "underline");
				$("#portfolioh2").css("text-decoration", "none");
				$("#personalh2").css("text-decoration", "none");
				break;
			case "portfolio":
				$("#portfolioh2").css("text-decoration", "underline");
				$("#backgroundh2").css("text-decoration", "none");
				$("#personalh2").css("text-decoration", "none");
				break;
			case "personal":
				$("#personalh2").css("text-decoration", "underline");
				$("#portfolioh2").css("text-decoration", "none");
				$("#backgroundh2").css("text-decoration", "none");
				break;
			default:
				break;
		}
		renderContent(event.target.id);
	});


});
