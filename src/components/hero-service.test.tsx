// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { renderHook, waitFor } from '@testing-library/react-native';

// import type { ServiceType } from '@/api';
// import { useServices } from '@/api';

// import { sanityClient } from '../api/common/sanity-client';

// const mockData: ServiceType = {
//   category: 'sport',
//   description: 'b hbhjbjhbb hbhjbjhbb hbhjbjhbb hbhjbjhbb hbhjbjhb',
//   details: { _type: 'document', myArray: [] },
//   image:
//     'https://cdn.sanity.io/images/2rwj0fb6/production/06bb243dad2244490194845edd77ce85f4a887dc-2560x1708.jpg',
//   isHero: true,
//   name: 'Séance de Kinésithérapie pour  les athléte',
//   price: 465,
//   duration: '200',
//   isPopular: true,
// };

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       // ✅ turns retries off
//       retry: false,
//     },
//   },
// });

// const wrapper = ({ children }: React.ReactNode) => (
//   <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
// );

// describe('it fetches the hero Service from sanity api', () => {
//   sanityClient.fetch = jest.fn();
//   it(' should fetch the service correctly', async () => {
//     sanityClient.fetch.mockResolvedValueOnce(mockData);
//     const { result } = renderHook(() => useServices(), {
//       wrapper,
//     });

//     await waitFor(() => expect(result.current.isLoading).toBe(true));
//     await waitFor(() => expect(result.current.isError).toBe(false));
//     await waitFor(() => expect(result.current.data).toBeDefined());
//     await waitFor(() => expect(result.current.data).toEqual(mockData));
//   });

//   // it('should render the component correctly', async () => {
//   //   // eslint-disable-next-line react/react-in-jsx-scope
//   //   render(<HeroService />, { wrapper });
//   // });
// });
