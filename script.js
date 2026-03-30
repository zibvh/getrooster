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

    let fallbackUrl = "https://github.com/zibvh/roost/releases/latest";

    const fetchLatestApk = () => {
        // Add timeout to avoid long waits
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        fetch("https://api.github.com/repos/zibvh/roost/releases/latest", {
            signal: controller.signal,
            headers: { Accept: "application/json" }
        })
            .then(response => {
                clearTimeout(timeoutId);
                if (!response.ok) throw new Error("API error");
                return response.json();
            })
            .then(data => {
                const apkAsset = data.assets.find(
                    asset =>
                        asset.name.toLowerCase().startsWith("rooster-v") &&
                        asset.name.toLowerCase().endsWith(".apk")
                );

                if (apkAsset) {
                    downloadBtn.href = apkAsset.browser_download_url;
                    const sizeMB = (apkAsset.size / 1048576).toFixed(1);
                    const version = data.tag_name || data.name || "latest";
                    fileInfoSpan.innerHTML = `<i class="fas fa-check-circle"></i> Ready: ${apkAsset.name} (${sizeMB} MB) • ${version}`;
                } else {
                    fileInfoSpan.innerHTML =
                        '<i class="fas fa-external-link-alt"></i> Get APK from GitHub releases';
                    downloadBtn.href = fallbackUrl;
                    downloadBtn.target = "_blank";
                }
            })
            .catch(error => {
                clearTimeout(timeoutId);
                console.log("GitHub API fallback:", error);
                fileInfoSpan.innerHTML =
                    '<i class="fab fa-github"></i> Available on GitHub releases';
                downloadBtn.href = fallbackUrl;
                downloadBtn.target = "_blank";
            });
    };

    if ("requestIdleCallback" in window) {
        requestIdleCallback(() => fetchLatestApk(), { timeout: 2000 });
    } else {
        setTimeout(fetchLatestApk, 100);
    }

    const criticalImages = document.querySelectorAll('img[loading="eager"]');
    criticalImages.forEach(img => {
        if (img.complete === false) {
            
        }
    });
})();
