// import { MMKV } from 'react-native-mmkv';

// import { render, screen } from '@/core/test-utils';

// import Welcome from './welcome';
// describe('Welcome Component', () => {
//   let storage: MMKV;
//   beforeAll(() => {
//     storage = new MMKV();
//   });
//   it('renders correctly', async () => {
//     render(<Welcome />);
//     expect(await screen.findByText('A domicile')).toBeOnTheScreen();
//     expect(await screen.findByText('Au cabinet')).toBeOnTheScreen();
//   });

//   it('should set the selected prestation domicile on storage on press', async () => {
//     render(<Welcome />);
//     expect(screen.getByTestId('domicile')).toBeOnTheScreen();
//     const touchable = screen.getByTestId('domicile');
//     // fireEvent.press(touchable);
//     // expect(storage.getString('SELECTED_PRESTATION')).toEqual('domicile');
//   });

//   it('should set the selected prestation cabinet on storage on press', async () => {
//     render(<Welcome />);
//     expect(screen.getByTestId('cabinet')).toBeOnTheScreen();
//     const touchable = screen.getByTestId('cabinet');
//     //fireEvent.press(touchable);
//     // expect(storage.getString('SELECTED_PRESTATION')).toStrictEqual('cabinet');
//   });
// });
