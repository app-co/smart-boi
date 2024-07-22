import { useQuery } from "react-query";
import { UseFatch } from "../fetchs";
import { TGetLanceEnviado, TLotes } from "../fetchs/types";

const fetch = new UseFatch()

export function useGetLanceEnviado(params: TGetLanceEnviado) {
  return useQuery({
    queryKey: ['smart@lances', params],
    queryFn: () => fetch.getLanceEnvio(params)
  })
}

export function useGetLotes(params: TLotes) {
  return useQuery({
    queryKey: ['smart@lotes', params],
    queryFn: async () => await fetch.getLotes(params)
  })
}

export function useGetRepresentants(nome?: string) {
  return useQuery({
    queryKey: ['smart@representantes', nome],
    queryFn: () => fetch.getRepresentantes(nome)
  })
}

// export function useCotacao(params: TGetCotacaoFiltered) {
//   const newParams: TGetCotacaoFiltered = {
//     ...params,
//     pageNumber: 0,
//     pageSize: 10,
//   }
//   return useInfiniteQuery({
//     queryKey: ['futurePlans', newParams],
//     queryFn: ({ pageParam }) =>
//       fetch.getAllCotacao({ ...newParams, PageNumber: pageParam || 0 }),
//     getNextPageParam: lastPage => {
//       if (
//         lastPage.pagination.pageNumber ===
//         lastPage.pagination.totalPages - 1
//       ) {
//         return undefined;
//       }

//       return lastPage.pagination.pageNumber + 1;
//     },
//   });
// }