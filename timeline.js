

function myTimeline() {

    console.log("myTimeline was called.")

    x = d3.selectAll("path")

    x._groups[0].forEach(function (d) {

        color_name = d.getAttribute("fill")
        fill_opacity = d.getAttribute("fill-opacity")

        continue_processing = true

        while (continue_processing) {
            if (fill_opacity > 0) {
                if ((color_name === "Green")
                    || (color_name === "GreenYellow")
                    || (color_name === "Yellow")
                    || (color_name === "Orange")
                    || (color_name === "OrangeRed")
                    || (color_name === "Red")) {
                    console.log("\nObject.keys(d): " + Object.keys(d))
                    console.log("typeof d: " + typeof d)
                    console.log("d._leaflet_id: " + d._leaflet_id)
                    console.log("\nd:")
                    console.log(d)
                    d.setAttribute("fill-opacity", "0")
                    continue_process = false
                }
            }
        }
    }
    )

};

function sleep(miliseconds) {
    var currentTime = new Date().getTime();

    while (currentTime + miliseconds >= new Date().getTime()) {
    }
}

