<template>
  <div class="container text-center">
    <img class="img-fluid main-img rounded" src="../assets/cover.png" />

    <div class="text-align-header mt-4 mb-2">
      <h1>Mint your {{ getTldName }} web3 name!</h1>
      <p>
        A digital identity for Scrolly The Map web3 community. <br />
        And start chatting with other community members on
        <a href="https://scrollyfi.xyz" target="_blank">Scrolly Hub</a>!
      </p>
    </div>

    <div class="highlight-box mt-5 mb-5 p-3">
      <h2>Participate in Quests and Evolve Your Badge!</h2>
      <p>
        Visit the main site to take part in quests and upgrade your badge. Don't
        miss out on the fun and rewards!
      </p>
      <a
        href="https://scrollyfi.xyz/dashboard"
        target="_blank"
        class="btn btn-warning btn-lg"
        >Go to Quest Dashboard</a
      >
    </div>

    <div class="d-flex justify-content-center domain-input-container mb-3 mt-5">
      <div class="input-group domain-input input-group-lg input-sizing">
        <input
          v-model="chosenDomainName"
          placeholder="enter a desired name"
          type="text"
          class="form-control text-end border-2 border-end-0 border-light domain-input"
          aria-label="Text input with dropdown button"
        />
        <span
          class="input-group-text tld-addon border-2 border-light input-span-extension"
        >
          <span
            v-if="loading"
            class="spinner-border spinner-border-sm mx-1"
            role="status"
            aria-hidden="true"
          ></span>
          <span>{{ getTldName }}</span>
        </span>
      </div>
    </div>

    <p class="error">
      <small v-if="buyNotValid(chosenDomainName).invalid">
        <em>{{ buyNotValid(chosenDomainName).message }}</em>
      </small>
    </p>

    <div class="text-align-header">
      <p class="mt-5 price-text">
        Domain price: {{ Number(getPrice).toFixed(0) }}
        {{ getPaymentTokenName }}
      </p>
    </div>

    <!-- Minter contract paused -->
    <button
      v-if="isActivated && getMinterPaused && !getMinterLoadingData"
      class="btn btn-primary btn-lg mt-3 buy-button"
      :disabled="true"
    >
      <span v-if="getMinterPaused">Buying paused</span>
    </button>

    <!-- Minter contract loading data -->
    <button
      v-if="isActivated && isNetworkSupported && getMinterLoadingData"
      class="btn btn-primary btn-lg mt-3 buy-button"
      :disabled="true"
    >
      <span
        class="spinner-border spinner-border-sm mx-1"
        role="status"
        aria-hidden="true"
      ></span>
      <span>Loading data</span>
    </button>

    <!-- Not eligible -->
    <button
      v-if="
        isActivated &&
        isNetworkSupported &&
        !getMinterPaused &&
        !getCanUserBuy &&
        !getMinterLoadingData
      "
      class="btn btn-primary btn-lg mt-3 buy-button"
      :disabled="
        waiting || buyNotValid(chosenDomainName).invalid || !hasUserEnoughTokens
      "
    >
      <span>Not eligible</span>
    </button>

    <!-- Too low ETH balance -->
    <button
      v-if="
        isActivated &&
        isNetworkSupported &&
        !getMinterPaused &&
        !hasUserEnoughTokens &&
        getCanUserBuy &&
        !getMinterLoadingData
      "
      class="btn btn-primary btn-lg mt-3 buy-button"
      :disabled="
        waiting || buyNotValid(chosenDomainName).invalid || !hasUserEnoughTokens
      "
    >
      <span>Your {{ getPaymentTokenName }} balance is too low</span>
    </button>

    <!-- Buy domain -->
    <button
      v-if="
        isActivated &&
        isNetworkSupported &&
        getCanUserBuy &&
        !getMinterPaused &&
        hasUserEnoughTokens &&
        hasEnoughAllowance &&
        !getMinterLoadingData
      "
      class="btn btn-primary btn-lg mt-3 buy-button"
      @click="buyDomain"
      :disabled="
        waiting || buyNotValid(chosenDomainName).invalid || !hasUserEnoughTokens
      "
    >
      <span
        v-if="waiting"
        class="spinner-border spinner-border-sm mx-1"
        role="status"
        aria-hidden="true"
      ></span>
      <span>Buy domain</span>
    </button>

    <!-- Approve tokens -->
    <button
      v-if="
        isActivated &&
        isNetworkSupported &&
        getCanUserBuy &&
        !getMinterPaused &&
        hasUserEnoughTokens &&
        !hasEnoughAllowance &&
        !getMinterLoadingData
      "
      class="btn btn-primary btn-lg mt-3 buy-button"
      data-bs-toggle="modal"
      data-bs-target="#approveTokenModal"
      @click="chosenAllowance = Number(getPrice)"
      :disabled="waiting || buyNotValid(chosenDomainName).invalid"
    >
      <span
        v-if="waiting"
        class="spinner-border spinner-border-sm mx-1"
        role="status"
        aria-hidden="true"
      ></span>
      <span>Approve {{ getPaymentTokenName }}</span>
    </button>

    <p
      v-if="
        isActivated &&
        isNetworkSupported &&
        !getMinterPaused &&
        !hasEnoughAllowance
      "
      class="mt-1"
    >
      <small>
        <strong>Important:</strong> You will need to complete 2 transactions:
        Approve {{ getPaymentTokenName }} + Buy Domain.
      </small>
    </p>

    <!-- Connect Wallet -->
    <button
      v-if="!isActivated"
      class="btn btn-primary btn-lg mt-3 btn-Disconnected"
      data-bs-toggle="modal"
      data-bs-target="#connectModal"
    >
      Connect wallet
    </button>

    <div v-if="isActivated && !isNetworkSupported" class="mt-4">
      <button
        class="btn btn-primary btn-lg btn-Disconnected"
        @click="changeNetwork(this.getTldChainName)"
      >
        Switch to {{ getTldChainName }}
      </button>
    </div>

    <!-- Prices table -->
    <div class="row mt-5">
      <div class="col-md-6 offset-md-3 table-container">
        <table class="table table-borderless table-ppl">
          <thead class="table-light">
            <tr>
              <th scope="col">Name length</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1 character</td>
              <td>
                {{ formatter.format(getMinterTldPrice1) }}
                {{ getPaymentTokenName }}
              </td>
            </tr>
            <tr>
              <td>2 characters</td>
              <td>
                {{ formatter.format(getMinterTldPrice2) }}
                {{ getPaymentTokenName }}
              </td>
            </tr>
            <tr>
              <td>3 characters</td>
              <td>
                {{ formatter.format(getMinterTldPrice3) }}
                {{ getPaymentTokenName }}
              </td>
            </tr>
            <tr>
              <td>4 characters</td>
              <td>
                {{ formatter.format(getMinterTldPrice4) }}
                {{ getPaymentTokenName }}
              </td>
            </tr>
            <tr>
              <td>5 characters</td>
              <td>
                {{ formatter.format(getMinterTldPrice5) }}
                {{ getPaymentTokenName }}
              </td>
            </tr>
            <tr>
              <td>6+ characters</td>
              <td>
                {{ formatter.format(getMinterTldPrice6) }}
                {{ getPaymentTokenName }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <Referral v-if="isActivated" />

  <!-- Approve payment token modal -->
  <div
    class="modal fade"
    id="approveTokenModal"
    tabindex="-1"
    aria-labelledby="approveTokenModalLabel"
    aria-hidden="true"
    modal-dialog-centered
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="approveTokenModalLabel">
            Approve {{ getPaymentTokenName }}
          </h5>
          <button
            id="closeApproveTokenModal"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <p>
              If you plan to mint multiple domains, consider giving the minting
              contract a higher {{ getPaymentTokenName }} approval.
            </p>
            <p>With each domain buy, the total approval amount is reduced.</p>

            Approval for
            <input
              type="number"
              pattern="[0-9]"
              step="1"
              id="recipient-name"
              v-model="chosenAllowance"
            />
            {{ getPaymentTokenName }}
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            @click="approveTokens"
            class="btn btn-secondary"
            :disabled="selectedAllowanceTooLow"
          >
            <span v-if="!selectedAllowanceTooLow"
              >Approve {{ getPaymentTokenName }}</span
            >
            <span v-if="selectedAllowanceTooLow"
              >Approval lower than domain price</span
            >
          </button>

          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ethers } from "ethers";
