const PDFDocument = require('pdfkit'); // Ensure you have imported the pdfkit library
const fs = require('fs');
const path = require('path');

exports.getCertificateById = async (req, res) => {
    try {
        const certificate = await Certificate.findOne({ certificateId: req.params.certificateId });
        if (!certificate) {
            return res.status(404).json({ message: 'Certificate not found' });
        }

        const filePath = path.join(__dirname, '..', 'uploads', `${certificate.certificateId}.pdf`);
        const writeStream = fs.createWriteStream(filePath);

        const doc = new PDFDocument();
        doc.pipe(writeStream);

        doc.fontSize(25).text('Certificate of Completion', { align: 'center' });
        doc.text(`Certificate ID: ${certificate.certificateId}`);
        doc.text(`Student Name: ${certificate.studentName}`);
        doc.text(`Internship Domain: ${certificate.internshipDomain}`);
        doc.text(`Start Date: ${certificate.startDate.toDateString()}`);
        doc.text(`End Date: ${certificate.endDate.toDateString()}`);
        doc.end();

        writeStream.on('finish', async () => {
            try {
                res.download(filePath, `${certificate.certificateId}.pdf`, (err) => {
                    if (err) {
                        console.error('Error sending PDF:', err);
                        res.status(500).json({ message: 'Error generating PDF' });
                    }
                });
                await fs.promises.unlink(filePath); // Clean up the file after sending
            } catch (err) {
                console.error('Error deleting PDF file:', err);
            }
        });

        writeStream.on('error', (err) => {
            console.error('Error writing PDF file:', err);
            res.status(500).json({ message: 'Error generating PDF' });
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};
