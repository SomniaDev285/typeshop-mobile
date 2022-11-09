import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Button,
  TextInput,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from 'react-native-heroicons/solid';
import * as Animatable from 'react-native-animatable';
import Rating from '../../components/UI/rating';
import { dateFormater } from '../../utils/formater';
import { useDispatch, useSelector } from 'react-redux';
import Products from '../../components/products/products';
import CartIcon from '../../components/UI/cart-icon';
import DefaultLayout from '../../components/layouts/default-layout';
import { addToCart } from '../../store/cart/cart';
import { Picker } from '@react-native-picker/picker';
import { useToast } from 'react-native-toast-notifications';
import { setError } from '../../utils/error';
import Loader from '../../components/UI/loader';
import { createComment } from '../../store/products/comment';
import { getProductById } from '../../store/products/product-details';

const ProductDetails = () => {
  const route = useRoute();
  const { id } = route.params;
  const toast = useToast();
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showC, setShowC] = useState(false);
  const [rating, setRating] = useState('⭐');
  const [comment, setComment] = useState('');
  const { products } = useSelector((state) => state.products);
  const { isAuth } = useSelector((state) => state.login);
  const { success, loading, error, refresh } = useSelector(
    (state) => state.comment
  );
  const { product, loading: loadingProduct } = useSelector(
    (state) => state.productDetails
  );
  const dispatch = useDispatch();

  // add to basket
  const onBuy = () => {
    dispatch(addToCart(product));
    navigation.navigate('CartBasket');
  };

  //Add Comment
  const onSubmit = () => {
    const review = { comment, rating, id };
    dispatch(createComment(review));

    if (success) {
      setComment('');
      setShowC(false);
      toast.show('thanks for your feedback', {
        type: 'success',
      });
    } else if (error) {
      setComment('');
      setShowC(false);
      toast.show(setError(error), {
        type: 'danger',
      });
    }
  };

  useEffect(() => {
    dispatch(getProductById(id));
  }, [id, dispatch, refresh]);

  if (loadingProduct || !product) return <Loader />;
  return (
    <DefaultLayout>
      <View className='bg-black flex-row items-center justify-between px-2 text-white space-x-2  h-16'>
        <View className='flex-row  items-center'>
          <ArrowLeftIcon color={'white'} onPress={navigation.goBack} />
          <Text className='text-white text-xl ml-5'>Details</Text>
        </View>

        <CartIcon />
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <View className='bg-white py-3'>
          <Image
            source={{ uri: product?.image }}
            className='w-full  h-60'
            resizeMode='contain'
          />
        </View>
        <View className='pt-3  space-y-2'>
          <Text className=' font-bold px-3'>{product?.name}</Text>
          <View className='flex-row items-center px-3'>
            <Text className='text-xs text-gray-500 flex-1'>
              Brand: {product?.brand} | Category: {product?.category}
            </Text>
            <Text className='text-xl font-bold'>${product?.price}</Text>
          </View>
          <View>
            <Text className='bg-gray-200 px-3 py-3 font-bold text-gray-500'>
              PRODUCT DETAILS
            </Text>
            <View className='flex-row items-center justify-between border-b border-gray-300 px-3 h-10 bg-[#f6f9ff] shadow mx-2'>
              <Text className='font-bold '>Description:</Text>
              {!show ? (
                <TouchableOpacity onPress={() => setShow(true)}>
                  <ChevronDownIcon color={'black'} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setShow(false)}>
                  <ChevronUpIcon color={'black'} />
                </TouchableOpacity>
              )}
            </View>

            <View className='bg-[#f6f9ff] shadow mx-2 px-3'>
              {show && (
                <Animatable.Text
                  className='text-xs text-gray-500 my-2'
                  animation={'fadeIn'}
                  iterationCount={0.5}
                >
                  {product.description}
                </Animatable.Text>
              )}
            </View>
          </View>
          <View>
            <View className='flex-row items-center justify-between border-b border-gray-300 px-3 h-10 bg-[#f6f9ff] shadow mx-2'>
              <Text className='font-bold '>Reviews:</Text>
              {!showReviews ? (
                <TouchableOpacity onPress={() => setShowReviews(true)}>
                  <ChevronDownIcon color={'black'} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setShowReviews(false)}>
                  <ChevronUpIcon color={'black'} />
                </TouchableOpacity>
              )}
            </View>

            <View className='bg-[#f6f9ff] shadow mx-2 px-3'>
              {showReviews && (
                <Animatable.View animation={'fadeIn'} iterationCount={0.5}>
                  {product.reviews.map((review) => (
                    <View
                      key={review._id}
                      className=' h-16 border-b border-gray-300'
                    >
                      <View className='flex-row justify-between items-center py-2'>
                        <Rating value={review.rating} />
                        <Text className='text-xs'>By {review?.name}</Text>
                      </View>
                      <View className='flex-row'>
                        <Text className='text-xs flex-1'>
                          {review?.comment}
                        </Text>
                        <Text className='text-xs'>
                          {dateFormater(review?.createdAt)}
                        </Text>
                      </View>
                    </View>
                  ))}
                </Animatable.View>
              )}
              {isAuth && (
                <View className='flex-row items-center justify-between border-b border-gray-300  h-10 bg-[#f6f9ff] shadow '>
                  <Text className='font-bold '>Comment:</Text>
                  {!showC ? (
                    <TouchableOpacity onPress={() => setShowC(true)}>
                      <ChevronDownIcon color={'black'} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => setShowC(false)}>
                      <ChevronUpIcon color={'black'} />
                    </TouchableOpacity>
                  )}
                </View>
              )}
              {loading ? (
                <Loader />
              ) : (
                <>
                  {showC && isAuth ? (
                    <Animatable.View
                      animation={'fadeIn'}
                      iterationCount={0.5}
                      className='p-2'
                    >
                      <View className='border border-gray-300'>
                        <Picker
                          selectedValue={rating}
                          onValueChange={(itemValue, itemIndex) =>
                            setRating(itemValue)
                          }
                        >
                          <Picker.Item label={'⭐'} value={1} />
                          <Picker.Item label={'⭐⭐'} value={2} />
                          <Picker.Item label={'⭐⭐⭐'} value={3} />
                          <Picker.Item label={'⭐⭐⭐⭐'} value={4} />
                          <Picker.Item label={'⭐⭐⭐⭐⭐'} value={5} />
                        </Picker>
                      </View>
                      <View className='p-2'>
                        <TextInput
                          multiline
                          value={comment}
                          onChangeText={(text) => setComment(text)}
                          numberOfLines={5}
                          placeholder='Your Message'
                          className='px-2 bg-gray-200 rounded-md '
                        />
                      </View>
                      <View className='w-[50%] self-center rounded-lg'>
                        {loading ? (
                          <Loader />
                        ) : (
                          <TouchableOpacity
                            onPress={onSubmit}
                            className='bg-gray-900 rounded p-2 '
                          >
                            <Text className='text-center text-white '>
                              Submit
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </Animatable.View>
                  ) : null}
                </>
              )}
              <View className='my-2'>
                <Button
                  title='Buy Now'
                  color={'#e03a3c'}
                  className='w-100'
                  onPress={onBuy}
                />
              </View>
            </View>
            <Text className='bg-gray-200 px-3 py-3 font-bold text-gray-500'>
              SEMILAR PRODUCTS
            </Text>
            <Products products={products} />
          </View>
        </View>
      </ScrollView>
    </DefaultLayout>
  );
};

export default ProductDetails;
