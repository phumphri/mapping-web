
# Mapping Web

## Summary
This application plots the recent earthquakes onto geographical maps.

* The __Basic Visualization__ is just that.  It provides the earthquake information.

* The __More Data__ plots the tectonic plates, earthquakes, and additional geographical maps.

* The __Time Keeps On Ticking__ is an animated display of recent earthquakes.

## Data Acquisition
### United States Geological Survey
This was the source for the earthquake data.

### Geographical Maps
Multiple geographical maps were sourced from the mapbox website.  Some used were "light", "dark", "outdoors", and "satellite".

### Tectonic Plates
A comprehensive libraryby Peter Bird was downloaded from Geochemistry Geophysics Geosystems.

## Execution
* Initialize a directory for github processing.
* Pull the repository.
* Run python -m http.server from the directory.
* Select index.html.
* When index.html is displayed, a sub-display of "More Data" or "Time Keeps On Ticking" can be selected from a menu.
The application is designed to be extended.  Additional pages can be easily added by adding the html module and corresponding
javascript.
