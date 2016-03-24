var fares;
$( document ).ready(function() {
	$.getJSON( "fares.json",{} , function( data ) {
		// get the json data into fares
		fares = data;
	});
});
function CalculateFare() {
	//Get the information of customer choice
	zone = $("#select_desination").val();
	when = $("#select_when").val();
	loc = $("input[name=location]:radio:checked").val();
	number = $("#text_rides").val();
	//If customer doesn't choose the number of the rides, the total will be 0
	if ($("#text_rides").val() == ""){
		number = 0;
	}
	$.each(fares.zones, function (key,value) {
		if (value.zone == zone) {
			$.each(value.fares, function (keyFare, valueFare) {
				//if the number of trips is 10 or n times of 10，then judge if discounted price can be used
				if (number % 10 == 0) {
					//if all match the requirement of discounted price, then calculate the price
					//Notice: Here I set riding time "Anytime" separately
					if (valueFare.trips == 10 && valueFare.type == when && valueFare.purchase == loc) {
						total = valueFare.price * (number / 10);
						return;
					}
				}
				//otherwise 
				if (valueFare.type == when && valueFare.purchase == loc) {
					total = valueFare.price * number;
					return;
				}
			});
		}
	});
	// Format price and insert into the HTML
	$("#total").html("$" + total.toFixed(2));
}