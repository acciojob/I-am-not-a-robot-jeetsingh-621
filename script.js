//your code here
   const classNames = ["img1", "img2", "img3", "img4", "img5"];
 const imageContainer = document.getElementById("imageContainer");
        const resetButton = document.getElementById("reset");
        const verifyButton = document.getElementById("verify");
        const message = document.getElementById("para");

        let selectedTiles = [];
        let images = [];

        function shuffleImages() {
            let tempClasses = [...classNames];
            let duplicate = tempClasses[Math.floor(Math.random() * tempClasses.length)];
            tempClasses.push(duplicate);
            images = tempClasses.sort(() => Math.random() - 0.5);
        }

        function displayImages() {
            imageContainer.innerHTML = "";
            shuffleImages();
            images.forEach((className, index) => {
                let img = document.createElement("img");
                img.classList.add("tile", className);
                img.dataset.index = index;
                img.dataset.type = className;
                img.addEventListener("click", () => selectTile(img));
                imageContainer.appendChild(img);
            });
        }

        function selectTile(img) {
            if (selectedTiles.length < 2 && !selectedTiles.includes(img)) {
                img.classList.add("selected");
                selectedTiles.push(img);
            }
            if (selectedTiles.length === 1) resetButton.classList.remove("hidden");
            if (selectedTiles.length === 2) verifyButton.classList.remove("hidden");
        }

        function verifySelection() {
            if (selectedTiles[0].dataset.type === selectedTiles[1].dataset.type) {
                message.textContent = "You are a human. Congratulations!";
            } else {
                message.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
            }
            verifyButton.classList.add("hidden");
        }

        function resetGame() {
            selectedTiles.forEach(img => img.classList.remove("selected"));
            selectedTiles = [];
            resetButton.classList.add("hidden");
            verifyButton.classList.add("hidden");
            message.textContent = "";
        }

        resetButton.addEventListener("click", resetGame);
        verifyButton.addEventListener("click", verifySelection);

        displayImages();