$(document).ready(function(){
	var count     = 1;
	var nextCount = 1;
	var prevCount = 1;

	var numberOfFeaturedItems;
	var currentFeature;

	$(function() {
		showInitialContent(count);
	
		function showInitialContent(count) {
			$("#featured-content").children().each(function (index, value) {
				if (count > 1) {
					$(this).hide();
				};
				count ++;
				currentFeature = $(this);
				numberOfFeaturedItems = count;
			});
		};

		function showNextContent(count) {
			$('.featured-' + (count - 1)).hide();
			$('.featured-' + count).show();
		};

		function showPrevContent(count) {
			$('.featured-' + (count + 1)).hide();
			$('.featured-' + count).show();	
		};

		$("a.next").click(function(e) {
			e.preventDefault();
			if (nextCount = numberOfFeaturedItems) {
				nextCount--;
				showNextContent(nextCount);
			} else {
				nextCount++;
				showNextContent(nextCount);
			};
		});

		$("a.previous").click(function(e) {
			e.preventDefault();
			if (prevCount = 1) {
				prevCount = 1;
				showPrevContent(prevCount);
			} else {
				prevCount--;
				showPrevContent(prevCount);
			};
		});
	});
});