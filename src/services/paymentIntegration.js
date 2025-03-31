import { toast } from "react-hot-toast";
import { clearCart } from "../redux/cartSlice";

//  import rzpLogo from "../assets/"



 function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script"); // Step 1: Create a <script> element
        script.src = src;  // Step 2: Set the source URL of the script

        script.onload = () => {
            resolve(true);  // Step 3a: If script loads successfully, resolve the promise with `true`
        };
        script.onerror = () => {
            resolve(false); // Step 3b: If loading fails, resolve the promise with `false`
        };

        document.body.appendChild(script); // Step 4: Append the script to the document to load it
    });
}


export async function buyProducts(amount, navigate, dispatch, callApi, orderData) {
    const toastId = toast.loading("Loading...");
    try {
        // Load Razorpay script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            toast.error("RazorPay SDK failed to load");
            return;
        }

        // Initiate the order
        const orderResponse = await callApi({
            url: "api/payments/capturePayment",
            method: "POST",
            data: { amount },
            headers: { "Content-Type": "application/json" },
        });

        // console.log("Order Response:", orderResponse);

        if (!orderResponse.success) {
            throw new Error(orderResponse.data.message);
        }

        // console.log("Razorpay Initialized");

        // Configure Razorpay options
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY,
            currency: orderResponse.data.currency,
            amount: `${orderResponse.data.amount}`,
            order_id: orderResponse.data.id,
            name: "Shopsy",
            description: "Thank You for Purchasing the Products",
            // image: rzpLogo,
            handler: async function (response) {
                // console.log("Payment Successful:", response);

                // Verify payment before placing the order
                const verificationResponse = await callApi({
                    url: "api/payments/verifyPayment",
                    method: "POST",
                    data:response,
                    headers: { "Content-Type": "application/json" },
                });
                // console.log(verificationResponse)
                if (verificationResponse.success) {
                    // console.log("Payment Verified! Placing Order...");
                    const orderResponse = await callApi({
                        url: "api/order/",
                        method: "POST",
                        data: orderData,
                    });

                    if (orderResponse) {
                        toast.success("🎉 Order Placed Successfully!");
                        dispatch(clearCart(orderData.shopId));
                        setTimeout(() => navigate("/orders"), 1500);
                    } else {
                        toast.error("Failed to place order. Try again.");
                    }
                } else {
                    toast.error("Payment verification failed.");
                }
            },
            prefill: {
                name:`${orderData.name}`
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function (response) {
            toast.error("Oops, payment failed");
            console.log("Payment Error:", response.error);
        });
    } catch (error) {
        console.log("PAYMENT API ERROR:", error);
        toast.error("Could not make Payment");
    }
    toast.dismiss(toastId);
}
