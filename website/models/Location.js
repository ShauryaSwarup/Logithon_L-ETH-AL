//Location Schema Mongoose
import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    shipment: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    lat: {
        type: Number,
        required: true,
    },
    lng: {
        type: Number,
        required: true,
    },
});

export default mongoose.models.Location ||
    mongoose.model("Location", locationSchema);
