chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("yes clicked ......");
    chrome.tabs.create({url: "dist/index.html"});
  });