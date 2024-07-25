/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Control, Controller } from 'react-hook-form';

import { Mask } from '@/utils/mask';
import { Input, TypeInput } from '../Input';

type T = TypeInput & {
  name: string;
  control: Control<any>;
  error?: any;
  mask?: 'date' | 'cpf' | 'cell-phone' | 'placa' | 'cep' | 'currency';
};

const msk = new Mask()

export function FormInput({ name, control, mask, error, ...rest }: T) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {

        const mascars: any = {
          date: (e: string) => e ? e.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3') : '',
          cpf: (e: string) => e ? msk.formatCPFOrCNPJ(e) : '',
          'cell-phone': (e: string) => e ? e.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3') : '',
          placa: (e: string) => e ? msk.placa(e) : '',
          cep: (e: string) => e ? msk.cep : '',
          currency: (e: string) => e ? msk.money(e) : '',
        }

        const m = mascars[mask!]

        return (
          <Input
            error={error ? error.message : ''}
            value={mask ? m(value) : value}
            onChangeText={onChange}
            {...rest}
          />
        )
      }}
    />
  );
}
