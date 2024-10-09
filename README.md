Imports: Imports necessary libraries (React, useState, and useNavigate) and a logo image.
State Variables:
username: Holds the input for the username.
password: Holds the input for the password.
useNavigate: A hook from react-router-dom for programmatic navigation.
handleLogin Function: Prevents the default form submission, checks credentials, and navigates to the home page if valid. Otherwise, it shows an alert for invalid credentials.
Return Statement: Renders the login form with an image and two input fields for username and password.
State Variables:
darkMode: Boolean that determines if the dark mode is enabled.
notificationTime: Stores the timestamp of the last button press.
toggleMode Function:
Takes a mode argument ('on' or 'off').
Toggles dark mode and sends a POST request to the server to notify about the button press.
Handles the response by setting the notificationTime state.
Return Statement: Renders the home page with buttons for toggling modes and navigating to the map component.
State Variables:
selectedPlace: Stores the location selected from the search.
searchQuery: Holds the input from the search box.
mapRef: Reference to the Google Map instance.
searchError: Holds any error messages related to searching for places.
handleSearch Function:
Searches for a place using the Google Places API.
If a place is found, it updates the map and centers it on the selected location.
Handles errors by updating the searchError state.
Return Statement: Renders the map, search input, and a button to trigger the search.
