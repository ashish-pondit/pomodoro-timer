chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.windows.create({
      url: chrome.runtime.getURL("dist/index.html"),
      type: "popup"
    });
  });