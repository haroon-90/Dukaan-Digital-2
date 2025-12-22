// const FindReport = async (sales, purchase, expenses, udhaar) => {
//     let totalSale = 0;
//     let totalPurchase = 0;
//     let totalQuantitySold = 0;

//     // Count number of sales & purchases + sum amounts
//     const numberOfSales = sales.length;
//     const numberOfPurchase = purchase.length;

//     totalSale = sales
//         .reduce((sum, s) => sum + (s.totalAmount || 0), 0);

//     totalPurchase = purchase
//         .reduce((sum, s) => sum + (s.total || 0), 0);

//     // Quantity sold & profit calculation (only for sales items)
//     const totalProfit = sales.reduce((sum, s) => sum + (s.saleProfit || 0), 0);
//     const allSaleItems = sales
//         .flatMap(s => s.items || []);

//     for (const item of allSaleItems) {
//         if (!item.price || !item.quantity) continue;
//         totalQuantitySold += item.quantity;
//     }

//     // Expenses total
//     const totalExpense = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);

//     // Udhaar totals
//     const totalUdhaar = udhaar.reduce((sum, u) => {
//         if (u.status === "pending") return sum + (u.amount || 0);
//         return sum;
//     }, 0);

//     const totalPaidUdhaar = udhaar.reduce((sum, u) => {
//         if (u.status === "paid") return sum + (u.amount || 0);
//         return sum;
//     }, 0);


//     // Net amount
//     const netAmount = totalProfit - totalExpense - totalUdhaar + totalPaidUdhaar;

//     return {
//         totalSale,
//         totalPurchase,
//         totalProfit,
//         totalExpense,
//         totalUdhaar,
//         totalPaidUdhaar,
//         netAmount,
//         totalQuantitySold,
//         numberOfSales,
//         numberOfPurchase,
//         numberOfExpenses: expenses.length,
//         numberOfUdhaar: udhaar.length
//     };
// };

// export { FindReport };

const FindReport = async (sales, purchase, expenses, udhaar) => {
    let totalSale = 0;
    let totalPurchase = 0;
    let totalQuantitySold = 0;
    let totalProfit = 0;

    // Sales calculation (1 pass only)
    for (const s of sales) {
        totalSale += (s.totalAmount || 0);
        totalProfit += (s.saleProfit || 0);

        if (s.items && s.items.length) {
            for (const item of s.items) {
                if (item?.quantity) totalQuantitySold += item.quantity;
            }
        }
    }

    // Purchase calculation (1 pass)
    for (const p of purchase) {
        totalPurchase += (p.total || 0);
    }

    // Expenses calculation (1 pass)
    let totalExpense = 0;
    for (const e of expenses) {
        totalExpense += (e.amount || 0);
    }

    // Udhaar calculation (1 pass)
    let totalUdhaar = 0;
    let totalPaidUdhaar = 0;
    for (const u of udhaar) {
        if (u.status === "pending") totalUdhaar += (u.amount || 0);
        else if (u.status === "paid") totalPaidUdhaar += (u.amount || 0);
    }

    // Net amount
    const netAmount = totalProfit - totalExpense - totalUdhaar + totalPaidUdhaar;

    return {
        totalSale,
        totalPurchase,
        totalProfit,
        totalExpense,
        totalUdhaar,
        totalPaidUdhaar,
        netAmount,
        totalQuantitySold,
        numberOfSales: sales.length,
        numberOfPurchase: purchase.length,
        numberOfExpenses: expenses.length,
        numberOfUdhaar: udhaar.length
    };
};

export { FindReport };
