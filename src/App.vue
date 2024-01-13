<template>
  <Navbar />

  <div class="main-container background-main">

    <!-- Connect Wallet modal -->
    <div class="modal fade" id="connectModal" tabindex="-1" aria-labelledby="connectModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Connect your wallet</h5>
            <button id="closeConnectModal" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true"></span>
            </button>
          </div>
          <div class="modal-body row">

            <div class="card col-6 cursor-pointer wallet-img-wrapper" @click="connectMetaMask">
              <img src="./assets/wallets/rabby.png" class="card-img-top card-img-wallet" alt="Rabby">
              <small class="text-center mb-3 text-muted">Rabby</small>
            </div> 

            <div class="card col-6 cursor-pointer wallet-img-wrapper" @click="connectMetaMask">
              <img src="./assets/wallets/metamask.png" class="card-img-top card-img-wallet" alt="MetaMask">
              <small class="text-center mb-3 text-muted">MetaMask</small>
            </div>

            <div class="card col-6 cursor-pointer wallet-img-wrapper" @click="connectMetaMask">
              <img src="./assets/wallets/bifrost.png" class="card-img-top card-img-wallet" alt="Bifrost">
              <small class="text-center mb-3 text-muted">Bifrost</small>
            </div> 

            <div class="card col-6 cursor-pointer wallet-img-wrapper" @click="connectMetaMask">
              <img src="./assets/wallets/zerion.png" class="card-img-top card-img-wallet" alt="Zerion">
              <small class="text-center mb-3 text-muted">Zerion</small>
            </div> 
            
            <div class="card col-6 cursor-pointer wallet-img-wrapper" @click="connectMetaMask">
              <img src="./assets/wallets/coinbase.png" class="card-img-top card-img-wallet" alt="Coinbase">
              <small class="text-center mb-3 text-muted">Coinbase Wallet</small>
            </div>

            <div class="card col-6 cursor-pointer wallet-img-wrapper" @click="connectMetaMask">
              <img src="./assets/wallets/brave.png" class="card-img-top card-img-wallet" alt="Brave">
              <small class="text-center mb-3 text-muted">Brave</small>
            </div>

            <!--
            <div class="card col-6 cursor-pointer wallet-img-wrapper" @click="connectWalletConnect">
              <img src="./assets/wallets/wc.png" class="card-img-top card-img-wallet" alt="WalletConnect">
              <small class="text-center mb-3 text-muted">WalletConnect</small>
            </div>

            <div class="card col-6 cursor-pointer wallet-img-wrapper" @click="connectWalletConnect">
              <img src="./assets/wallets/minerva.png" class="card-img-top card-img-wallet" alt="Minerva">
              <small class="text-center mb-3 text-muted">Minerva</small>
            </div>

            <div class="card col-6 cursor-pointer wallet-img-wrapper" @click="connectWalletConnect">
              <img src="./assets/wallets/argent.png" class="card-img-top card-img-wallet" alt="Argent">
              <small class="text-center mb-3 text-muted">Argent</small>
            </div>

            <div class="card col-6 cursor-pointer wallet-img-wrapper" @click="connectWalletConnect">
              <img src="./assets/wallets/1inch.png" class="card-img-top card-img-wallet" alt="1inch">
              <small class="text-center mb-3 text-muted">1inch</small>
            </div>

            <div class="card col-6 cursor-pointer wallet-img-wrapper" @click="connectMetaMask">
              <img src="./assets/wallets/imtoken.png" class="card-img-top card-img-wallet" alt="imToken">
              <small class="text-center mb-3 text-muted">imToken</small>
            </div>
            -->

            <div class="card col-6 cursor-pointer wallet-img-wrapper" @click="connectMetaMask">
              <img src="./assets/wallets/trust.png" class="card-img-top card-img-wallet" alt="Trust Wallet">
              <small class="text-center mb-3 text-muted">Trust Wallet</small>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <!-- END Connect Wallet modal -->

    <router-view></router-view>

    <Footer />
  </div>
  
</template>

<script lang="ts">
import { ethers } from 'ethers';
import { useEthers, useWallet, MetaMaskConnector, WalletConnectConnector, CoinbaseWalletConnector } from 'vue-dapp';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import tldsJson from './abi/tlds.json';
import tldAbi from './abi/PunkTLD.json';
import useChainHelpers from "./hooks/useChainHelpers";

