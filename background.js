chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.create({ url: "dist/index.html" });
});

chrome.action.onClicked.addListener((tab) => {
  // Listen for click on extension icon
  chrome.tabs.create({ url: "dist/index.html" });
});
