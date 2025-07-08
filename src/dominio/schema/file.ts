import mongoose, { Schema, Document } from "mongoose";
export interface IFileSchemma extends Document {
  process_id: string;
  status: string;
  progress: {
    total_files: number;
    processed_files: number;
    percentage: number;
  };
  started_at: Date;
  estimated_completion: Date;
  results: {
    total_words: number;
    total_lines: number;
    most_frequent_words: string[];
    files_processed: string[];
  };
}

const FileSchema: Schema = new Schema(
  {
    process_id: { type: String, required: true },
    status: { type: String, required: true },
    progress: {
      total_files: { type: Number, required: true },
      processed_files: { type: Number, required: true },
      percentage: { type: Number, required: true },
    },
    started_at: { type: Date, required: true },
    estimated_completion: { type: Date, required: true },
    results: {
      total_words: { type: Number, required: true },
      total_lines: { type: Number, required: true },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const File = mongoose.models.File || mongoose.model("File", FileSchema);
export default File;
