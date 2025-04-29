const dragEl = document.getElementById("p1");

function dragstartHandler(ev) {
    ev.stopPropagation();
  // Add the target element's id to the data transfer object
  ev.dataTransfer.setData("text/plain", ev.target.id);
  console.log("dragging started");
}

// Add the ondragstart event listener
dragEl.addEventListener("dragstart",dragstartHandler);
