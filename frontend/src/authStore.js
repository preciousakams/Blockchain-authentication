import axios from 'axios';
import{ create } from 'zustand';
import { provider, signer } from './ethers';
import {SiweMessage} from 'siwe';


const authStore = create((set) => ({
  address: "",
  ready: false,
  loggedIn: false,
  init: async () => {
    try {
      const res = await axios.get('/api/validate');

    set({ address: res.data.address, loggedIn: true, ready: true});

    } catch (error) {
      const accounts = await provider.listAccounts();
      if (accounts[0]) {
        set({ ready: true, address: accounts[0] });
      }else {
       set({ ready: true });
      }
    }
  },

  connectWallet: async () => {
   const accounts = await provider
    .send('eth_requestAccounts', [])
    .catch(() => console.log('user rejected request'));

    if (accounts[0]) {
      set({ address: accounts[0] });
    }
    console.log(accounts);
  },

  signin: async () => {
    try {
      const res = await axios.get('/api/nonce');
    // create message
    const messageRaw = new SiweMessage({
      domain: window.location.host,
      address: await signer.getAddress(),
      statement: 'Sign in with Ethereum to continue',
      uri: window.location.origin,
      version: '1',
      chainId: 1,
      nonce: res.data
  });
      const message = messageRaw.prepareMessage();
      // get signature
      const signature = await signer.signMessage(message);
      // send to server
      const res2 = await axios.post('/api/verify', { message,signature });
      console.log(res2);

      set({ loggedIn: true });
    } catch(error) {}
    
},
signout: async () => {
  await axios.get('/api/logout');
  set({ loggedIn: false });
},



}));

export default authStore;