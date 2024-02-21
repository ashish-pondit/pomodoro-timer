chrome.runtime.onInstalled.addListener(() => {
    console.log("event captured on install");
    chrome.tabs.create({ url: "dist/index.html" });
});

chrome.action.onClicked.addListener((tab) => {
    // Listen for click on extension icon
    console.log("click event captured");
    chrome.tabs.create({ url: "dist/index.html" });
});
