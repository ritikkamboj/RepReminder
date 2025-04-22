// routes/subscriptionRoutes.js
import express from 'express';
import {
    createSubscription,
    deleteSubscription,
    getAllSubscriptions,
    updateSubscription,
} from '../controllers/subscriptionController.js';
import Subscription from '../models/subscriptionModel.js';

const router = express.Router();

router.post('/', createSubscription);
router.get('/', getAllSubscriptions);
router.delete('/:id', deleteSubscription);
router.put('/:id', updateSubscription);


// Route to get the active users 
router.get('/active', async (req, res) => {
    const today = new Date();
    const subs = await Subscription.find({ status: 'active', endDate: { $gte: today } });
    res.json(subs);
});

// route to get the data whose 5 days are remaining 
router.get('/expiring', async (req, res) => {
    const today = new Date();
    const fiveDaysLater = new Date(today);
    fiveDaysLater.setDate(today.getDate() + 5);

    const subs = await Subscription.find({
        endDate: { $gte: today, $lte: fiveDaysLater },
    });
    res.json(subs);
});

//getting all Expired Subscription 
router.get('/expired', async (req, res) => {
    const today = new Date();
    const subs = await Subscription.find({ endDate: { $lt: today } });
    res.json(subs);
});


// Route to Delete the all expired subscription at once !
router.delete('/expired/delete', async (req, res) => {
    const today = new Date();
    const result = await Subscription.deleteMany({ endDate: { $lt: today } });
    res.json({ message: `${result.deletedCount} expired subscriptions deleted.` });
});





export default router;
