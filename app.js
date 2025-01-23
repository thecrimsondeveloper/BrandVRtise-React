document.getElementById("saveButton").addEventListener("click", () => {
  const imageInput = document.getElementById("imageInput");
  const stringInput1 = document.getElementById("stringInput1").value;
  const stringInput2 = document.getElementById("stringInput2").value;

  // Read the uploaded image file as Base64
  const reader = new FileReader();
  reader.onload = function () {
    const imageBase64 = reader.result;

    // Generate the data package
    const outputData = {
      type: "UnityDataPackage",
      payload: {
        image: imageBase64, // Base64-encoded image
        settings: {
          string1: stringInput1, // Customization string 1
          string2: stringInput2, // Customization string 2
        },
      },
    };

    // Calculate size of the data package
    const packageSize = new Blob([JSON.stringify(outputData)]).size;

    // Display the data and its size in the output section
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
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    // If no image is uploaded, display other fields only
    const outputData = {
      type: "UnityDataPackage",
      payload: {
        image: null, // No image
        settings: {
          string1: stringInput1,
          string2: stringInput2,
        },
      },
    };

    // Calculate size of the data package
    const packageSize = new Blob([JSON.stringify(outputData)]).size;

    // Display the data and its size in the output section
    document.getElementById("output").textContent = JSON.stringify(
      outputData,
      null,
      2
    );
    document.getElementById(
      "size"
    ).textContent = `Package Size: ${packageSize} bytes`;
  }
});
