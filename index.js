// variables for Dom elements
const fileUploadElement = document.getElementById("droppable-element");
const uploadInfoElement = document.getElementById("droppable-info-text");
const uploadInfoImage = document.getElementById("droppable-info-img");
const main = document.getElementsByClassName("main-container")[0];
const title = document
  .getElementsByClassName("title")[0]
  .getElementsByTagName("h4")[0];
const fileTestRegex = new RegExp("^\\S+(.jpg|.png)");
const button = document.getElementById("submit");

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

// file upload error state function
function fileUploadError() {
  uploadInfoElement.style.color = "red";
  uploadInfoImage.style.cssText =
    "filter: brightness(50%) sepia(1) hue-rotate(-38deg) saturate(24) brightness(110%);";
  uploadInfoElement.innerText = "Error: Image is not JPG or PNG";
}

let fileHandle;

// function to handle clickable upload process
async function getFile() {
  try {
    [fileHandle] = await window.showOpenFilePicker(pickerOptions);
    const file = await fileHandle.getFile();
    const fileSizeTest = file.size <= 500000;
    const suffixTest = fileTestRegex.test(fileHandle.name);

    console.log("suffixTest", suffixTest);
    console.log("file name", fileHandle.name);

    if (!fileSizeTest || !suffixTest) {
      // uploadInfoElement.style.color = "red";
      // uploadInfoImage.style.cssText =
      //   "filter: brightness(50%) sepia(1) hue-rotate(-38deg) saturate(24) brightness(110%);";
      // uploadInfoElement.innerText = "Error: Image is not JPG or PNG";
      fileUploadError();
    }
  } catch (error) {
    console.error(error);
  }
}

// functions to handle drag and drop process
function dropHandler(ev) {
  console.log("File(s) dropped");

  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();

  if (ev.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    [...ev.dataTransfer.items].forEach((item, i) => {
      // If dropped items aren't files, reject them
      if (item.kind === "file") {
        const file = item.getAsFile();
        console.log(`… file[${i}].name = ${file.name}`);
        if (!fileTestRegex.test(file.name)) {
          fileUploadError()
        }
      }
    });
  } else {
    // Use DataTransfer interface to access the file(s)
    [...ev.dataTransfer.files].forEach((file, i) => {
      console.log(`… file[${i}].name = ${file.name}`);
    });
  }
}

function dragOverHandler(e) {
  console.log("File(s) in drop zone");
  e.preventDefault();
}

function dragEnter(e) {
  console.log("in the dropzone...");
  e.preventDefault();
}

fileUploadElement.addEventListener("click", getFile);
fileUploadElement.addEventListener("dragenter", dragEnter);
