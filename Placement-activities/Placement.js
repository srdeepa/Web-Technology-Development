function addActivity() {
    var activityInput = document.getElementById("activity");
    var activityDateInput = document.getElementById("activity-date");
    var activity = activityInput.value;
    var activityDate = activityDateInput.value;
    
    var currentDate = new Date();
    var inputDate = new Date(activityDate);

    if (inputDate < currentDate) {
        // Activity has already happened
        var pastActivitiesList = document.getElementById("past-activities");
        var li = document.createElement("li");
        li.textContent = activity + " - " + activityDate;
        pastActivitiesList.appendChild(li);
    } else if (inputDate.toDateString() === currentDate.toDateString()) {
        // Activity is happening today
        var presentActivitiesList = document.getElementById("present-activities");
        var li = document.createElement("li");
        li.textContent = activity + " - " + activityDate;
        presentActivitiesList.appendChild(li);
    } else {
        // Activity is upcoming
        var upcomingActivitiesList = document.getElementById("upcoming-activities");
        var li = document.createElement("li");
        li.textContent = activity + " - " + activityDate;
        upcomingActivitiesList.appendChild(li);
    }

    // Clear input fields after adding activity
    activityInput.value = "";
    activityDateInput.value = "";
}
