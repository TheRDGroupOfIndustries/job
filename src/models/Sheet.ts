import mongoose, { Document, Schema } from "mongoose";


export interface ISheet extends Document {
    _id: string;
    title: string;
    data: Record<string, any>;
}

const SheetSchema = new Schema<ISheet>({
    title: { type: String, required: true },
    data: Object
})

const Sheet = mongoose.models.Sheet || mongoose.model<ISheet>('Sheet', SheetSchema);

export default Sheet;