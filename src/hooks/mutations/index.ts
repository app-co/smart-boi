import { useMutation, useQueryClient } from "react-query";
import { UseFatch } from "../fetchs";

const fetch = new UseFatch()

export function login() {
  const queryClient = useQueryClient();

  return useMutation(fetch.signIn, {
    onSuccess: () => {
      queryClient.invalidateQueries('signIn');
    },
  });
}

export function singUp() {
  const queryClient = useQueryClient();

  return useMutation(fetch.signUp, {
    onSuccess: () => {
      queryClient.invalidateQueries('signUp');
    },
  });
}

export function useParceiros() {
  return useMutation(fetch.getParceiros)
}

export function useLotes() {
  return useMutation(fetch.getLotes)

}

export function useRegiterEndereco() {
  return useMutation(fetch.registerEndereco)
}

export function useRegissterBuyer() {
  return useMutation(fetch.registerBuyer)
}

export function useRegissterSaler() {
  return useMutation(fetch.registerSaler)
}


export function useRegiterLote() {
  const client = useQueryClient()

  return useMutation(fetch.registerLote, {
    onSuccess: () => {
      client.invalidateQueries('smart@lotes');
    },
  })
}

export function useRegisterLance() {
  const client = useQueryClient()
  return useMutation(fetch.registerLance, {
    onSuccess: () => {
      client.invalidateQueries('smart@lances');
    },
  })
}

export function useGetFrete() {
  return useMutation(fetch.getFret)
}

export function useGetAllContacao() {
  const queryClient = useQueryClient()
  return useMutation(fetch.getAllCotacao, {
    onSuccess: () => {
      queryClient.invalidateQueries('get-all-cotacao');
    },
  });

}
export function useValidateLance() {
  const client = useQueryClient()

  return useMutation(fetch.validateLance, {
    onSuccess: () => {
      client.invalidateQueries('lancesRecebidos');
    },
  })
}

export function useUpdateUsesr() {
  return useMutation(fetch.updateUser)
}
