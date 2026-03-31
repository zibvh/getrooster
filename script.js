(function () {
    const themeToggle = document.getElementById("themeToggle");
    const currentTheme = localStorage.getItem("rooster_theme");

    if (currentTheme === "light") {
        document.body.classList.add("light");
        if (themeToggle)
            themeToggle.innerHTML =
                '<i class="fas fa-sun"></i> <span>Dark mode</span>';
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            if (document.body.classList.contains("light")) {
                document.body.classList.remove("light");
                localStorage.setItem("rooster_theme", "dark");
                themeToggle.innerHTML =
                    '<i class="fas fa-moon"></i> <span>Light mode</span>';
            } else {
                document.body.classList.add("light");
                localStorage.setItem("rooster_theme", "light");
                themeToggle.innerHTML =
                    '<i class="fas fa-sun"></i> <span>Dark mode</span>';
            }
        });
    }

    const downloadBtn = document.getElementById("downloadLink");
    const fileInfoSpan = document.getElementById("fileInfo");

    // Update this URL whenever you upload a new version
    const APK_DOWNLOAD_URL = 'https://getrooster.onrender.com/downloads/rooster-v2.1.0.apk';
    
    // Set the download link
    downloadBtn.href = APK_DOWNLOAD_URL;
    downloadBtn.target = "_blank";
    
    // Optional: Get file size and show it (if your server supports HEAD requests)
    fetch(APK_DOWNLOAD_URL, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                const sizeBytes = response.headers.get('content-length');
                if (sizeBytes) {
                    const sizeMB = (sizeBytes / 1048576).toFixed(1);
                    fileInfoSpan.innerHTML = `<i class="fas fa-check-circle"></i> Ready to download • ${sizeMB} MB `;
                } else {
                    fileInfoSpan.innerHTML = `<i class="fas fa-check-circle"></i> Ready to download`;
                }
            } else {
                fileInfoSpan.innerHTML = `<i class="fas fa-exclamation-triangle"></i> APK ready for download`;
            }
        })
        .catch(() => {
            fileInfoSpan.innerHTML = `<i class="fas fa-download"></i> Click to download APK`;
        });
})();