export default {
  components: {
    Navbar,
    Footer
  },

  mounted() {
    if (!this.isActivated) {
			if (localStorage.getItem("connected") == "metamask") {
				this.connectMetaMask();
			} else if (localStorage.getItem("connected") == "walletconnect") {
				this.connectWalletConnect();
			} else if (localStorage.getItem("connected") == "coinbase") {
				this.connectCoinbase();
			}
		}

    this.fetchReferrer();
    this.setTldContract();
    this.fetchMinterContractData();
    this.checkIfAdmin();

    // reset localstorage
    const v2 = localStorage.getItem("punkv1");

    if (!v2) {
      localStorage.clear();
      localStorage.setItem("connected", "null");
      localStorage.setItem("punkv1", "true");
    }
  },

  computed: {
    ...mapGetters("user", ["getUserSelectedName"]),
  },

  methods: {
    ...mapActions("user", ["checkIfAdmin", "fetchUserDomainNames", "fetchCanUserBuy"]),
    ...mapActions("tld", ["fetchMinterContractData"]),

    ...mapMutations("user", ["setUserData"]),
    ...mapMutations("network", ["setNetworkData"]),
    ...mapMutations("tld", ["setTldContract"]),

    async connectCoinbase() {
			await this.connectWith(this.coinbaseConnector);
			localStorage.setItem("connected", "coinbase"); // store in local storage to autoconnect next time
			document.getElementById('closeConnectModal').click();
		},

		async connectMetaMask() {
			await this.connectWith(this.mmConnector);
			localStorage.setItem("connected", "metamask"); // store in local storage to autoconnect next time
			document.getElementById('closeConnectModal').click();
		},

		async connectWalletConnect() {
      document.getElementById('closeConnectModal').click();
			await this.connectWith(this.wcConnector);
			localStorage.setItem("connected", "walletconnect"); // store in local storage to autoconnect next time
		},

    async fetchReferrer() {
      // check if any referral is present: ?ref=...
      const urlParams = new URLSearchParams(window.location.search);
      const referral = urlParams.get('ref');

      // check if domain name or address in the ref field
      if (referral && referral.split(".").length === 2) { // likely a domain name
        // split referral into two (domain name and TLD)
        const domArr = referral.split(".");

        for (let netId in tldsJson) { // iterate through different chains
          if (tldsJson[netId]["."+domArr[1]]) { // find the correct TLD
            // get fallback provider based on network ID
            const fProvider = this.getFallbackProvider(Number(netId));
            // create TLD contract (only new ABIs)
            const intfc = new ethers.utils.Interface(tldAbi);
            const refContract = new ethers.Contract(tldsJson[netId]["."+domArr[1]], intfc, fProvider);
            // fetch domain holder
            const refDomainHolder = await refContract.getDomainHolder(domArr[0]);

            if (refDomainHolder !== ethers.constants.AddressZero) {
              localStorage.setItem("referral", refDomainHolder); // store referral address in local storafe
            }
            break;
          }
        }
      } else if (referral && ethers.utils.isAddress(referral)) { // valid address
        // the last found referral is considered
        localStorage.setItem("referral", referral); // store referral address in local storafe
      }
    }
  },

  setup() {
    const { address, chainId, isActivated } = useEthers();
    const { connectWith } = useWallet();
    const { getFallbackProvider } = useChainHelpers();

    const coinbaseConnector = new CoinbaseWalletConnector({
			appName: "Scrolly Domains",
			jsonRpcUrl: "https://rpc.scroll.io",
		});

		const mmConnector = new MetaMaskConnector({
			appUrl: "https://scrolly.xyz",
		});

    // wallet connect v2
    // @TODO: make sure to add your own project ID (and verify your domain with wallet connect)
		const wcConnector = new WalletConnectConnector({
			projectId: 'aff0fd1035c24a0954db35a67067b0f0', // @TODO: use your own project ID!!!
      chains: [534352],
      showQrModal: true,
      qrModalOptions: {
        themeMode: 'dark',
        themeVariables: undefined,
        chainImages: undefined,
        desktopWallets: undefined,
        walletImages: undefined,
        mobileWallets: undefined,
        enableExplorer: true,
        explorerAllowList: undefined,
        tokenImages: undefined,
        privacyPolicyUrl: undefined,
        explorerDenyList: undefined,
        termsOfServiceUrl: undefined,
      }
		});

    return {
      address, chainId, coinbaseConnector, connectWith, getFallbackProvider, isActivated, mmConnector, wcConnector
    }
  },

  watch: {
    address(newVal, oldVal) {
      if (newVal) {
        this.setUserData();
        this.fetchUserDomainNames(true);
        this.checkIfAdmin();
      }
    },

    chainId(newVal, oldVal) {
      if (!this.isActivated) {
        if (localStorage.getItem("connected") == "metamask") {
          this.connectMetaMask();
        } else if (localStorage.getItem("connected") == "walletconnect") {
          this.connectWalletConnect();
        } else if (localStorage.getItem("connected") == "coinbase") {
          this.connectCoinbase();
        }
      }

      if (this.chainId >= 1) {
        this.setUserData();
        this.setNetworkData();
        this.fetchUserDomainNames(true);
        this.checkIfAdmin();
      }
    },

    isActivated(newVal, oldVal) {
      if (!localStorage.getItem("connected") && localStorage.getItem("connected") !== "null") {
        // set this to auto-connect on next visit
        localStorage.setItem("connected", "metamask");
      }
    }
  },
}
</script>

<style scoped>
.main-container {
  padding: 20px;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
}
</style>