// controllers/subscriptionController.js
import Subscription from '../models/subscriptionModel.js';

// Create a new subscription
export const createSubscription = async (req, res) => {
    try {
        const sub = await Subscription.create(req.body);
        res.status(201).json(sub);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all subscriptions
export const getAllSubscriptions = async (req, res) => {
    try {
        const subs = await Subscription.find();
        res.json(subs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a subscription
export const deleteSubscription = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Subscription.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: "Subscription not found" });
        res.json({ message: "Customer subscription deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Update a customer's subscription (renew)
export const updateSubscription = async (req, res) => {
    try {
        const { id } = req.params;
        const { startDate, endDate } = req.body;

        const updated = await Subscription.findByIdAndUpdate(
            id,
            { startDate, endDate, status: 'active' },
            { new: true }
        );

        if (!updated) return res.status(404).json({ message: "Customer not found" });

        res.json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
