const BASE_URL = "http://localhost:3000";

import { initializeStorageWithDefaults } from './storage';

chrome.runtime.onInstalled.addListener(async () => {
  // Here goes everything you want to execute after extension initialization

  await initializeStorageWithDefaults({});

  console.log('Extension successfully installed!');
});

// Log storage changes, might be safely removed
chrome.storage.onChanged.addListener((changes) => {
  for (const [key, value] of Object.entries(changes)) {
    console.log(
      `"${key}" changed from "${value.oldValue}" to "${value.newValue}"`,
    );
  }
});

// Create Chrome Context Menu
chrome.contextMenus.create({"id": 'open', "title": 'Open Daily Vocabulary' })

chrome.contextMenus.onClicked.addListener(function(clickData){
  if (clickData.menuItemId == 'open') {
    openDV()
  }
})

function openDV() {
  chrome.tabs.create({'url': BASE_URL});
}