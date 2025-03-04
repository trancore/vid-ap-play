// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    vid_ap_play_lib::run().plugin(tauri_plugin_store::Builder::new().build())
}
