import os
from tkinter import Tk, filedialog
from PIL import Image

def select_files():
    root = Tk()
    root.withdraw()

    file_paths = filedialog.askopenfilenames(
        title="Select .webp files to convert",
        filetypes=[("WebP Files", "*.webp")]
    )

    return file_paths

def convert_webp_to_png(file_paths, output_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    for file_path in file_paths:
        try:
            with Image.open(file_path) as img:
                base_name = os.path.basename(file_path)
                name, _ = os.path.splitext(base_name)
                output_path = os.path.join(output_dir, f"{name}.png")

                img.save(output_path, "PNG")
                print(f"Converted: {file_path} -> {output_path}")
        except Exception as e:
            print(f"Error converting {file_path}: {e}")

if __name__ == "__main__":
    print("Please select .webp files to convert.")
    webp_files = select_files()

    if not webp_files:
        print("No files selected. Exiting.")
        exit()

    output_directory = filedialog.askdirectory(title="Select Output Directory for PNG Files")

    if not output_directory:
        print("No output directory selected. Exiting.")
        exit()

    print(f"Converting {len(webp_files)} files...")
    convert_webp_to_png(webp_files, output_directory)

    print("Conversion completed!")