const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../utils/sendEmail');

router.post('/contact', async (req, res) => {
    try {
        const { name, phone, email, subject, message } = req.body;

        // Basic validation
        if (!name || !email || !phone) {
            return res.status(400).json({
                success: false,
                message: 'Name, email and phone are required.'
            });
        }

        await sendContactEmail({ name, phone, email, subject, message });

        res.status(200).json({
            success: true,
            message: 'Message sent successfully!'
        });

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again.'
        });
    }
});

module.exports = router;