<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">
        <img
          src="../assets/logo.png"
          alt="logo"
          class="d-inline-block align-text-bottom"
          height="40"
        />
        Scrolly Name Service
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="d-flex ms-auto">
          <div class="navbar-menu-buttons">
            <!--
            <router-link 
              tag="button" 
              v-if="isActivated" 
              to="/free-domain-mint" 
              class="btn btn-primary navbar-menu-btn me-3"
            >
              Mint free domain
            </router-link>
            -->

            <a
              class="btn btn-primary me-3 navbar-menu-btn"
              href="https://scrolly.xyz"
              target="_blank"
              >Main site</a
            >
            <a
              class="btn btn-primary me-3 navbar-menu-btn"
              href="https://hub.scrolly.xyz"
              target="_blank"
              >Scrolly Hub</a
            >
            <div v-if="isActivated" class="btn-group me-3 navbar-menu-btn">
              <button
                class="btn btn-primary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ getNetworkName }}
              </button>
              <ul
                class="dropdown-menu dropdown-menu-start"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <span
                    class="dropdown-item"
                    :key="network"
                    v-for="network in getSupportedNetworkNames"
                    @click="changeNetwork(network)"
                    >Switch to {{ network }}</span
                  >
                </li>
              </ul>
            </div>

            <div v-if="isActivated" class="btn-group me-3 navbar-menu-btn">
              <button
                class="btn btn-primary dropdown-toggle"
                type="button"
                id="dropdownMenuButton2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ getNameOrAddress }}
              </button>
              <ul
                class="dropdown-menu dropdown-menu-start"
                aria-labelledby="dropdownMenuButton2"
              >
                <router-link tag="li" class="dropdown-item" to="/profile"
                  >Profile</router-link
                >
                <router-link tag="li" class="dropdown-item" to="/"
                  >Buy domain</router-link
                >
                <router-link tag="li" class="dropdown-item" to="/search-domain"
                  >Search domain</router-link
                >
                <router-link tag="li" class="dropdown-item" to="/send-tokens"
                  >Send tokens</router-link
                >
                <!-- <router-link tag="li" class="dropdown-item" to="/about">About</router-link> -->
                <!-- <router-link tag="li" class="dropdown-item" to="/browser">Browser extension</router-link> -->
                <!-- <li class="dropdown-item" @click="openUrl('https://docs.punk.domains/')">Docs</li> -->
                <li class="dropdown-item" @click="logout">Disconnect</li>
              </ul>
            </div>

            <a
              class="btn btn-primary me-3 navbar-menu-btn"
              href="https://element.market/collections/scrolly-f07594?search%5Btoggles%5D[0]=BUY_NOW"
              target="_blank"
              >Marketplace</a
            >

            <button
              v-if="!isActivated"
              class="btn btn-primary navbar-menu-btn me-3"
              data-bs-toggle="modal"
              data-bs-target="#connectModal"
            >
              Connect wallet
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import { useBoard, useEthers, useWallet } from "vue-dapp";
import useChainHelpers from "../hooks/useChainHelpers";
import { getTextWithoutBlankCharacters } from "../utils/textUtils.js";

export default {
  name: "Navbar",

  computed: {
    ...mapGetters("user", ["getUserShortAddress", "getUserSelectedName"]),
    ...mapGetters("network", [
      "getNetworkName",
      "getSupportedNetworks",
      "getSupportedNetworkNames",
    ]),

    getNameOrAddress() {
      if (this.getUserSelectedName) {
        return getTextWithoutBlankCharacters(this.getUserSelectedName);
      } else {
        return this.getUserShortAddress;
      }
    },
  },

  methods: {
    getTextWithoutBlankCharacters,

    changeNetwork(networkName) {
      const networkData = this.switchNetwork(networkName);

      window.ethereum.request({
        method: networkData.method,
        params: networkData.params,
      });
    },

    logout() {
      this.disconnect();
      localStorage.clear();
      localStorage.setItem("connected", "null");
    },

    openUrl(url) {
      window.open(url, "_blank").focus();
    },
  },

  setup() {
    const { open } = useBoard();
    const { disconnect } = useWallet();
    const { isActivated } = useEthers();
    const { switchNetwork } = useChainHelpers();

    return {
      isActivated,
      disconnect,
      open,
      switchNetwork,
    };
  },
};
</script>

<style scoped>
.btn-primary,
.btn-primary:active,
.btn-primary:focus,
.btn-primary:disabled {
  background: transparent;
  box-shadow: none;
  color: #fff;
  border: 2px solid white;
}

.btn-primary:hover {
  color: #155bfc;
  background: #fff;
  border: 2px solid #fff;
}

@media only screen and (max-width: 767px) {
}
</style>
