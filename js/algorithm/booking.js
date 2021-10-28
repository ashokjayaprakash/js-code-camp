function areBookingsPossible(arrival, departure, n, k)
{
    var ans = [];
 
    // create a common vector both arrivals
    // and departures.
    for (var i = 0; i < n; i++) {
        ans.push([arrival[i], 1]);
        ans.push([departure[i], 0]);
    }
 
    // sort the vector
    ans.sort();
 
    var curr_active = 0, max_active = 0;
 
    for (var i = 0; i < ans.length; i++) {
 
        // if new arrival, increment current
        // guests count and update max active
        // guests so far
        if (ans[i][1] == 1) {
            curr_active++;
            max_active = Math.max(max_active,
                             curr_active);
        }
 
        // if a guest departs, decrement
        // current guests count.
        else
            curr_active--;
    }
 
    // if max active guests at any instant
    // were more than the available rooms,
    // return false. Else return true.
    return (k >= max_active);
}
 
var arrival = [1, 3, 5];
var departure = [2, 6, 8];
var n = arrival.length;
areBookingsPossible(arrival, departure, n, 1);
