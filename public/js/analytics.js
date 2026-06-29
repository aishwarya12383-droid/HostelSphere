async function loadAnalytics() {

    try {

        const response = await fetch("http://localhost:5000/analytics");

        const data = await response.json();

        document.getElementById("students").innerHTML = data.students;
        document.getElementById("complaints").innerHTML = data.complaints;
        document.getElementById("meals").innerHTML = data.bookings;
        document.getElementById("saved").innerHTML = data.foodSaved;

        // Temporary values until backend provides meal-wise counts
        document.getElementById("breakfast").innerHTML = 0;
        document.getElementById("lunch").innerHTML = 0;
        document.getElementById("dinner").innerHTML = 0;

        // Create Chart
        const ctx = document.getElementById("analyticsChart");

        new Chart(ctx, {
            type: "bar",
            data: {
                labels: [
                    "Students",
                    "Bookings",
                    "Complaints"
                ],
                datasets: [{
                    label: "Hostel Statistics",
                    data: [
                        data.students,
                        data.bookings,
                        data.complaints
                    ]
                }]
            },
            options: {
                responsive: true
            }
        });

    } catch (error) {

        console.log(error);

    }

}

loadAnalytics();