const fileUploadElement = document.getElementById("droppable-element");
const uploadInfoElement = document.getElementById("droppable-info-text");
const uploadInfoImage = document.getElementById("droppable-info-img");
const fileTestRegex = new RegExp("^\\S+(.jpg|.png)");

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
  try {
    [fileHandle] = await window.showOpenFilePicker(pickerOptions);
    const file = await fileHandle.getFile();
    const fileSizeTest = file.size <= 500000;
    const suffixTest = fileTestRegex.test(fileHandle.name);
    
    console.log("suffixTest", suffixTest);
    console.log("file name", fileHandle.name);

    if (!fileSizeTest || !suffixTest) {
      uploadInfoElement.style.color = "red";
      uploadInfoImage.style.cssText =
        "filter: brightness(50%) sepia(1) hue-rotate(-38deg) saturate(24) brightness(110%);";
      uploadInfoElement.innerText = "Error: Image is not JPG or PNG";
    }
  } catch (error) {
    console.error(error);
  }
}

fileUploadElement.addEventListener("click", getFile);
