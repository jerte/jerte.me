function partition(arr, low, high) {
	var pivot = arr[high][0];
	var i = low - 1;

	for(var j=low; j<high; j++) {
		if( arr[j][0] > pivot ) {
			i += 1;
			var temp = arr[j];
			arr[j] = arr[i];
			arr[i] = temp;
		}	
	}
	var temp = arr[i+1];
	arr[i+1] = arr[high];
	arr[high] = temp;
	return i+1
}

function quicksort_dates(arr, low, high) {
	if( low < high ) {
		pi = partition(arr, low, high);
		quicksort_dates(arr, low, pi-1);
		quicksort_dates(arr, pi+1, high);
	}
}


$(document).ready(function() {
	console.log("loaded");
	$.get("https://api.github.com/users/jerte/repos", function(data) {
		var repos = []
		data.forEach(function(i) {
			repos.push([new Date(i['pushed_at']), i['name'], i['html_url'], 
						i['language']]);
		});
		
		quicksort_dates(repos, 0, repos.length-1);
		
		var git_html = "";
		var git_html = "<div class=\"row\">";
		for(var i=0; i<repos.length; i++) {
				git_html += "<div class=\"col-lg-3 col-md-4 col-6 padding2\">" + 
							"<div class=\"col-12 project invisibleLink underlineHover\">" +
								"<a href=\"" + repos[i][2] + "\">" + 
								repos[i][1] + "<p class=\"margin0\">(" + 
								repos[i][3] + ")</p></a></div></div>";
		}
		$("#git").html(git_html);
	});

	$("#git").click(function() {
		window.location = $(this).find('a').attr('href');
	});
	
	$("#add_interest").click(function() {
		if($("#add_interest p").html()) {
			
			$("#add_interest").html(
				"<form class=\"padding2 project\" id=\"add_interest_form\"><input id=\"new_interest\" type=\"text\">" + 
				"<input type=\"submit\"></form>");
			
			$("#add_interest_form").submit(function(e) { 
				$.post("/admin/add-interest", {interest: $("#new_interest").val() }, function(x) {
					if(x=="yes") {
						window.location = window.location;
					}
				});
				

				e.preventDefault();
			});

		}
	});
	
	$(".interest-topic").click(function(e) {
		//console.log(e.currentTarget.id);

		if(e.currentTarget.id!='add-topic') {
			$.get('/data/interest-topics/' + e.currentTarget.id, function(data) {
				console.log(data[0]['name']);
				$("#interest-topic-content").html("<p class=\"padding2\">" + data[0]['name'] + "</p>");		
			}).fail(function(err) { console.log(err) });
		} else if($("#add-topic span").html()) {
			console.log('text');
			$("#add-topic").html(
				"<form id=\"add-topic-form\"><input type=\"text\" id=\"new_topic\"><input type=\"submit\"></form>");
			
			$("#add-topic-form").submit(function(e) { 
				$.post("/admin/add-interest-topic", { topic: $("#new_topic").val(), location: window.location}, 
				function(x) {
					if(x=='yes') {
						window.location=window.location;
					}
				});
			});
		}
	});
});
