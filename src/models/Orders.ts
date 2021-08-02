export default interface Orders {
    userId: number;
    productId: number;
    qty: number;
    batchId: string;
    price: number;
    unitPrice: number;
    poNumber: string;
    recipient: string;
    recipientCountry: string;
    recipientProvience: string;
    recipientCity: string;
    recipientAddr: string;
    recipientNumber: string;
    senderCity: string;
    senderAddr: string;
    senderCountry: string;
    senderNumber: string;
    senderName: string;
    status: number;
    trackNo: string;
    billingCompany: string;
    customerReferenceNo: string;
    senderCompanyName: string;
    paymentMethod: string;
}