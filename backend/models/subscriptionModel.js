// models/subscriptionModel.js
import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'expired'],
        default: 'active',
    },
}, {
    timestamps: true,
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;
