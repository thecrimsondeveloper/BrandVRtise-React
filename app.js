// Add hover effect to make the container shift dynamically
const appContainer = document.getElementById("app");

appContainer.addEventListener("mousemove", (event) => {
  // Calculate relative mouse position within the container
  const rect = appContainer.getBoundingClientRect();
  const mouseX = event.clientX - rect.left; // X position relative to the container
  const mouseY = event.clientY - rect.top; // Y position relative to the container

  // Normalize the mouse position to range -1 to 1
  const offsetX = (mouseX / rect.width - 0.5) * 2; // Horizontal shift
  const offsetY = (mouseY / rect.height - 0.5) * 2; // Vertical shift

  // Apply a slight movement based on mouse position
  appContainer.style.transform = `translate(${offsetX * -20}px, ${
    offsetY * -20
  }px)`;
});

appContainer.addEventListener("mouseleave", () => {
  // Reset the position when the mouse leaves the container
  appContainer.style.transform = "translate(0, 0)";
});

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
