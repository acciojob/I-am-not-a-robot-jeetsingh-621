//your code here
  const allImages = [
            "https://picsum.photos/id/237/200/300",
            "https://picsum.photos/seed/picsum/200/300",
            "https://picsum.photos/200/300?grayscale",
            "https://picsum.photos/200/300/",
            "https://picsum.photos/200/300.jpg"
        ];
  const imageContainer = document.getElementById("imageContainer");
        const resetButton = document.getElementById("reset");
        const verifyButton = document.getElementById("verify");
        const message = document.getElementById("para");

        let selectedTiles = [];
        let images = [];

  function shuffleImages() {
            let tempImages = [...allImages];
            let duplicate = tempImages[Math.floor(Math.random() * tempImages.length)];
            tempImages.push(duplicate);
            images = tempImages.sort(() => Math.random() - 0.5);
        }
 function displayImages() {
            imageContainer.innerHTML = "";
            shuffleImages();
            images.forEach((src, index) => {
                let img = document.createElement("img");
                img.src = src;
                img.classList.add("tile");
                img.dataset.index = index;
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
            if (selectedTiles[0].src === selectedTiles[1].src) {
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