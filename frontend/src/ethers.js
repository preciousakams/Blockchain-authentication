const { BrowserProvider } = require("ethers");


const provider = new BrowserProvider(window.ethereum);
const signer = await provider.getSigner()

export { provider, signer }