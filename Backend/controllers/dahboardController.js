import { DashboardReport } from "../utils/DashboardReport.js";

const getDashboard = async (req, res) => {
    try {
        const userId = req.user;
        const response = await DashboardReport(userId);
        // console.log(response);
        res.status(200).json(response);
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
}

export {
    getDashboard
}