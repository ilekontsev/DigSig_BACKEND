const Booking = require('../models/bookingSchema')


module.exports.create = async (req, res) => {
    try {

        const params = req.body;
        if (!params || !params.date || !params.city || !params.barName || !params.hall || !params.startTime || !params.endTime) {
            console.log(params);
            return res.status(400).send("not all params was sent")
        }

        await Booking.create({
            date: params.date,
            city: params.city,
            barName: params.barName,
            hall: params.hall,
            startTime: params.startTime,
            endTime: params.endTime
        });


        return res.status(200).send();

    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}
module.exports.getAllActiveBookings = async (req, res) => {
    try {
        const allBookings = await Booking.find({});

        res.status(200).send(allBookings);

    } catch (err) {
        console.log(err);
        return res.status(500).send("error with getting all bookings")
    }
}

module.exports.deleteBooking = async (req, res) => {
    try {
        const params = req.body;
        const bookingId = params._id;

        if(bookingId) {
            return res.status(400).send();
        }
        await Booking.deleteOne({_id: bookingId});

        return res.status(200).send();

    } catch (err) {
        console.log(err);
        return res.status(500).send('error with deleting booking' + err);
    }
}

module.exports.editBooking = async (req, res) => {
    try {
        const params = req.body;

        const bookingId = params.bookingId;
        const newStartTime = params.startTime;
        const newEndTime = params.endTime;

        if(!bookingId) {
            return res.status(400).send();
        }
        await Booking.updateOne({_id: bookingId},
            {
                $set: {
                    startTime: newStartTime,
                    endTime: newEndTime
                }
            });

        return res.status(200).send();


    } catch (err) {
        console.log(err);
        return res.status(500).send("error with editing booking");
    }
}
