import Product from "../models/Product.js";
import Expense from "../models/Expense.js";
import Sale from "../models/Sales.js";
import Udhaar from "../models/Udhaar.js";

// const DashboardReport = async (userId) => {
//     const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//     const currentDate = new Date();

//     // Helper function to get past month and year
//     const getPastMonthAndYear = (monthsAgo) => {
//         const pastDate = new Date();
//         pastDate.setMonth(currentDate.getMonth() - monthsAgo);
//         return {
//             month: pastDate.getMonth() + 1, // 1-12
//             year: pastDate.getFullYear()
//         };
//     };

//     const month1 = getPastMonthAndYear(0); // Current month
//     const month2 = getPastMonthAndYear(1); // 1 month ago
//     const month3 = getPastMonthAndYear(2); // 2 months ago

//     const Udhaars = await Udhaar.find({ userId, status: "pending" });

//     const Expenses = await Expense.find({
//         userId,
//         $expr: {
//             $and: [
//                 { $eq: [{ $month: "$createdAt" }, month1.month] },
//                 { $eq: [{ $year: "$createdAt" }, month1.year] }
//             ]
//         }
//     });

//     const Expenses2 = await Expense.find({
//         userId,
//         $expr: {
//             $and: [
//                 { $eq: [{ $month: "$createdAt" }, month2.month] },
//                 { $eq: [{ $year: "$createdAt" }, month2.year] }
//             ]
//         }
//     });

//     const Expenses3 = await Expense.find({
//         userId,
//         $expr: {
//             $and: [
//                 { $eq: [{ $month: "$createdAt" }, month3.month] },
//                 { $eq: [{ $year: "$createdAt" }, month3.year] }
//             ]
//         }
//     });

//     const Sales = await Sale.find({
//         userId,
//         $expr: {
//             $and: [
//                 { $eq: [{ $month: "$createdAt" }, month1.month] },
//                 { $eq: [{ $year: "$createdAt" }, month1.year] }
//             ]
//         }
//     });

//     const Sales3 = await Sale.find({
//         userId,
//         $expr: {
//             $and: [
//                 { $eq: [{ $month: "$createdAt" }, month2.month] },
//                 { $eq: [{ $year: "$createdAt" }, month2.year] }
//             ]
//         }
//     });

//     const Sales4 = await Sale.find({
//         userId,
//         $expr: {
//             $and: [
//                 { $eq: [{ $month: "$createdAt" }, month3.month] },
//                 { $eq: [{ $year: "$createdAt" }, month3.year] }
//             ]
//         }
//     });

//     const totalSales = Sales.reduce((sum, s) => sum + (s.totalAmount || 0), 0);
//     const totalExpenses = Expenses.reduce((sum, s) => sum + (s.amount || 0), 0);
//     const totalCredit = Udhaars.reduce((sum, s) => sum + (s.amount || 0), 0);
//     const Profit = Sales.reduce((sum, s) => sum + (s.saleProfit || 0), 0);

//     const summary = {
//         sales: totalSales,
//         expenses: totalExpenses,
//         profit: Profit,
//         credit: totalCredit,
//     };

//     const salesData = [
//         { month: monthNames[month1.month - 1], sales: totalSales, expenses: totalExpenses },
//         { month: monthNames[month2.month - 1], sales: Sales3.reduce((sum, s) => sum + (s.totalAmount || 0), 0), expenses: Expenses2.reduce((sum, s) => sum + (s.amount || 0), 0) },
//         { month: monthNames[month3.month - 1], sales: Sales4.reduce((sum, s) => sum + (s.totalAmount || 0), 0), expenses: Expenses3.reduce((sum, s) => sum + (s.amount || 0), 0) },
//     ];

//     const min = 3;
//     const products = await Product.find({
//         userId: userId,
//         quantity: { $lt: min }
//     }).select("itemname quantity");

//     const lowStock = products.map(item => ({
//         item: item.itemname,
//         qty: item.quantity
//     }));

//     return ({
//         summary: summary,
//         salesData: salesData,
//         lowStock: lowStock
//     })
// }

// export { DashboardReport }



const DashboardReport = async (userId) => {
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const currentDate = new Date();

  // Helper function → get past month and year
  const getPastMonthAndYear = (monthsAgo) => {
    const pastDate = new Date();
    pastDate.setMonth(currentDate.getMonth() - monthsAgo);
    return {
      month: pastDate.getMonth() + 1,
      year: pastDate.getFullYear()
    };
  };

  const month1 = getPastMonthAndYear(0); 
  const month2 = getPastMonthAndYear(1); 
  const month3 = getPastMonthAndYear(2); 

  // 3 months ka starting date
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(currentDate.getMonth() - 2);
  threeMonthsAgo.setDate(1);

  // -------------------------
  // Single queries (fast)
  // -------------------------
  const [Udhaars, allExpenses, allSales, products] = await Promise.all([
    Udhaar.find({ userId, status: "pending", createdAt : { $gte : currentDate.getMonth()} }),

    Expense.find({
      userId,
      createdAt: { $gte: threeMonthsAgo }
    }),

    Sale.find({
      userId,
      createdAt: { $gte: threeMonthsAgo }
    }),

    Product.find({
      userId,
      quantity: { $lt: 3 }
    }).select("itemname quantity")
  ]);

  // -------------------------
  // Calculate month wise data
  // -------------------------
  const calcForMonth = (data, month, year, field) =>
    data.filter(d =>
      d.createdAt.getMonth() + 1 === month &&
      d.createdAt.getFullYear() === year
    ).reduce((sum, d) => sum + (d[field] || 0), 0);

  const totalSales   = calcForMonth(allSales, month1.month, month1.year, "totalAmount");
  const totalExpenses= calcForMonth(allExpenses, month1.month, month1.year, "amount");
  const totalProfit  = calcForMonth(allSales, month1.month, month1.year, "saleProfit");
  const totalCredit  = Udhaars.reduce((sum, u) => sum + (u.amount || 0), 0);

  const summary = {
    sales: totalSales,
    expenses: totalExpenses,
    profit: totalProfit,
    credit: totalCredit,
  };

  const salesData = [
    {
      month: monthNames[month3.month - 1],
      sales: calcForMonth(allSales, month3.month, month3.year, "totalAmount"),
      expenses: calcForMonth(allExpenses, month3.month, month3.year, "amount")
    },
    {
      month: monthNames[month2.month - 1],
      sales: calcForMonth(allSales, month2.month, month2.year, "totalAmount"),
      expenses: calcForMonth(allExpenses, month2.month, month2.year, "amount")
    },
    {
      month: monthNames[month1.month - 1],
      sales: totalSales,
      expenses: totalExpenses
    },
  ];

  const lowStock = products.map(p => ({
    item: p.itemname,
    qty: p.quantity
  }));

  return {
    summary,
    salesData,
    lowStock
  };
};

export { DashboardReport };
