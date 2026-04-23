const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { sendCareerEmail } = require('../utils/sendEmail');

router.post('/career', upload.single('resume'), async (req, res) => {
    try {
        const { name, email, phone, position, message } = req.body;

        // Basic validation
        if (!name || !email || !phone) {
            return res.status(400).json({
                success: false,
                message: 'Name, email and phone are required.'
            });
        }

        await sendCareerEmail({
            name,
            email,
            phone,
            position,
            message,
            resume: req.file || null   // req.file = uploaded file from Multer
        });

        res.status(200).json({
            success: true,
            message: 'Application submitted successfully!'
        });

    } catch (error) {
        console.error('Career form error:', error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again.'
        });
    }
});

module.exports = router;