import { useBoard, useEthers } from "vue-dapp";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { useToast, TYPE } from "vue-toastification";
import WaitingToast from "../components/toasts/WaitingToast.vue";
import Referral from "../components/Referral.vue";
import useDomainHelpers from "../hooks/useDomainHelpers";
import useChainHelpers from "../hooks/useChainHelpers";
import MinterAbi from "../abi/Minter.json";

export default {
  name: "Home",

  data() {
    return {
      chosenDomainName: null,
      chosenAllowance: null,
      formatter: Intl.NumberFormat("en", { notation: "compact" }),
      loading: false, // loading data
      waiting: false, // waiting for TX to complete
      minterContract: null,
    };
  },

  components: {
    Referral,
  },

  computed: {
    ...mapGetters("user", [
      "getPaymentTokenAddress",
      "getPaymentTokenAllowance",
      "getPaymentTokenBalance",
      "getPaymentTokenDecimals",
      "getPaymentTokenName",
      "getCanUserBuy",
      "getDiscountEligible",
    ]),
    ...mapGetters("network", ["getBlockExplorerBaseUrl"]),
    ...mapGetters("tld", [
      "getTldChainId",
      "getTldChainName",
      "getMinterAddress",
      "getTldContract",
      "getMinterLoadingData",
      "getMinterTldPrice1",
      "getMinterTldPrice2",
      "getMinterTldPrice3",
      "getMinterTldPrice4",
      "getMinterTldPrice5",
      "getMinterTldPrice6",
      "getMinterPaused",
      "getMinterDiscountPercentage",
      "getTldName",
    ]),

    getPrice() {
      if (this.chosenDomainName) {
        if (this.chosenDomainName.match(/./gu).length === 1) {
          return this.getMinterTldPrice1;
        } else if (this.chosenDomainName.match(/./gu).length === 2) {
          return this.getMinterTldPrice2;
        } else if (this.chosenDomainName.match(/./gu).length === 3) {
          return this.getMinterTldPrice3;
        } else if (this.chosenDomainName.match(/./gu).length === 4) {
          return this.getMinterTldPrice4;
        } else if (this.chosenDomainName.match(/./gu).length === 5) {
          return this.getMinterTldPrice5;
        }
      }

      return this.getMinterTldPrice6;
    },

    domainLowerCase() {
      return this.chosenDomainName.toLowerCase();
    },

    hasEnoughAllowance() {
      if (this.address && this.getPaymentTokenAllowance) {
        if (Number(this.getPaymentTokenAllowance) >= Number(this.getPrice)) {
          return true;
        }
      }
    },

    hasUserEnoughTokens() {
      if (this.address && Number(this.getPaymentTokenBalance) > 0) {
        if (Number(this.getPaymentTokenBalance) >= Number(this.getPrice)) {
          return true;
        }
      }

      return false;
    },

    isNetworkSupported() {
      if (this.isActivated) {
        if (this.chainId === this.getTldChainId) {
          return true;
        }
      }

      return false;
    },

    selectedAllowanceTooLow() {
      if (Number(this.chosenAllowance) >= Number(this.getPrice)) {
        return false;
      }
      return true;
    },
  },

  methods: {
    ...mapActions("user", ["fetchCanUserBuy", "fetchTokenData"]),
    ...mapMutations("user", ["addDomainManually", "setPaymentTokenAllowance"]),

    async approveTokens() {
      this.waiting = true;

      try {
        const intfc = new ethers.utils.Interface([
          "function approve(address spender, uint256 amount) public returns (bool)",
        ]);

        const contract = new ethers.Contract(
          this.getPaymentTokenAddress,
          intfc,
          this.signer
        );

        const tx = await contract.approve(
          this.getMinterAddress, // spender (minting contract)
          ethers.utils.parseUnits(
            String(this.chosenAllowance),
            this.getPaymentTokenDecimals
          ) // amount
        );
        const toastWait = this.toast(
          {
            component: WaitingToast,
            props: {
              text: "STEP 1) Please wait for your transaction to confirm. Click on this notification to see transaction in the block explorer.",
            },
          },
          {
            type: TYPE.INFO,
            onClick: () =>
              window
                .open(this.getBlockExplorerBaseUrl + "/tx/" + tx.hash, "_blank")
                .focus(),
          }
        );

        document.getElementById("closeApproveTokenModal").click(); // close the modal
        const receipt = await tx.wait();

        if (receipt.status === 1) {
          this.toast.dismiss(toastWait);
          this.toast(
            "STEP 1) You have successfully set the allowance! Now PROCEED with STEP 2: buying the domain.",
            {
              type: TYPE.INFO,
              onClick: () =>
                window
                  .open(
                    this.getBlockExplorerBaseUrl + "/tx/" + tx.hash,
                    "_blank"
                  )
                  .focus(),
            }
          );
          this.setPaymentTokenAllowance(this.chosenAllowance);
          this.waiting = false;
        } else {
          this.toast.dismiss(toastWait);
          this.toast("Transaction has failed.", {
            type: TYPE.ERROR,
            onClick: () =>
              window
                .open(this.getBlockExplorerBaseUrl + "/tx/" + tx.hash, "_blank")
                .focus(),
          });
          console.log(receipt);
          this.waiting = false;
        }
      } catch (e) {
        console.log(e);
        this.waiting = false;
        this.toast(e.message, { type: TYPE.ERROR });
      }
      this.waiting = false;
    },

    async buyDomain() {
      this.waiting = true;
      const fullDomainName = this.domainLowerCase + this.getTldName;

      // check if domain already minted
      const existingHolder = await this.getTldContract.getDomainHolder(
        this.domainLowerCase
      );

      if (existingHolder !== ethers.constants.AddressZero) {
        this.toast("Sorry, but this domain name is already taken...", {
          type: TYPE.ERROR,
        });
        this.waiting = false;
        return;
      }

      // wrapper contract (with signer)
      const wrapperIntfc = new ethers.utils.Interface(MinterAbi);
      const minterContractSigner = new ethers.Contract(
        this.getMinterAddress,
        wrapperIntfc,
        this.signer
      );

      try {
        let referral = localStorage.getItem("referral");

        if (!referral || !ethers.utils.isAddress(referral)) {
          referral = ethers.constants.AddressZero;
        }

        const tx = await minterContractSigner.mint(
          this.domainLowerCase,
          this.address,
          referral
        );

        const toastWait = this.toast(
          {
            component: WaitingToast,
            props: {
              text: "Please wait for your transaction to confirm. Click on this notification to see transaction in the block explorer.",
            },
          },
          {
            type: TYPE.INFO,
            onClick: () =>
              window
                .open(this.getBlockExplorerBaseUrl + "/tx/" + tx.hash, "_blank")
                .focus(),
          }
        );

        const receipt = await tx.wait();

        if (receipt.status === 1) {
          this.toast.dismiss(toastWait);
          this.toast("You have successfully bought the domain!", {
            type: TYPE.SUCCESS,
            onClick: () =>
              window
                .open(this.getBlockExplorerBaseUrl + "/tx/" + tx.hash, "_blank")
                .focus(),
          });

          this.addDomainManually(fullDomainName);

          // fetch token balance and allowance
          this.fetchTokenData();

          this.waiting = false;
        } else {
          this.toast.dismiss(toastWait);
          this.toast("Transaction has failed.", {
            type: TYPE.ERROR,
            onClick: () =>
              window
                .open(this.getBlockExplorerBaseUrl + "/tx/" + tx.hash, "_blank")
                .focus(),
          });
          console.log(receipt);
          this.waiting = false;
        }
      } catch (e) {
        console.log(e);
        this.waiting = false;
        this.toast(e.message, { type: TYPE.ERROR });
      }

      this.waiting = false;
    },

    changeNetwork(networkName) {
      const networkData = this.switchNetwork(networkName);

      window.ethereum.request({
        method: networkData.method,
        params: networkData.params,
      });
    },

    getFormattedPrice(price) {
      // if price is less than 0.001, show 6 decimals etc.
      if (price < 0.001) {
        return Number(price).toFixed(0);
      } else if (price < 0.01) {
        return Number(price).toFixed(3);
      } else if (price < 0.1) {
        return Number(price).toFixed(2);
      } else if (price < 1) {
        return Number(price).toFixed(1);
      } else if (price < 10) {
        return Number(price).toFixed(1);
      }
    },
  },

  setup() {
    const { open } = useBoard();
    const { address, chainId, isActivated, signer } = useEthers();
    const toast = useToast();
    const { buyNotValid } = useDomainHelpers();
    const { switchNetwork } = useChainHelpers();

    return {
      address,
      buyNotValid,
      chainId,
      isActivated,
      open,
      signer,
      switchNetwork,
      toast,
    };
  },
};
</script>

