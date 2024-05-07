
    document.addEventListener("DOMContentLoaded", function () {
        const imgElements = document.querySelectorAll("img");

        imgElements.forEach(function(imgElement) {
            imgElement.addEventListener("mouseover", function () {
                const imageName = imgElement.alt;
                const imgNameElement = document.getElementById("imgName");
                imgNameElement.textContent = imageName;
            });

            imgElement.addEventListener("mouseout", function () {
                const imgNameElement = document.getElementById("imgName");
                imgNameElement.textContent = "";
            });
        });
    });
