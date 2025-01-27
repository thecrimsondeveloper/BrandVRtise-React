// Add hover effect to make the container shift dynamically
const appContainer = document.getElementById("app");

let hoverOrigin = { x: 0, y: 0 }; // Store the mouse entry point as the origin

// Existing functionality for the save button
document.getElementById("saveButton").addEventListener("click", () => {
  const imageInput = document.getElementById("imageInput");
  const stringInput1 = document.getElementById("stringInput1").value.trim();
  const stringInput2 = document.getElementById("stringInput2").value.trim();

  const displayOutput = (outputData) => {
    const packageSize = new Blob([JSON.stringify(outputData)]).size;
    document.getElementById("output").textContent = JSON.stringify(
      outputData,
      null,
      2
    );
    document.getElementById(
      "size"
    ).textContent = `Package Size: ${packageSize} bytes`;
  };

  if (imageInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = function () {
      const imageBase64 = reader.result;
      const outputData = {
        type: "UnityDataPackage",
        payload: {
          image: imageBase64,
          settings: {
            string1: stringInput1 || null,
            string2: stringInput2 || null,
          },
        },
      };
      displayOutput(outputData);
    };
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    const outputData = {
      type: "UnityDataPackage",
      payload: {
        image: null,
        settings: {
          string1: stringInput1 || null,
          string2: stringInput2 || null,
        },
      },
    };
    displayOutput(outputData);
  }
});
