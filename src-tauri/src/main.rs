// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::io::BufReader;
use std::fs::File;
use mp4parse::read_mp4;
use urlencoding::decode;

#[tauri::command]
fn get_duration(path: &str)-> f64 {
    let decoded_path = decode(path).expect("UTF-8");
    let local_path = std::path::Path::new(decoded_path.as_ref());

    let mut result_duration: f64 = 0.0;

    if local_path.exists() && local_path.is_file() {
        let file = match File::open(local_path) {
            Ok(file) => file,
            Err(_) => {
                println!("Failed to open file: {}", local_path.display());
                return 0.0;
            }
        };        
        let mut reader = BufReader::new(file);
        let context = match read_mp4(&mut reader) {
            Ok(context) => context,
            Err(_) => {
                println!("Failed to read file: {}", local_path.display());
                return 0.0;
            }
        };        
    
        for track in &context.tracks {
            if let Some(duration) = track.duration {
                if let Some(timescale) = track.timescale {
                    result_duration = duration.0 as f64 / timescale.0 as f64;
                    break;
                }
            }
        }
    }
    result_duration    
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_store::Builder::default().build())
        .invoke_handler(tauri::generate_handler![get_duration])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
