#!/usr/bin/env node

const activeWin = require("active-win");
const { exec } = require("child_process");
const { exit } = require("process");

// Put all your defending logic over here
const checker = (data) => {
  return (
    data.title.includes("Microsoft Teams") ||
    data.title.includes("Inbox") ||
    data.title === "Notes" ||
    data.owner.name === "Google Chrome" ||
    data.owner.name === "Brave Browser"
  );
};

// Check if your team's application is the active window
function checkActiveWindow() {
  activeWin().then((data) => {
    if (data && checker(data)) {
      console.error("SNOOPER DETECTED!!!!!");
      exec("open ./warning.jpg");
      maximizeWindow();
      // sleep for 10 seconds
      setTimeout(() => {
        // lock screen
        lockScreen();
        // exit
        exit(0);
      }, 10000);
    } else {
      console.log("All good. No snoopers around");
      // Do something else when your application is not active
    }
  });
}

function maximizeWindow() {
  exec(`osascript -e 'tell application "Preview" to activate'`);
  exec(
    `osascript -e 'tell application "System Events" to tell process "Preview" to click (button 2 of window 1)'`
  );
}

function lockScreen() {
  exec("open -a ScreenSaverEngine");
}

setInterval(() => {
  checkActiveWindow();
}, 4000);
