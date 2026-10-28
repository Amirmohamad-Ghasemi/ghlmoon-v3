
document.addEventListener("DOMContentLoaded", function () {
    const nxcatSearch = document.getElementById("nxcat-search-input");
    const nxcatGrid = document.getElementById("nxcat-grid");
    const nxcatCount = document.getElementById("nxcat-result-count");
    const nxcatEmpty = document.getElementById("nxcat-empty");

    if (!nxcatSearch || !nxcatGrid) {
        return;
    }

    const nxcatCards = Array.from(
        nxcatGrid.querySelectorAll(".nxcat-card")
    );

    function nxcatFilterCards() {
        const nxcatQuery = nxcatSearch.value.trim().toLowerCase();
        let nxcatVisible = 0;

        nxcatCards.forEach(function (nxcatCard) {
            const nxcatSearchText = [
                nxcatCard.innerText,
                nxcatCard.dataset.search || "",
                nxcatCard.querySelector("img")?.alt || ""
            ].join(" ").toLowerCase();

            const nxcatMatches = nxcatSearchText.includes(nxcatQuery);

            nxcatCard.hidden = !nxcatMatches;

            if (nxcatMatches) {
                nxcatVisible++;
            }
        });

        if (nxcatCount) {
            nxcatCount.textContent =
                nxcatVisible + (nxcatVisible === 1
                    ? " category"
                    : " categories");
        }

        if (nxcatEmpty) {
            nxcatEmpty.hidden = nxcatVisible !== 0;
        }
    }

    nxcatSearch.addEventListener("input", nxcatFilterCards);

    nxcatFilterCards();
});
