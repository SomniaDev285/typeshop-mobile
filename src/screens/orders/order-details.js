import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StripeProvider } from "@stripe/stripe-react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import authAxios, { publicAxios } from "../../lib/fetech";
import DefaultLayout from "../../components/layouts/default-layout";
import { useToast } from "react-native-toast-notifications";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { dateFormater } from "../../utils/formater";
import { useSelector } from "react-redux";

const OrderDetails = () => {
  const { params: order } = useRoute();
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();
  const amount = order.totalPrice;
  const navigation = useNavigation();
  const toast = useToast();
  //redux
  const { userInfo } = useSelector((state) => state.login);

  const fetchPaymentIntentClientSecret = async () => {
    const { data } = await publicAxios.post(
      "/orders/stripe-mobile",
      { amount },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { clientSecret, error } = data;
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    //1.Gather the customer's billing information (e.g., email)
    if (!cardDetails?.complete || !userInfo.email) {
      Alert.alert("Please enter Complete card details and Email");
      return;
    }
    const billingDetails = {
      email: userInfo.email,
    };
    //2.Fetch the intent client secret from the backend
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      //2. confirm the payment
      if (error) {
        console.log("Unable to process payment");
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          paymentMethodType: "Card",
          billingDetails: billingDetails,
        });
        if (error) {
          alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          const res = await authAxios.put(`/orders/${order._id}`);
          if (res.data) {
            toast.show("Payment Successful", {
              duration: 3000,
              type: "success",
            });
            console.log("Payment successful ", paymentIntent);
            navigation.navigate("Home");
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
    //3.Confirm the payment with the card details
  };
  return (
    <StripeProvider
      publishableKey={
        "pk_test_51KesRYH5cYomygyIVpcJgPzIuCxSTmCZVDP07aX5Rl6fkq3LxILNREpH5VuNCw9NnNNJey4LEnPsLFaTHJaq9AiP00FJmrxaq7"
      }
      //merchantIdentifier='merchant.identifier'
    >
      <DefaultLayout>
        <View className="bg-black flex-row items-center justify-between px-2 text-white space-x-2  h-16">
          <View className="flex-row  items-center">
            <ArrowLeftIcon
              color={"white"}
              onPress={() => navigation.navigate("UserOrders")}
            />
            <Text className="text-white text-xl ml-5">Order Details</Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <View className="bg-white p-3 space-y-1 m-2">
            <Text>Order #{order._id}</Text>
            <Text className="text-xs text-gray-400">
              Ordered The {dateFormater(order?.createdAt)}
            </Text>
            <Text className="text-xs text-gray-400">
              Total: ${order.totalPrice}
            </Text>
            <Text
              className={` text-center text-white rounded-md p-1 ${
                order.isPaid ? "bg-green-400 w-10" : "bg-red-500 w-20"
              }`}
            >
              {order.isPaid ? "Paid" : "Not Paid"}
            </Text>
          </View>
          <Text className=" px-3 py-3 font-bold text-gray-500">
            PRODUCTS IN YOUR ORDER
          </Text>
          {order.cartItems.map((item) => (
            <TouchableOpacity
              key={item._id}
              className="bg-white shadow-xs p-1 flex-row  space-y-2 m-1 "
              onPress={() => navigation.navigate("ProductDetails", item)}
            >
              <Image
                source={{
                  uri: item.image,
                }}
                className="h-24 w-28 mr-2"
                resizeMode="stretch"
              />
              <View className="ml-3 space-y-2">
                <Text className="">{item.name}</Text>

                <Text className="rounded-sm text-xs flex-row">
                  Qty: {item.qty}
                </Text>
                <Text className=" font-bold">${item.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
          <Text className=" px-3 py-3 font-bold text-gray-500">PAYMENT</Text>
          <View className="px-2 space-y-1 bg-white p-2 m-1 rounded">
            <Text className="font-bold ">Delivery address</Text>
            <Text className="text-xs text-gray-500">
              {order.shippingAddress.address}
            </Text>
            <Text className="text-xs text-gray-500">
              {order.shippingAddress.country} {order.shippingAddress.city}
            </Text>
          </View>
          {!order.isPaid && (
            <View className="px-3">
              <CardField
                className="bg-white rounded-md "
                postalCodeEnabled={false}
                placeholder={{
                  number: "4242 4242 4242 4242",
                }}
                style={styles.cardContainer}
                onCardChange={(cardDetails) => {
                  setCardDetails(cardDetails);
                }}
              />

              <Button
                onPress={handlePayPress}
                title={`Pay Now   $${order?.totalPrice}`}
                color={"#e03a3c"}
                disabled={loading}
              />
            </View>
          )}
        </ScrollView>
      </DefaultLayout>
    </StripeProvider>
  );
};

export default OrderDetails;
const styles = StyleSheet.create({
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});