<style scoped>
.and {
  font-size: 1.7em;
  vertical-align: bottom;
  padding-left: 0.2em;
  padding-right: 0.1em;
}

.buy-button {
  margin-bottom: 20px;
}

.container {
  padding-top: 80px;
  padding-bottom: 50px;
}

.domain-input {
  width: 50%;
}

.domain-input > input {
  color: #0d0f1a;
}

.domain-input > input::placeholder {
  color: #0d0f1a;
  opacity: 0.7;
}

.domain-input-container {
  margin-top: 30px;
}

.error {
  color: #dbdfea;
}

.main-img {
  width: 6em;
}

th:first-of-type {
  border-top-left-radius: 10px;
  border-collapse: separate;
}
th:last-of-type {
  border-top-right-radius: 10px;
}
tr:last-of-type td:first-of-type {
  border-bottom-left-radius: 10px;
}
tr:last-of-type td:last-of-type {
  border-bottom-right-radius: 10px;
}

.table-light {
  color: #0d0f1a;
}

.table-ppl {
  border: 2px solid white;
  border-radius: 10px !important;
  border-collapse: separate;
  color: white;
}

.tld-addon {
  background-color: white;
  color: #0d0f1a;
}

.highlight-box {
  border: 2px solid #ffd700;
  background-color: #fffbea;
  color: #333;
  border-radius: 10px;
}

@media only screen and (max-width: 767px) {
  .domain-input {
    width: 100%;
  }
}
</style>
