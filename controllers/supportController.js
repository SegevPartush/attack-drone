const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Use environment variable for security

const supportView = async (req, res) => {
    res.render('support', {
        status: ''
    });
}

const contactSend = async (req, res) => {
    const msg = {
        to: 'bar23237@gmail.com',
        from: 'bar23237@gmail.com',
        subject: 'Support',
        text: `User email: ${req.body.email}\nMessage: ${req.body.content}`,
    };

    try {
        await sgMail.send(msg); // Await the send function
        console.log('Email sent');
        // res.render('support', {
        // status: 'Email sent successfully!' // Success message

        // });
        res.json({
            status: 'success',
            message: 'Email sent successfully!'  // Success message to be displayed on the page
        });
    } catch (error) {
        console.error(error);
        // res.render('support', {
        //     status: 'Failed to send email. Please try again later.' // Error message
        // });
        res.json({
            status: 'error',
            message: 'Failed to send email. Please try again later.'  // Error message to be displayed on the page
        });
    }
}

module.exports = {
    supportView,
    contactSend
}
