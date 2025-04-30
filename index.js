const fileUploadElement = document.getElementById("droppable-element");
const uploadInfoElement = document.getElementById("droppable-info-text");
const uploadInfoImage = document.getElementById("droppable-info-img");
const fileTestRegex = new RegExp("^S+(.jpg|.png)", "g");

const pickerOptions = {
  types: [
    {
      description: "Images",
      accept: {
        "image/*": [".png", ".gif", ".jpeg", ".jpg"],
      },
    },
  ],
  excludeAcceptAllOption: true,
  multiple: false,
};

let fileHandle;

async function getFile() {
  [fileHandle] = await window.showOpenFilePicker(pickerOptions);

  console.log(fileHandle);
  let validFile = fileTestRegex.test(fileHandle.name);
  if (!validFile) {
    uploadInfoElement.style.color = "red";
    uploadInfoImage.setAttribute("style", "stroke:red");
    uploadInfoElement.innerText = "Error: Image is not JPG or PNG";
  }
}

fileUploadElement.addEventListener("click", getFile);
