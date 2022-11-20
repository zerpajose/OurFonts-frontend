<script>
  import { Modals, closeModal } from 'svelte-modals'
  import { activeTab } from './stores/store';

  import Navbar from './components/Navbar.svelte'
  import Search from './components/Search.svelte';
  import Form from './components/Form.svelte';

  import { getProviderOrSigner } from './lib/functions'

  let activeTabValue;

	activeTab.subscribe(value => {activeTabValue = value})

  const getSigner = async() => {
    const signer = await getProviderOrSigner()
    return signer
  }
  let providerOrSigner = getSigner()

</script>

<div>
  {#await providerOrSigner}
    <p>...connecting</p>
  {:then addr}
    <Navbar address={addr['provider']['selectedAddress']} />
    {#if activeTabValue === "#search"}
      <Search />
    {:else if activeTabValue === "#upload"}
      <Form />
    {/if}
    
  {/await}
</div>

<Modals>
  <div slot="backdrop" class="backdrop" on:click={closeModal} on:keypress={closeModal}></div>
</Modals>

<style>
  .backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0,0,0,0.50)
  }
</style>
