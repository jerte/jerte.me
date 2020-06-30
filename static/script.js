let nav = {"background": ["hometown", "education", "skills"],
			"portfolio": ["projects", "github", "recent"],
			"personal": ["contact", "music", "hobbies", "books"]};

function renderContent(p) {

	if( Object.keys(nav).includes(p) ) {
	
		let sc = nav[p];
		$("#box").html(
			ejs.render('<% sc.forEach(function(e) { %> <tr><td id=<%= e %>> <%= e %> </td></tr><% }); %>', {sc:sc}));
		
		$("#box td").css("background", $("#" + p).css("background"));
		$("#box td").css("color", $("#content").css("background-color"));
		$("#content").css("border-color", $("#" + p).css("background-color"));
	}
}

function renderSubContent(c, p, prev) {
	
	if([].concat.apply([], Object.values(nav)).includes(p)) {
		let sc = nav[c];
		let first_table_row = "<tr><td id=" + sc[0] + ">" + sc[0] + "</td><td id=page " + 
								"rowspan=" + sc.length + "</tr>";
		sc = sc.slice(1);

		$("#box").html( first_table_row +   
			ejs.render(`<% sc.forEach(function(e) { %>
						<tr><td id=<%= e %>> <%= e %> </td></tr>
						<% }); %>`, {sc:sc}));

		$("#box td").css("background", $("#" + c).css("background"));
		$("#box td").css("color", $("#content").css("background-color"));
		$("#content").css("border-color", $("#" + c).css("background-color"));
		$("#" + p).html("<h2>" + p + "</h2>");
	}
}

$(document).ready(function() {
	console.log("jquery loaded");
	renderContent("portfolio");
	let prevContent = null;
	let currentContent = "portfolio";
	let pagedata;
	
	$.get('/page.json', function(data) {
		
		pagedata = data;
	}); 

	$(".container").mouseover(function(event) {
		renderContent(event.target.id);	
		currentContent = event.target.id;
	});

	$("#box").mouseover(function(event) {

		if([].concat.apply([], Object.values(nav)).includes(event.target.id)) {
				
			if(prevContent) {
				$("#" + prevContent).html("<p>" + prevContent + "</p>");
			}	
			renderSubContent(currentContent, event.target.id, prevContent);
			
			$("#page").html(pagedata[event.target.id]);

			prevContent = event.target.id;
	
		}		
	});
});
