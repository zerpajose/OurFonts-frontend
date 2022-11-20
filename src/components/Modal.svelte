<script>
  import { closeModal } from 'svelte-modals'
  import { searchUri } from '../stores/store'

  // provided by <Modals />
  export let isOpen

  export let title
  export let message

  let cssValue
  let searchUriValue

	searchUri.subscribe(value => {searchUriValue = value})

  fetch(`${searchUriValue}`)
      .then(res => res.json())
      .then(apiResponse => {
        
        cssValue = apiResponse.external_url
        
      })
      .catch(err => console.log(`Error: ${err}`))

</script>

<svelte:head>
  <link href="https://ipfs.io/ipfs/QmQPZGG5kPwo7UTsZV4kwqSocjPwsesMs8z98F11YeBsdR/Ubuntu.css" rel="stylesheet" type="text/css">
</svelte:head>

{#if isOpen}
  <div role="dialog" class="modal">
    <div class="contents">
      <h2 style="font-family: '{title}';">{title}</h2>
      <code>{message[0]}</code>
      <code>{message[1]}</code>
      <div class="actions">
        <button on:click={closeModal}>OK</button>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    /* allow click-through to backdrop */
    pointer-events: none;
  }

  .contents {
    min-width: 240px;
    border-radius: 6px;
    padding: 16px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: auto;
  }

  code {
    text-align: center;
    margin-top: 16px;
  }

  .actions {
    margin-top: 32px;
    display: flex;
    justify-content: flex-end;
  }

</style>