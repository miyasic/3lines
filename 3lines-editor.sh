#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title 3lines-editor
# @raycast.mode compact

# Optional parameters:
# @raycast.icon 3️⃣

code ./

fork ./
# Forkのウィンドウをフローティングに切り替える
fork_window_id=$(yabai -m query --windows | jq '.[] | select(.app=="Fork") | .id')
if [ ! -z "$fork_window_id" ]; then
    yabai -m window $fork_window_id --toggle float
fi


open -a "Google Chrome" https://3lines-lemon-dev.vercel.app/ https://github.com/miyasic/3lines/pulls https://console.firebase.google.com/project/lines-31c04-dev/overview?hl=ja https://vercel.com/miyasics-projects/3lines https://www.notion.so/miyasic/6d93b86b093d4cd782c1aac401c19990