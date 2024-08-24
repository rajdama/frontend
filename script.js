document
  .getElementById("uploadForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    const loader = document.getElementById("loader");

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      // Show the loader
      loader.style.display = "block";

      fetch("http://142.93.216.2:3000", {
        // Replace with your server endpoint
        method: "POST",
        body: formData,
      })
        .then((response) => {
          // Hide the loader

          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          return response.blob(); // Get the response as a blob
        })
        .then((blob) => {
          const url = window.URL.createObjectURL(blob); // Create a URL for the blob
          const a = document.createElement("a"); // Create a link element
          a.href = url;
          a.download = "images.zip"; // Set the file name for download
          document.body.appendChild(a); // Append link to the body
          a.click(); // Trigger the download
          a.remove(); // Remove the link from the body
          window.URL.revokeObjectURL(url); // Release the object URL
          loader.style.display = "none";
        })
        .catch((error) => {
          console.error("Error during file upload:", error);
          // Hide the loader even in case of an error
          loader.style.display = "none";
        });
    } else {
      console.error("No file selected.");
    }
  });
