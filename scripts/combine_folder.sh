#!/bin/bash

# Usage: ./combine_folder.sh <source_directory> <output_file>

if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <source_directory> <output_file>"
    exit 1
fi

SOURCE_DIR="$1"
OUTPUT_FILE="$2"

# Check if source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo "Error: Source directory does not exist"
    exit 1
fi

# Create or clear the output file
> "$OUTPUT_FILE"

# Function to print indentation
print_indent() {
    local depth=$1
    for ((i=0; i<depth; i++)); do
        echo -n "│   "
    done
}

# Generate and save tree structure
echo "Directory Structure:" > "$OUTPUT_FILE"

# Calculate base depth for relative paths
BASE_DEPTH=$(echo "$SOURCE_DIR" | tr -cd '/' | wc -c)

# Generate tree structure
find "$SOURCE_DIR" -print0 | sort -z | while IFS= read -r -d '' path; do
    if [ "$path" = "$SOURCE_DIR" ]; then
        continue
    fi

    # Calculate relative depth
    DEPTH=$(echo "$path" | tr -cd '/' | wc -c)
    DEPTH=$((DEPTH - BASE_DEPTH))

    # Get the basename of the path
    NAME=$(basename "$path")

    # Print the tree branch
    if [ -d "$path" ]; then
        print_indent $((DEPTH-1)) >> "$OUTPUT_FILE"
        echo "├── $NAME/" >> "$OUTPUT_FILE"
    else
        print_indent $((DEPTH-1)) >> "$OUTPUT_FILE"
        echo "├── $NAME" >> "$OUTPUT_FILE"
    fi
done

echo -e "\n\nFile Contents:" >> "$OUTPUT_FILE"

# Find all files and process them
find "$SOURCE_DIR" -type f | sort | while read -r file; do
    echo -e "\n================" >> "$OUTPUT_FILE"
    echo "$file" >> "$OUTPUT_FILE"
    echo -e "================\n" >> "$OUTPUT_FILE"
    cat "$file" >> "$OUTPUT_FILE"
done

echo "Combined files have been saved to $OUTPUT_FILE"