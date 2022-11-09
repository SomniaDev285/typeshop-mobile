import { View, Text, TextInput } from 'react-native';
import React from 'react';
import { Controller } from 'react-hook-form';

const FormGroup = ({
  errors,
  control,
  name,
  label,
  placeholder = '',
  autoCapitalize,
  keyboardType,
  textContentType,
  autoComplete,
}) => {
  return (
    <View className='px-4'>
      <Text className='font-bold'>{label}</Text>
      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 5,
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
            textContentType={textContentType}
            autoComplete={autoComplete}
            value={value}
            className={`border-2 ${
              errors ? 'border-red-600 ' : 'border-gray-300 '
            } my-2 bg-gray-100 pl-2 py-1 rounded`}
            placeholder={placeholder}
          />
        )}
        name={name}
      />
      {errors && <Text className='text-red-600 mb-2'>{name} is required.</Text>}
    </View>
  );
};

export default FormGroup;
